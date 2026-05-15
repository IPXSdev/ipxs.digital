import { NextResponse } from 'next/server'

import { DXA_QUEUE_SEED_TASKS, isValidTaskOwner, isValidTaskStatus } from '@/lib/dxa-queue'
import { isSupabaseConfigured, supabaseAdminFetch } from '@/lib/supabase/admin'

async function ensureSeeded() {
  const countRes = await supabaseAdminFetch('dxa_queue_tasks?select=id&limit=1')
  if (!countRes.ok) return
  const existing = await countRes.json()
  if (Array.isArray(existing) && existing.length > 0) return
  await supabaseAdminFetch('dxa_queue_tasks', { method: 'POST', body: JSON.stringify(DXA_QUEUE_SEED_TASKS) })
}

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ tasks: DXA_QUEUE_SEED_TASKS, warning: 'DXA queue database is not connected yet. Queue edits will require Supabase environment variables.' })
  }

  await ensureSeeded()
  const res = await supabaseAdminFetch('dxa_queue_tasks?select=*&order=sort_order.asc&order=updated_at.desc')
  if (!res.ok) return NextResponse.json({ error: 'Failed to load queue tasks' }, { status: 500 })
  const tasks = await res.json()
  return NextResponse.json({ tasks })
}

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
  const body = await req.json()
  if (body.pin !== process.env.DXA_ADMIN_PIN) return NextResponse.json({ error: 'Invalid PIN. Update not saved.' }, { status: 401 })
  if (!body.task?.trim()) return NextResponse.json({ error: 'Task is required' }, { status: 400 })
  if (!body.project_title?.trim()) return NextResponse.json({ error: 'Project title is required' }, { status: 400 })
  if (!isValidTaskOwner(body.owner_type)) return NextResponse.json({ error: 'Invalid owner type' }, { status: 400 })
  if (!isValidTaskStatus(body.status)) return NextResponse.json({ error: 'Invalid task status' }, { status: 400 })

  const payload = { ...body }
  delete payload.pin
  const res = await supabaseAdminFetch('dxa_queue_tasks', { method: 'POST', body: JSON.stringify(payload) })
  if (!res.ok) return NextResponse.json({ error: 'Create failed' }, { status: 500 })
  return NextResponse.json({ task: (await res.json())[0] })
}
