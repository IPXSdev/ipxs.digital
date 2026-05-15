'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, ChevronRight, AlertCircle, Zap, Radio, Music, Globe, Film, Briefcase, Sparkles, Pencil, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

// ============================================================================
// TYPES
// ============================================================================

type ProjectStatus = 'Active' | 'Needs Assets' | 'Needs Review' | 'MVP Preview' | 'Reference' | 'Delivered' | 'Expansion Opportunity'
type ProjectType = 'Live Show' | 'Website' | 'Music' | 'MVP Preview' | 'Campaign' | 'Video' | 'AI Assets' | 'Legacy' | 'Deck' | 'Documentary' | 'Brand' | 'Investor Materials' | 'Motion' | 'Platform' | 'Music Business' | 'AI' | 'App' | 'Social' | 'E-commerce' | 'Portfolio' | 'Finance' | 'Web3'
type Priority = 'High' | 'Medium' | 'Low'

export interface Project {
  id: string
  title: string
  lane: string
  status: ProjectStatus
  priority: Priority
  type: string[]
  previewUrl: string
  summary: string
  currentNeed: string
  nextAction: string
  assetsNeeded: string
  notes: string
}

export interface QueueTask {
  id: string
  projectTitle: string
  task: string
  ownerType: 'Me' | 'Adrian' | 'Other'
  status: 'Open' | 'In Progress' | 'Blocked' | 'Done'
  notes: string | null
  sortOrder: number
  createdAt: string
  updatedAt: string
}

// ============================================================================
// STATIC DATA (Reference sections - not from database)
// ============================================================================

const filterOptions = [
  'All',
  'Active',
  'Needs Assets',
  'Needs Review',
  'MVP Preview',
  'Reference',
  'Delivered',
  'Campaign',
  'Website',
  'Music',
  'Live Show',
  'Legacy',
  'AI Assets',
  'App',
] as const

const priorityLanes = [
  {
    title: 'Live Shows + Broadcast Systems',
    description: 'HSS Feed and future live entertainment formats that require landing pages, submission flows, platform links, OBS direction, clipping systems, and post-production organization.',
    icon: Radio,
  },
  {
    title: 'Music Campaigns + Artist Assets',
    description: 'Artist rollouts, singles, visualizers, music videos, motion art, cover art, social assets, and release strategy connected to Adrian\'s music network.',
    icon: Music,
  },
  {
    title: 'Campaign MVPs + Interactive Experiences',
    description: 'Fast-moving digital experiences like DVI Travel, virtual phone systems, sweepstakes pages, fan engagement mechanics, and branded entertainment activations.',
    icon: Globe,
  },
  {
    title: 'Legacy + Documentary Projects',
    description: 'Cultural history, archival storytelling, documentary pitch decks, nostalgic brand revivals, and projects that convert legacy into future-facing media opportunities.',
    icon: Film,
  },
  {
    title: 'Investor + Executive Digital Builds',
    description: 'High-polish websites, MVPs, demo portals, decks, and digital presentation systems for finance, entertainment, and executive-facing clients.',
    icon: Briefcase,
  },
  {
    title: 'AI-Native Asset Production',
    description: 'Higgsfield prompts, Suno concepts, v0 pages, Codex handoffs, AI artist infrastructure, synthetic campaign assets, and IPXS production systems.',
    icon: Sparkles,
  },
]

const archiveBuckets = [
  {
    title: 'Adrian Miller Network',
    items: ['Artist relationships', 'Executive references', 'Music business strategy', 'Roster history', 'Platform concepts', 'Referral opportunities'],
  },
  {
    title: 'Brand + Label References',
    items: ['Death Row Records', 'Delicious Vinyl Island', 'x|a / xIa', 'Xyion', 'Emory Capital', 'Larry Parker\'s Diner'],
  },
  {
    title: 'Creative Asset References',
    items: ['Decks', 'Prompts', 'Campaign copy', 'Video stills', 'Motion art', 'Landing pages', 'Social posts', 'Reference images'],
  },
  {
    title: 'Campaign Reference Material',
    items: ['Wet \'n Wild', 'The Trendy Era', 'Uncle Jamm\'s Army', 'Dance crews', 'Pool party rollout', 'Golden Ticket giveaway', 'LA party culture'],
  },
]

