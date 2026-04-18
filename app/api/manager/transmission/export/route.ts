import { NextResponse } from 'next/server'
import { isManagerAuthenticated } from '@/lib/manager-auth'
import { supabaseServiceFetch } from '@/lib/supabase-rest'

export async function GET() {
  if (!(await isManagerAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const response = await supabaseServiceFetch(
    'transmission_signups?select=email,status,source_page,source_label,created_at,notes',
    { method: 'GET' },
  )

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to export signups.' }, { status: 500 })
  }

  const rows = (await response.json()) as Array<Record<string, string | null>>
  const header = ['email', 'status', 'source_page', 'source_label', 'created_at', 'notes']
  const csv = [
    header.join(','),
    ...rows.map((row) =>
      header
        .map((key) => `"${String(row[key] ?? '').replaceAll('"', '""')}"`)
        .join(','),
    ),
  ].join('\n')

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="transmission-signups.csv"',
    },
  })
}
