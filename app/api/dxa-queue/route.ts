import { NextResponse } from 'next/server'

import {
  DXA_ACTIVE_QUEUE_PROJECTS,
  DXA_QUEUE_SEED_TASKS,
  hasValidDxaAdminPin,
  isActiveQueueProject,
  isValidTaskOwner,
  isValidTaskStatus,
} from '@/lib/dxa-queue'
import { isSupabaseConfigured, supabaseAdminFetch } from '@/lib/supabase/admin'

const canonicalQueueTasks = DXA_QUEUE_SEED_TASKS.map((task) => task.task).filter(Boolean) as string[]

async function ensureCanonicalQueueTasks() {
  const countRes = await supabaseAdminFetch('dxa_queue_tasks?select=id,project_title,task')
  if (!countRes.ok) return false
  const existing = await countRes.json()
  const tasks = Array.isArray(existing) ? existing : []
  const existingTaskNames = tasks.map((task) => task.task)
  const hasUnexpectedRows = tasks.some((task) => !DXA_ACTIVE_QUEUE_PROJECTS.includes(task.project_title) || !canonicalQueueTasks.includes(task.task))
  const isMissingCanonicalRows = canonicalQueueTasks.some((task) => !existingTaskNames.includes(task))
  const shouldRepair = hasUnexpectedRows || isMissingCanonicalRows

  if (shouldRepair) {
    await supabaseAdminFetch('dxa_queue_tasks?id=not.is.null', { method: 'DELETE' })
    const seedRes = await supabaseAdminFetch('dxa_queue_tasks', {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify(DXA_QUEUE_SEED_TASKS),
    })
    return seedRes.ok
  }

  return true
}

function getQueueFailureMessage(status: number, body: string) {
  if (status === 404 || body.includes('dxa_queue_tasks')) {
    return 'DXA queue table is not connected yet. Create the dxa_queue_tasks table in Supabase before saving queue edits.'
  }
  return 'Create failed'
}

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ tasks: DXA_QUEUE_SEED_TASKS, warning: 'DXA queue database is not connected yet. Queue edits will require Supabase environment variables.' })
  }

  await ensureCanonicalQueueTasks()
  const activeProjectsFilter = DXA_ACTIVE_QUEUE_PROJECTS.join(',')
  const res = await supabaseAdminFetch(`dxa_queue_tasks?select=*&project_title=in.(${activeProjectsFilter})&order=sort_order.asc&order=updated_at.desc`)
  if (!res.ok) return NextResponse.json({ error: 'Failed to load queue tasks' }, { status: 500 })
  const tasks = await res.json()
  return NextResponse.json({ tasks })
}

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
  const body = await req.json()
  if (!hasValidDxaAdminPin(body.pin)) return NextResponse.json({ error: 'Invalid PIN. Update not saved.' }, { status: 401 })
  if (!body.task?.trim()) return NextResponse.json({ error: 'Task is required' }, { status: 400 })
  if (!body.project_title?.trim()) return NextResponse.json({ error: 'Project title is required' }, { status: 400 })
  if (!isActiveQueueProject(body.project_title)) return NextResponse.json({ error: 'Queue tasks are restricted to active DXA projects only.' }, { status: 400 })
  if (!isValidTaskOwner(body.owner_type)) return NextResponse.json({ error: 'Invalid owner type' }, { status: 400 })
  if (!isValidTaskStatus(body.status)) return NextResponse.json({ error: 'Invalid task status' }, { status: 400 })

  const payload = { ...body }
  delete payload.pin
  const res = await supabaseAdminFetch('dxa_queue_tasks', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const errorBody = await res.text().catch(() => '')
    return NextResponse.json({ error: getQueueFailureMessage(res.status, errorBody) }, { status: 500 })
  }
  const created = await res.json().catch(() => [])
  return NextResponse.json({ task: Array.isArray(created) ? created[0] : created })
}
