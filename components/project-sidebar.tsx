"use client"

import type { ProjectData } from "@/types/project"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, BarChart, Users } from "lucide-react"

interface SidebarProps {
  selectedProject: ProjectData | null
}

export function ProjectSidebar({ selectedProject }: SidebarProps) {
  if (!selectedProject) {
    return (
      <aside className="hidden lg:block w-80 border-l bg-gray-50 p-6 overflow-y-auto">
        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
          <p>Select a project to view details</p>
        </div>
      </aside>
    )
  }

  const calculatePercentage = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100)
  }

  return (
    <aside className="hidden lg:block w-80 border-l bg-gray-50 p-6 overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">Project Details</h2>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Real-Time Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-2xl font-bold">
            <span>{selectedProject.progress.current.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground font-normal">{selectedProject.progress.unit}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {calculatePercentage(selectedProject.progress.current, selectedProject.progress.target)}% of goal completed
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Progress Over Time</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40 flex items-center justify-center bg-muted/50 rounded-md">
            <p className="text-sm text-muted-foreground">Progress chart visualization</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Impact Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40 flex items-center justify-center bg-muted/50 rounded-md">
            <p className="text-sm text-muted-foreground">Impact metrics visualization</p>
          </div>
        </CardContent>
      </Card>

      {selectedProject.collaborators && selectedProject.collaborators.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Collaborations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {selectedProject.collaborators.map((collaborator) => (
                <li key={collaborator} className="text-sm">
                  <span className="font-medium">{collaborator}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </aside>
  )
}

