"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Bell,
  ChevronRight,
  Edit,
  FlameIcon as Fire,
  Leaf,
  MessageSquare,
  Recycle,
  Share2,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"

// Sample data for the dashboard
const projectsData = {
  hotels: [
    {
      id: 1,
      title: "Sustainable Hotel Operations",
      description: "Comprehensive sustainability program across all Virgin Hotels properties",
      status: "In Progress",
      keyMetric: "850 tonnes CO₂ saved",
      progress: 70,
      progressLabel: "to 1,200 tonnes goal",
      type: "Environmental",
    },
    {
      id: 3,
      title: "Guest Eco-Engagement Program",
      description: "Incentivizing sustainable choices during hotel stays",
      status: "In Progress",
      keyMetric: "3,500 guests participated",
      progress: 35,
      progressLabel: "to 10,000 guests goal",
      type: "Customer Engagement",
    },
    {
      id: 5,
      title: "Renewable Energy Transition",
      description: "Converting hotel properties to renewable energy sources",
      status: "In Progress",
      keyMetric: "40% energy from renewables",
      progress: 40,
      progressLabel: "to 100% renewable goal",
      type: "Environmental",
    },
  ],
  flights: [
    {
      id: 2,
      title: "Flight100 - Sustainable Aviation",
      description: "World's first 100% sustainable aviation fuel flight from London to New York",
      status: "In Progress",
      keyMetric: "95 tonnes CO₂ saved",
      progress: 10,
      progressLabel: "to 2050 net-zero goal",
      type: "Environmental",
    },
    {
      id: 4,
      title: "Plastic-to-Plane Initiative",
      description: "Converting recycled plastics into lightweight aircraft components",
      status: "In Progress",
      keyMetric: "1,000 kg plastic recycled",
      progress: 50,
      progressLabel: "to 2,000 kg goal",
      type: "Circular Economy",
    },
    {
      id: 6,
      title: "Youngest, Cleanest Fleet",
      description: "Modernizing aircraft fleet for maximum fuel efficiency",
      status: "In Progress",
      keyMetric: "15% fuel reduction achieved",
      progress: 60,
      progressLabel: "to 25% reduction goal",
      type: "Operational",
    },
  ],
  media: [
    {
      id: 7,
      title: "O2 Recycle Program",
      description: "Comprehensive device recycling program with zero landfill policy",
      status: "In Progress",
      keyMetric: "3.8M devices recycled",
      progress: 95,
      progressLabel: "to 4M devices goal",
      type: "Circular Economy",
    },
    {
      id: 8,
      title: "Digital Carbon Reduction",
      description: "Reducing carbon footprint of digital operations and infrastructure",
      status: "In Progress",
      keyMetric: "30% emissions reduction",
      progress: 60,
      progressLabel: "to 50% reduction goal",
      type: "Environmental",
    },
    {
      id: 9,
      title: "Sustainable Packaging Initiative",
      description: "Eliminating single-use plastics from all product packaging",
      status: "Completed",
      keyMetric: "100% plastic-free packaging",
      progress: 100,
      progressLabel: "goal achieved",
      type: "Circular Economy",
    },
  ],
}

