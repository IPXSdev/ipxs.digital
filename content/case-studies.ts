export const caseStudyCategories = [
  'Music Release Systems',
  'Motion and Social Ads',
  'Commercials',
  'Pitch Deck Architecture',
  'Websites and MVP Platforms',
  'Institutional and Investor Systems',
] as const

export type CaseStudyCategory = (typeof caseStudyCategories)[number]

export interface PipelineStep {
  phase: 'Brief' | 'Strategy' | 'Production' | 'Delivery' | 'Distribution'
  description: string
}

export interface ProofLink {
  label: string
  url: string
}

export interface CaseStudyMedia {
  id: string
  type: 'image' | 'video'
  src: string | null
  poster: string | null
  alt: string
  caption: string
}

export interface CaseStudyCredits {
  studio: 'Powered by ipxs.digital'
  lead: 'Darion R. Harris (LightGod)'
}

export interface CaseStudy {
  id: string
  slug: string
  title: string
  category: CaseStudyCategory
  poster: string
  cover: string
  outcomeLine: string
  deliverables: string[]
  pipelineSteps: PipelineStep[]
  proofLinks: ProofLink[]
  media: CaseStudyMedia[]
  credits: CaseStudyCredits
}

interface CaseStudyWorld {
  id: string
  number: '01' | '02' | '03' | '04' | '05' | '06'
  title: CaseStudyCategory
  outcome: string
}

const defaultPipeline: PipelineStep[] = [
  { phase: 'Brief', description: 'Aligned goals, audience, and launch constraints with the client team.' },
  { phase: 'Strategy', description: 'Built positioning, narrative arc, and rollout map for every channel.' },
  { phase: 'Production', description: 'Designed and produced creative assets with platform-native variants.' },
  { phase: 'Delivery', description: 'Packaged final outputs with clear specs and handoff documentation.' },
  { phase: 'Distribution', description: 'Deployed across channels and supported launch optimization.' },
]

const defaultCredits: CaseStudyCredits = {
  studio: 'Powered by ipxs.digital',
  lead: 'Darion R. Harris (LightGod)',
}

export const caseStudyWorlds: CaseStudyWorld[] = [
  {
    id: 'music-release-systems',
    number: '01',
    title: 'Music Release Systems',
    outcome: 'Complete visual ecosystems that turn releases into moments with cultural gravity.',
  },
  {
    id: 'motion-social-ads',
    number: '02',
    title: 'Motion and Social Ads',
    outcome: 'Scroll-stopping motion campaigns engineered for sustained engagement and reach.',
  },
  {
    id: 'commercials',
    number: '03',
    title: 'Commercials',
    outcome: 'Narrative-driven spots that strengthen brand recall and improve campaign lift.',
  },
  {
    id: 'pitch-deck-architecture',
    number: '04',
    title: 'Pitch Deck Architecture',
    outcome: 'Investor-ready decks with story logic and visual authority built to close.',
  },
  {
    id: 'websites-mvp-platforms',
    number: '05',
    title: 'Websites and MVP Platforms',
    outcome: 'Digital platforms that connect brand expression to measurable conversion.',
  },
  {
    id: 'institutional-investor-systems',
    number: '06',
    title: 'Institutional and Investor Systems',
    outcome: 'Board-ready systems for reporting, governance, and investor communication.',
  },
]

