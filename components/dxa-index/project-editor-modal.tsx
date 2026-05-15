'use client'

import { useState } from 'react'
import type { DxaProject } from '@/lib/dxa-projects'
import { DXA_PRIORITIES, DXA_STATUSES } from '@/lib/dxa-projects'

export function ProjectEditorModal({
  project,
  open,
  onClose,
  onSaved,
}: {
  project?: DxaProject | null
  open: boolean
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState<any>(project || { status: 'Active', priority: 'Medium', type: [] })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  if (!open) return null

  function updateField(key: string, value: string | boolean) {
    setForm((current: any) => ({ ...current, [key]: value }))
  }

  async function save() {
    setSaving(true)
    setError('')
    const method = project?.id ? 'PATCH' : 'POST'
    const url = project?.id ? `/api/dxa-projects/${project.id}` : '/api/dxa-projects'
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        type: Array.isArray(form.type)
          ? form.type
          : String(form.type || '').split(',').map((item) => item.trim()).filter(Boolean),
      }),
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
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950/95 text-white shadow-2xl shadow-red-950/20">
        <div className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/95 px-5 py-4 backdrop-blur">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-red-500">DXA Index Editor</p>
          <h3 className="text-2xl font-semibold">{project ? 'Edit Project Card' : 'Add New Project'}</h3>
          <p className="mt-1 text-sm text-zinc-500">Update the live internal card without changing the page design or pushing code.</p>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-2">
          <Input label="Title" value={form.title || ''} onChange={(value) => updateField('title', value)} />
          <Input label="Lane" value={form.lane || ''} onChange={(value) => updateField('lane', value)} />
          <Select label="Status" value={form.status || 'Active'} options={[...DXA_STATUSES]} onChange={(value) => updateField('status', value)} />
          <Select label="Priority" value={form.priority || 'Medium'} options={[...DXA_PRIORITIES]} onChange={(value) => updateField('priority', value)} />
          <Input label="Tags / Type" value={Array.isArray(form.type) ? form.type.join(', ') : form.type || ''} onChange={(value) => updateField('type', value)} placeholder="Campaign, Website, Music" />
          <Input label="Preview URL" value={form.preview_url || ''} onChange={(value) => updateField('preview_url', value)} />
          <Input label="Sort Order" value={String(form.sort_order || 0)} onChange={(value) => updateField('sort_order', value)} />
          <Input label="PIN Required to Save" value={form.pin || ''} onChange={(value) => updateField('pin', value)} type="password" />
          <Textarea label="Summary" value={form.summary || ''} onChange={(value) => updateField('summary', value)} />
          <Textarea label="Current Need" value={form.current_need || ''} onChange={(value) => updateField('current_need', value)} />
          <Textarea label="Next Action" value={form.next_action || ''} onChange={(value) => updateField('next_action', value)} />
          <Textarea label="Assets Needed" value={form.assets_needed || ''} onChange={(value) => updateField('assets_needed', value)} />
          <div className="md:col-span-2">
            <Textarea label="Notes" value={form.notes || ''} onChange={(value) => updateField('notes', value)} />
          </div>
          <label className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-300">
            <input type="checkbox" checked={!!form.is_pinned} onChange={(event) => updateField('is_pinned', event.target.checked)} />
            Pin this project near the top
          </label>
        </div>

        {error ? <p className="mx-5 mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p> : null}

        <div className="flex flex-wrap justify-end gap-3 border-t border-zinc-800 px-5 py-4">
          <button onClick={onClose} className="rounded-full border border-zinc-700 px-5 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white">Cancel</button>
          <button onClick={save} disabled={saving} className="rounded-full bg-red-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60">{saving ? 'Saving...' : 'Save Project'}</button>
        </div>
      </div>
    </div>
  )
}

function Input({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string }) {
  return (
    <label className="space-y-1 text-sm">
      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{label}</span>
      <input type={type} placeholder={placeholder} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-red-500/50" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return (
    <label className="space-y-1 text-sm">
      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{label}</span>
      <select className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-white outline-none transition-colors focus:border-red-500/50" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  )
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="space-y-1 text-sm">
      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{label}</span>
      <textarea className="min-h-28 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-red-500/50" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}
