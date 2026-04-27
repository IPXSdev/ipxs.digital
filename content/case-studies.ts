export const caseStudyCategories = [
  'Music Release Systems',
  'Motion and Social Ads',
  'Commercials',
  'Pitch Deck Architecture',
  'Websites and MVP Platforms',
  'World Building',
  'Original IP',
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
  heroTagline?: string
  problem?: string
  approach?: string
  solution?: string
  deliverables: string[]
  pipeline?: string[]
  tools?: string[]
  results?: string[]
  pipelineSteps: PipelineStep[]
  proofLinks: ProofLink[]
  media: CaseStudyMedia[]
  credits: CaseStudyCredits
}

interface CaseStudyWorld {
  id: string
  number: '01' | '02' | '03' | '04' | '05' | '06' | '07'
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
    id: 'world-building',
    number: '06',
    title: 'World Building',
    outcome: 'Franchise-scale story universes engineered for expansion across film, series, games, and brand collaborations.',
  },

  {
    id: 'original-ip',
    number: '07',
    title: 'Original IP',
    outcome: 'Flagship in-house IP systems designed for narrative depth, repeatable releases, and monetization-ready growth.',
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
    outcomeLine: 'End to end Death Row release campaign including primary artwork, animated cover motion, and rollout assets tailored for streaming and social launch windows.',
    deliverables: ['Chocolate Woman cover art', 'Motion animation package', 'Social rollout assets'],
    pipelineSteps: defaultPipeline,
    proofLinks: [
      { label: 'Death Row Records', url: 'https://www.deathrowofficial.com/' },
      { label: 'Spotify', url: 'https://open.spotify.com/track/0M5ZTD5bzYadecfUQcQx8j' },
      { label: 'Apple Music', url: 'https://music.apple.com/us/album/chocolate-woman-single/1857721393' },
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
    outcomeLine: 'Animated music video treatment for Together with original character design, storyboard direction, and visual development prepared for production alignment.',
    deliverables: ['Video treatment pitch deck', 'Custom character design', 'Character pose sheet', 'Visual style guide', 'Animation direction'],
    pipelineSteps: defaultPipeline,
    proofLinks: [
      { label: 'Spotify', url: 'https://open.spotify.com/track/196CykfquyUe0B4zGkG2GZ' },
      { label: 'Apple Music', url: 'https://music.apple.com/us/album/together-single/1840887531' },
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
    outcomeLine: 'Over the top comedy commercial built from client supplied audio with AI-assisted production support from concepting through final cut delivery.',
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
    id: 'dynamics-multiverse',
    slug: 'dynamics-multiverse',
    title: 'The Dynamics Multiverse',
    category: 'World Building',
    poster: '/case-studies/dynamics-multiverse/cover.jpg',
    cover: '/case-studies/dynamics-multiverse/cover.jpg',
    outcomeLine: 'Built a scalable story bible and franchise framework designed to support generative lore, character arcs, and multi-format rollout.',
    heroTagline: 'A narrative universe engineered for collectibles, licensing, and screen-ready expansion.',
    problem: 'The goal was to establish a complete narrative foundation for a new IP that could live across multiple mediums without losing coherence. The world needed clear rules, a believable origin, and character and faction structure strong enough to support future scripts, visuals, collectibles, and licensing. It also needed a framework where new stories could be generated consistently while staying inside canon.',
    approach: 'I treated the universe like a production pipeline, not just a document. That meant building a canon backbone first, then mapping factions, characters, and story mechanics to future deliverables. The system was designed to be expandable, so future chapters, episodes, and collectible releases can be added without rewriting the foundation. The narrative structure was paired with rollout logic so each creative asset has a reason to exist in the world.',
    solution: 'The Dynamics Multiverse was developed as a structured story world with a defined creation myth and core conflict, a catalog of factions and character archetypes that can carry multiple storylines, a lore engine approach that supports generative expansion while protecting canon, and a franchise roadmap designed to connect narrative, collectibles, and cinematic execution.',
    deliverables: ['World Bible and Canon Foundation', 'Faction and Character Framework', 'Narrative Mechanics and Rules of the World', 'Franchise Expansion Blueprint', 'Release-ready story structure for future scripts and pitch assets'],
    pipeline: ['Discovery and tone alignment, define the promise of the world', 'Canon backbone, origin, rules, and constraints', 'Faction architecture and character archetypes', 'Conflict mapping, story engines, and episodic scalability', 'Franchise blueprint, how the world expands across formats', 'Packaging, editing, and presentation for future pitches and production teams'],
    tools: ['Story architecture and writing systems', 'Visual planning and layout tools for documentation', 'AI-assisted iteration where appropriate, with canon control'],
    results: ['Delivered a structured world building foundation built for expansion', 'Established clear canon rules to prevent drift across future chapters', 'Created a franchise-ready blueprint that can support decks, scripts, and production planning'],
    pipelineSteps: defaultPipeline,
    proofLinks: [
      { label: 'Book a Discovery Call', url: '/contact?subject=World%20Building%20Walkthrough' },
      { label: 'Request Full PDF', url: '/contact?subject=Request%20Dynamics%20Multiverse%20PDF' },
    ],
    media: [
      { id: 'dynamics-cover', type: 'image', src: '/case-studies/dynamics-multiverse/cover.jpg', poster: '/case-studies/dynamics-multiverse/cover.jpg', alt: 'The Ultraviolet Multiverse overview showing character portraits and cosmic visuals', caption: 'Franchise overview: 333 traits, 22 classifications, and a complete multiversal vernacular index.' },
      { id: 'dynamics-thysporinite', type: 'image', src: '/case-studies/dynamics-multiverse/still-01.png', poster: '/case-studies/dynamics-multiverse/still-01.png', alt: 'Dynamic Trait Class 1: Thysporinite 963, the rarest substance in the multiverse', caption: 'Trait Class 1: Thysporinite 963, the Elder DNA and rarest substance in the Multiverse.' },
      { id: 'dynamics-lux', type: 'image', src: '/case-studies/dynamics-multiverse/still-02.jpg', poster: '/case-studies/dynamics-multiverse/still-02.jpg', alt: 'Dynamic Trait Class 3: Lux, the light that Dynamic beings naturally produce', caption: 'Trait Class 3: Lux, the visual signifier of congenital powers in Dynamic beings.' },
      { id: 'dynamics-damu', type: 'image', src: '/case-studies/dynamics-multiverse/still-03.jpg', poster: '/case-studies/dynamics-multiverse/still-03.jpg', alt: 'Dynamic Trait Class 4: Damu, the blood of the galaxy and Divine Antibodies', caption: 'Trait Class 4: Damu, the Divine Antibodies unique to each galaxy.' },
      { id: 'dynamics-travel', type: 'image', src: '/case-studies/dynamics-multiverse/still-04.png', poster: '/case-studies/dynamics-multiverse/still-04.png', alt: 'Ultraviolet Trait Class 2: Mode of Travel with futuristic motorcycle', caption: 'Trait Class 2: Mode of Travel, featuring Multiversal conveyance and wormhole networks.' },
      { id: 'dynamics-galaxies', type: 'image', src: '/case-studies/dynamics-multiverse/still-05.png', poster: '/case-studies/dynamics-multiverse/still-05.png', alt: 'Dynamic Trait Class 7: Via Lactea, the 11 Primary Galaxies', caption: 'Trait Class 7: Via Lactea, the 11 Primary Galaxies home to 33 Dynamic Planets.' },
      { id: 'dynamics-lore', type: 'image', src: '/case-studies/dynamics-multiverse/still-06.png', poster: '/case-studies/dynamics-multiverse/still-06.png', alt: 'The Generative Lore system for interactive character backstory generation', caption: 'Generative Lore: the interactive character backstory system for community collaboration.' },
      { id: 'dynamics-character-1', type: 'image', src: '/case-studies/dynamics-multiverse/still-07.png', poster: '/case-studies/dynamics-multiverse/still-07.png', alt: 'Dynamic character with ornate armor and floral elements', caption: 'Character design: ornate armor systems with organic and metallic fusion.' },
      { id: 'dynamics-character-2', type: 'image', src: '/case-studies/dynamics-multiverse/still-08.png', poster: '/case-studies/dynamics-multiverse/still-08.png', alt: 'Dynamic character with floral chest armor', caption: 'Character design: botanical integration with advanced technology.' },
      { id: 'dynamics-character-3', type: 'image', src: '/case-studies/dynamics-multiverse/still-09.png', poster: '/case-studies/dynamics-multiverse/still-09.png', alt: 'Dynamic character with jeweled armor and celestial markings', caption: 'Character design: celestial markings and jeweled armor systems.' },
    ],
    credits: defaultCredits,
  },

  {
    id: 'prissy-vandross-original-ip',
    slug: 'prissy-vandross-original-ip',
    title: 'Pri$$y Vandro$$ Original IP System',
    category: 'Original IP',
    poster: '/case-studies/charlibereal-deathrow-campaign/together-cover.png',
    cover: '/case-studies/charlibereal-deathrow-campaign/together-cover.png',
    outcomeLine: 'Flagship Original IP built as a monetization-ready music universe with character systems, release pipeline, and visual album roadmap.',
    heroTagline: 'Character, lore, music, and campaign architecture designed as one scalable IP stack.',
    problem: 'Pri$$y Vandro$$ needed to launch as a complete world, not a single drop. The objective was to create a production-ready character identity, narrative backbone, and music workflow that could continuously generate release assets without losing voice consistency.',
    approach: 'IPXS built a cross-tool pipeline using Higgsfield for character creation, world-building systems for canon and storyline development, and a music workflow moving from Reason and Pro Tools composition into AI-assisted voice and style modeling. Every stage was structured for speed, repeatability, and quality control.',
    solution: 'Delivered a 7-song EP production pipeline, monetization-ready content architecture, press and campaign assets generated through AI-assisted workflows, and a visual album plan structured as one short-film style music video per song.',
    deliverables: ['Character system and style guide in Higgsfield', 'Lore engine and world-building canon', 'Reason and Pro Tools composition workflow', 'Suno voice and style model pipeline', '7-song EP release framework', 'Visual album roadmap with one short film style video per song', 'AI-assisted press and campaign asset package'],
    pipelineSteps: defaultPipeline,
    proofLinks: [
      { label: 'Live Experience', url: 'https://prissyv.space/' },
      { label: 'Start a Similar Build', url: '/contact?subject=Original%20IP%20System' },
    ],
    media: [
      { id: 'prissy-cover', type: 'image', src: '/case-studies/charlibereal-deathrow-campaign/together-cover.png', poster: '/case-studies/charlibereal-deathrow-campaign/together-cover.png', alt: 'Pri$$y Vandro$$ flagship original IP identity frame', caption: 'Core character identity and launch visual language.' },
      { id: 'prissy-treatment', type: 'image', src: '/case-studies/charlibereal-deathrow-campaign/together-video-treatment.png', poster: '/case-studies/charlibereal-deathrow-campaign/together-video-treatment.png', alt: 'Pri$$y Vandro$$ world and visual album planning board', caption: 'Visual album planning and world narrative mapping.' },
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
