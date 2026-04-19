import { NextResponse } from 'next/server'
import { supabaseAnonFetch } from '@/lib/supabase-rest'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ContactSubmission {
  name: string
  email: string
  message: string
  projectType?: string
  inquiryType?: string
  subject?: string
  phone?: string
  company?: string
  sourcePage?: string
}

function sanitizeString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function validatePayload(payload: ContactSubmission) {
  const name = sanitizeString(payload.name)
  const email = sanitizeString(payload.email).toLowerCase()
  const message = sanitizeString(payload.message)
  const projectType = sanitizeString(payload.projectType)
  const inquiryType = sanitizeString(payload.inquiryType || payload.projectType)
  const subject = sanitizeString(payload.subject)
  const phone = sanitizeString(payload.phone)
  const company = sanitizeString(payload.company)
  const sourcePage = sanitizeString(payload.sourcePage)

  if (!name || !email || !message) {
    return { ok: false, error: 'Name, email, and message are required.' } as const
  }

  if (!emailPattern.test(email)) {
    return { ok: false, error: 'Please provide a valid email address.' } as const
  }

  return {
    ok: true,
    value: {
      name,
      email,
      message,
      inquiry_type: inquiryType || null,
      project_type: projectType || null,
      subject: subject || null,
      phone: phone || null,
      company: company || null,
      source_page: sourcePage || null,
      status: 'new',
    },
  } as const
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactSubmission
    const referer = request.headers.get('referer') || ''

    const validated = validatePayload({
      ...payload,
      sourcePage: payload.sourcePage || referer,
    })

    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 })
    }

    const response = await supabaseAnonFetch('contact_submissions', {
      method: 'POST',
      headers: {
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(validated.value),
    })

    if (!response.ok) {
      const details = await response.text()
      return NextResponse.json(
        { error: 'Unable to submit your message right now.', details },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
