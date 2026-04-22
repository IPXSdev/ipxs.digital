export const caseStudyCategories = [
  'Music Release Systems',
  'Motion and Social Ads',
  'Commercials',
  'Pitch Deck Architecture',
  'Websites and MVP Platforms',
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
  aspectRatio?: 'square' | 'video'
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
  number: '01' | '02' | '03' | '04' | '05'
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
]

export const caseStudies: CaseStudy[] = [
  {
    id: 'charlibereal-deathrow-campaign',
    slug: 'charlibereal-deathrow-campaign',
    title: 'CharliBereal x Deathrow Records Campaign',
    category: 'Music Release Systems',
    poster: '/case-studies/charlibereal-deathrow-campaign/chocolate-woman-cover.jpg',
    cover: '/case-studies/charlibereal-deathrow-campaign/chocolate-woman-cover.jpg',
    outcomeLine: 'Full campaign system for major label releases including cover art, motion design, and animated video treatments.',
    deliverables: ['Cover art suite (Chocolate Woman, Together)', 'Motion animation package', 'Character design and animation', 'Video treatment development', 'Social rollout assets'],
    pipelineSteps: defaultPipeline,
    proofLinks: [
      { label: 'Deathrow Records', url: '#' },
      { label: 'Spotify', url: '#' },
      { label: 'Apple Music', url: '#' },
    ],
    media: [
      { id: 'chocolate-woman-cover', type: 'image', src: '/case-studies/charlibereal-deathrow-campaign/chocolate-woman-cover.jpg', poster: '/case-studies/charlibereal-deathrow-campaign/chocolate-woman-cover.jpg', alt: 'Chocolate Woman album cover featuring Statue of Liberty inspired artwork', caption: 'Primary cover art for Chocolate Woman single.', aspectRatio: 'square' },
      { id: 'chocolate-woman-motion', type: 'video', src: '/case-studies/charlibereal-deathrow-campaign/chocolate-woman-motion.mp4', poster: '/case-studies/charlibereal-deathrow-campaign/chocolate-woman-cover.jpg', alt: 'Chocolate Woman animated motion piece', caption: 'Motion animation for social and streaming placements.', aspectRatio: 'square' },
      { id: 'together-treatment', type: 'image', src: '/case-studies/charlibereal-deathrow-campaign/together-video-treatment.png', poster: '/case-studies/charlibereal-deathrow-campaign/together-video-treatment.png', alt: 'Together animated video treatment concept', caption: 'Video treatment pitch for Together animated music video.' },
      { id: 'character-sheet', type: 'image', src: '/case-studies/charlibereal-deathrow-campaign/charlibereal-character-sheet.png', poster: '/case-studies/charlibereal-deathrow-campaign/charlibereal-character-sheet.png', alt: 'CharliBereal character design sheet showing multiple poses', caption: 'Character design sheet for animated sequences.' },
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
    id: 'emory-capital',
    slug: 'emory-capital',
    title: 'Emory Capital',
    category: 'Websites and MVP Platforms',
    poster: '/case-studies/emory-capital/hero.jpeg',
    cover: '/case-studies/emory-capital/hero.jpeg',
    outcomeLine: 'Private and Institutional Capital. Digitally Re-Engineered.',
    deliverables: ['Marketing website', 'Demo partner dashboard MVP', 'Copy creation', 'Asset creation'],
    pipelineSteps: defaultPipeline,
    proofLinks: [
      { label: 'Live Site', url: 'https://www.emorycapital.com/' },
      { label: 'Demo Dashboard', url: 'https://www.emorycapital.com/demoaccount' },
    ],
    media: [
      { id: 'emory-hero', type: 'image', src: '/case-studies/emory-capital/hero.jpeg', poster: '/case-studies/emory-capital/hero.jpeg', alt: 'Emory Capital brand materials featuring gold elephant logo on black leather', caption: 'Brand identity and premium collateral system.' },
      { id: 'emory-dashboard', type: 'image', src: '/case-studies/emory-capital/dashboard.png', poster: '/case-studies/emory-capital/dashboard.png', alt: 'Emory Capital partner dashboard showing portfolio overview, holdings, and performance chart', caption: 'Demo partner dashboard MVP with portfolio tracking, holdings, and activity feed.' },
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