const statusDefinitions: { status: ProjectStatus; description: string }[] = [
  { status: 'Active', description: 'Currently being written, designed, built, edited, prepared, or reviewed.' },
  { status: 'Needs Assets', description: 'Waiting on footage, photos, links, logos, copy, approvals, or source material.' },
  { status: 'Needs Review', description: 'Ready for feedback, revision, approval, or next-step decision.' },
  { status: 'MVP Preview', description: 'A live prototype or preview link exists and should be reviewed.' },
  { status: 'Reference', description: 'Not currently active, but important to the relationship map or future project direction.' },
  { status: 'Delivered', description: 'Completed or substantially delivered, but still useful as proof of execution.' },
  { status: 'Expansion Opportunity', description: 'A project that could become a larger platform, campaign, product, or monetization lane.' },
]

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

function StatusPill({ status }: { status: ProjectStatus }) {
  const statusColors: Record<ProjectStatus, string> = {
    Active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'Needs Assets': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'Needs Review': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'MVP Preview': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    Reference: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
    Delivered: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    'Expansion Opportunity': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  }

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[status]}`}>
      {status}
    </span>
  )
}

function PriorityPill({ priority }: { priority: Priority }) {
  const priorityColors: Record<Priority, string> = {
    High: 'bg-red-500/20 text-red-400 border-red-500/30',
    Medium: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    Low: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
  }

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${priorityColors[priority]}`}>
      {priority}
    </span>
  )
}

function ProjectCard({ project, onEdit }: { project: Project; onEdit: (project: Project) => void }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm transition-all hover:border-red-500/30 hover:bg-zinc-900">
      {/* Red accent line */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-red-500 to-red-600/50" />

      <div className="p-5 pl-6">
        {/* Header */}
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-white">{project.title}</h3>
            <p className="text-xs text-zinc-500">{project.lane}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onEdit(project)}
              className="rounded-lg bg-zinc-800 p-1.5 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
              title="Edit project"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <PriorityPill priority={project.priority} />
            <StatusPill status={project.status} />
          </div>
        </div>

        {/* Type tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.type.map((t) => (
            <span key={t} className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
              {t}
            </span>
          ))}
        </div>

        {/* Summary */}
        <p className="mb-4 text-sm leading-relaxed text-zinc-400">{project.summary}</p>

        {/* Expandable details */}
        {expanded && (
          <div className="mb-4 space-y-3 border-t border-zinc-800 pt-4">
            {project.currentNeed && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-red-400">Current Need</p>
                <p className="mt-1 text-sm text-zinc-300">{project.currentNeed}</p>
              </div>
            )}
            {project.nextAction && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-red-400">Next Action</p>
                <p className="mt-1 text-sm text-zinc-300">{project.nextAction}</p>
              </div>
            )}
            {project.assetsNeeded && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-red-400">Assets Needed</p>
                <p className="mt-1 text-sm text-zinc-300">{project.assetsNeeded}</p>
              </div>
            )}
            {project.notes && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Notes</p>
                <p className="mt-1 text-sm italic text-zinc-500">{project.notes}</p>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {project.previewUrl && (
            <a
              href={project.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20"
            >
              Open Preview
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
          >
            {expanded ? 'Hide Details' : 'View Details'}
            <ChevronRight className={`h-3 w-3 transition-transform ${expanded ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// EDIT MODAL COMPONENT
// ============================================================================

interface EditModalProps {
  project: Project
  onClose: () => void
  onSave: (project: Project, pin: string) => Promise<void>
}

function EditModal({ project, onClose, onSave }: EditModalProps) {
  const [formData, setFormData] = useState<Project>({ ...project })
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (field: keyof Project, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    if (!pin) {
      setPinError('PIN is required.')
      return
    }
    setPinError('')
    setIsSaving(true)
    // PIN is sent to server for validation - not validated client-side
    await onSave(formData, pin)
    setIsSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg bg-zinc-800 p-2 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
          title="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6 border-b border-zinc-800 pb-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-red-500">
            DXA INDEX EDITOR
          </p>
          <h2 className="text-2xl font-bold text-white">Edit Project Card</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Update the live internal card without changing the page design or pushing code.
          </p>
        </div>

        {/* Form */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Title */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Lane */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Lane
            </label>
            <input
              type="text"
              value={formData.lane}
              onChange={(e) => handleChange('lane', e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
            >
              <option value="Active">Active</option>
              <option value="Needs Assets">Needs Assets</option>
              <option value="Needs Review">Needs Review</option>
              <option value="MVP Preview">MVP Preview</option>
              <option value="Reference">Reference</option>
              <option value="Delivered">Delivered</option>
              <option value="Expansion Opportunity">Expansion Opportunity</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Tags / Type */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Tags / Type
            </label>
            <input
              type="text"
              value={formData.type.join(', ')}
              onChange={(e) => handleChange('type', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))}
              placeholder="Campaign, Website, Music"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Preview URL */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Preview URL
            </label>
            <input
              type="text"
              value={formData.previewUrl}
              onChange={(e) => handleChange('previewUrl', e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Summary */}
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Summary
            </label>
            <textarea
              value={formData.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Current Need */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Current Need
            </label>
            <textarea
              value={formData.currentNeed}
              onChange={(e) => handleChange('currentNeed', e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Next Action */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Next Action
            </label>
            <textarea
              value={formData.nextAction}
              onChange={(e) => handleChange('nextAction', e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Assets Needed */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Assets Needed
            </label>
            <textarea
              value={formData.assetsNeeded}
              onChange={(e) => handleChange('assetsNeeded', e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none"
            />
          </div>
        </div>

        {/* PIN + Save */}
        <div className="mt-6 border-t border-zinc-800 pt-6">
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              PIN Required to Save
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value)
                setPinError('')
              }}
              placeholder="Enter 4-digit PIN"
              className="w-full max-w-xs rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none"
            />
            {pinError && (
              <p className="mt-2 text-sm text-red-400">{pinError}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-full bg-red-600 px-8 hover:bg-red-700 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="rounded-full border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN CLIENT COMPONENT
// ============================================================================

interface DXAIndexClientProps {
  projects: Project[]
  queueTasks: QueueTask[]
}

export function DXAIndexClient({ projects: initialProjects, queueTasks: initialQueueTasks }: DXAIndexClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [queueTasks, setQueueTasks] = useState<QueueTask[]>(initialQueueTasks)
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const handleSave = async (updatedProject: Project, pin: string) => {
    try {
      const response = await fetch(`/api/dxa-projects/${updatedProject.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updatedProject, pin }),
      })

      if (response.status === 401) {
        throw new Error('Invalid PIN')
      }

      if (!response.ok) {
        throw new Error('Failed to update project')
      }

      // Update local state
      setProjects((prev) =>
        prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
      )
      setEditingProject(null)
    } catch (error) {
      console.error('[v0] Error saving project:', error)
      alert('Failed to save changes. Please try again.')
    }
  }

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true
    if (activeFilter === project.status) return true
    if (project.type.includes(activeFilter)) return true
    return false
  })

  const activeCount = projects.filter((p) => p.status === 'Active').length
  const mvpCount = projects.filter((p) => p.status === 'MVP Preview').length
  const referenceCount = projects.filter((p) => p.status === 'Reference').length

