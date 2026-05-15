'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, CheckCircle2 } from 'lucide-react'

import { DXA_TASK_OWNERS, DXA_TASK_STATUSES, type DxaQueueTask } from '@/lib/dxa-queue'

const ACTIVE_PROJECTS = ['HSS Feed', 'DVI Travel Hotline', 'DKLA / Throw That Thang']

function ownerClass(owner: string) {
  if (owner === 'Me') return 'border-red-500/30 bg-red-500/10 text-red-300'
  if (owner === 'Adrian') return 'border-violet-500/30 bg-violet-500/10 text-violet-300'
  return 'border-amber-500/30 bg-amber-500/10 text-amber-300'
}

function statusClass(status: string) {
  if (status === 'Completed') return 'border-white/20 bg-white/10 text-zinc-300'
  if (status === 'Waiting') return 'border-amber-500/30 bg-amber-500/10 text-amber-300'
  return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
}

export function DxaQueueSection() {
  const [tasks, setTasks] = useState<DxaQueueTask[]>([])
  const [warning, setWarning] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<DxaQueueTask | null>(null)

  async function loadTasks() {
    try {
      const response = await fetch('/api/dxa-queue', { cache: 'no-store' })
      const data = await response.json()
      setTasks(data.tasks || [])
      setWarning(data.warning || '')
    } catch {
      setWarning('DXA queue could not be loaded. Check the API connection.')
    }
  }

  useEffect(() => { loadTasks() }, [])

  function editTask(task: DxaQueueTask) {
    setSelectedTask(task)
    setOpen(true)
  }

  function addTask() {
    setSelectedTask(null)
    setOpen(true)
  }

  async function deleteTask(task: DxaQueueTask) {
    const pin = window.prompt('Enter PIN to remove this queue task:')
    if (!pin) return
    const response = await fetch(`/api/dxa-queue/${task.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    })
    if (!response.ok) {
      window.alert('Invalid PIN. Task was not removed.')
      return
    }
    loadTasks()
  }

  async function completeTask(task: DxaQueueTask) {
    const pin = window.prompt('Enter PIN to mark this queue task completed:')
    if (!pin) return
    const response = await fetch(`/api/dxa-queue/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Completed', pin }),
    })
    if (!response.ok) {
      window.alert('Invalid PIN. Task was not updated.')
      return
    }
    loadTasks()
  }

  return (
    <section id="next-actions" className="border-b border-zinc-800 bg-zinc-900/30 py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-white">Next Actions Queue</h2>
            <p className="max-w-3xl text-sm text-zinc-500">
              Active queue items only for HSS Feed, DVI Travel Hotline, and DKLA / Throw That Thang. Each task shows whether it is on me, Adrian, or a client / partner.
            </p>
          </div>
          <button onClick={addTask} className="inline-flex items-center justify-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20">
            <Plus className="h-4 w-4" /> Add Queue Task
          </button>
        </div>

        {warning ? <p className="mb-4 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-sm text-amber-200">{warning}</p> : null}

        <div className="grid gap-3 md:grid-cols-3">
          {tasks.filter((task) => task.status !== 'Completed').map((task) => (
            <div key={task.id || `${task.project_title}-${task.sort_order}`} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-400">{task.project_title}</p>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusClass(task.status)}`}>{task.status}</span>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-zinc-300">{task.task}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${ownerClass(task.owner_type)}`}>{task.owner_type}</span>
              </div>
              {task.notes ? <p className="mb-4 border-t border-zinc-800 pt-3 text-xs leading-relaxed text-zinc-500">{task.notes}</p> : null}
              <div className="flex flex-wrap gap-2">
                <button onClick={() => editTask(task)} className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-red-500/40 hover:text-white">Edit <Pencil className="h-3 w-3" /></button>
                <button onClick={() => completeTask(task)} className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-emerald-500/40 hover:text-emerald-300">Done <CheckCircle2 className="h-3 w-3" /></button>
                <button onClick={() => deleteTask(task)} className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-red-500/40 hover:text-red-300">Remove <Trash2 className="h-3 w-3" /></button>
              </div>
            </div>
          ))}
        </div>

        {tasks.filter((task) => task.status !== 'Completed').length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-8 text-center text-sm text-zinc-500">No open queue tasks yet.</div>
        ) : null}
      </div>
      <DxaQueueModal key={selectedTask?.id || 'new-task'} task={selectedTask} open={open} onClose={() => setOpen(false)} onSaved={loadTasks} />
    </section>
  )
}

function DxaQueueModal({ task, open, onClose, onSaved }: { task: DxaQueueTask | null; open: boolean; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<any>(task || { project_title: ACTIVE_PROJECTS[0], task: '', owner_type: 'Me', status: 'Open', notes: '', sort_order: 10 })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  if (!open) return null

  function updateField(key: string, value: string) {
    setForm((current: any) => ({ ...current, [key]: value }))
  }

  async function save() {
    setSaving(true)
    setError('')
    const method = task?.id ? 'PATCH' : 'POST'
    const url = task?.id ? `/api/dxa-queue/${task.id}` : '/api/dxa-queue'
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Save failed')
      return
    }
    onSaved()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4 backdrop-blur-md">
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-950/95 text-white shadow-2xl shadow-red-950/20">
        <div className="border-b border-zinc-800 px-5 py-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-red-500">DXA Queue Editor</p>
          <h3 className="text-2xl font-semibold">{task ? 'Edit Queue Task' : 'Add Queue Task'}</h3>
        </div>
        <div className="grid gap-4 p-5 md:grid-cols-2">
          <Select label="Project" value={form.project_title || ACTIVE_PROJECTS[0]} options={ACTIVE_PROJECTS} onChange={(value) => updateField('project_title', value)} />
          <Select label="Owner" value={form.owner_type || 'Me'} options={[...DXA_TASK_OWNERS]} onChange={(value) => updateField('owner_type', value)} />
          <Select label="Status" value={form.status || 'Open'} options={[...DXA_TASK_STATUSES]} onChange={(value) => updateField('status', value)} />
          <Input label="Sort Order" value={String(form.sort_order || 0)} onChange={(value) => updateField('sort_order', value)} />
          <div className="md:col-span-2"><Textarea label="Task" value={form.task || ''} onChange={(value) => updateField('task', value)} /></div>
          <div className="md:col-span-2"><Textarea label="Notes" value={form.notes || ''} onChange={(value) => updateField('notes', value)} /></div>
          <Input label="PIN Required to Save" value={form.pin || ''} onChange={(value) => updateField('pin', value)} type="password" />
        </div>
        {error ? <p className="mx-5 mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p> : null}
        <div className="flex flex-wrap justify-end gap-3 border-t border-zinc-800 px-5 py-4">
          <button onClick={onClose} className="rounded-full border border-zinc-700 px-5 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white">Cancel</button>
          <button onClick={save} disabled={saving} className="rounded-full bg-red-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60">{saving ? 'Saving...' : 'Save Task'}</button>
        </div>
      </div>
    </div>
  )
}

function Input({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <label className="space-y-1 text-sm"><span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{label}</span><input type={type} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-white outline-none transition-colors focus:border-red-500/50" value={value} onChange={(event) => onChange(event.target.value)} /></label>
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return <label className="space-y-1 text-sm"><span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{label}</span><select className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-white outline-none transition-colors focus:border-red-500/50" value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="space-y-1 text-sm"><span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{label}</span><textarea className="min-h-24 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-white outline-none transition-colors focus:border-red-500/50" value={value} onChange={(event) => onChange(event.target.value)} /></label>
}
