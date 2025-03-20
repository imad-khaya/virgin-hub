"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth-context"

// Sample subcompanies for the multi-select
const subcompanies = [
  "Virgin Atlantic",
  "Virgin Media",
  "Virgin Mobile",
  "Virgin Active",
  "Virgin Galactic",
  "Virgin Voyages",
  "Virgin Hotels",
  "Virgin Management",
]

export default function AddGoalPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    owner: "",
    metrics: "",
    collaborators: [] as string[],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCollaboratorToggle = (subcompany: string) => {
    setFormData((prev) => {
      const isSelected = prev.collaborators.includes(subcompany)

      if (isSelected) {
        return {
          ...prev,
          collaborators: prev.collaborators.filter((item) => item !== subcompany),
        }
      } else {
        return {
          ...prev,
          collaborators: [...prev.collaborators, subcompany],
        }
      }
    })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Goal title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.deadline) {
      newErrors.deadline = "Deadline is required"
    }

    if (!formData.owner.trim()) {
      newErrors.owner = "Owner is required"
    }

    if (formData.collaborators.length === 0) {
      newErrors.collaborators = "Select at least one collaborating subcompany"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // In a real app, this would be an API call to save the data
      console.log("Form submitted:", formData)

      // Redirect to goals page
      router.push("/dashboard/goals")
    }
  }

  if (!isAuthenticated) {
    return null // Don't render anything while redirecting
  }

  // Determine company type from email
  const companyType = user?.email.includes("@hotels.virgin.com")
    ? "Virgin Hotels"
    : user?.email.includes("@flights.virgin.com")
      ? "Virgin Flights"
      : "Virgin Company"

  return (
    <div className="container mx-auto max-w-3xl p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Goal</h1>
        <p className="text-gray-600">Create a new goal for {companyType}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader className="bg-red-50">
            <CardTitle className="text-red-600">Goal Information</CardTitle>
            <CardDescription>Enter the details of your new goal</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Goal Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter a clear, concise goal title"
                value={formData.title}
                onChange={handleInputChange}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide a detailed description of the goal"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className={errors.deadline ? "border-red-500" : ""}
                />
                {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="owner">Owner</Label>
                <Input
                  id="owner"
                  name="owner"
                  placeholder="Team or person responsible"
                  value={formData.owner}
                  onChange={handleInputChange}
                  className={errors.owner ? "border-red-500" : ""}
                />
                {errors.owner && <p className="text-red-500 text-sm">{errors.owner}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metrics">Success Metrics</Label>
              <Input
                id="metrics"
                name="metrics"
                placeholder="How will success be measured? (e.g., KPIs)"
                value={formData.metrics}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-3">
              <Label>Collaborating Subcompanies</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {subcompanies.map((subcompany) => (
                  <div key={subcompany} className="flex items-center space-x-2">
                    <Checkbox
                      id={`subcompany-${subcompany}`}
                      checked={formData.collaborators.includes(subcompany)}
                      onCheckedChange={() => handleCollaboratorToggle(subcompany)}
                    />
                    <label
                      htmlFor={`subcompany-${subcompany}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {subcompany}
                    </label>
                  </div>
                ))}
              </div>
              {errors.collaborators && <p className="text-red-500 text-sm">{errors.collaborators}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline" type="button" onClick={() => router.push("/dashboard/goals")}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" type="submit">
              Create Goal
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

