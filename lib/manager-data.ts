import { supabaseServiceFetch } from '@/lib/supabase-rest'

export interface ContactSubmissionRow {
  id: string
  created_at: string
  name: string
  email: string
  subject: string | null
  inquiry_type: string | null
  message: string
  status: string | null
  reply_message: string | null
  internal_notes: string | null
  source_page: string | null
}

export interface TransmissionSignupRow {
  id: string
  created_at: string
  email: string
  status: string | null
  source_page: string | null
  source_label: string | null
  notes: string | null
  tags: string[] | null
}

export async function getContactSubmissions() {
  const response = await supabaseServiceFetch(
    'contact_submissions?select=id,created_at,name,email,subject,inquiry_type,message,status,reply_message,internal_notes,source_page&order=created_at.desc',
  )
  if (!response.ok) throw new Error('Failed to load contact submissions')
  return (await response.json()) as ContactSubmissionRow[]
}

export async function getTransmissionSignups() {
  const response = await supabaseServiceFetch(
    'transmission_signups?select=id,created_at,email,status,source_page,source_label,notes,tags&order=created_at.desc',
  )
  if (!response.ok) throw new Error('Failed to load transmission signups')
  return (await response.json()) as TransmissionSignupRow[]
}
