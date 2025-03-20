"use client"

import { useState } from "react"
import { ProjectList } from "@/components/project-list"
import { ProjectSidebar } from "@/components/project-sidebar"
import { ProjectForm } from "@/components/project-form"
import type { ProjectData } from "@/types"
import { initialProjects } from "@/data/projects"
import { Header } from "@/components/header"

export default function Home() {
  const [projects, setProjects] = useState<ProjectData[]>(initialProjects)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null)
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [viewMode, setViewMode] = useState<"table" | "card">("table")

  const handleAddProject = () => {
    setEditingProject(null)
    setIsFormOpen(true)
  }

  const handleEditProject = (project: ProjectData) => {
    setEditingProject(project)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingProject(null)
  }

  const handleSaveProject = (project: ProjectData) => {
    if (editingProject) {
      // Update existing project
      setProjects(projects.map((p) => (p.id === project.id ? project : p)))
    } else {
      // Add new project
      setProjects([...projects, { ...project, id: Date.now().toString() }])
    }
    setIsFormOpen(false)
    setEditingProject(null)
  }

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id))
    if (selectedProject?.id === id) {
      setSelectedProject(null)
    }
  }

  const handleSelectProject = (project: ProjectData) => {
    setSelectedProject(project)
  }

  const filteredProjects = projects.filter((project) => {
    const matchesStatus = filterStatus === "all" || project.status === filterStatus
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="flex flex-col h-screen">
      <Header
        onAddProject={handleAddProject}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto p-6">
          <ProjectList
            projects={filteredProjects}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            onSelect={handleSelectProject}
            viewMode={viewMode}
          />
        </main>
        <ProjectSidebar selectedProject={selectedProject} />
      </div>
      {isFormOpen && <ProjectForm project={editingProject} onSave={handleSaveProject} onClose={handleCloseForm} />}
    </div>
  )
}

