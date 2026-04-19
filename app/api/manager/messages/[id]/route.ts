import { NextResponse } from 'next/server'
import { isManagerAuthenticated } from '@/lib/manager-auth'
import { supabaseServiceFetch } from '@/lib/supabase-rest'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isManagerAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = (await request.json()) as {
    status?: string
    reply_message?: string
    internal_notes?: string
  }

  const payload: Record<string, string> = {}
  if (typeof body.status === 'string') payload.status = body.status
  if (typeof body.reply_message === 'string') payload.reply_message = body.reply_message
  if (typeof body.internal_notes === 'string') payload.internal_notes = body.internal_notes

  const response = await supabaseServiceFetch(
    `contact_submissions?id=eq.${encodeURIComponent(id)}`,
    {
      method: 'PATCH',
      headers: {
        Prefer: 'return=representation',
      },
      body: JSON.stringify(payload),
    },
  )

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to update message.' }, { status: 500 })
  }

  const data = await response.json()
  return NextResponse.json({ success: true, data })
}
