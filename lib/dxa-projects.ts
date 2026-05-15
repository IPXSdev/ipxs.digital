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

export const DKLA_CAMPAIGN_MVP_URL = 'https://v0-dkla-campaign-site.vercel.app/'

export const DXA_SEED_PROJECTS: DxaProjectInput[] = [
  { title: 'HSS Feed', lane: 'Live Show + Website MVP', status: 'Active', priority: 'High', type: ['Live Show', 'Website', 'Music', 'MVP Preview'] },
  { title: 'DVI Travel Hotline', lane: 'Campaign Site + Virtual Hotline', status: 'Active', priority: 'High', type: ['Campaign', 'Website', 'MVP Preview', 'Music'] },
  {
    title: 'DKLA / Throw That Thang',
    lane: 'Music Campaign + Event Rollout',
    status: 'Active',
    priority: 'High',
    type: ['Campaign', 'Music', 'AI Assets', 'MVP Preview'],
    preview_url: DKLA_CAMPAIGN_MVP_URL,
  },
  { title: "Larry Parker's Diner", lane: 'Legacy Documentary + Brand Revival', status: 'Reference', priority: 'Medium', type: ['Legacy'] },
  { title: 'Emory Capital', lane: 'Investor-Facing Digital Build', status: 'Delivered', priority: 'Medium', type: ['Website', 'MVP Preview'] },
  { title: 'Charlie Bereal / Death Row-Connected Creative', lane: 'Music Visuals + Artist Campaign Assets', status: 'Reference', priority: 'Medium', type: ['Music', 'Campaign'] },
  { title: 'x|a / xIa Ecosystem', lane: 'Strategic Platform + Pitch Deck', status: 'Reference', priority: 'Medium', type: ['Legacy', 'AI Assets'] },
]

export function normalizeType(value: string | string[] | null | undefined): string[] {
  if (Array.isArray(value)) return value.map((v) => v.trim()).filter(Boolean)
  if (!value) return []
  return value.split(',').map((v) => v.trim()).filter(Boolean)
}

export function isValidStatus(status: string): status is DxaStatus {
  return DXA_STATUSES.includes(status as DxaStatus)
}
