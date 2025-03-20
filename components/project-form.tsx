"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import type { ProjectData, ProjectStatus } from "@/types/project"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface ProjectFormProps {
  project: ProjectData | null
  onSave: (project: ProjectData) => void
  onClose: () => void
}

export function ProjectForm({ project, onSave, onClose }: ProjectFormProps) {
  const [formData, setFormData] = useState<Partial<ProjectData>>(
    project || {
      title: "",
      description: "",
      goal: "",
      tags: [],
      resourcesNeeded: "",
      resourcesOffered: "",
      customerAction: "",
      status: "Draft" as ProjectStatus,
      progress: {
        current: 0,
        target: 100,
        unit: "kg CO₂",
      },
      company: "Virgin Atlantic",
    },
  )

  const [tagInput, setTagInput] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleStatusChange = (value: string) => {
    setFormData({ ...formData, status: value as ProjectStatus })
  }

  const handleCompanyChange = (value: string) => {
    setFormData({ ...formData, company: value })
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      progress: {
        ...formData.progress!,
        [name]: name === "unit" ? value : Number(value),
      },
    })
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      if (!formData.tags?.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...(formData.tags || []), tagInput.trim()],
        })
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((t) => t !== tag),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: project?.id || Date.now().toString(),
      title: formData.title || "",
      description: formData.description || "",
      goal: formData.goal || "",
      tags: formData.tags || [],
      resourcesNeeded: formData.resourcesNeeded || "",
      resourcesOffered: formData.resourcesOffered || "",
      customerAction: formData.customerAction,
      status: formData.status || "Draft",
      progress: formData.progress || { current: 0, target: 100, unit: "kg CO₂" },
      company: formData.company || "Virgin Atlantic",
      collaborators: formData.collaborators,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">{project ? "Edit Project" : "Add New Project"}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Flight100 - Sustainable Aviation"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goal">Goal</Label>
              <Input
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                placeholder="e.g., Reduce 10,000 kg CO₂"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g., World's first 100% sustainable aviation fuel flight from London to New York."
              required
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Select value={formData.company} onValueChange={handleCompanyChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Virgin Atlantic">Virgin Atlantic</SelectItem>
                  <SelectItem value="Virgin Voyages">Virgin Voyages</SelectItem>
                  <SelectItem value="Virgin Media O2">Virgin Media O2</SelectItem>
                  <SelectItem value="Virgin Unite">Virgin Unite</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </Badge>
              ))}
            </div>
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type a tag and press Enter (e.g., sustainability)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="resourcesNeeded">Resources Needed</Label>
              <Input
                id="resourcesNeeded"
                name="resourcesNeeded"
                value={formData.resourcesNeeded}
                onChange={handleChange}
                placeholder="e.g., SAF feedstock"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resourcesOffered">Resources Offered</Label>
              <Input
                id="resourcesOffered"
                name="resourcesOffered"
                value={formData.resourcesOffered}
                onChange={handleChange}
                placeholder="e.g., Flight data"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerAction">Customer Action (Optional)</Label>
            <Input
              id="customerAction"
              name="customerAction"
              value={formData.customerAction}
              onChange={handleChange}
              placeholder="e.g., Sign up for updates"
            />
          </div>

          <div className="space-y-2">
            <Label>Progress</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="current" className="text-xs">
                  Current Value
                </Label>
                <Input
                  id="current"
                  name="current"
                  type="number"
                  value={formData.progress?.current}
                  onChange={handleProgressChange}
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="target" className="text-xs">
                  Target Value
                </Label>
                <Input
                  id="target"
                  name="target"
                  type="number"
                  value={formData.progress?.target}
                  onChange={handleProgressChange}
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="unit" className="text-xs">
                  Unit
                </Label>
                <Input
                  id="unit"
                  name="unit"
                  value={formData.progress?.unit}
                  onChange={handleProgressChange}
                  placeholder="e.g., kg CO₂"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-virgin-red hover:bg-virgin-red/90 text-white">
              {project ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