const collaborationSuggestions = {
  hotels: [
    {
      id: 1,
      projectTitle: "Flight100 - Sustainable Aviation",
      company: "Virgin Atlantic",
      matchReason: "Offer carbon offsets from your hotel operations to support SAF initiatives",
      matchPercentage: 95,
      isHotMatch: true,
    },
    {
      id: 2,
      projectTitle: "O2 Recycle Program",
      company: "Virgin Media O2",
      matchReason: "Implement device recycling stations in hotel properties",
      matchPercentage: 85,
      isHotMatch: true,
    },
    {
      id: 3,
      projectTitle: "Digital Carbon Reduction",
      company: "Virgin Media O2",
      matchReason: "Share best practices for reducing digital carbon footprint",
      matchPercentage: 70,
      isHotMatch: false,
    },
  ],
  flights: [
    {
      id: 1,
      projectTitle: "Sustainable Hotel Operations",
      company: "Virgin Hotels",
      matchReason: "Combine carbon reduction efforts for joint reporting and offsetting",
      matchPercentage: 95,
      isHotMatch: true,
    },
    {
      id: 2,
      projectTitle: "O2 Recycle Program",
      company: "Virgin Media O2",
      matchReason: "Source recycled materials for aircraft components",
      matchPercentage: 90,
      isHotMatch: true,
    },
    {
      id: 3,
      projectTitle: "Mangrove Restoration Project",
      company: "Virgin Voyages",
      matchReason: "Offset flight emissions with mangrove carbon sequestration",
      matchPercentage: 85,
      isHotMatch: true,
    },
  ],
  media: [
    {
      id: 1,
      projectTitle: "Plastic-to-Plane Initiative",
      company: "Virgin Atlantic",
      matchReason: "Supply recycled electronic components for aircraft use",
      matchPercentage: 90,
      isHotMatch: true,
    },
    {
      id: 2,
      projectTitle: "Guest Eco-Engagement Program",
      company: "Virgin Hotels",
      matchReason: "Create joint digital rewards program for sustainable choices",
      matchPercentage: 80,
      isHotMatch: true,
    },
    {
      id: 3,
      projectTitle: "Youngest, Cleanest Fleet",
      company: "Virgin Atlantic",
      matchReason: "Provide connectivity solutions for fuel efficiency monitoring",
      matchPercentage: 75,
      isHotMatch: false,
    },
  ],
}

const customerEngagement = {
  hotels: {
    totalParticipants: 3500,
    topActivities: [
      { name: "Eco-stay options", count: 2000, percentage: 57 },
      { name: "Towel reuse", count: 800, percentage: 23 },
      { name: "Feedback submitted", count: 700, percentage: 20 },
    ],
    impact: "15,000 liters of water saved",
    topReward: "Eco Traveler Badge (earned by 250 guests)",
  },
  flights: {
    totalParticipants: 1250,
    topActivities: [
      { name: "SAF information", count: 600, percentage: 48 },
      { name: "Carbon calculator", count: 350, percentage: 28 },
      { name: "Social shares", count: 300, percentage: 24 },
    ],
    impact: "Awareness reached 50,000+ people",
    topReward: "Climate Champion Badge (earned by 100 users)",
  },
  media: {
    totalParticipants: 5000,
    topActivities: [
      { name: "Devices recycled", count: 3000, percentage: 60 },
      { name: "Referrals", count: 1200, percentage: 24 },
      { name: "Feedback submitted", count: 800, percentage: 16 },
    ],
    impact: "1,500 kg e-waste diverted from landfill",
    topReward: "Recycle Star Badge (earned by 500 users)",
  },
}

const notifications = {
  hotels: [
    { id: 1, message: "Virgin Atlantic sent a collaboration request for Flight100", time: "2h ago", isRead: false },
    { id: 2, message: "Sustainable Hotel Operations hit 850 tonnes CO₂ saved", time: "1d ago", isRead: true },
    {
      id: 3,
      message: "Virgin Media O2 wants to implement recycling stations in hotels",
      time: "3h ago",
      isRead: false,
    },
  ],
  flights: [
    {
      id: 1,
      message: "Virgin Hotels sent a collaboration request for carbon offsetting",
      time: "3h ago",
      isRead: false,
    },
    { id: 2, message: "Flight100 hit 95 tonnes CO₂ saved milestone", time: "1d ago", isRead: true },
    { id: 3, message: "Virgin Voyages' mangrove project reached 1,000 trees", time: "12h ago", isRead: false },
  ],
  media: [
    {
      id: 1,
      message: "Virgin Atlantic wants to source recycled materials for aircraft",
      time: "1h ago",
      isRead: false,
    },
    { id: 2, message: "O2 Recycle Program reached 3.8M devices recycled", time: "6h ago", isRead: true },
    {
      id: 3,
      message: "Virgin Hotels interested in digital rewards program collaboration",
      time: "2d ago",
      isRead: false,
    },
  ],
}

