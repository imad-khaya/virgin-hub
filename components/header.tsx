"use client"

import { Search, Plus, List, Grid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface HeaderProps {
  onAddProject: () => void
  filterStatus: string
  setFilterStatus: (status: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  viewMode: "table" | "card"
  setViewMode: (mode: "table" | "card") => void
}

export function Header({
  onAddProject,
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-virgin-red">Project Management</h1>
        </div>
        <Button onClick={onAddProject} className="flex items-center bg-red-600 hover:bg-red-600/70 text-white hover:text-white/70">
          <Plus className="mr-2 h-4 w-4" />
          Add New Project
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3 bg-gray-50">
        <div className="flex flex-1 items-center gap-4 min-w-[280px]">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search projects..."
              className="pl-9 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) => value && setViewMode(value as "table" | "card")}
        >
          <ToggleGroupItem value="table" aria-label="Table view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="card" aria-label="Card view">
            <Grid className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </header>
  )
}

