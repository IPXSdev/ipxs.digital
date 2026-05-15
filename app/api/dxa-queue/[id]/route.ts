import { NextResponse } from 'next/server'

import { isValidTaskOwner, isValidTaskStatus } from '@/lib/dxa-queue'
import { isSupabaseConfigured, supabaseAdminFetch } from '@/lib/supabase/admin'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
  const body = await req.json()
  if (body.pin !== process.env.DXA_ADMIN_PIN) return NextResponse.json({ error: 'Invalid PIN. Update not saved.' }, { status: 401 })
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
  if (!res.ok) return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  return NextResponse.json({ task: (await res.json())[0] })
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
  const body = await req.json()
  if (body.pin !== process.env.DXA_ADMIN_PIN) return NextResponse.json({ error: 'Invalid PIN. Update not saved.' }, { status: 401 })

  const { id } = await params
  const res = await supabaseAdminFetch(`dxa_queue_tasks?id=eq.${id}`, { method: 'DELETE' })
  if (!res.ok) return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  return NextResponse.json({ success: true })
}
