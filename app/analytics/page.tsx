"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  Download,
  FileText,
  Share2,
  Sparkles,
  Users,
  Leaf,
  TrendingUp,
  MapPin,
  Calendar,
  ArrowUpRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

// Sample data for the analytics
const projectsData = [
  {
    id: 1,
    title: "Sustainable Hotel Operations",
    description: "Comprehensive sustainability program across all Virgin Hotels properties",
    company: "Virgin Hotels",
    collaborators: ["Virgin Voyages"],
    metrics: {
      co2Saved: 850, // tonnes
      waterSaved: 15000000, // liters
      customerEngagement: 3500,
      sustainabilityScore: 88,
    },
    lineChartData: [
      { month: "Nov", co2: 500 },
      { month: "Dec", co2: 600 },
      { month: "Jan", co2: 700 },
      { month: "Feb", co2: 800 },
      { month: "Mar", co2: 850 },
    ],
    barChartData: [
      { category: "Energy", savings: 400 },
      { category: "Water", savings: 250 },
      { category: "Waste", savings: 200 },
    ],
    customerData: {
      optIns: 2000,
      feedbackSubmissions: 800,
      programParticipants: 700,
      referrals: 450,
    },
    collaborationImpact: {
      soloImpact: 850,
      withCollaborators: 1100,
      pieData: [
        { name: "Virgin Hotels", value: 850 },
        { name: "Virgin Voyages", value: 250 },
      ],
    },
    challenge: "Hotels account for 1% of global carbon emissions",
    status: "In Progress",
    type: "Operational",
    startDate: "2023-06-15",
    targetDate: "2024-06-15",
    targetMetric: 1200, // tonnes CO2
    progress: 70.8, // percentage
    company_type: "hotels",
  },
  
  {
    id: 2,
    title: "Mangrove Restoration Project",
    description: "Planting mangrove trees to offset carbon and protect coastal ecosystems",
    company: "Virgin Voyages",
    collaborators: ["Virgin Atlantic", "Virgin Unite"],
    metrics: {
      co2Saved: 500, // tonnes
      treesPLanted: 1000,
      customerEngagement: 850,
      sustainabilityScore: 78,
    },
    lineChartData: [
      { month: "Nov", treesPLanted: 200 },
      { month: "Dec", treesPLanted: 350 },
      { month: "Jan", treesPLanted: 600 },
      { month: "Feb", treesPLanted: 800 },
      { month: "Mar", treesPLanted: 1000 },
    ],
    barChartData: [
      { category: "Caribbean", trees: 600 },
      { category: "Mediterranean", trees: 300 },
      { category: "Asia Pacific", trees: 100 },
    ],
    customerData: {
      beachCleans: 50,
      participants: 250,
      trashCollected: 500, // kg
      donations: 75,
    },
    collaborationImpact: {
      soloImpact: 500,
      withCollaborators: 800,
      pieData: [
        { name: "Virgin Voyages", value: 500 },
        { name: "Virgin Atlantic", value: 200 },
        { name: "Virgin Unite", value: 100 },
      ],
    },
    challenge: "Coastal ecosystems can sequester up to 10 times more carbon than terrestrial forests",
    status: "In Progress",
    type: "Environmental",
    startDate: "2023-10-15",
    targetDate: "2024-10-15",
    targetMetric: 2000, // trees planted
    progress: 50, // percentage
    company_type: "hotels",
  },
  {
    id: 3,
    title: "O2 Recycle Program",
    description: "Comprehensive device recycling program with zero landfill policy",
    company: "Virgin Media O2",
    collaborators: ["Virgin Atlantic"],
    metrics: {
      devicesRecycled: 3800000,
      co2Saved: 1200, // tonnes
      customerEngagement: 2100,
      sustainabilityScore: 92,
    },
    lineChartData: [
      { month: "Nov", devices: 3500000 },
      { month: "Dec", devices: 3600000 },
      { month: "Jan", devices: 3650000 },
      { month: "Feb", devices: 3720000 },
      { month: "Mar", devices: 3800000 },
    ],
    barChartData: [
      { category: "Phones", count: 2500000 },
      { category: "Tablets", count: 800000 },
      { category: "Laptops", count: 350000 },
      { category: "Other", count: 150000 },
    ],
    customerData: {
      devicesSold: 1000,
      payouts: 50000, // £
      referrals: 350,
      newSignups: 200,
    },
    collaborationImpact: {
      soloImpact: 1200,
      withCollaborators: 1500,
      pieData: [
        { name: "Virgin Media O2", value: 1200 },
        { name: "Virgin Atlantic", value: 300 },
      ],
    },
    challenge: "E-waste is the fastest growing waste stream globally, with only 20% properly recycled",
    status: "Achieved",
    type: "Circular Economy",
    startDate: "2023-01-10",
    targetDate: "2024-01-10",
    targetMetric: 4000000, // devices
    progress: 95, // percentage
    company_type: "media",
  },
  {
    id: 4,
    title: "Plastic-to-Plane Initiative",
    description: "Converting recycled plastics into lightweight aircraft components",
    company: "Virgin Atlantic",
    collaborators: ["Virgin Media O2"],
    metrics: {
      plasticRecycled: 1000, // kg
      co2Saved: 500, // tonnes
      customerEngagement: 750,
      sustainabilityScore: 81,
    },
    lineChartData: [
      { month: "Nov", plastic: 200 },
      { month: "Dec", plastic: 400 },
      { month: "Jan", plastic: 600 },
      { month: "Feb", plastic: 800 },
      { month: "Mar", plastic: 1000 },
    ],
    barChartData: [
      { category: "Cabin Interiors", weight: 400 },
      { category: "Meal Trays", weight: 350 },
      { category: "Seat Components", weight: 250 },
    ],
    customerData: {
      awarenessReach: 10000,
      pledges: 500,
      socialShares: 1200,
      feedbackSubmissions: 300,
    },
    collaborationImpact: {
      soloImpact: 300,
      withCollaborators: 500,
      pieData: [
        { name: "Virgin Atlantic", value: 300 },
        { name: "Virgin Media O2", value: 200 },
      ],
    },
    challenge: "Aircraft weight reduction of just 1% can save up to 1.5% in fuel consumption",
    status: "In Progress",
    type: "Circular Economy",
    startDate: "2023-09-01",
    targetDate: "2024-09-01",
    targetMetric: 2000, // kg plastic
    progress: 50, // percentage
    company_type: "flights",
  },
  {
    id: 5,
    title: "Flight100 - Sustainable Aviation",
    description: "World's first 100% sustainable aviation fuel flight from London to New York",
    company: "Virgin Atlantic",
    collaborators: ["Virgin Voyages", "Virgin Unite"],
    metrics: {
      co2Saved: 95, // tonnes
      customerEngagement: 1250,
      sustainabilityScore: 85,
    },
    lineChartData: [
      { month: "Nov", co2Saved: 0 },
      { month: "Dec", co2Saved: 25 },
      { month: "Jan", co2Saved: 45 },
      { month: "Feb", co2Saved: 65 },
      { month: "Mar", co2Saved: 95 },
    ],
    barChartData: [
      { category: "Fuel", reduction: 70 },
      { category: "Operations", reduction: 15 },
      { category: "Materials", reduction: 10 },
    ],
    customerData: {
      signups: 100,
      shares: 350,
      donations: 50,
      volunteers: 25,
    },
    collaborationImpact: {
      soloImpact: 95,
      withCollaborators: 150,
      pieData: [
        { name: "Virgin Atlantic", value: 95 },
        { name: "Virgin Voyages", value: 40 },
        { name: "Virgin Unite", value: 15 },
      ],
    },
    challenge: "Contrails account for 57% of aviation's climate impact",
    status: "In Progress",
    type: "Environmental",
    startDate: "2023-11-28",
    targetDate: "2024-12-31",
    targetMetric: 200, // tonnes CO2
    progress: 47.5, // percentage
    company_type: "flights",
  },
]

