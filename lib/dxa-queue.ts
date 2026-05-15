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
    task: 'I need gallery images for HSS from Adrian per Gina’s request.',
    owner_type: 'Adrian',
    status: 'Waiting',
    notes: 'Needed from Adrian for Gina’s request before the HSS page/gallery can be properly updated.',
    sort_order: 10,
  },
  {
    project_title: 'HSS Feed',
    task: 'I will update who got the props, skip the line, and the full mechanics.',
    owner_type: 'Me',
    status: 'Open',
    notes: 'Clarify and update the HSS feature/mechanics language for props, skip-the-line, and the full user flow.',
    sort_order: 20,
  },
  {
    project_title: 'DVI Travel Hotline',
    task: 'I will refresh DVI Travel with a working modal, menus, and new videos.',
    owner_type: 'Me',
    status: 'Open',
    notes: 'Refresh the campaign MVP with working modal behavior, menu states, and updated video assets.',
    sort_order: 30,
  },
  {
    project_title: 'DKLA / Throw That Thang',
    task: 'DKLA campaign MVP is ready. All party images will be updated.',
    owner_type: 'Me',
    status: 'Open',
    notes: 'Keep the MVP live as ready, but update the party imagery when the right assets or screen grabs are available.',
    sort_order: 40,
  },
  {
    project_title: 'DKLA / Throw That Thang',
    task: 'Adrian and I need to define details, dates, and all the specifics.',
    owner_type: 'Adrian',
    status: 'Waiting',
    notes: 'Needs alignment with Adrian on campaign specifics, event timing, rollout details, dates, and confirmed requirements.',
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
