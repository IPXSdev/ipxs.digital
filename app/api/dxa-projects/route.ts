import { NextResponse } from 'next/server'

import { DXA_SEED_PROJECTS, isValidStatus, normalizeType } from '@/lib/dxa-projects'
import { isSupabaseConfigured, supabaseAdminFetch } from '@/lib/supabase/admin'

const canonicalProjectTitles = DXA_SEED_PROJECTS.map((project) => project.title).filter(Boolean) as string[]

async function ensureCanonicalProjects() {
  const countRes = await supabaseAdminFetch('dxa_projects?select=title')
  if (!countRes.ok) return
  const existing = await countRes.json()
  const titles = Array.isArray(existing) ? existing.map((project) => project.title) : []
  const hasUnexpectedRows = titles.some((title) => !canonicalProjectTitles.includes(title))
  const isMissingCanonicalRows = canonicalProjectTitles.some((title) => !titles.includes(title))
  const shouldRepair = hasUnexpectedRows || isMissingCanonicalRows

  if (shouldRepair) {
    await supabaseAdminFetch('dxa_projects?id=not.is.null', { method: 'DELETE' })
    await supabaseAdminFetch('dxa_projects', {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify(DXA_SEED_PROJECTS),
    })
    return
  }

  await Promise.all(
    DXA_SEED_PROJECTS.map((project) =>
      supabaseAdminFetch(`dxa_projects?title=eq.${encodeURIComponent(project.title || '')}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify(project),
      })
    )
  )
}

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ projects: DXA_SEED_PROJECTS, warning: 'DXA database is not connected yet. Add Supabase environment variables to enable live editing.' })
  }

  await ensureCanonicalProjects()
  const res = await supabaseAdminFetch('dxa_projects?select=*&order=is_pinned.desc&order=sort_order.asc&order=updated_at.desc')
  if (!res.ok) return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 })
  const projects = await res.json()
  return NextResponse.json({ projects })
}

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
  const body = await req.json()
  if (body.pin !== process.env.DXA_ADMIN_PIN) return NextResponse.json({ error: 'Invalid PIN. Update not saved.' }, { status: 401 })
  if (!body.title?.trim()) return NextResponse.json({ error: 'Title is required' }, { status: 400 })
  if (!isValidStatus(body.status)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 })

  const payload = {
    ...body,
    type: normalizeType(body.type),
  }
  delete payload.pin
  const res = await supabaseAdminFetch('dxa_projects', { method: 'POST', body: JSON.stringify(payload) })
  if (!res.ok) return NextResponse.json({ error: 'Create failed' }, { status: 500 })
  return NextResponse.json({ project: (await res.json())[0] })
}
