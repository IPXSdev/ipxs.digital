'use client'

import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, ArrowRight, ExternalLink, Plus, Zap } from 'lucide-react'
import { DxaQueueSection } from '@/components/dxa-index/dxa-queue-section'
import { ProjectCard } from '@/components/dxa-index/project-card'
import { ProjectEditorModal } from '@/components/dxa-index/project-editor-modal'
import { Button } from '@/components/ui/button'
import { DKLA_CAMPAIGN_MVP_URL, type DxaProject } from '@/lib/dxa-projects'

const filterOptions = ['All', 'Active', 'Needs Assets', 'Needs Review', 'MVP Preview', 'Reference', 'Delivered', 'Completed', 'Campaign', 'Website', 'Music', 'Live Show', 'Legacy', 'AI Assets']

const priorityLanes = [
  ['Live Shows + Broadcast Systems', 'HSS Feed and future live entertainment formats that require landing pages, submission flows, platform links, OBS direction, clipping systems, and post-production organization.'],
  ['Music Campaigns + Artist Assets', 'Artist rollouts, singles, visualizers, music videos, motion art, cover art, social assets, and release strategy connected to Adrian’s music network.'],
  ['Campaign MVPs + Interactive Experiences', 'Fast-moving digital experiences like DVI Travel, virtual phone systems, sweepstakes pages, fan engagement mechanics, and branded entertainment activations.'],
  ['Legacy + Documentary Projects', 'Cultural history, archival storytelling, documentary pitch decks, nostalgic brand revivals, and projects that convert legacy into future-facing media opportunities.'],
  ['Investor + Executive Digital Builds', 'High-polish websites, MVPs, demo portals, decks, and digital presentation systems for finance, entertainment, and executive-facing clients.'],
  ['AI-Native Asset Production', 'Higgsfield prompts, Suno concepts, v0 pages, Codex handoffs, AI artist infrastructure, synthetic campaign assets, and IPXS production systems.'],
]

const mvpPreviews = [
  ['HSS Feed Landing Page', 'Live show landing page for music submissions, platform links, episodes, and official show positioning.', 'https://v0-hss-feed-landing-page.vercel.app/', 'Open HSS Feed Preview'],
  ['DVI Travel Hotline MVP', 'Interactive campaign MVP for the DVI Travel Hotline, Jamaica trip hook, virtual hotline experience, playlist, and entry flow.', 'https://v0-delicious-vinyl-mvp.vercel.app/', 'Open DVI Travel Preview'],
  ['DKLA / Throw That Thang Campaign', 'MVP campaign site for the DKLA Throw That Thang rollout, campaign framing, release energy, and event-driven marketing push.', DKLA_CAMPAIGN_MVP_URL, 'Open DKLA Campaign Preview'],
]

const archiveBuckets = [
  ['Adrian Miller Network', ['Artist relationships', 'Executive references', 'Music business strategy', 'Roster history', 'Platform concepts', 'Referral opportunities']],
  ['Brand + Label References', ['Death Row Records', 'Delicious Vinyl Island', 'x|a / xIa', 'Xyion', 'Emory Capital', 'Larry Parker’s Diner']],
  ['Creative Asset References', ['Decks', 'Prompts', 'Campaign copy', 'Video stills', 'Motion art', 'Landing pages', 'Social posts', 'Reference images']],
  ['Campaign Reference Material', ['Wet ’n Wild', 'The Trendy Era', 'Uncle Jamm’s Army', 'Dance crews', 'Pool party rollout', 'Golden Ticket giveaway', 'LA party culture']],
] as const

const statusDefinitions = [
  ['Active', 'Currently being written, designed, built, edited, prepared, or reviewed.'],
  ['Needs Assets', 'Waiting on footage, photos, links, logos, copy, approvals, or source material.'],
  ['Needs Review', 'Ready for feedback, revision, approval, or next-step decision.'],
  ['MVP Preview', 'A live prototype or preview link exists and should be reviewed.'],
  ['Reference', 'Not currently active, but important to the relationship map or future project direction.'],
  ['Delivered', 'Completed or substantially delivered, but still useful as proof of execution.'],
  ['Completed', 'Completed and archived in the active operating history.'],
  ['Expansion Opportunity', 'A project that could become a larger platform, campaign, product, or monetization lane.'],
]

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

function hydrateCanonicalProjectLinks(projects: DxaProject[]) {
  return projects.map((project) => {
    const title = project.title?.toLowerCase() || ''
    const isDkla = title.includes('dkla') || title.includes('throw that thang')

    if (!isDkla) return project

    const type = project.type?.includes('MVP Preview') ? project.type : [...(project.type || []), 'MVP Preview']
    return {
      ...project,
      preview_url: project.preview_url || DKLA_CAMPAIGN_MVP_URL,
      type,
    }
  })
}

