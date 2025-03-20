"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Search, Sparkles, Users, Calendar, CheckCircle, XCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

// Sample data - in a real app this would come from an API
const allGoals = [
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
  {
    id: 9,
    title: "Develop Sustainable Tourism Packages",
    description: "Create eco-friendly tourism packages across all Virgin properties",
    achieved: false,
    collaborators: ["Virgin Hotels", "Virgin Voyages"],
    deadline: "2024-07-15",
    owner: "Product Development",
    metrics: "Sustainability Score, Customer Adoption",
    company: "hotels",
  },
  {
    id: 10,
    title: "Implement AI-Powered Customer Service",
    description: "Deploy AI chatbots for 24/7 customer support across all digital channels",
    achieved: false,
    collaborators: ["Virgin Media", "Virgin Mobile"],
    deadline: "2024-05-30",
    owner: "Digital Innovation Team",
    metrics: "Response Time, Resolution Rate",
    company: "flights",
  },
]

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredGoals, setFilteredGoals] = useState<typeof allGoals>([])
  const [selectedGoal, setSelectedGoal] = useState<(typeof allGoals)[0] | null>(null)
  const [collaborationProposal, setCollaborationProposal] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [isAiLoading, setIsAiLoading] = useState(false)
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Filter goals based on user's company to show only other companies' goals
    const userCompany = user?.email.includes("@hotels.virgin.com")
      ? "hotels"
      : user?.email.includes("@flights.virgin.com")
        ? "flights"
        : null

    const otherCompanyGoals = userCompany ? allGoals.filter((goal) => goal.company !== userCompany) : allGoals

    setFilteredGoals(otherCompanyGoals)
  }, [isAuthenticated, router, user])

  useEffect(() => {
    if (!user) return

    const userCompany = user.email.includes("@hotels.virgin.com")
      ? "hotels"
      : user.email.includes("@flights.virgin.com")
        ? "flights"
        : null

    const otherCompanyGoals = userCompany ? allGoals.filter((goal) => goal.company !== userCompany) : allGoals

    const filtered = otherCompanyGoals.filter(
      (goal) =>
        goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        goal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        goal.collaborators.some((collaborator) => collaborator.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredGoals(filtered)
  }, [searchTerm, user])

  const handleGoalClick = (goal: (typeof allGoals)[0]) => {
    setSelectedGoal(goal)
    setIsDialogOpen(true)
    setCollaborationProposal("")
  }

  const handleSubmitProposal = () => {
    // In a real app, this would send the proposal to the API
    toast({
      title: "Collaboration proposal sent!",
      description: `Your proposal for "${selectedGoal?.title}" has been sent to the team.`,
    })
    setIsDialogOpen(false)
  }

  const handleAiSuggest = () => {
    setIsAiDialogOpen(true)
    setIsAiLoading(true)

    // Simulate AI processing
    setTimeout(() => {
      const userCompany = user?.email.includes("@hotels.virgin.com")
        ? "Virgin Hotels"
        : user?.email.includes("@flights.virgin.com")
          ? "Virgin Flights"
          : "Virgin Company"

      // Generate AI suggestions based on user's company
      if (userCompany === "Virgin Hotels") {
        setAiSuggestions([
          "Collaborate with Virgin Flights on their 'Reduce Carbon Footprint' initiative by implementing sustainable practices in hotel operations.",
          "Partner with Virgin Flights on their 'Expand Market Presence' goal by creating joint hotel-flight packages for new markets.",
          "Support the 'AI-Powered Customer Service' goal by integrating the same AI system for hotel bookings and inquiries.",
        ])
      } else {
        setAiSuggestions([
          "Collaborate with Virgin Hotels on their 'Enhance Guest Experience' initiative by offering special flight perks for hotel guests.",
          "Partner with Virgin Hotels on their 'Develop Sustainable Tourism Packages' by providing eco-friendly transportation options.",
          "Support the 'Launch New Digital Platform' goal by integrating flight booking capabilities into the unified platform.",
        ])
      }

      setIsAiLoading(false)
    }, 2000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  if (!isAuthenticated) {
    return null // Don't render anything while redirecting
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover & Connect</h1>
          <p className="text-gray-600">Find collaboration opportunities with other Virgin subcompanies</p>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-auto flex gap-2">
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
          <Button onClick={handleAiSuggest} className="bg-red-600 hover:bg-red-700 whitespace-nowrap">
            <Sparkles className="mr-2 h-4 w-4" />
            Suggest with AI
          </Button>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="w-full">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredGoals.map((goal) => (
              <Card
                key={goal.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleGoalClick(goal)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge
                      className={
                        goal.company === "hotels" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                      }
                    >
                      {goal.company === "hotels" ? "Virgin Hotels" : "Virgin Flights"}
                    </Badge>
                    <Badge
                      variant={goal.achieved ? "success" : "default"}
                      className={goal.achieved ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    >
                      {goal.achieved ? "Achieved" : "In Progress"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{goal.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{goal.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Deadline: {formatDate(goal.deadline)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Team: {goal.owner}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredGoals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No goals found matching your search criteria.</p>
              <Button onClick={() => setSearchTerm("")} variant="outline">
                Clear Search
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="table">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {filteredGoals.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subcompany</TableHead>
                    <TableHead>Goal</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Deadline</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGoals.map((goal) => (
                    <TableRow
                      key={goal.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleGoalClick(goal)}
                    >
                      <TableCell>
                        <Badge
                          className={
                            goal.company === "hotels" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                          }
                        >
                          {goal.company === "hotels" ? "Virgin Hotels" : "Virgin Flights"}
                        </Badge>
                      </TableCell>
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
                      <TableCell className="hidden md:table-cell">{formatDate(goal.deadline)}</TableCell>
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
        </TabsContent>
      </Tabs>

      {/* Collaboration Proposal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Propose Collaboration</DialogTitle>
            <DialogDescription>Suggest how your team can collaborate on this goal</DialogDescription>
          </DialogHeader>

          {selectedGoal && (
            <div className="py-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium">{selectedGoal.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedGoal.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-500">Subcompany:</span>
                  <p>{selectedGoal.company === "hotels" ? "Virgin Hotels" : "Virgin Flights"}</p>
                </div>
                <div>
                  <span className="text-gray-500">Team:</span>
                  <p>{selectedGoal.owner}</p>
                </div>
                <div>
                  <span className="text-gray-500">Deadline:</span>
                  <p>{formatDate(selectedGoal.deadline)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>
                  <p className="flex items-center">
                    {selectedGoal.achieved ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        Achieved
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-red-500 mr-1" />
                        In Progress
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proposal">Your Collaboration Proposal</Label>
                <Textarea
                  id="proposal"
                  placeholder="Describe how your team can contribute to this goal..."
                  rows={5}
                  value={collaborationProposal}
                  onChange={(e) => setCollaborationProposal(e.target.value)}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleSubmitProposal}
              disabled={!collaborationProposal.trim()}
            >
              Send Proposal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AI Suggestions Dialog */}
      <Dialog open={isAiDialogOpen} onOpenChange={setIsAiDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Sparkles className="h-5 w-5 text-red-600 mr-2" />
              AI-Suggested Collaborations
            </DialogTitle>
            <DialogDescription>
              Based on your company profile, here are some potential collaboration opportunities
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {isAiLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-red-600 animate-spin mb-4"></div>
                <p className="text-gray-500">Analyzing goals and generating suggestions...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {aiSuggestions.map((suggestion, index) => (
                  <Card key={index} className="bg-gray-50">
                    <CardContent className="pt-4">
                      <p>{suggestion}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          setIsAiDialogOpen(false)
                          // Find the related goal based on the suggestion text
                          const goalKeywords = [
                            "Reduce Carbon Footprint",
                            "Expand Market Presence",
                            "AI-Powered Customer Service",
                            "Enhance Guest Experience",
                            "Develop Sustainable Tourism Packages",
                            "Launch New Digital Platform",
                          ]

                          const matchedKeyword = goalKeywords.find((keyword) => suggestion.includes(keyword))

                          if (matchedKeyword) {
                            const matchedGoal = allGoals.find((goal) => goal.title.includes(matchedKeyword))

                            if (matchedGoal) {
                              setSelectedGoal(matchedGoal)
                              setCollaborationProposal(suggestion)
                              setIsDialogOpen(true)
                            }
                          }
                        }}
                      >
                        Explore This Opportunity
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAiDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

