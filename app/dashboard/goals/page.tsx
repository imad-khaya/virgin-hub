"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

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
    company: "hotels",
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
    company: "flights",
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
    company: "hotels",
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
    company: "flights",
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
    company: "hotels",
  },
  {
    id: 6,
    title: "Optimize Flight Routes",
    description: "Reduce flight times and fuel consumption by 10%",
    achieved: false,
    collaborators: ["Virgin Atlantic", "Virgin Galactic"],
    deadline: "2024-02-28",
    owner: "Operations Team",
    metrics: "Fuel Efficiency, On-time Performance",
    company: "flights",
  },
  {
    id: 7,
    title: "Enhance Guest Experience",
    description: "Implement new guest services across all hotel properties",
    achieved: false,
    collaborators: ["Virgin Hotels", "Virgin Management"],
    deadline: "2024-04-15",
    owner: "Guest Experience Team",
    metrics: "Guest Satisfaction, Repeat Bookings",
    company: "hotels",
  },
  {
    id: 8,
    title: "Modernize Aircraft Fleet",
    description: "Replace 30% of aircraft with more fuel-efficient models",
    achieved: true,
    collaborators: ["Virgin Atlantic", "Virgin Galactic"],
    deadline: "2023-11-30",
    owner: "Fleet Management",
    metrics: "Fuel Efficiency, Maintenance Costs",
    company: "flights",
  },
]

export default function GoalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [goals, setGoals] = useState(initialGoals)
  const [filteredGoals, setFilteredGoals] = useState(initialGoals)
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Filter goals based on user's company
    const userCompany = user?.email.includes("@hotels.virgin.com")
      ? "hotels"
      : user?.email.includes("@flights.virgin.com")
        ? "flights"
        : null

    const companyGoals = userCompany ? initialGoals.filter((goal) => goal.company === userCompany) : initialGoals

    setGoals(companyGoals)
    setFilteredGoals(companyGoals)
  }, [isAuthenticated, router, user])

  useEffect(() => {
    const filtered = goals.filter(
      (goal) =>
        goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        goal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        goal.collaborators.some((collaborator) => collaborator.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredGoals(filtered)
  }, [searchTerm, goals])

  const handleRowClick = (id: number) => {
    router.push(`/dashboard/goals/${id}`)
  }

  if (!isAuthenticated) {
    return null // Don't render anything while redirecting
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
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
        {filteredGoals.length > 0 ? (
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
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">No goals found matching your search criteria.</p>
            <Button onClick={() => setSearchTerm("")} variant="outline">
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

