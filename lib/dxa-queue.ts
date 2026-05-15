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
    task: 'Finalize HSS Feed official links and assets.',
    owner_type: 'Adrian',
    status: 'Waiting',
    notes: 'Waiting on official show links, gallery assets with guests, Nero submission link, platform URLs, and approved show materials.',
    sort_order: 10,
  },
  {
    project_title: 'HSS Feed',
    task: 'Prepare polish handoff for the HSS Feed landing page.',
    owner_type: 'Me',
    status: 'Open',
    notes: 'Use confirmed assets and links to create the next landing-page polish handoff.',
    sort_order: 20,
  },
  {
    project_title: 'DVI Travel Hotline',
    task: 'Refine DVI Travel design, background system, and virtual phone experience.',
    owner_type: 'Me',
    status: 'Open',
    notes: 'Improve the Caribbean pattern system, premium DVI Wireless phone flow, and campaign-ready structure.',
    sort_order: 30,
  },
  {
    project_title: 'DKLA / Throw That Thang',
    task: 'Build DKLA campaign copy into a full rollout calendar.',
    owner_type: 'Me',
    status: 'Open',
    notes: 'Turn the Adrian brainstorm into a clean campaign calendar, captions, carousel copy, and rollout sequence.',
    sort_order: 40,
  },
  {
    project_title: 'DKLA / Throw That Thang',
    task: 'Create Higgsfield prompt sets for DKLA, HSS Feed, and DVI Travel assets.',
    owner_type: 'Me',
    status: 'Open',
    notes: 'Prompt creation references the active project slate only. Do not include completed archive projects in the queue.',
    sort_order: 50,
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