// Get MVP previews for the dedicated section
  const mvpPreviews = projects.filter((p) => p.status === 'MVP Preview' && p.previewUrl)

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* ================================================================== */}
      {/* HERO */}
      {/* ================================================================== */}
      <section className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left: Copy */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-red-500">
                IPXS INTERNAL PROJECT SYSTEM
              </p>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                DXA Index
              </h1>
              <p className="mb-3 text-lg text-zinc-400">
                Darion x Adrian live project map for active builds, referrals, campaign ideas, MVPs, artist assets, and reference opportunities.
              </p>
              <p className="mb-8 text-sm leading-relaxed text-zinc-500">
                The DXA Index gives IPXS a private operating view of the creative and business pipeline connected through Adrian Miller&apos;s network. This page tracks what is active, what is pending, what has been delivered, what needs assets, and what should remain in the reference file.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full bg-red-600 px-6 hover:bg-red-700">
                  <Link href="/contact">Request Update</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-zinc-700 text-zinc-300 hover:border-red-500 hover:text-white">
                  <Link href="/">Back to IPXS</Link>
                </Button>
              </div>
            </div>

            {/* Right: Live Index Snapshot */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">Live Index Snapshot</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center">
                  <p className="text-3xl font-bold text-emerald-400">{activeCount}</p>
                  <p className="mt-1 text-xs text-zinc-500">Active Projects</p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center">
                  <p className="text-3xl font-bold text-violet-400">{mvpCount}</p>
                  <p className="mt-1 text-xs text-zinc-500">MVP Previews</p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center">
                  <p className="text-3xl font-bold text-zinc-400">{referenceCount}</p>
                  <p className="mt-1 text-xs text-zinc-500">References</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
                <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-400" />
                <p className="text-xs text-red-300">
                  Internal use only. Do not share outside DXA collaboration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FILTER BAR */}
      {/* ================================================================== */}
      <section className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-red-500 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* PROJECT CARDS */}
      {/* ================================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {activeFilter === 'All' ? 'All Projects' : activeFilter}
            <span className="ml-2 text-sm font-normal text-zinc-500">({filteredProjects.length})</span>
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onEdit={setEditingProject} />
          ))}
        </div>
        {filteredProjects.length === 0 && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
            <p className="text-zinc-500">No projects match the selected filter.</p>
          </div>
        )}
      </section>

      {/* ================================================================== */}
      {/* PRIORITY LANES */}
      {/* ================================================================== */}
      <section className="border-t border-zinc-800 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <h2 className="mb-2 text-xl font-semibold text-white">Priority Lanes</h2>
          <p className="mb-8 text-sm text-zinc-500">Core categories that organize the DXA collaboration.</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {priorityLanes.map((lane) => (
              <div
                key={lane.title}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-red-500/30"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                  <lane.icon className="h-5 w-5 text-red-400" />
                </div>
                <h3 className="mb-2 font-semibold text-white">{lane.title}</h3>
                <p className="text-xs leading-relaxed text-zinc-500">{lane.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* LIVE MVP PREVIEW LINKS */}
      {/* ================================================================== */}
      {mvpPreviews.length > 0 && (
        <section className="border-t border-zinc-800">
          <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
            <div className="mb-2 flex items-center gap-2">
              <Zap className="h-5 w-5 text-violet-400" />
              <h2 className="text-xl font-semibold text-white">Live MVP Previews</h2>
            </div>
            <p className="mb-8 text-sm text-zinc-500">Active prototypes ready for review.</p>
            <div className="grid gap-4 md:grid-cols-2">
              {mvpPreviews.map((preview) => (
                <div
                  key={preview.id}
                  className="rounded-xl border border-violet-500/30 bg-violet-500/5 p-5"
                >
                  <h3 className="mb-2 font-semibold text-white">{preview.title}</h3>
                  <p className="mb-4 text-sm text-zinc-400">{preview.summary}</p>
                  <a
                    href={preview.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-violet-500/20 px-4 py-2 text-sm font-medium text-violet-300 transition-colors hover:bg-violet-500/30"
                  >
                    Open {preview.title} Preview
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/* REFERENCE ARCHIVE */}
      {/* ================================================================== */}
      <section className="border-t border-zinc-800 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <h2 className="mb-2 text-xl font-semibold text-white">Reference Archive</h2>
          <p className="mb-8 text-sm text-zinc-500">Supporting context and background material organized by category.</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {archiveBuckets.map((bucket) => (
              <div
                key={bucket.title}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
              >
                <h3 className="mb-3 text-sm font-semibold text-zinc-300">{bucket.title}</h3>
                <ul className="space-y-1.5">
                  {bucket.items.map((item) => (
                    <li key={item} className="text-xs text-zinc-500">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* STATUS KEY */}
      {/* ================================================================== */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <h2 className="mb-2 text-xl font-semibold text-white">Status Key</h2>
          <p className="mb-8 text-sm text-zinc-500">How project states are defined in the DXA Index.</p>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {statusDefinitions.map((def) => (
              <div key={def.status} className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <StatusPill status={def.status} />
                <p className="flex-1 text-xs leading-relaxed text-zinc-400">{def.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* ================================================================== */}
      {/* NEXT ACTIONS QUEUE */}
      {/* ================================================================== */}
      {queueTasks.length > 0 && (
        <section className="border-t border-zinc-800 bg-zinc-900/30">
          <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
            <h2 className="mb-2 text-xl font-semibold text-white">Next Actions Queue</h2>
            <p className="mb-8 text-sm text-zinc-500">Immediate priorities pulled from active projects.</p>
            <div className="space-y-2">
              {queueTasks.filter(t => t.status !== 'Done').map((task, idx) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                    task.status === 'Blocked' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-zinc-300">{task.task}</p>
                    <p className="text-xs text-zinc-500">{task.projectTitle} · {task.ownerType}</p>
                  </div>
                  {task.status === 'Blocked' && (
                    <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs text-yellow-400">Blocked</span>
                  )}
                  {task.status === 'In Progress' && (
                    <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs text-blue-400">In Progress</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/* FOOTER NOTICE */}
      {/* ================================================================== */}
      <section className="border-t border-red-500/30 bg-red-500/5">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
            <div>
              <p className="text-sm font-medium text-red-300">Internal Document</p>
              <p className="text-xs text-red-400/70">
                This page is for IPXS and Adrian Miller collaboration only. Do not distribute or share externally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* EDIT MODAL */}
      {/* ================================================================== */}
      {editingProject && (
        <EditModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
