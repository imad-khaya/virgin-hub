"use client"

import type { ProjectData } from "@/types/project"
import { ProjectTable } from "./project-table"
import { ProjectCards } from "./project-cards"

interface ProjectListProps {
  projects: ProjectData[]
  onEdit: (project: ProjectData) => void
  onDelete: (id: string) => void
  onSelect: (project: ProjectData) => void
  viewMode: "table" | "card"
}

export function ProjectList({ projects, onEdit, onDelete, onSelect, viewMode }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <h3 className="text-xl font-semibold text-gray-700">No projects found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filters or create a new project.</p>
      </div>
    )
  }

  return viewMode === "table" ? (
    <ProjectTable projects={projects} onEdit={onEdit} onDelete={onDelete} onSelect={onSelect} />
  ) : (
    <ProjectCards projects={projects} onEdit={onEdit} onDelete={onDelete} onSelect={onSelect} />
  )
}

