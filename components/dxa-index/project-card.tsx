'use client'
import type { DxaProject } from '@/lib/dxa-projects'

export function ProjectCard({ project, onEdit, onComplete }: { project: DxaProject, onEdit: (p: DxaProject)=>void, onComplete: (p: DxaProject)=>void }) {
  const completed = project.status === 'Completed'
  return <div className={`rounded-xl border p-4 ${completed ? 'border-zinc-700 bg-zinc-900/60 opacity-75' : 'border-white/20 bg-zinc-900/90'}`}>
    <div className='flex items-center justify-between'><h3 className='font-semibold'>{project.title}</h3><span>{project.status}</span></div>
    <p className='text-sm text-zinc-400'>{project.lane}</p>
    <p className='mt-2 text-sm'>{project.summary}</p>
    <p className='text-xs text-zinc-400'>Current Need: {project.current_need}</p>
    <p className='text-xs text-zinc-400'>Next Action: {project.next_action}</p>
    <p className='text-xs text-zinc-400'>Assets Needed: {project.assets_needed}</p>
    <p className='text-xs text-zinc-400'>Notes: {project.notes}</p>
    <p className='text-xs text-zinc-500'>Last Updated: {project.updated_at ? new Date(project.updated_at).toLocaleString() : 'N/A'}</p>
    <div className='mt-3 flex gap-2'>
      {project.preview_url && <a href={project.preview_url} target='_blank' className='rounded border border-white/20 px-2 py-1 text-xs'>Open Preview</a>}
      <button onClick={()=>onEdit(project)} className='rounded border border-white/20 px-2 py-1 text-xs'>Edit</button>
      {!completed && <button onClick={()=>onComplete(project)} className='rounded border border-white/20 px-2 py-1 text-xs'>Mark Completed</button>}
    </div>
  </div>
}
