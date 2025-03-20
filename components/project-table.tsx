"use client"

import { Edit, Trash2 } from "lucide-react"
import type { ProjectData } from "@/types/project"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ProjectTableProps {
  projects: ProjectData[]
  onEdit: (project: ProjectData) => void
  onDelete: (id: string) => void
  onSelect: (project: ProjectData) => void
}

export function ProjectTable({ projects, onEdit, onDelete, onSelect }: ProjectTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Draft":
        return "bg-gray-200 text-gray-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  const formatProgress = (progress: { current: number; target: number; unit: string }) => {
    return `${progress.current.toLocaleString()} / ${progress.target.toLocaleString()} ${progress.unit}`
  }

  const calculatePercentage = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100)
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50">
            <th className="px-4 py-3 text-left font-medium">Project</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Progress</th>
            <th className="px-4 py-3 text-left font-medium">Company</th>
            <th className="px-4 py-3 text-left font-medium">Goal</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className="border-t hover:bg-muted/50 cursor-pointer"
              onClick={() => onSelect(project)}
            >
              <td className="px-4 py-3">
                <div>
                  <div className="font-medium">{project.title}</div>
                  <div className="text-muted-foreground text-xs line-clamp-1">{project.description}</div>
                </div>
              </td>
              <td className="px-4 py-3">
                <Badge variant="outline" className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <div className="space-y-1">
                  <div className="text-xs">{formatProgress(project.progress)}</div>
                  <Progress
                    value={calculatePercentage(project.progress.current, project.progress.target)}
                    className="h-2"
                  />
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-col">
                  <span>{project.company}</span>
                  {project.collaborators && project.collaborators.length > 0 && (
                    <Badge variant="outline" className="mt-1 bg-purple-100 text-purple-800 text-xs">
                      + {project.collaborators.length} collaborator{project.collaborators.length > 1 ? "s" : ""}
                    </Badge>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">{project.goal}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(project)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the project "{project.title}". This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-virgin-red hover:bg-virgin-red/90"
                          onClick={() => onDelete(project.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

