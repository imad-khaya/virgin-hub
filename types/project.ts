export type ProjectStatus = "Draft" | "In Progress" | "Completed"

export interface ProjectData {
  id: string
  title: string
  description: string
  goal: string
  tags: string[]
  resourcesNeeded: string
  resourcesOffered: string
  customerAction?: string
  status: ProjectStatus
  progress: {
    current: number
    target: number
    unit: string
  }
  company: string
  collaborators?: string[]
}

