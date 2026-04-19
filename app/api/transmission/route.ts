import { NextResponse } from 'next/server'
import { supabaseAnonFetch } from '@/lib/supabase-rest'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string
      sourcePage?: string
      sourceLabel?: string
    }

    const email = (body.email || '').trim().toLowerCase()
    const sourcePage = (body.sourcePage || request.headers.get('referer') || '').trim()
    const sourceLabel = (body.sourceLabel || 'website_drop').trim()

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
    }

    const response = await supabaseAnonFetch('transmission_signups?on_conflict=email', {
      method: 'POST',
      headers: {
        Prefer: 'resolution=ignore-duplicates,return=representation',
      },
      body: JSON.stringify([
        {
          email,
          source_page: sourcePage || null,
          source_label: sourceLabel || null,
          status: 'active',
          last_seen_at: new Date().toISOString(),
        },
      ]),
    })

    if (!response.ok) {
      const details = await response.text()
      return NextResponse.json(
        { error: 'Unable to join the transmission list right now.', details },
        { status: 500 },
      )
    }

    const data = (await response.json()) as Array<{ id: string }> | []
    const alreadySubscribed = data.length === 0

    return NextResponse.json({ success: true, alreadySubscribed }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