export const caseStudies: CaseStudy[] = [
  {
    id: 'atlas-debut-release-system',
    slug: 'atlas-debut-release-system',
    title: 'Atlas Debut Release System',
    category: 'Music Release Systems',
    poster: '/case-studies/atlas-debut-release-system/poster.svg',
    cover: '/case-studies/atlas-debut-release-system/cover.svg',
    outcomeLine: 'Unified visual rollout that supported a breakout release window with consistent platform execution.',
    deliverables: ['Cover art suite', 'Visualizer cutdowns', 'Social rollout templates', 'Release calendar kit'],
    pipelineSteps: defaultPipeline,
    proofLinks: [
      { label: 'Spotify', url: '#' },
      { label: 'Apple Music', url: '#' },
      { label: 'YouTube', url: '#' },
    ],
    media: [
      { id: 'atlas-cover', type: 'image', src: '/case-studies/atlas-debut-release-system/cover.svg', poster: '/case-studies/atlas-debut-release-system/poster.svg', alt: 'Atlas cover art concept', caption: 'Primary cover direction for launch week.' },
      { id: 'atlas-visualizer', type: 'video', src: null, poster: '/case-studies/atlas-debut-release-system/poster.svg', alt: 'Atlas visualizer preview', caption: 'Visualizer treatment for social and streaming placements.' },
    ],
    credits: defaultCredits,
  },
  {
    id: 'northstar-tour-motion-campaign',
    slug: 'northstar-tour-motion-campaign',
    title: 'Northstar Tour Motion Campaign',
    category: 'Motion and Social Ads',
    poster: '/case-studies/northstar-tour-motion-campaign/poster.svg',
    cover: '/case-studies/northstar-tour-motion-campaign/cover.svg',
    outcomeLine: 'Cross-platform campaign package that increased ticket intent through short-form creative sequencing.',
    deliverables: ['Motion ad set', 'Story edits', 'Countdown package', 'Retargeting variants'],
    pipelineSteps: defaultPipeline,
    proofLinks: [
      { label: 'Instagram', url: '#' },
      { label: 'TikTok', url: '#' },
    ],
    media: [
      { id: 'northstar-trailer', type: 'video', src: null, poster: '/case-studies/northstar-tour-motion-campaign/poster.svg', alt: 'Northstar campaign trailer', caption: 'Click to play campaign trailer cut.' },
      { id: 'northstar-grid', type: 'image', src: '/case-studies/northstar-tour-motion-campaign/cover.svg', poster: '/case-studies/northstar-tour-motion-campaign/poster.svg', alt: 'Northstar ad grid', caption: 'Social ad variants for launch phase.' },
    ],
    credits: defaultCredits,
  },
  {
    id: 'pulse-brand-commercial',
    slug: 'pulse-brand-commercial',
    title: 'Pulse Brand Commercial',
    category: 'Commercials',
    poster: '/case-studies/pulse-brand-commercial/poster.svg',
    cover: '/case-studies/pulse-brand-commercial/cover.svg',
    outcomeLine: 'Hero commercial and cutdowns that clarified product value while preserving premium brand tone.',
    deliverables: ['60-second hero spot', '15-second cutdowns', 'Platform safe-title versions'],
    pipelineSteps: defaultPipeline,
    proofLinks: [{ label: 'YouTube', url: '#' }],
    media: [
      { id: 'pulse-hero', type: 'video', src: null, poster: '/case-studies/pulse-brand-commercial/poster.svg', alt: 'Pulse hero commercial', caption: 'Main commercial edit, click to play.' },
      { id: 'pulse-stills', type: 'image', src: '/case-studies/pulse-brand-commercial/cover.svg', poster: '/case-studies/pulse-brand-commercial/poster.svg', alt: 'Pulse still frames', caption: 'Stills from narrative and product sequences.' },
    ],
    credits: defaultCredits,
  },
  {
    id: 'aurora-series-a-deck',
    slug: 'aurora-series-a-deck',
    title: 'Aurora Series A Deck System',
    category: 'Pitch Deck Architecture',
    poster: '/case-studies/aurora-series-a-deck/poster.svg',
    cover: '/case-studies/aurora-series-a-deck/cover.svg',
    outcomeLine: 'Structured investor narrative and visual system for a high-stakes raise process.',
    deliverables: ['Core investor deck', 'Data room narrative map', 'Partner Q and A support slides'],
    pipelineSteps: defaultPipeline,
    proofLinks: [{ label: 'Executive Summary', url: '#' }],
    media: [
      { id: 'aurora-deck', type: 'image', src: '/case-studies/aurora-series-a-deck/cover.svg', poster: '/case-studies/aurora-series-a-deck/poster.svg', alt: 'Aurora deck spread', caption: 'Selected story architecture and visual language slides.' },
    ],
    credits: defaultCredits,
  },
  {
    id: 'nova-artist-platform',
    slug: 'nova-artist-platform',
    title: 'Nova Artist Platform MVP',
    category: 'Websites and MVP Platforms',
    poster: '/case-studies/nova-artist-platform/poster.svg',
    cover: '/case-studies/nova-artist-platform/cover.svg',
    outcomeLine: 'Launch-ready web platform unifying brand story, music discovery, and conversion pathways.',
    deliverables: ['Experience map', 'MVP frontend', 'CMS content model', 'Analytics instrumentation'],
    pipelineSteps: defaultPipeline,
    proofLinks: [{ label: 'Live Site', url: '#' }],
    media: [
      { id: 'nova-home', type: 'image', src: '/case-studies/nova-artist-platform/cover.svg', poster: '/case-studies/nova-artist-platform/poster.svg', alt: 'Nova platform homepage', caption: 'Homepage and release hub modules.' },
      { id: 'nova-demo', type: 'video', src: null, poster: '/case-studies/nova-artist-platform/poster.svg', alt: 'Nova platform demo', caption: 'Guided walkthrough of key MVP flows.' },
    ],
    credits: defaultCredits,
  },
  {
    id: 'lumen-investor-portal',
    slug: 'lumen-investor-portal',
    title: 'Lumen Investor Portal',
    category: 'Institutional and Investor Systems',
    poster: '/case-studies/lumen-investor-portal/poster.svg',
    cover: '/case-studies/lumen-investor-portal/cover.svg',
    outcomeLine: 'Secure reporting and communication interface for recurring investor updates and governance workflows.',
    deliverables: ['Portal information architecture', 'Reporting templates', 'Access control UX', 'Quarterly update modules'],
    pipelineSteps: defaultPipeline,
    proofLinks: [{ label: 'Portal Preview', url: '#' }],
    media: [
      { id: 'lumen-dashboard', type: 'image', src: '/case-studies/lumen-investor-portal/cover.svg', poster: '/case-studies/lumen-investor-portal/poster.svg', alt: 'Lumen dashboard', caption: 'Portfolio and performance dashboard states.' },
    ],
    credits: defaultCredits,
  },
]

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug)
}

export function getWorldsWithCaseStudies() {
  return caseStudyWorlds.map((world) => ({
    ...world,
    caseStudies: caseStudies
      .filter((caseStudy) => caseStudy.category === world.title)
      .map((caseStudy) => ({
        id: caseStudy.id,
        slug: caseStudy.slug,
        title: caseStudy.title,
        category: caseStudy.category,
        poster: caseStudy.poster,
        outcome: caseStudy.outcomeLine,
      })),
  }))
}
