'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, ArrowRight, ChevronRight, AlertCircle, Zap, Radio, Music, Globe, Film, Briefcase, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// ============================================================================
// DATA
// ============================================================================

type ProjectStatus = 'Active' | 'Needs Assets' | 'Needs Review' | 'MVP Preview' | 'Reference' | 'Delivered' | 'Expansion Opportunity'
type ProjectType = 'Live Show' | 'Website' | 'Music' | 'MVP Preview' | 'Campaign' | 'Video' | 'AI Assets' | 'Legacy' | 'Deck' | 'Documentary' | 'Brand' | 'Investor Materials' | 'Motion' | 'Platform' | 'Music Business' | 'AI'
type Priority = 'High' | 'Medium' | 'Low'

interface Project {
  id: string
  title: string
  lane: string
  status: ProjectStatus
  priority: Priority
  type: ProjectType[]
  previewUrl: string
  summary: string
  currentNeed: string
  nextAction: string
  assetsNeeded: string
  notes: string
}

const projects: Project[] = [
  {
    id: 'hss-feed',
    title: 'HSS Feed',
    lane: 'Live Show + Website MVP',
    status: 'Active',
    priority: 'High',
    type: ['Live Show', 'Website', 'Music', 'MVP Preview'],
    previewUrl: 'https://v0-hss-feed-landing-page.vercel.app/',
    summary: 'HSS Feed is a multi-platform live music review and entertainment show hosted by Adrian Miller. The page centralizes where to watch, where to submit music through Nero, and how the show works.',
    currentNeed: 'Polish landing page copy, platform links, submission flow, sponsor language, and visual structure.',
    nextAction: 'Prepare final v0 polish handoff after confirming official links, assets, and show branding.',
    assetsNeeded: 'Logo, host photos, guest photos, official social links, Nero submission link, episode clips, platform URLs.',
    notes: 'This project should remain in the active dashboard because it is a live show, platform hub, and recurring content engine.',
  },
  {
    id: 'dvi-travel',
    title: 'DVI Travel Hotline',
    lane: 'Campaign Site + Virtual Hotline',
    status: 'Active',
    priority: 'High',
    type: ['Campaign', 'Website', 'MVP Preview', 'Music'],
    previewUrl: 'https://v0-delicious-vinyl-mvp.vercel.app/',
    summary: 'DVI Travel is a comedic travel campaign and sweepstakes-style experience built around Delicious Vinyl Island, a virtual hotline, island music, cash prize messaging, and a trip-to-Jamaica hook.',
    currentNeed: 'Polish the MVP design, improve background patterns, refine Caribbean color direction, and prepare official rules / alternate entry handling.',
    nextAction: 'Create a more premium DVI Wireless virtual phone experience and refine the page into a campaign-ready MVP.',
    assetsNeeded: 'Official logos, sponsor names, hotline audio, campaign videos, Stripe links, legal copy, official rules, privacy and terms links.',
    notes: 'Keep this as an active MVP because it has a live preview and multiple expansion paths: virtual phone, Stripe, music playlist, sponsor system, and contest mechanics.',
  },
  {
    id: 'dkla',
    title: 'DKLA / Throw That Thang',
    lane: 'Music Campaign + Event Rollout',
    status: 'Active',
    priority: 'High',
    type: ['Campaign', 'Music', 'Video', 'AI Assets'],
    previewUrl: '',
    summary: 'A nostalgia-driven music campaign built around Wet \'n Wild memories, the Trendy era, LA party culture, dance crews, all-night jams, a pool party rollout, and the Throw That Thang release.',
    currentNeed: 'Campaign copy, carousel structure, Higgsfield prompts, teaser posts, and release rollout organization.',
    nextAction: 'Turn the Adrian brainstorm into a formal campaign calendar with post copy, captions, visuals, and asset status.',
    assetsNeeded: 'Video stills, final footage, pool party details, prize details, DKLA branding, social handles, confirmed release date.',
    notes: 'Do not mention DVI on this campaign page unless specifically approved. Treat DKLA as its own music campaign.',
  },
  {
    id: 'larry-parkers',
    title: 'Larry Parker\'s Diner',
    lane: 'Legacy Documentary + Brand Revival',
    status: 'Reference',
    priority: 'Medium',
    type: ['Legacy', 'Deck', 'Documentary', 'Brand'],
    previewUrl: '',
    summary: 'A documentary and brand revival project centered on Larry Parker\'s Diner as a cultural landmark tied to celebrity history, nightlife, food, television, music, and Los Angeles nostalgia.',
    currentNeed: 'Keep deck copy and collaboration concepts accessible for future updates.',
    nextAction: 'Use existing deck material as reference when creating partner-facing copy, merch ideas, and documentary pitch language.',
    assetsNeeded: 'Final PDF, archival photos, press references, menu references, collaboration target list, brand history notes.',
    notes: 'Use phrases like Where Fame Met Fries and The Hip Hop Shake Shop as headline-style hooks.',
  },
  {
    id: 'emory-capital',
    title: 'Emory Capital',
    lane: 'Investor-Facing Digital Build',
    status: 'Delivered',
    priority: 'Medium',
    type: ['Website', 'MVP Preview', 'Investor Materials'],
    previewUrl: '',
    summary: 'An institutional proof point showing IPXS capability in investor-facing web presentation, MVP architecture, financial brand polish, and executive-ready digital infrastructure.',
    currentNeed: 'Keep as a portfolio proof point and case-study reference.',
    nextAction: 'Add screenshots, live link, and a short case-study summary when ready.',
    assetsNeeded: 'Screenshots, approved live link, demo notes, client-safe summary.',
    notes: 'Use this project to support credibility for future investor-facing and executive-facing builds.',
  },
  {
    id: 'charlie-bereal',
    title: 'Charlie Bereal / Death Row-Connected Creative',
    lane: 'Music Visuals + Artist Campaign Assets',
    status: 'Reference',
    priority: 'Medium',
    type: ['Music', 'Campaign', 'Motion'],
    previewUrl: '',
    summary: 'Creative work and reference material tied to Charlie Bereal and Death Row-connected opportunities, including cover art, motion art, release visuals, and social campaign assets.',
    currentNeed: 'Separate completed creative assets from unresolved follow-up items.',
    nextAction: 'Organize artwork, motion assets, social links, payout notes, and approved public references.',
    assetsNeeded: 'Cover art, motion art, social post links, release links, payment notes, approved artist references.',
    notes: 'Keep this lane clean and organized because it is both a creative archive and a relationship reference.',
  },
  {
    id: 'xia',
    title: 'x|a / xIa Ecosystem',
    lane: 'Strategic Platform + Pitch Deck',
    status: 'Reference',
    priority: 'Medium',
    type: ['Deck', 'Platform', 'Music Business', 'AI'],
    previewUrl: '',
    summary: 'A strategic music and AI ecosystem lane connected to pitch deck work, management education, artist tools, and music business platform ideas.',
    currentNeed: 'Clarify which materials are public, internal, investor-facing, or reference-only.',
    nextAction: 'Sort references into pitch deck, platform copy, AI tools, and management education categories.',
    assetsNeeded: 'Decks, screenshots, notes, platform references, approved names, public-facing language.',
    notes: 'Use as a long-term reference lane for the Adrian Miller-connected platform and education ecosystem.',
  },
]

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

