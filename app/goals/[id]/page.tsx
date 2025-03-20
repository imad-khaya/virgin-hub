"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, CheckCircle, Clock, Edit, Users, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Sample data - in a real app this would come from an API
const goalsData = [
  {
    id: 1,
    title: "Increase Customer Satisfaction",
    description: "Improve NPS score by 15% across all touchpoints",
    achieved: false,
    collaborators: ["Virgin Atlantic", "Virgin Media"],
    deadline: "2023-12-31",
    owner: "Customer Experience Team",
    metrics: "NPS Score, Customer Retention Rate",
    progress: 65,
    updates: [
      { date: "2023-09-15", content: "Implemented new customer feedback system" },
      { date: "2023-10-20", content: "NPS score improved by 8% since last quarter" },
    ],
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
    progress: 100,
    updates: [
      { date: "2023-03-10", content: "Completed installation of solar panels at all locations" },
      { date: "2023-05-22", content: "Achieved 30% reduction in carbon emissions" },
      { date: "2023-06-28", content: "Goal completed ahead of schedule" },
    ],
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
    progress: 40,
    updates: [
      { date: "2023-08-05", content: "Completed user research and initial prototypes" },
      { date: "2023-11-12", content: "Backend infrastructure development in progress" },
    ],
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
    progress: 25,
    updates: [
      { date: "2023-07-18", content: "Completed market analysis for target countries" },
      { date: "2023-10-05", content: "Initiated partnership discussions in Singapore" },
    ],
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
    progress: 100,
    updates: [
      { date: "2023-04-12", content: "Launched mental health support program" },
      { date: "2023-06-30", content: "Implemented flexible working policy" },
      { date: "2023-09-15", content: "Employee satisfaction increased by 22%" },
      { date: "2023-09-28", content: "Goal successfully completed" },
    ],
  },
]

export default function GoalDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [goal, setGoal] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const goalId = Number(params.id)
    const foundGoal = goalsData.find((g) => g.id === goalId)

    if (foundGoal) {
      setGoal(foundGoal)
    }
    setLoading(false)
  }, [params.id])

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>
  }

  if (!goal) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold mb-2">Goal not found</h2>
        <Button onClick={() => router.push("/goals")}>Back to Goals</Button>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <div className="container mx-auto">
      <Button variant="ghost" className="mb-6 hover:bg-gray-100" onClick={() => router.push("/goals")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Goals
      </Button>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="bg-red-50">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl text-red-600">{goal.title}</CardTitle>
                  <CardDescription className="mt-2 text-base">{goal.description}</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Progress</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-sm text-gray-500">
                    <span>0%</span>
                    <span>{goal.progress}% Complete</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Updates</h3>
                  <div className="space-y-4">
                    {goal.updates.map((update: any, index: number) => (
                      <div key={index} className="flex gap-4">
                        <div className="min-w-[100px] text-sm text-gray-500">{formatDate(update.date)}</div>
                        <div className="text-sm">{update.content}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Goal Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {goal.achieved ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <div className="text-sm font-medium">Status</div>
                    <div className="text-sm text-gray-500">{goal.achieved ? "Achieved" : "In Progress"}</div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Deadline</div>
                    <div className="text-sm text-gray-500">{formatDate(goal.deadline)}</div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Owner</div>
                    <div className="text-sm text-gray-500">{goal.owner}</div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Metrics</div>
                    <div className="text-sm text-gray-500">{goal.metrics}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Collaborating Subcompanies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {goal.collaborators.map((collaborator: string) => (
                  <div key={collaborator} className="flex items-center p-2 rounded-md bg-gray-50">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold mr-3">
                      {collaborator.charAt(0)}
                    </div>
                    <span>{collaborator}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

