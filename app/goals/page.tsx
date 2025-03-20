"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

// Sample data - in a real app this would come from an API
const initialGoals = [
  {
    id: 1,
    title: "Increase Customer Satisfaction",
    description: "Improve NPS score by 15% across all touchpoints",
    achieved: false,
    collaborators: ["Virgin Atlantic", "Virgin Media"],
    deadline: "2023-12-31",
    owner: "Customer Experience Team",
    metrics: "NPS Score, Customer Retention Rate",
  },
  {
    id: 2,
    title: "Reduce Carbon Footprint",
    description: "Decrease carbon emissions by 25% through sustainable practices",
    achieved: true,
    collaborators: ["Virgin Galactic", "Virgin Voyages"],
    deadline: "2023-06-30",
    owner: "Sustainability Department",
    metrics: "Carbon Emissions, Energy Consumption",
  },
  {
    id: 3,
    title: "Launch New Digital Platform",
    description: "Create unified digital experience across all Virgin brands",
    achieved: false,
    collaborators: ["Virgin Media", "Virgin Mobile"],
    deadline: "2024-03-15",
    owner: "Digital Transformation Team",
    metrics: "User Engagement, Cross-selling Conversion",
  },
  {
    id: 4,
    title: "Expand Market Presence",
    description: "Enter three new markets in Asia Pacific region",
    achieved: false,
    collaborators: ["Virgin Atlantic", "Virgin Hotels"],
    deadline: "2024-06-30",
    owner: "Business Development",
    metrics: "Market Share, Revenue Growth",
  },
  {
    id: 5,
    title: "Enhance Employee Wellbeing",
    description: "Implement comprehensive wellbeing program across all subcompanies",
    achieved: true,
    collaborators: ["Virgin Active", "Virgin Management"],
    deadline: "2023-09-30",
    owner: "Human Resources",
    metrics: "Employee Satisfaction, Retention Rate",
  },
]

export default function GoalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [goals, setGoals] = useState(initialGoals)
  const router = useRouter()

  const filteredGoals = goals.filter(
    (goal) =>
      goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.collaborators.some((collaborator) => collaborator.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleRowClick = (id: number) => {
    router.push(`/goals/${id}`)
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Goals Dashboard</h1>
          <p className="text-gray-600">Track and manage your subcompany goals</p>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search goals..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Goal</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Collaborators</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGoals.map((goal) => (
              <TableRow
                key={goal.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(goal.id)}
              >
                <TableCell className="font-medium">{goal.title}</TableCell>
                <TableCell className="hidden md:table-cell">{goal.description}</TableCell>
                <TableCell>
                  <Badge
                    variant={goal.achieved ? "success" : "default"}
                    className={goal.achieved ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                  >
                    {goal.achieved ? "Achieved" : "In Progress"}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {goal.collaborators.map((collaborator) => (
                      <Badge key={collaborator} variant="outline" className="bg-gray-100">
                        {collaborator}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