// Colors for charts
const COLORS = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"]
const STATUS_COLORS = {
  "In Progress": "bg-red-100 text-red-800",
  Achieved: "bg-green-100 text-green-800",
  "At Risk": "bg-yellow-100 text-yellow-800",
}
const TYPE_COLORS = {
  Environmental: "bg-green-100 text-green-800",
  "Circular Economy": "bg-blue-100 text-blue-800",
  Operational: "bg-purple-100 text-purple-800",
}

export default function AnalyticsPage() {
  const [selectedView, setSelectedView] = useState("all")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [filteredProjects, setFilteredProjects] = useState(projectsData)
  const [selectedCompany, setSelectedCompany] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [currentProject, setCurrentProject] = useState<(typeof projectsData)[0] | null>(null)
  const [simulatedImpact, setSimulatedImpact] = useState<number | null>(null)
  const [simulationActive, setSimulationActive] = useState(false)
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Set default project
    if (projectsData.length > 0 && !selectedProject) {
      setSelectedProject(projectsData[0].id)
      setCurrentProject(projectsData[0])
    }
  }, [isAuthenticated, router, selectedProject])

  useEffect(() => {
    // Filter projects based on selections
    let filtered = projectsData

    if (selectedCompany !== "all") {
      filtered = filtered.filter((project) => project.company.toLowerCase().includes(selectedCompany.toLowerCase()))
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((project) => project.type === selectedType)
    }

    // Filter by view type
    if (selectedView === "solo") {
      filtered = filtered.filter((project) => project.collaborators.length === 0)
    } else if (selectedView === "collaborations") {
      filtered = filtered.filter((project) => project.collaborators.length > 0)
    }

    // Filter by user's company if applicable
    if (user?.email) {
      const userCompany = user.email.includes("@hotels.virgin.com")
        ? "hotels"
        : user.email.includes("@flights.virgin.com")
          ? "flights"
          : null

      if (userCompany && selectedView === "my-company") {
        filtered = filtered.filter((project) => project.company_type === userCompany)
      }
    }

    setFilteredProjects(filtered)
  }, [selectedCompany, selectedType, selectedView, user])

  useEffect(() => {
    // Update current project when selection changes
    if (selectedProject) {
      const project = projectsData.find((p) => p.id === selectedProject)
      if (project) {
        setCurrentProject(project)
        setSimulatedImpact(null)
        setSimulationActive(false)
      }
    }
  }, [selectedProject])

  const handleExportReport = () => {
    if (!currentProject) return

    toast({
      title: "Report Exported",
      description: `Analytics report for ${currentProject.title} has been downloaded.`,
    })
  }

  const handleShareReport = () => {
    if (!currentProject) return

    toast({
      title: "Report Shared",
      description: `Analytics report for ${currentProject.title} has been shared with collaborators.`,
    })
  }

  const handleGenerateStory = () => {
    if (!currentProject) return

    toast({
      title: "Impact Story Generated",
      description: "Your impact story is ready to share with stakeholders.",
    })
  }

  const handleSimulateImpact = () => {
    if (!currentProject) return

    setSimulationActive(true)

    // Calculate a simulated impact (20-40% increase)
    const increase = Math.random() * 0.2 + 0.2
    let metric = 0

    if ("co2Saved" in currentProject.metrics) {
      metric = currentProject.metrics.co2Saved * (1 + increase)
    } else if ("devicesRecycled" in currentProject.metrics) {
      metric = currentProject.metrics.devicesRecycled * (1 + increase)
    } else if ("treesPLanted" in currentProject.metrics) {
      metric = currentProject.metrics.treesPLanted * (1 + increase)
    }

    setSimulatedImpact(Math.round(metric))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  const formatNumber = (num: number) => {
    return num >= 1000000
      ? `${(num / 1000000).toFixed(1)}M`
      : num >= 1000
        ? `${(num / 1000).toFixed(1)}K`
        : num.toString()
  }

  if (!isAuthenticated || !currentProject) {
    return null // Don't render anything while redirecting or loading
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Impact Analytics</h1>
          <p className="text-gray-600">Measure and analyze the impact of sustainability initiatives</p>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-auto flex flex-col md:flex-row gap-2">
          <Select value={selectedView} onValueChange={setSelectedView}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="my-company">My Company</SelectItem>
              <SelectItem value="collaborations">Collaborations</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              <SelectItem value="virgin atlantic">Virgin Atlantic</SelectItem>
              <SelectItem value="virgin voyages">Virgin Voyages</SelectItem>
              <SelectItem value="virgin media">Virgin Media O2</SelectItem>
              <SelectItem value="virgin hotels">Virgin Hotels</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Environmental">Environmental</SelectItem>
              <SelectItem value="Circular Economy">Circular Economy</SelectItem>
              <SelectItem value="Operational">Operational</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar with project list */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader className="bg-red-50 pb-3">
              <CardTitle className="text-red-600">Projects</CardTitle>
              <CardDescription>Select a project to view detailed analytics</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedProject === project.id ? "bg-gray-50 border-l-4 border-red-600" : ""}`}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={STATUS_COLORS[project.status as keyof typeof STATUS_COLORS]}>
                        {project.status}
                      </Badge>
                      <Badge className={TYPE_COLORS[project.type as keyof typeof TYPE_COLORS]}>{project.type}</Badge>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{project.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{project.company}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{formatDate(project.startDate)}</span>
                    </div>
                  </div>
                ))}

                {filteredProjects.length === 0 && (
                  <div className="p-6 text-center text-gray-500">No projects match your current filters</div>
                )}
              </div>
            </CardContent>
          </Card>

          {currentProject && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={handleExportReport}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleShareReport}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share with Team
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleGenerateStory}>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Impact Story
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleSimulateImpact}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Simulate Future Impact
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main content area */}
        <div className="lg:col-span-3 space-y-6">
          {currentProject && (
            <>
              {/* Project overview */}
              <Card>
                <CardHeader className="bg-red-50">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-2xl text-red-600">{currentProject.title}</CardTitle>
                      <CardDescription className="mt-2">{currentProject.description}</CardDescription>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge className={STATUS_COLORS[currentProject.status as keyof typeof STATUS_COLORS]}>
                        {currentProject.status}
                      </Badge>
                      <span className="text-sm text-gray-500 mt-2">{currentProject.company}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Sustainability Score</div>
                      <div className="text-2xl font-bold text-gray-900 flex items-center">
                        {currentProject.metrics.sustainabilityScore}/100
                        <Badge className="ml-2 bg-green-100 text-green-800">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          +5
                        </Badge>
                      </div>
                      <Progress value={currentProject.metrics.sustainabilityScore} className="h-2 mt-2" />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Customer Engagement</div>
                      <div className="text-2xl font-bold text-gray-900 flex items-center">
                        {formatNumber(currentProject.metrics.customerEngagement)}
                        <Badge className="ml-2 bg-green-100 text-green-800">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          +12%
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">People engaged with this initiative</div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Progress to Target</div>
                      <div className="text-2xl font-bold text-gray-900">{currentProject.progress}%</div>
                      <Progress value={currentProject.progress} className="h-2 mt-2" />
                      <div className="text-xs text-gray-500 mt-2">
                        Target completion: {formatDate(currentProject.targetDate)}
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
                    <div className="flex items-center text-yellow-800 font-medium mb-1">
                      <Leaf className="h-4 w-4 mr-2" />
                      Challenge
                    </div>
                    <p className="text-sm text-yellow-700">{currentProject.challenge}</p>
                  </div>

                  {simulationActive && simulatedImpact && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center text-blue-800 font-medium mb-1">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Impact Simulation
                      </div>
                      <p className="text-sm text-blue-700">
                        At the current rate, your project will reach {simulatedImpact}{" "}
                        {"co2Saved" in currentProject.metrics
                          ? "tonnes of CO₂ saved"
                          : "devicesRecycled" in currentProject.metrics
                            ? "devices recycled"
                            : "treesPLanted" in currentProject.metrics
                              ? "trees planted"
                              : "units"}{" "}
                        by {formatDate(currentProject.targetDate)}.
                      </p>
                      <div className="mt-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {Math.round(
                            (simulatedImpact /
                              ("co2Saved" in currentProject.metrics
                                ? currentProject.metrics.co2Saved
                                : "devicesRecycled" in currentProject.metrics
                                  ? currentProject.metrics.devicesRecycled
                                  : "treesPLanted" in currentProject.metrics
                                    ? currentProject.metrics.treesPLanted
                                    : 100) -
                              1) *
                              100,
                          )}
                          % increase
                        </Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Detailed analytics */}
              <Tabs defaultValue="metrics" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="metrics">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Key Metrics
                  </TabsTrigger>
                  <TabsTrigger value="collaboration">
                    <Users className="h-4 w-4 mr-2" />
                    Collaboration Impact
                  </TabsTrigger>
                  <TabsTrigger value="customer">
                    <MapPin className="h-4 w-4 mr-2" />
                    Customer Contributions
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="metrics" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Progress Over Time</CardTitle>
                      <CardDescription>Tracking the main impact metric for this project</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsLineChart
                            data={currentProject.lineChartData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <RechartsTooltip />
                            <Line
                              type="monotone"
                              dataKey={Object.keys(currentProject.lineChartData[0]).filter((k) => k !== "month")[0]}
                              stroke="#e41a1c"
                              strokeWidth={2}
                              activeDot={{ r: 8 }}
                            />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Impact Breakdown</CardTitle>
                      <CardDescription>Detailed breakdown by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart
                            data={currentProject.barChartData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <RechartsTooltip />
                            <Bar
                              dataKey={Object.keys(currentProject.barChartData[0]).filter((k) => k !== "category")[0]}
                              fill="#377eb8"
                            />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="collaboration" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Collaboration Impact</CardTitle>
                      <CardDescription>How collaboration enhances project outcomes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                              <Pie
                                data={currentProject.collaborationImpact.pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {currentProject.collaborationImpact.pieData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Legend />
                            </RechartsPieChart>
                          </ResponsiveContainer>
                        </div>

                        <div className="flex flex-col justify-center">
                          <h3 className="text-lg font-medium mb-4">Collaboration Boost</h3>
                          <div className="space-y-4">
                            <div>
                              <div className="text-sm text-gray-500 mb-1">Solo Impact</div>
                              <div className="text-xl font-bold text-gray-900">
                                {currentProject.collaborationImpact.soloImpact}{" "}
                                {"co2Saved" in currentProject.metrics
                                  ? "tonnes CO₂"
                                  : "devicesRecycled" in currentProject.metrics
                                    ? "devices"
                                    : "treesPLanted" in currentProject.metrics
                                      ? "trees"
                                      : "units"}
                              </div>
                            </div>

                            <div>
                              <div className="text-sm text-gray-500 mb-1">With Collaborators</div>
                              <div className="text-xl font-bold text-gray-900">
                                {currentProject.collaborationImpact.withCollaborators}{" "}
                                {"co2Saved" in currentProject.metrics
                                  ? "tonnes CO₂"
                                  : "devicesRecycled" in currentProject.metrics
                                    ? "devices"
                                    : "treesPLanted" in currentProject.metrics
                                      ? "trees"
                                      : "units"}
                              </div>
                            </div>

                            <div className="pt-2">
                              <Badge className="bg-green-100 text-green-800">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {Math.round(
                                  (currentProject.collaborationImpact.withCollaborators /
                                    currentProject.collaborationImpact.soloImpact -
                                    1) *
                                    100,
                                )}
                                % increase
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator className="my-6" />

                      <div>
                        <h3 className="text-lg font-medium mb-4">Collaborating Companies</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentProject.collaborators.map((collaborator, index) => (
                            <div key={index} className="flex items-center p-3 rounded-md bg-gray-50">
                              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold mr-3">
                                {collaborator.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{collaborator}</div>
                                <div className="text-sm text-gray-500">
                                  {currentProject.collaborationImpact.pieData[index + 1]?.value || 0}{" "}
                                  {"co2Saved" in currentProject.metrics
                                    ? "tonnes CO₂"
                                    : "devicesRecycled" in currentProject.metrics
                                      ? "devices"
                                      : "treesPLanted" in currentProject.metrics
                                        ? "trees"
                                        : "units"}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="customer" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Customer Contributions</CardTitle>
                      <CardDescription>How customers are engaging with this initiative</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Engagement Breakdown</h3>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <RechartsPieChart>
                                <Pie
                                  data={Object.entries(currentProject.customerData).map(([key, value]) => ({
                                    name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
                                    value,
                                  }))}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                >
                                  {Object.keys(currentProject.customerData).map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Legend />
                              </RechartsPieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-4">Key Customer Metrics</h3>
                          <div className="space-y-4">
                            {Object.entries(currentProject.customerData).map(([key, value], index) => (
                              <div key={index} className="bg-gray-50 p-3 rounded-md">
                                <div className="text-sm text-gray-500 mb-1">
                                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                                </div>
                                <div className="text-xl font-bold text-gray-900 flex items-center">
                                  {formatNumber(value)}
                                  <Badge className="ml-2 bg-green-100 text-green-800">
                                    <ArrowUpRight className="h-3 w-3 mr-1" />+{Math.floor(Math.random() * 15 + 5)}%
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Separator className="my-6" />

                      <div>
                        <h3 className="text-lg font-medium mb-4">Customer Impact Stories</h3>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <p className="text-gray-700 italic">
                            "{currentProject.title} has made a significant impact by{" "}
                            {"co2Saved" in currentProject.metrics
                              ? `saving ${currentProject.metrics.co2Saved} tonnes of CO₂`
                              : "devicesRecycled" in currentProject.metrics
                                ? `recycling ${formatNumber(currentProject.metrics.devicesRecycled)} devices`
                                : "treesPLanted" in currentProject.metrics
                                  ? `planting ${currentProject.metrics.treesPLanted} trees`
                                  : "making a positive environmental impact"}
                            . This was achieved with the help of{" "}
                            {formatNumber(currentProject.metrics.customerEngagement)} engaged customers who contributed
                            through various actions."
                          </p>
                          <div className="mt-3 text-right">
                            <Button variant="outline" size="sm" onClick={handleGenerateStory}>
                              <FileText className="mr-2 h-4 w-4" />
                              Generate Full Story
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