const impactData = {
  hotels: {
    co2Saved: 850,
    waterSaved: 15000000,
    wasteReduced: 25000,
  },
  flights: {
    co2Saved: 1200,
    fuelSaved: 500000,
    plasticReduced: 10000,
  },
  media: {
    co2Saved: 750,
    devicesRecycled: 3800000,
    paperSaved: 120000,
  },
}

const STATUS_COLORS = {
  "In Progress": "bg-red-100 text-red-800",
  Completed: "bg-green-100 text-green-800",
  "At Risk": "bg-yellow-100 text-yellow-800",
}

const TYPE_COLORS = {
  Environmental: "bg-green-100 text-green-800",
  "Circular Economy": "bg-blue-100 text-blue-800",
  Operational: "bg-purple-100 text-purple-800",
  "Customer Engagement": "bg-orange-100 text-orange-800",
}

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0)
  const [companyProjects, setCompanyProjects] = useState<any[]>([])
  const [companySuggestions, setCompanySuggestions] = useState<any[]>([])
  const [companyNotifications, setCompanyNotifications] = useState<any[]>([])
  const [companyEngagement, setCompanyEngagement] = useState<any>(null)
  const [companyImpact, setCompanyImpact] = useState<any>(null)
  const [companyType, setCompanyType] = useState<string>("")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Determine company type from email
    const userCompanyType = user?.email.includes("@hotels.virgin.com")
      ? "hotels"
      : user?.email.includes("@flights.virgin.com")
        ? "flights"
        : "media"

    setCompanyType(userCompanyType)

    // Set company-specific data
    setCompanyProjects(projectsData[userCompanyType as keyof typeof projectsData] || [])
    setCompanySuggestions(collaborationSuggestions[userCompanyType as keyof typeof collaborationSuggestions] || [])
    setCompanyNotifications(notifications[userCompanyType as keyof typeof notifications] || [])
    setCompanyEngagement(customerEngagement[userCompanyType as keyof typeof customerEngagement])
    setCompanyImpact(impactData[userCompanyType as keyof typeof impactData])

    // Count unread notifications
    const unreadCount =
      notifications[userCompanyType as keyof typeof notifications]?.filter((n) => !n.isRead).length || 0
    setUnreadNotifications(unreadCount)
  }, [isAuthenticated, router, user])

  const handleCollaborationRequest = (suggestion: any) => {
    toast({
      title: "Collaboration Request Sent",
      description: `Your request to collaborate with ${suggestion.company} on ${suggestion.projectTitle} has been sent.`,
    })
  }

  const handleNotificationRead = (id: number) => {
    setCompanyNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
    setUnreadNotifications((prev) => Math.max(0, prev - 1))
  }

  const formatNumber = (num: number) => {
    return num >= 1000000
      ? `${(num / 1000000).toFixed(1)}M`
      : num >= 1000
        ? `${(num / 1000).toFixed(1)}K`
        : num.toString()
  }

  const getCompanyDisplayName = () => {
    switch (companyType) {
      case "hotels":
        return "Virgin Hotels"
      case "flights":
        return "Virgin Atlantic"
      case "media":
        return "Virgin Media O2"
      default:
        return "Virgin Company"
    }
  }

  const getImpactMetric = () => {
    if (!companyImpact) return ""

    switch (companyType) {
      case "hotels":
        return `${companyImpact.co2Saved.toLocaleString()} tonnes CO₂ saved, ${(companyImpact.waterSaved / 1000000).toFixed(1)}M liters water saved`
      case "flights":
        return `${companyImpact.co2Saved.toLocaleString()} tonnes CO₂ saved, ${(companyImpact.fuelSaved / 1000).toFixed(0)}K liters fuel saved`
      case "media":
        return `${companyImpact.co2Saved.toLocaleString()} tonnes CO₂ saved, ${(companyImpact.devicesRecycled / 1000000).toFixed(1)}M devices recycled`
      default:
        return ""
    }
  }

  if (!isAuthenticated || !companyEngagement) {
    return null // Don't render anything while redirecting or loading
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Header with welcome message and impact snapshot */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-red-600 mb-2">Welcome to {getCompanyDisplayName()} Hub</h1>
          <p className="text-gray-600">Manage your sustainability initiatives and collaborations in one place</p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center">
          {/* Notifications dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative mr-4">
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600 text-xs text-white flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {companyNotifications.length > 0 ? (
                companyNotifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`py-3 cursor-pointer ${!notification.isRead ? "bg-gray-50 font-medium" : ""}`}
                    onClick={() => handleNotificationRead(notification.id)}
                  >
                    <div className="flex flex-col">
                      <span>{notification.message}</span>
                      <span className="text-xs text-gray-500 mt-1">{notification.time}</span>
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>No notifications</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Impact snapshot */}
          <div className="bg-red-50 px-4 py-2 rounded-lg border border-red-100 flex items-center">
            <Leaf className="h-5 w-5 text-red-600 mr-2" />
            <div>
              <div className="text-xs text-red-600 font-medium">Total Company Impact</div>
              <div className="text-sm">{getImpactMetric()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column - My Projects Overview */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">My Projects Overview</h2>
            <Link href="/dashboard/goals" passHref>
              <Button variant="ghost" size="sm" className="text-red-600">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {companyProjects.map((project) => (
              <Card key={project.id} className="group relative overflow-hidden">
                {/* Quick actions on hover */}
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-white">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-white">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge className={STATUS_COLORS[project.status as keyof typeof STATUS_COLORS]}>
                      {project.status}
                    </Badge>
                    <Badge className={TYPE_COLORS[project.type as keyof typeof TYPE_COLORS]}>{project.type}</Badge>
                  </div>
                  <CardTitle className="mt-2">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-red-600">{project.keyMetric}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {project.progress}% {project.progressLabel}
                      </span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href={`/dashboard/goals/${project.id}`} passHref className="w-full">
                    <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Link href="/dashboard/add-goal" passHref>
            <Button className="w-full bg-red-600 hover:bg-red-700">Add New Project</Button>
          </Link>
        </div>

        {/* Right column - Collaboration Suggestions and Customer Engagement */}
        <div className="space-y-6">
          {/* Collaboration Suggestions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Collaboration Suggestions</h2>
              <Link href="/dashboard/discover" passHref>
                <Button variant="ghost" size="sm" className="text-red-600">
                  Discover More <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {companySuggestions.slice(0, 3).map((suggestion) => (
                <Card key={suggestion.id} className="relative overflow-hidden">
                  {suggestion.isHotMatch && (
                    <div className="absolute top-0 right-0">
                      <Badge className="bg-orange-100 text-orange-800 rounded-tl-none rounded-br-none">
                        <Fire className="h-3 w-3 mr-1" /> Hot Match
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-blue-100 text-blue-800">{suggestion.company}</Badge>
                      <div className="text-sm font-medium text-green-600">{suggestion.matchPercentage}% Match</div>
                    </div>
                    <CardTitle className="mt-2 text-lg">{suggestion.projectTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{suggestion.matchReason}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700"
                      onClick={() => handleCollaborationRequest(suggestion)}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Customer Engagement Metrics */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Customer Engagement</h2>
              <Link href="/dashboard/analytics" passHref>
                <Button variant="ghost" size="sm" className="text-red-600">
                  View Analytics <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Engagement Overview</CardTitle>
                <CardDescription>How customers are contributing to your sustainability goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-500 mb-1">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-sm">Total Participants</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatNumber(companyEngagement.totalParticipants)}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-500 mb-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm">Impact</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{companyEngagement.impact}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Top Activities</h3>
                  <div className="space-y-2">
                    {companyEngagement.topActivities.map((activity: any, index: number) => (
                      <div key={index} className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-600 h-2 rounded-full"
                            style={{ width: `${activity.percentage}%` }}
                          ></div>
                        </div>
                        <div className="ml-3 min-w-[100px] text-sm">
                          {activity.name}: {activity.count}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                  <div className="flex items-center text-yellow-800 mb-1">
                    <Sparkles className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Top Customer Reward</span>
                  </div>
                  <p className="text-sm text-yellow-700">{companyEngagement.topReward}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/analytics" passHref className="w-full">
                  <Button variant="outline" className="w-full">
                    <Recycle className="mr-2 h-4 w-4" />
                    View Detailed Analytics
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