const mvpPreviews = [
  {
    title: 'HSS Feed Landing Page',
    description: 'Live show landing page for music submissions, platform links, episodes, and official show positioning.',
    url: 'https://v0-hss-feed-landing-page.vercel.app/',
    buttonText: 'Open HSS Feed Preview',
  },
  {
    title: 'DVI Travel Hotline MVP',
    description: 'Interactive campaign MVP for the DVI Travel Hotline, Jamaica trip hook, virtual hotline experience, playlist, and entry flow.',
    url: 'https://v0-delicious-vinyl-mvp.vercel.app/',
    buttonText: 'Open DVI Travel Preview',
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

const nextActions = [
  'Finalize HSS Feed official links and assets.',
  'Prepare polish handoff for the HSS Feed landing page.',
  'Refine DVI Travel design, background system, and virtual phone experience.',
  'Build DKLA campaign copy into a full rollout calendar.',
  'Create Higgsfield prompt sets for DKLA, HSS Feed, and DVI Travel assets.',
  'Organize Charlie Bereal creative assets and unresolved follow-up notes.',
  'Keep Larry Parker\'s Diner deck and copy available as a legacy reference.',
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

function ProjectCard({ project }: { project: Project }) {
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
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-red-400">Current Need</p>
              <p className="mt-1 text-sm text-zinc-300">{project.currentNeed}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-red-400">Next Action</p>
              <p className="mt-1 text-sm text-zinc-300">{project.nextAction}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-red-400">Assets Needed</p>
              <p className="mt-1 text-sm text-zinc-300">{project.assetsNeeded}</p>
            </div>
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
// MAIN PAGE
// ============================================================================

export default function DXAIndexPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true
    if (activeFilter === project.status) return true
    if (project.type.includes(activeFilter as ProjectType)) return true
    return false
  })

  const activeCount = projects.filter((p) => p.status === 'Active').length
  const mvpCount = projects.filter((p) => p.type.includes('MVP Preview')).length
  const referenceCount = projects.filter((p) => p.status === 'Reference').length

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
                The DXA Index gives IPXS a private operating view of the creative and business pipeline connected through Adrian Miller&apos;s network. This page tracks what is active, what is pending, what has been delivered, what needs assets, and what should remain in the reference archive for future campaigns, decks, platforms, and client opportunities.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full bg-red-600 px-6 text-white hover:bg-red-700">
                  <a href="#active-projects">
                    View Active Projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-zinc-700 bg-transparent text-white hover:bg-zinc-800">
                  <a href="#mvp-links">Open MVP Links</a>
                </Button>
              </div>
            </div>

            {/* Right: Snapshot stats */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Live Index Snapshot</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center">
                  <p className="text-3xl font-bold text-white">{activeCount}</p>
                  <p className="text-xs text-zinc-500">Active</p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center">
                  <p className="text-3xl font-bold text-white">{mvpCount}</p>
                  <p className="text-xs text-zinc-500">MVP Previews</p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center">
                  <p className="text-3xl font-bold text-white">{referenceCount}</p>
                  <p className="text-xs text-zinc-500">Reference</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                <Zap className="h-3 w-3 text-red-500" />
                <span>{projects.length} total projects tracked</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* INTERNAL NOTICE BAR */}
      {/* ================================================================== */}
      <div className="border-b border-red-500/20 bg-red-500/5">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:px-8">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
          <p className="text-sm text-red-400">
            <span className="font-semibold">Internal Use Only:</span> This page is hidden from the public navigation and exists for IPXS project updates, pipeline tracking, and Adrian Miller-connected project organization.
          </p>
        </div>
      </div>

      {/* ================================================================== */}
      {/* FILTER CONTROLS */}
      {/* ================================================================== */}
      <section className="border-b border-zinc-800 bg-zinc-950 py-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-2 text-lg font-semibold text-white">Navigate the Pipeline</h2>
          <p className="mb-4 text-sm text-zinc-500">Filter projects by status, discipline, project lane, or next action to quickly see what needs attention.</p>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeFilter === filter
                    ? 'border-red-500 bg-red-500/10 text-red-400'
                    : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* ACTIVE PROJECT DASHBOARD */}
      {/* ================================================================== */}
      <section id="active-projects" className="py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-2 text-2xl font-bold text-white">Active Project Dashboard</h2>
          <p className="mb-8 max-w-3xl text-sm text-zinc-500">
            Current projects and live opportunities connected to IPXS, Adrian Miller, and the broader referral pipeline. Each card should make the project status, current need, and next action clear at a glance.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          {filteredProjects.length === 0 && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
              <p className="text-zinc-500">No projects match the selected filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* ================================================================== */}
      {/* PRIORITY LANES */}
      {/* ================================================================== */}
      <section className="border-t border-zinc-800 bg-zinc-900/30 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-2 text-2xl font-bold text-white">Priority Lanes</h2>
          <p className="mb-8 max-w-3xl text-sm text-zinc-500">
            The DXA Index groups work by opportunity lane so active builds, reference projects, and future expansion paths stay organized.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {priorityLanes.map((lane) => (
              <div key={lane.title} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 backdrop-blur-sm transition-colors hover:border-zinc-700">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                  <lane.icon className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="mb-2 font-semibold text-white">{lane.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500">{lane.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* MVP PREVIEW LINKS */}
      {/* ================================================================== */}
      <section id="mvp-links" className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-2 text-2xl font-bold text-white">Live MVP Previews</h2>
          <p className="mb-8 max-w-3xl text-sm text-zinc-500">
            These previews are connected to active projects and should remain easy to access from the internal index.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {mvpPreviews.map((preview) => (
              <div key={preview.title} className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 transition-colors hover:border-red-500/30">
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 translate-y-[-50%] rounded-full bg-red-500/10 blur-3xl transition-opacity group-hover:opacity-100" />
                <h3 className="mb-2 text-lg font-semibold text-white">{preview.title}</h3>
                <p className="mb-4 text-sm text-zinc-500">{preview.description}</p>
                <a
                  href={preview.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                >
                  {preview.buttonText}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* REFERENCE ARCHIVE */}
      {/* ================================================================== */}
      <section className="border-t border-zinc-800 bg-zinc-900/30 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-2 text-2xl font-bold text-white">Reference Archive</h2>
          <p className="mb-8 max-w-3xl text-sm text-zinc-500">
            Not every item in the DXA Index is active. Some projects, names, brands, conversations, and cultural references are stored here because they may shape future copy, campaigns, decks, visuals, or partnership opportunities.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {archiveBuckets.map((bucket) => (
              <div key={bucket.title} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
                <h3 className="mb-3 font-semibold text-white">{bucket.title}</h3>
                <ul className="space-y-1.5">
                  {bucket.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-zinc-500">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-red-500" />
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
      <section className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-white">Status Key</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {statusDefinitions.map((def) => (
              <div key={def.status} className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <StatusPill status={def.status} />
                <p className="text-sm text-zinc-500">{def.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* NEXT ACTIONS QUEUE */}
      {/* ================================================================== */}
      <section className="border-t border-zinc-800 bg-zinc-900/30 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-2 text-2xl font-bold text-white">Next Actions Queue</h2>
          <p className="mb-6 max-w-3xl text-sm text-zinc-500">
            The DXA Index should always make the next move visible. These are the items that need action before the pipeline can move forward.
          </p>
          <div className="space-y-2">
            {nextActions.map((action, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs font-semibold text-red-500">
                  {i + 1}
                </span>
                <p className="text-sm text-zinc-300">{action}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FOOTER INTERNAL NOTE */}
      {/* ================================================================== */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <p className="text-sm text-zinc-500">
            DXA Index is an internal IPXS project tracking page for active work, referrals, references, MVP previews, and creative pipeline updates connected through the Darion x Adrian ecosystem.
          </p>
          <p className="mt-2 text-xs text-zinc-600">
            Hidden from public navigation. Direct access only.
          </p>
        </div>
      </footer>
    </div>
  )
}