export function DxaIndexDashboard() {
  const [projects, setProjects] = useState<DxaProject[]>([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [warning, setWarning] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<DxaProject | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  async function loadProjects() {
    setIsLoading(true)
    try {
      const response = await fetch('/api/dxa-projects', { cache: 'no-store' })
      const data = await response.json()
      setProjects(hydrateCanonicalProjectLinks(data.projects || []))
      setWarning(data.warning || '')
    } catch {
      setWarning('DXA project data could not be loaded. Check the API connection.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { loadProjects() }, [])

  const filteredProjects = useMemo(() => projects.filter((project) => activeFilter === 'All' || project.status === activeFilter || project.type?.includes(activeFilter)), [activeFilter, projects])
  const activeCount = projects.filter((project) => project.status === 'Active').length
  const mvpCount = projects.filter((project) => project.type?.includes('MVP Preview') || project.status === 'MVP Preview').length
  const referenceCount = projects.filter((project) => project.status === 'Reference').length

  async function markCompleted(project: DxaProject) {
    const pin = window.prompt('Enter PIN to mark completed:')
    if (!pin) return
    const response = await fetch(`/api/dxa-projects/${project.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'Completed', pin }) })
    if (!response.ok) { window.alert('Invalid PIN. Update not saved.'); return }
    loadProjects()
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
        <div className="absolute right-0 top-0 h-80 w-80 translate-x-1/3 -translate-y-1/3 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-red-500">IPXS INTERNAL PROJECT SYSTEM</p>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">DXA Index</h1>
              <p className="mb-3 text-lg text-zinc-400">Darion x Adrian live project map for active builds, referrals, campaign ideas, MVPs, artist assets, and reference opportunities.</p>
              <p className="mb-8 text-sm leading-relaxed text-zinc-500">The DXA Index gives IPXS a private operating view of the creative and business pipeline connected through Adrian Miller’s network. This page tracks what is active, what is pending, what has been delivered, what needs assets, and what should remain in the reference archive for future campaigns, decks, platforms, and client opportunities.</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full bg-red-600 px-6 text-white hover:bg-red-700"><a href="#active-projects">View Active Projects<ArrowRight className="ml-2 h-4 w-4" /></a></Button>
                <Button asChild variant="outline" className="rounded-full border-zinc-700 bg-transparent text-white hover:bg-zinc-800"><a href="#next-actions">View Next Queue</a></Button>
                <Button asChild variant="outline" className="rounded-full border-zinc-700 bg-transparent text-white hover:bg-zinc-800"><a href="#mvp-links">Open MVP Links</a></Button>
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Live Index Snapshot</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center"><p className="text-3xl font-bold text-white">{activeCount}</p><p className="text-xs text-zinc-500">Active</p></div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center"><p className="text-3xl font-bold text-white">{mvpCount}</p><p className="text-xs text-zinc-500">MVP Previews</p></div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center"><p className="text-3xl font-bold text-white">{referenceCount}</p><p className="text-xs text-zinc-500">Reference</p></div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500"><Zap className="h-3 w-3 text-red-500" /><span>{projects.length} total projects tracked</span></div>
            </div>
          </div>
        </div>
      </section>

      {warning ? <Notice color="amber" text={warning} /> : null}
      <Notice color="red" text="Internal Use Only: Hidden from public navigation for IPXS project updates, pipeline tracking, and Adrian Miller-connected project organization." />

      <section className="border-b border-zinc-800 bg-zinc-950 py-8"><div className="mx-auto max-w-7xl px-4 lg:px-8"><h2 className="mb-2 text-lg font-semibold text-white">Navigate the Pipeline</h2><p className="mb-4 text-sm text-zinc-500">Filter projects by status, discipline, project lane, or next action to quickly see what needs attention.</p><div className="flex flex-wrap gap-2">{filterOptions.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${activeFilter === filter ? 'border-red-500 bg-red-500/10 text-red-400' : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:text-white'}`}>{filter}</button>)}</div></div></section>

      <DxaQueueSection />

      <section id="active-projects" className="py-12"><div className="mx-auto max-w-7xl px-4 lg:px-8"><div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="mb-2 text-2xl font-bold text-white">Active Project Dashboard</h2><p className="max-w-3xl text-sm text-zinc-500">Current projects and live opportunities connected to IPXS, Adrian Miller, and the broader referral pipeline. Each card should make the project status, current need, and next action clear at a glance.</p></div><button onClick={() => { setSelectedProject(null); setIsModalOpen(true) }} className="inline-flex items-center justify-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20"><Plus className="h-4 w-4" />Add New Project</button></div><div className="grid gap-4 md:grid-cols-2">{filteredProjects.map((project) => <ProjectCard key={project.id} project={project} onEdit={(p) => { setSelectedProject(p); setIsModalOpen(true) }} onComplete={markCompleted} />)}</div>{!isLoading && filteredProjects.length === 0 ? <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center"><p className="text-zinc-500">No projects match the selected filter.</p></div> : null}</div></section>

      <InfoGrid title="Priority Lanes" description="The DXA Index groups work by opportunity lane so active builds, reference projects, and future expansion paths stay organized." items={priorityLanes} />
      <MvpSection />
      <ArchiveSection />
      <StatusKey />
      <footer className="border-t border-zinc-800 py-8"><div className="mx-auto max-w-7xl px-4 text-center lg:px-8"><p className="text-sm text-zinc-500">DXA Index is an internal IPXS project tracking page for active work, referrals, references, MVP previews, and creative pipeline updates connected through the Darion x Adrian ecosystem.</p><p className="mt-2 text-xs text-zinc-600">Hidden from public navigation. Direct access only.</p></div></footer>
      <ProjectEditorModal key={selectedProject?.id || 'new-project'} project={selectedProject} open={isModalOpen} onClose={() => setIsModalOpen(false)} onSaved={loadProjects} />
    </div>
  )
}

function Notice({ color, text }: { color: 'red' | 'amber'; text: string }) {
  const cls = color === 'red' ? 'border-red-500/20 bg-red-500/5 text-red-400' : 'border-amber-500/20 bg-amber-500/5 text-amber-200'
  return <div className={`border-b ${cls}`}><div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:px-8"><AlertCircle className="h-4 w-4 shrink-0" /><p className="text-sm">{text}</p></div></div>
}

function InfoGrid({ title, description, items }: { title: string; description: string; items: string[][] }) {
  return <section className="border-t border-zinc-800 bg-zinc-900/30 py-12"><div className="mx-auto max-w-7xl px-4 lg:px-8"><h2 className="mb-2 text-2xl font-bold text-white">{title}</h2><p className="mb-8 max-w-3xl text-sm text-zinc-500">{description}</p><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map(([itemTitle, itemDescription]) => <div key={itemTitle} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 backdrop-blur-sm transition-colors hover:border-zinc-700"><div className="mb-3 h-10 w-10 rounded-lg bg-red-500/10" /><h3 className="mb-2 font-semibold text-white">{itemTitle}</h3><p className="text-sm leading-relaxed text-zinc-500">{itemDescription}</p></div>)}</div></div></section>
}

function MvpSection() { return <section id="mvp-links" className="border-t border-zinc-800 py-12"><div className="mx-auto max-w-7xl px-4 lg:px-8"><h2 className="mb-2 text-2xl font-bold text-white">Live MVP Previews</h2><p className="mb-8 max-w-3xl text-sm text-zinc-500">These previews are connected to active projects and should remain easy to access from the internal index.</p><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{mvpPreviews.map(([title, description, url, buttonText]) => <div key={title} className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 transition-colors hover:border-red-500/30"><div className="absolute right-0 top-0 h-32 w-32 translate-x-8 translate-y-[-50%] rounded-full bg-red-500/10 blur-3xl" /><h3 className="mb-2 text-lg font-semibold text-white">{title}</h3><p className="mb-4 text-sm text-zinc-500">{description}</p><a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700">{buttonText}<ExternalLink className="h-4 w-4" /></a></div>)}</div></div></section> }

function ArchiveSection() { return <section className="border-t border-zinc-800 bg-zinc-900/30 py-12"><div className="mx-auto max-w-7xl px-4 lg:px-8"><h2 className="mb-2 text-2xl font-bold text-white">Reference Archive</h2><p className="mb-8 max-w-3xl text-sm text-zinc-500">Not every item in the DXA Index is active. Some projects, names, brands, conversations, and cultural references are stored here because they may shape future copy, campaigns, decks, visuals, or partnership opportunities.</p><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{archiveBuckets.map(([title, items]) => <div key={title} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"><h3 className="mb-3 font-semibold text-white">{title}</h3><ul className="space-y-1.5">{items.map((item) => <li key={item} className="flex items-center gap-2 text-sm text-zinc-500"><span className="h-1 w-1 shrink-0 rounded-full bg-red-500" />{item}</li>)}</ul></div>)}</div></div></section> }

function StatusKey() { return <section className="border-t border-zinc-800 py-12"><div className="mx-auto max-w-7xl px-4 lg:px-8"><h2 className="mb-6 text-2xl font-bold text-white">Status Key</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{statusDefinitions.map(([status, description]) => <div key={status} className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"><StatusPill status={status} /><p className="text-sm text-zinc-500">{description}</p></div>)}</div></div></section> }
