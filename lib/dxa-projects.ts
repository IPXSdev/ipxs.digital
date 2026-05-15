export const DXA_STATUSES = [
  'Active',
  'Needs Assets',
  'Needs Review',
  'MVP Preview',
  'Reference',
  'Delivered',
  'Completed',
  'Expansion Opportunity',
] as const

export const DXA_PRIORITIES = ['High', 'Medium', 'Low'] as const

export type DxaStatus = (typeof DXA_STATUSES)[number]
export type DxaPriority = (typeof DXA_PRIORITIES)[number]

export interface DxaProject {
  id: string
  title: string
  lane: string | null
  status: DxaStatus
  priority: DxaPriority | string
  type: string[]
  preview_url: string | null
  summary: string | null
  current_need: string | null
  next_action: string | null
  assets_needed: string | null
  notes: string | null
  is_pinned: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type DxaProjectInput = Partial<Omit<DxaProject, 'id' | 'created_at' | 'updated_at'>>

export const HSS_FEED_MVP_URL = 'https://v0-hss-feed-landing-page.vercel.app/'
export const DVI_TRAVEL_MVP_URL = 'https://v0-delicious-vinyl-mvp.vercel.app/'
export const DKLA_CAMPAIGN_MVP_URL = 'https://v0-dkla-campaign-site.vercel.app/'

export const DXA_SEED_PROJECTS: DxaProjectInput[] = [
  {
    title: 'HSS Feed',
    lane: 'Live Show + Website MVP',
    status: 'Active',
    priority: 'High',
    type: ['Live Show', 'Website', 'Music', 'MVP Preview'],
    preview_url: HSS_FEED_MVP_URL,
    summary:
      'HSS Feed is a multi-platform live music review and entertainment show hosted by Adrian Miller. The index tracks the live show hub, where viewers watch, where artists submit music, and how the recurring content engine is organized.',
    current_need:
      'Confirm final show assets, official social links, Nero submission link, episode clips, guest assets, sponsor language, and final landing-page polish needs.',
    next_action:
      'Prepare a final polish handoff for the HSS Feed landing page after all official links and assets are confirmed.',
    assets_needed:
      'Logo, host photos, guest photos, official social links, Nero submission link, episode clips, platform URLs, sponsor names, and show schedule confirmation.',
    notes:
      'Keep this active because it is both a live show and a recurring content engine tied to submissions, streaming, clipping, post-production, and platform growth.',
    is_pinned: true,
    sort_order: 10,
  },
  {
    title: 'DVI Travel Hotline',
    lane: 'Campaign Site + Virtual Hotline',
    status: 'Active',
    priority: 'High',
    type: ['Campaign', 'Website', 'MVP Preview', 'Music'],
    preview_url: DVI_TRAVEL_MVP_URL,
    summary:
      'DVI Travel is a comedic travel and contest-style campaign experience built around Delicious Vinyl Island, a simulated virtual hotline, Jamaica trip messaging, cash-prize energy, and sponsor-ready island entertainment.',
    current_need:
      'Polish the MVP design, improve the Caribbean pattern system, refine the DVI Wireless virtual phone experience, and prepare legal copy for official rules, privacy, and alternate entry handling.',
    next_action:
      'Create the next handoff for a more premium virtual phone flow with clear audio states, sponsor placement, Stripe or entry mechanics, and campaign-ready copy.',
    assets_needed:
      'Official logos, sponsor names, hotline audio, campaign videos, Stripe or payment flow details, official rules, privacy copy, terms copy, and final sponsor/partner language.',
    notes:
      'This remains active because it can expand into a virtual phone experience, music playlist, sponsor activation, sweepstakes flow, and recurring travel campaign mechanic.',
    is_pinned: true,
    sort_order: 20,
  },
  {
    title: 'DKLA / Throw That Thang',
    lane: 'Music Campaign + Event Rollout',
    status: 'Active',
    priority: 'High',
    type: ['Campaign', 'Music', 'AI Assets', 'MVP Preview'],
    preview_url: DKLA_CAMPAIGN_MVP_URL,
    summary:
      'A nostalgia-driven music campaign for DKLA’s Throw That Thang rollout. The campaign is built from Adrian’s brainstorm around Wet ’n Wild memories, the Trendy era, LA party culture, dance crews, all-night jams, a pool-party return, and a Golden Ticket giveaway.',
    current_need:
      'Turn the brainstorm into finished rollout copy, carousel structure, short-form captions, Higgsfield prompts, teaser assets, and a clear release-to-event campaign calendar.',
    next_action:
      'Build the formal campaign calendar and update the MVP with final footage, screen grabs, confirmed pool-party details, prize language, and DKLA branding.',
    assets_needed:
      'Final video footage, screen grabs, DKLA logo, social handles, release date, pool-party details, Golden Ticket details, Roosevelt Hotel references, and approved campaign captions.',
    notes:
      'Treat DKLA as its own campaign lane. Do not blend this with DVI unless specifically approved. Keep the MVP preview link connected for fast review.',
    is_pinned: true,
    sort_order: 30,
  },
  {
    title: "Larry Parker's Diner",
    lane: 'Legacy Documentary + Brand Revival',
    status: 'Reference',
    priority: 'Medium',
    type: ['Legacy', 'Deck', 'Documentary', 'Brand'],
    preview_url: null,
    summary:
      'A documentary and brand revival project centered on Larry Parker’s Diner as a Los Angeles cultural landmark where celebrity history, nightlife, food, television, music, and nostalgia intersect.',
    current_need:
      'Keep the documentary deck, collaboration language, brand revival framing, and archival references available for future pitch updates and partner-facing copy.',
    next_action:
      'Use the existing deck material when creating new partnership copy, merch concepts, documentary pitch language, and cultural legacy positioning.',
    assets_needed:
      'Final PDF, archival photos, press references, menu references, collaboration target list, brand history notes, and approved slogans or archival phrases.',
    notes:
      'Use phrases like Where Fame Met Fries and The Hip Hop Shake Shop as headline-style hooks when building future deck or campaign copy.',
    is_pinned: false,
    sort_order: 40,
  },
  {
    title: 'Emory Capital',
    lane: 'Investor-Facing Digital Build',
    status: 'Delivered',
    priority: 'Medium',
    type: ['Website', 'MVP Preview', 'Investor Materials'],
    preview_url: null,
    summary:
      'An investor-facing digital proof point showing IPXS capability in institutional web presentation, MVP architecture, executive polish, financial brand structure, and high-trust digital infrastructure.',
    current_need:
      'Keep this organized as a credibility marker and portfolio proof point for future investor-facing, finance, and executive digital builds.',
    next_action:
      'Add screenshots, approved links, demo notes, and a client-safe case-study summary when the final public reference is ready.',
    assets_needed:
      'Screenshots, approved live link, demo account notes, final approved summary, and any public-safe client reference details.',
    notes:
      'Use Emory Capital to support trust when pitching executive-facing websites, investor demos, financial MVPs, and polished business infrastructure.',
    is_pinned: false,
    sort_order: 50,
  },
  {
    title: 'Charlie Bereal / Death Row-Connected Creative',
    lane: 'Music Visuals + Artist Campaign Assets',
    status: 'Reference',
    priority: 'Medium',
    type: ['Music', 'Campaign', 'Motion'],
    preview_url: null,
    summary:
      'Creative work and reference material tied to Charlie Bereal and Death Row-connected opportunities, including album artwork, motion art, visualizers, release assets, and social campaign pieces.',
    current_need:
      'Separate completed deliverables from unresolved follow-up items so this lane can function as both a creative archive and relationship reference.',
    next_action:
      'Organize artwork, motion assets, release links, social post references, payout notes, and approved artist/label references.',
    assets_needed:
      'Cover art, motion art, release links, social post links, payment notes, artist references, approved copy, and any Death Row-connected context that is cleared for internal use.',
    notes:
      'Keep this lane clean because it can support future music campaign credibility, artist-asset packaging, and Adrian-connected label opportunities.',
    is_pinned: false,
    sort_order: 60,
  },
  {
    title: 'x|a / xIa Ecosystem',
    lane: 'Strategic Platform + Pitch Deck',
    status: 'Reference',
    priority: 'Medium',
    type: ['Deck', 'Platform', 'Music Business', 'AI'],
    preview_url: null,
    summary:
      'A strategic music and AI ecosystem lane connected to pitch deck work, management education, artist tools, board references, and platform ideas tied to Adrian’s broader business network.',
    current_need:
      'Clarify which materials are public, internal, investor-facing, or reference-only so the ecosystem stays clean and usable for future pitches.',
    next_action:
      'Sort references into pitch deck, platform copy, AI tools, management education, board materials, and client-safe language.',
    assets_needed:
      'Decks, screenshots, notes, platform references, approved names, public-facing language, and source material that can be used in future handoffs.',
    notes:
      'Use this as a long-term reference lane for Adrian Miller-connected platform strategy, management education, AI-native entertainment tools, and pitch architecture.',
    is_pinned: false,
    sort_order: 70,
  },
]

export function normalizeType(value: string | string[] | null | undefined): string[] {
  if (Array.isArray(value)) return value.map((v) => v.trim()).filter(Boolean)
  if (!value) return []
  return value.split(',').map((v) => v.trim()).filter(Boolean)
}

export function isValidStatus(status: string): status is DxaStatus {
  return DXA_STATUSES.includes(status as DxaStatus)
}
