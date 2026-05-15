'use client'

import { useState } from 'react'
import { ChevronRight, ExternalLink, Pencil, CheckCircle2 } from 'lucide-react'

import type { DxaProject } from '@/lib/dxa-projects'

function StatusPill({ status }: { status: string }) {
  const statusColors: Record<string, string> = {
    Active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'Needs Assets': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'Needs Review': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'MVP Preview': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    Reference: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
    Delivered: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    Completed: 'bg-white/10 text-zinc-300 border-white/20',
    'Expansion Opportunity': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  }

  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[status] ?? statusColors.Reference}`}>{status}</span>
}

function PriorityPill({ priority }: { priority: string }) {
  const priorityColors: Record<string, string> = {
    High: 'bg-red-500/20 text-red-400 border-red-500/30',
    Medium: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    Low: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
  }

  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${priorityColors[priority] ?? priorityColors.Medium}`}>{priority}</span>
}

export function ProjectCard({
  project,
  onEdit,
  onComplete,
}: {
  project: DxaProject
  onEdit: (project: DxaProject) => void
  onComplete: (project: DxaProject) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const completed = project.status === 'Completed'

  return (
    <div className={`group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm transition-all hover:border-red-500/30 hover:bg-zinc-900 ${completed ? 'opacity-75' : ''}`}>
      <div className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${completed ? 'from-zinc-500 to-zinc-700' : 'from-red-500 to-red-600/50'}`} />
      <div className="p-5 pl-6">
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-white">{project.title}</h3>
            <p className="text-xs text-zinc-500">{project.lane}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <PriorityPill priority={project.priority || 'Medium'} />
            <StatusPill status={project.status} />
          </div>
        </div>

        {project.type?.length ? (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {project.type.map((item) => <span key={item} className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-400">{item}</span>)}
          </div>
        ) : null}

        <p className="mb-4 text-sm leading-relaxed text-zinc-400">{project.summary || 'No summary added yet.'}</p>

        {expanded ? (
          <div className="mb-4 space-y-3 border-t border-zinc-800 pt-4">
            <Detail label="Current Need" value={project.current_need} highlight />
            <Detail label="Next Action" value={project.next_action} highlight />
            <Detail label="Assets Needed" value={project.assets_needed} highlight />
            <Detail label="Notes" value={project.notes} />
            <p className="text-[10px] uppercase tracking-wider text-zinc-600">Last Updated: {project.updated_at ? new Date(project.updated_at).toLocaleString() : 'N/A'}</p>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          {project.preview_url ? (
            <a href={project.preview_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20">
              Open Preview <ExternalLink className="h-3 w-3" />
            </a>
          ) : null}
          <button onClick={() => setExpanded(!expanded)} className="inline-flex items-center gap-1 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white">
            {expanded ? 'Hide Details' : 'View Details'} <ChevronRight className={`h-3 w-3 transition-transform ${expanded ? 'rotate-90' : ''}`} />
          </button>
          <button onClick={() => onEdit(project)} className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-red-500/40 hover:text-white">
            Edit <Pencil className="h-3 w-3" />
          </button>
          {!completed ? (
            <button onClick={() => onComplete(project)} className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-emerald-500/40 hover:text-emerald-300">
              Mark Completed <CheckCircle2 className="h-3 w-3" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function Detail({ label, value, highlight = false }: { label: string; value?: string | null; highlight?: boolean }) {
  return (
    <div>
      <p className={`text-[10px] font-semibold uppercase tracking-wider ${highlight ? 'text-red-400' : 'text-zinc-500'}`}>{label}</p>
      <p className="mt-1 text-sm text-zinc-300">{value || 'Not added yet.'}</p>
    </div>
  )
}
