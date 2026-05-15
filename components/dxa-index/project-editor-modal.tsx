'use client'

import { useState } from 'react'
import type { DxaProject } from '@/lib/dxa-projects'
import { DXA_PRIORITIES, DXA_STATUSES } from '@/lib/dxa-projects'

export function ProjectEditorModal({ project, open, onClose, onSaved }: { project?: DxaProject | null, open: boolean, onClose: () => void, onSaved: () => void }) {
  const [form, setForm] = useState<any>(project || { status: 'Active', priority: 'Medium', type: [] })
  const [error, setError] = useState('')

  if (!open) return null

  async function save() {
    const method = project?.id ? 'PATCH' : 'POST'
    const url = project?.id ? `/api/dxa-projects/${project.id}` : '/api/dxa-projects'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, type: String(form.type || '').split(',').map((t) => t.trim()).filter(Boolean) }) })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'Save failed')
      return
    }
    onSaved()
    onClose()
  }

  return <div className='fixed inset-0 z-50 grid place-items-center bg-black/60 p-4'>
    <div className='w-full max-w-2xl rounded-xl border border-white/20 bg-zinc-950 p-4 text-white'>
      <h3 className='mb-3 text-xl font-semibold'>{project ? 'Edit Project' : 'Add New Project'}</h3>
      <div className='grid grid-cols-2 gap-2'>
        {['title','lane','preview_url','sort_order','pin'].map((k)=><input key={k} placeholder={k} className='rounded bg-zinc-900 p-2' value={form[k] || ''} onChange={(e)=>setForm({...form,[k]:e.target.value})} />)}
        <select className='rounded bg-zinc-900 p-2' value={form.status || 'Active'} onChange={(e)=>setForm({...form,status:e.target.value})}>{DXA_STATUSES.map(s=><option key={s}>{s}</option>)}</select>
        <select className='rounded bg-zinc-900 p-2' value={form.priority || 'Medium'} onChange={(e)=>setForm({...form,priority:e.target.value})}>{DXA_PRIORITIES.map(s=><option key={s}>{s}</option>)}</select>
      </div>
      {['type','summary','current_need','next_action','assets_needed','notes'].map((k)=><textarea key={k} placeholder={k} className='mt-2 w-full rounded bg-zinc-900 p-2' value={form[k] || ''} onChange={(e)=>setForm({...form,[k]:e.target.value})} />)}
      <label className='mt-2 block'><input type='checkbox' checked={!!form.is_pinned} onChange={(e)=>setForm({...form,is_pinned:e.target.checked})} /> Pinned</label>
      {error && <p className='mt-2 text-red-400'>{error}</p>}
      <div className='mt-3 flex gap-2'><button onClick={onClose} className='rounded border border-white/20 px-3 py-1'>Cancel</button><button onClick={save} className='rounded bg-white px-3 py-1 text-black'>Save</button></div>
    </div>
  </div>
}
