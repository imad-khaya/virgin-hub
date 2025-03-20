"use client"

import { Edit, Trash2, Users } from "lucide-react"
import type { ProjectData } from "@/types/project"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

interface ProjectCardsProps {
  projects: ProjectData[]
  onEdit: (project: ProjectData) => void
  onDelete: (id: string) => void
  onSelect: (project: ProjectData) => void
}

export function ProjectCards({ projects, onEdit, onDelete, onSelect }: ProjectCardsProps) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onSelect(project)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Badge variant="outline" className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
              <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(project)}>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
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
            </div>
            <CardTitle className="text-lg mt-2">{project.title}</CardTitle>
            <div className="text-sm text-muted-foreground line-clamp-2">{project.description}</div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-1">Progress</div>
                <div className="space-y-1">
                  <div className="text-xs flex justify-between">
                    <span>{formatProgress(project.progress)}</span>
                    <span>{calculatePercentage(project.progress.current, project.progress.target)}%</span>
                  </div>
                  <Progress
                    value={calculatePercentage(project.progress.current, project.progress.target)}
                    className="h-2"
                  />
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Goal</div>
                <div className="text-sm">{project.goal}</div>
              </div>
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2 flex justify-between">
            <div className="text-sm">{project.company}</div>
            {project.collaborators && project.collaborators.length > 0 && (
              <Badge variant="outline" className="flex items-center gap-1 bg-purple-100 text-purple-800">
                <Users className="h-3 w-3" />
                <span>
                  {project.collaborators.length} collaborator{project.collaborators.length > 1 ? "s" : ""}
                </span>
              </Badge>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

