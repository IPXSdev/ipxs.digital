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
    outcomeLine: 'Full campaign system for major label release including cover art and motion design for streaming and social.',
    deliverables: ['Chocolate Woman cover art', 'Motion animation package', 'Social rollout assets'],
    pipelineSteps: defaultPipeline,
    proofLinks: [
      { label: 'Deathrow Records', url: '#' },
      { label: 'Spotify', url: '#' },
      { label: 'Apple Music', url: '#' },
    ],
    media: [
      { id: 'chocolate-woman-cover', type: 'image', src: '/case-studies/charlibereal-deathrow-campaign/chocolate-woman-cover.jpg', poster: '/case-studies/charlibereal-deathrow-campaign/chocolate-woman-cover.jpg', alt: 'Chocolate Woman album cover featuring Statue of Liberty inspired artwork', caption: 'Primary cover art for Chocolate Woman single.', aspectRatio: 'square' },
      { id: 'chocolate-woman-motion', type: 'video', src: '/case-studies/charlibereal-deathrow-campaign/chocolate-woman-motion.mp4', poster: '/case-studies/charlibereal-deathrow-campaign/chocolate-woman-cover.jpg', alt: 'Chocolate Woman animated motion piece', caption: 'Motion animation for social and streaming placements.', aspectRatio: 'square' },
    ],
    credits: defaultCredits,
  },
  {
    id: 'charlibereal-together-treatment',
    slug: 'charlibereal-together-treatment',
    title: 'Together Animated Music Video Treatment',
    category: 'Motion and Social Ads',
    poster: '/case-studies/charlibereal-deathrow-campaign/together-video-treatment.png',
    cover: '/case-studies/charlibereal-deathrow-campaign/together-video-treatment.png',
    outcomeLine: 'Full animated music video treatment for CharliBereal featuring custom character design, storyboarding, and visual direction.',
    deliverables: ['Video treatment pitch deck', 'Custom character design', 'Character pose sheet', 'Visual style guide', 'Animation direction'],
    pipelineSteps: defaultPipeline,
    proofLinks: [
      { label: 'CharliBereal', url: '#' },
    ],
    media: [
      { id: 'together-treatment', type: 'image', src: '/case-studies/charlibereal-deathrow-campaign/together-video-treatment.png', poster: '/case-studies/charlibereal-deathrow-campaign/together-video-treatment.png', alt: 'Together animated video treatment concept with psychedelic visual style', caption: 'Video treatment pitch for Together animated music video.' },
      { id: 'character-sheet', type: 'image', src: '/case-studies/charlibereal-deathrow-campaign/charlibereal-character-sheet.png', poster: '/case-studies/charlibereal-deathrow-campaign/charlibereal-character-sheet.png', alt: 'CharliBereal character design sheet showing multiple poses', caption: 'Character design sheet for animated sequences.' },
    ],
    credits: defaultCredits,
  },

  {
    id: 'keith-collins-rugs',
    slug: 'keith-collins-rugs',
    title: 'Keith Collins Rugs',
    category: 'Commercials',
    poster: '/case-studies/keith-collins-rugs/posters/keith-collins-rugs-poster.jpg',
    cover: '/case-studies/keith-collins-rugs/posters/keith-collins-rugs-poster.jpg',
    outcomeLine: 'Over the top comedy commercial built from client supplied audio. A weekly national podcast spot that would be impossible to ignore.',
    deliverables: ['1 master commercial, widescreen', '1 master commercial, vertical cut for social', 'Export package optimized for podcast ad breaks', 'Thumbnail and still set for posting'],
    pipelineSteps: defaultPipeline,
    proofLinks: [{ label: 'Watch Commercial', url: '#' }],
    media: [
      { id: 'keith-collins-master', type: 'video', src: '/case-studies/keith-collins-rugs/video/keith-collins-rugs-master.mov', poster: '/case-studies/keith-collins-rugs/posters/keith-collins-rugs-poster.jpg', alt: 'Keith Collins Rugs master commercial', caption: 'Master commercial, widescreen edit.' },
      { id: 'keith-collins-ali', type: 'image', src: '/case-studies/keith-collins-rugs/stills/ali-rug.jpg', poster: '/case-studies/keith-collins-rugs/stills/ali-rug.jpg', alt: 'Muhammad Ali rug artwork', caption: 'The legend entrance: a rug moment framed like a heavyweight champion.' },
      { id: 'keith-collins-kobe', type: 'image', src: '/case-studies/keith-collins-rugs/stills/kobe-jersey-rug.jpg', poster: '/case-studies/keith-collins-rugs/stills/kobe-jersey-rug.jpg', alt: 'Kobe Bryant jersey rug artwork', caption: 'The hero product reveal: detailed close ups of the rug craft and texture.' },
      { id: 'keith-collins-flying', type: 'image', src: '/case-studies/keith-collins-rugs/stills/rugs-flying.jpg', poster: '/case-studies/keith-collins-rugs/stills/rugs-flying.jpg', alt: 'Rugs flying behind a speeding car', caption: 'The chaos beat: rugs flying behind a speeding car for maximum absurdity.' },
      { id: 'keith-collins-woman', type: 'image', src: '/case-studies/keith-collins-rugs/stills/woman-feeling-rug.jpg', poster: '/case-studies/keith-collins-rugs/stills/woman-feeling-rug.jpg', alt: 'Woman feeling textured rug', caption: 'The emotional punchline: a customer literally falling in love with a rug.' },
      { id: 'keith-collins-tiger', type: 'image', src: '/case-studies/keith-collins-rugs/stills/tiger-on-rug.jpg', poster: '/case-studies/keith-collins-rugs/stills/tiger-on-rug.jpg', alt: 'Tiger standing on rug in street', caption: 'The street spectacle: a tiger owning the runway on a rug in broad daylight.' },
      { id: 'keith-collins-lambo', type: 'image', src: '/case-studies/keith-collins-rugs/stills/lambo-rug-wrap.jpg', poster: '/case-studies/keith-collins-rugs/stills/lambo-rug-wrap.jpg', alt: 'Lamborghini wrapped in rug texture', caption: 'Visual language: cinematic lighting, bold framing, and exaggerated moments.' },
    ],
    credits: defaultCredits,
  },

  {
    id: 'pitch-decks',
    slug: 'pitch-decks',
    title: 'Pitch Deck Architecture',
    category: 'Pitch Deck Architecture',
    poster: '/case-studies/pitch-decks/covers/xia.jpg',
    cover: '/case-studies/pitch-decks/covers/xia.jpg',
    outcomeLine: 'Decks that raise capital and sell the vision. From story and positioning to investor ready structure, visuals, and delivery.',
    deliverables: ['Narrative and positioning', 'Copywriting and structure', 'Visual system and slide design', 'Asset direction', 'Pitch readiness'],
    pipelineSteps: defaultPipeline,
    proofLinks: [{ label: 'Book a Discovery Call', url: '/contact' }],
    media: [
      { id: 'larry-parkers-cover', type: 'image', src: '/case-studies/pitch-decks/covers/larry-parkers.jpg', poster: '/case-studies/pitch-decks/covers/larry-parkers.jpg', alt: 'Larry Parkers Diner documentary pitch deck cover', caption: 'Larry Parkers Diner Documentary Deck' },
      { id: 'xia-cover', type: 'image', src: '/case-studies/pitch-decks/covers/xia.jpg', poster: '/case-studies/pitch-decks/covers/xia.jpg', alt: 'xIa company pitch deck cover', caption: 'xIa Company Deck' },
      { id: 'let-the-record-cover', type: 'image', src: '/case-studies/pitch-decks/covers/let-the-record-play.png', poster: '/case-studies/pitch-decks/covers/let-the-record-play.png', alt: 'Let The Record Play podcast pitch deck cover', caption: 'Let The Record Play' },
      { id: 'dynamics-cover', type: 'image', src: '/case-studies/pitch-decks/covers/dynamics-multiverse.jpg', poster: '/case-studies/pitch-decks/covers/dynamics-multiverse.jpg', alt: 'The Dynamics Multiverse web3 pitch deck cover', caption: 'The Dynamics Multiverse' },
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
