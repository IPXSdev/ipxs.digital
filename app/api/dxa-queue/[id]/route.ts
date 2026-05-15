import { NextResponse } from 'next/server'

import {
  hasValidDxaAdminPin,
  isActiveQueueProject,
  isValidTaskOwner,
  isValidTaskStatus,
} from '@/lib/dxa-queue'
import { isSupabaseConfigured, supabaseAdminFetch } from '@/lib/supabase/admin'

function getQueueFailureMessage(status: number, body: string, fallback: string) {
  if (status === 404 || body.includes('dxa_queue_tasks')) {
    return 'DXA queue table is not connected yet. Create the dxa_queue_tasks table in Supabase before saving queue edits.'
  }
  return fallback
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
  const body = await req.json()
  if (!hasValidDxaAdminPin(body.pin)) return NextResponse.json({ error: 'Invalid PIN. Update not saved.' }, { status: 401 })
  if (body.project_title && !isActiveQueueProject(body.project_title)) return NextResponse.json({ error: 'Queue tasks are restricted to active DXA projects only.' }, { status: 400 })
  if (body.owner_type && !isValidTaskOwner(body.owner_type)) return NextResponse.json({ error: 'Invalid owner type' }, { status: 400 })
  if (body.status && !isValidTaskStatus(body.status)) return NextResponse.json({ error: 'Invalid task status' }, { status: 400 })

  const { id } = await params
  const payload = { ...body }
  delete payload.pin
  const res = await supabaseAdminFetch(`dxa_queue_tasks?id=eq.${id}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const errorBody = await res.text().catch(() => '')
    return NextResponse.json({ error: getQueueFailureMessage(res.status, errorBody, 'Update failed') }, { status: 500 })
  }
  const updated = await res.json().catch(() => [])
  return NextResponse.json({ task: Array.isArray(updated) ? updated[0] : updated })
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
  const body = await req.json()
  if (!hasValidDxaAdminPin(body.pin)) return NextResponse.json({ error: 'Invalid PIN. Update not saved.' }, { status: 401 })

  const { id } = await params
  const res = await supabaseAdminFetch(`dxa_queue_tasks?id=eq.${id}`, { method: 'DELETE' })
  if (!res.ok) {
    const errorBody = await res.text().catch(() => '')
    return NextResponse.json({ error: getQueueFailureMessage(res.status, errorBody, 'Delete failed') }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
