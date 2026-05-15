export const DXA_TASK_OWNERS = ['Me', 'Adrian', 'Client / Partner'] as const
export const DXA_TASK_STATUSES = ['Open', 'Waiting', 'Completed'] as const
export const DXA_ACTIVE_QUEUE_PROJECTS = ['HSS Feed', 'DVI Travel Hotline', 'DKLA / Throw That Thang'] as const

export type DxaTaskOwner = (typeof DXA_TASK_OWNERS)[number]
export type DxaTaskStatus = (typeof DXA_TASK_STATUSES)[number]
export type DxaActiveQueueProject = (typeof DXA_ACTIVE_QUEUE_PROJECTS)[number]

export interface DxaQueueTask {
  id: string
  project_title: string
  task: string
  owner_type: DxaTaskOwner
  status: DxaTaskStatus
  notes: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

export type DxaQueueTaskInput = Partial<Omit<DxaQueueTask, 'id' | 'created_at' | 'updated_at'>>

export const DXA_QUEUE_SEED_TASKS: DxaQueueTaskInput[] = [
  {
    project_title: 'HSS Feed',
    task: 'Confirm final show assets, official social links, Nero submission link, episode clips, sponsor language, and show schedule details.',
    owner_type: 'Adrian',
    status: 'Waiting',
    notes: 'Needs source links and approved show materials from the Adrian/show side before final polish.',
    sort_order: 10,
  },
  {
    project_title: 'DVI Travel Hotline',
    task: 'Confirm sponsor names, hotline audio, campaign videos, Stripe or entry mechanic, official rules, privacy copy, and terms copy.',
    owner_type: 'Client / Partner',
    status: 'Waiting',
    notes: 'Needs sponsor and legal/entry details before production can move beyond MVP polish.',
    sort_order: 20,
  },
  {
    project_title: 'DKLA / Throw That Thang',
    task: 'Build the formal campaign calendar and update the MVP with final footage, screen grabs, pool-party details, prize language, and DKLA branding.',
    owner_type: 'Me',
    status: 'Open',
    notes: 'Active creative and campaign build task tied to the DKLA rollout.',
    sort_order: 30,
  },
]

export function isValidTaskOwner(owner: string): owner is DxaTaskOwner {
  return DXA_TASK_OWNERS.includes(owner as DxaTaskOwner)
}

export function isValidTaskStatus(status: string): status is DxaTaskStatus {
  return DXA_TASK_STATUSES.includes(status as DxaTaskStatus)
}

export function isActiveQueueProject(projectTitle: string): projectTitle is DxaActiveQueueProject {
  return DXA_ACTIVE_QUEUE_PROJECTS.includes(projectTitle as DxaActiveQueueProject)
}

export function hasValidDxaAdminPin(candidate: unknown) {
  return Boolean(process.env.DXA_ADMIN_PIN) && candidate === process.env.DXA_ADMIN_PIN
}
