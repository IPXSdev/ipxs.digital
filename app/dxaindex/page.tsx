'use client'

import { useEffect, useState } from 'react'
import { ProjectCard } from '@/components/dxa-index/project-card'
import { ProjectEditorModal } from '@/components/dxa-index/project-editor-modal'
import type { DxaProject } from '@/lib/dxa-projects'

const filters = ['All','Active','Needs Assets','Needs Review','MVP Preview','Reference','Delivered','Completed','Campaign','Website','Music','Live Show','Legacy','AI Assets']

export default function Page() {
  const [projects, setProjects] = useState<DxaProject[]>([])
  const [filter, setFilter] = useState('All')
  const [warning, setWarning] = useState('')
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<DxaProject | null>(null)

  async function load() {
    const res = await fetch('/api/dxa-projects', { cache: 'no-store' })
    const data = await res.json()
    setProjects(data.projects || [])
    setWarning(data.warning || '')
  }
  useEffect(() => { load() }, [])

  const filtered = projects.filter((p) => filter === 'All' || p.status === filter || p.type?.includes(filter))

  async function markCompleted(project: DxaProject) {
    const pin = prompt('Enter PIN to mark completed:')
    if (!pin) return
    const res = await fetch(`/api/dxa-projects/${project.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'Completed', pin }) })
    if (!res.ok) return alert('Invalid PIN. Update not saved.')
    load()
  }

  return <main className='min-h-screen bg-black p-6 text-white'>
    <div className='mx-auto max-w-6xl'>
      <h1 className='text-4xl font-bold'>DXA Index Command Center</h1>
      {warning && <p className='mt-3 rounded border border-amber-500/40 bg-amber-500/10 p-2 text-amber-300'>{warning}</p>}
      <div className='mt-4 flex flex-wrap gap-2'>{filters.map((f)=><button key={f} onClick={()=>setFilter(f)} className={`rounded-full border px-3 py-1 text-sm ${filter===f?'border-white':'border-white/20'}`}>{f}</button>)}</div>
      <div className='mt-4'><button className='rounded bg-white px-3 py-1 text-black' onClick={()=>{setSelected(null);setOpen(true)}}>Add New Project</button></div>
      <div className='mt-6 grid gap-4 md:grid-cols-2'>
        {filtered.map((project)=><ProjectCard key={project.id} project={project} onEdit={(p)=>{setSelected(p);setOpen(true)}} onComplete={markCompleted} />)}
      </div>
    </div>
    <ProjectEditorModal key={selected?.id || 'new'} project={selected} open={open} onClose={()=>setOpen(false)} onSaved={load} />
  </main>
}
