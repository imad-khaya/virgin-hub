"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowUpRight,
  Calendar,
  ChevronDown,
  Edit,
  Filter,
  LineChart,
  Plus,
  Search,
  Tag,
  Trash2,
  Users,
  Sparkles,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
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
} from "recharts"

// Sample data for projects
const initialProjects = {
  hotels: [
    {
      id: 1,
      title: "Sustainable Hotel Operations",
      description: "Comprehensive sustainability program across all Virgin Hotels properties",
      goal: "Reduce carbon emissions by 1,200 tonnes",
      tags: ["carbonreduction", "energy", "water"],
      resourcesNeeded: "Renewable energy solutions, Water conservation technology",
      resourcesOffered: "Best practices in hotel sustainability, Staff training resources",
      customerAction: "Opt for eco-friendly room options",
      status: "In Progress",
      progress: 70,
      currentValue: 850,
      targetValue: 1200,
      unit: "tonnes CO₂",
      startDate: "2023-06-15",
      targetDate: "2024-06-15",
      collaborations: [{ company: "Virgin Atlantic", project: "Flight100 - Sustainable Aviation" }],
      customerImpact: {
        participants: 3500,
        actions: "3,500 eco-stay options selected",
        impact: "15,000 liters of water saved",
      },
      progressData: [
        { month: "Jun", value: 100 },
        { month: "Jul", value: 250 },
        { month: "Aug", value: 400 },
        { month: "Sep", value: 500 },
        { month: "Oct", value: 600 },
        { month: "Nov", value: 700 },
        { month: "Dec", value: 750 },
        { month: "Jan", value: 800 },
        { month: "Feb", value: 850 },
      ],
    },
    {
      id: 2,
      title: "Guest Eco-Engagement Program",
      description: "Incentivizing sustainable choices during hotel stays",
      goal: "Engage 10,000 guests in sustainability actions",
      tags: ["customerengagement", "rewards", "education"],
      resourcesNeeded: "Digital rewards platform, Educational materials",
      resourcesOffered: "Guest feedback data, Engagement metrics",
      customerAction: "Participate in towel reuse program",
      status: "In Progress",
      progress: 35,
      currentValue: 3500,
      targetValue: 10000,
      unit: "guests",
      startDate: "2023-08-01",
      targetDate: "2024-08-01",
      collaborations: [],
      customerImpact: {
        participants: 3500,
        actions: "2,800 towel reuse selections",
        impact: "10,000 liters of water saved",
      },
      progressData: [
        { month: "Aug", value: 500 },
        { month: "Sep", value: 1000 },
        { month: "Oct", value: 1500 },
        { month: "Nov", value: 2000 },
        { month: "Dec", value: 2500 },
        { month: "Jan", value: 3000 },
        { month: "Feb", value: 3500 },
      ],
    },
    {
      id: 3,
      title: "Renewable Energy Transition",
      description: "Converting hotel properties to renewable energy sources",
      goal: "Achieve 100% renewable energy across all properties",
      tags: ["renewableenergy", "carbonreduction", "infrastructure"],
      resourcesNeeded: "Solar installation partners, Energy storage solutions",
      resourcesOffered: "Large-scale implementation data, ROI analysis",
      customerAction: "Learn about our renewable energy journey",
      status: "In Progress",
      progress: 40,
      currentValue: 40,
      targetValue: 100,
      unit: "% renewable",
      startDate: "2023-05-01",
      targetDate: "2025-05-01",
      collaborations: [],
      customerImpact: {
        participants: 1200,
        actions: "1,200 guests learned about renewable energy",
        impact: "Awareness increased by 25%",
      },
      progressData: [
        { month: "May", value: 10 },
        { month: "Jun", value: 15 },
        { month: "Jul", value: 20 },
        { month: "Aug", value: 25 },
        { month: "Sep", value: 30 },
        { month: "Oct", value: 35 },
        { month: "Nov", value: 38 },
        { month: "Dec", value: 39 },
        { month: "Jan", value: 40 },
      ],
    },
  ],
  flights: [
    {
      id: 1,
      title: "Flight100 - Sustainable Aviation",
      description: "World's first 100% sustainable aviation fuel flight from London to New York",
      goal: "Reduce carbon emissions by 10,000 kg through SAF implementation",
      tags: ["sustainableaviation", "carbonreduction", "innovation"],
      resourcesNeeded: "SAF feedstock, Carbon offset partnerships",
      resourcesOffered: "Flight data, SAF implementation expertise",
      customerAction: "Sign up for SAF updates",
      status: "In Progress",
      progress: 10,
      currentValue: 95,
      targetValue: 10000,
      unit: "tonnes CO₂",
      startDate: "2023-11-28",
      targetDate: "2050-12-31",
      collaborations: [
        { company: "Virgin Hotels", project: "Sustainable Hotel Operations" },
        { company: "Virgin Voyages", project: "Mangrove Restoration Project" },
      ],
      customerImpact: {
        participants: 1250,
        actions: "600 signed up for SAF updates",
        impact: "Awareness reached 50,000+ people",
      },
      progressData: [
        { month: "Nov", value: 0 },
        { month: "Dec", value: 25 },
        { month: "Jan", value: 45 },
        { month: "Feb", value: 65 },
        { month: "Mar", value: 95 },
      ],
    },
    {
      id: 2,
      title: "Plastic-to-Plane Initiative",
      description: "Converting recycled plastics into lightweight aircraft components",
      goal: "Incorporate 2,000 kg of recycled plastic into aircraft",
      tags: ["circulareconomy", "wastemanagement", "innovation"],
      resourcesNeeded: "Recycled plastic materials, Manufacturing partners",
      resourcesOffered: "Aircraft design expertise, Testing facilities",
      customerAction: "Track plastic recycling impact",
      status: "In Progress",
      progress: 50,
      currentValue: 1000,
      targetValue: 2000,
      unit: "kg plastic",
      startDate: "2023-09-01",
      targetDate: "2024-09-01",
      collaborations: [{ company: "Virgin Media O2", project: "O2 Recycle Program" }],
      customerImpact: {
        participants: 750,
        actions: "350 tracked plastic recycling",
        impact: "1,000 kg plastic diverted from landfill",
      },
      progressData: [
        { month: "Sep", value: 200 },
        { month: "Oct", value: 400 },
        { month: "Nov", value: 600 },
        { month: "Dec", value: 800 },
        { month: "Jan", value: 900 },
        { month: "Feb", value: 1000 },
      ],
    },
    {
      id: 3,
      title: "Youngest, Cleanest Fleet",
      description: "Modernizing aircraft fleet for maximum fuel efficiency",
      goal: "Achieve 25% fuel reduction across fleet",
      tags: ["fuelefficiency", "carbonreduction", "modernization"],
      resourcesNeeded: "New aircraft technology, Operational optimization",
      resourcesOffered: "Fuel efficiency data, Operational best practices",
      customerAction: "Learn about our fleet modernization",
      status: "In Progress",
      progress: 60,
      currentValue: 15,
      targetValue: 25,
      unit: "% reduction",
      startDate: "2022-01-01",
      targetDate: "2025-12-31",
      collaborations: [],
      customerImpact: {
        participants: 2000,
        actions: "2,000 learned about fleet modernization",
        impact: "Customer satisfaction increased by 15%",
      },
      progressData: [
        { month: "Jan", value: 5 },
        { month: "Mar", value: 7 },
        { month: "May", value: 9 },
        { month: "Jul", value: 11 },
        { month: "Sep", value: 12 },
        { month: "Nov", value: 13 },
        { month: "Jan", value: 14 },
        { month: "Mar", value: 15 },
      ],
    },
  ],
  media: [
    {
      id: 1,
      title: "O2 Recycle Program",
      description: "Comprehensive device recycling program with zero landfill policy",
      goal: "Recycle 4 million devices",
      tags: ["circulareconomy", "ewaste", "recycling"],
      resourcesNeeded: "Collection points, Recycling partners",
      resourcesOffered: "Recycled materials, E-waste processing expertise",
      customerAction: "Sell your old device",
      status: "In Progress",
      progress: 95,
      currentValue: 3800000,
      targetValue: 4000000,
      unit: "devices",
      startDate: "2023-01-10",
      targetDate: "2024-01-10",
      collaborations: [{ company: "Virgin Atlantic", project: "Plastic-to-Plane Initiative" }],
      customerImpact: {
        participants: 5000,
        actions: "3,000 devices recycled by app users",
        impact: "1,500 kg e-waste diverted from landfill",
      },
      progressData: [
        { month: "Jan", value: 3500000 },
        { month: "Feb", value: 3550000 },
        { month: "Mar", value: 3600000 },
        { month: "Apr", value: 3650000 },
        { month: "May", value: 3700000 },
        { month: "Jun", value: 3750000 },
        { month: "Jul", value: 3800000 },
      ],
    },
    {
      id: 2,
      title: "Digital Carbon Reduction",
      description: "Reducing carbon footprint of digital operations and infrastructure",
      goal: "Reduce digital carbon emissions by 50%",
      tags: ["digitalcarbon", "energyefficiency", "carbonreduction"],
      resourcesNeeded: "Green hosting solutions, Energy-efficient hardware",
      resourcesOffered: "Digital carbon measurement tools, Best practices",
      customerAction: "Opt for e-billing",
      status: "In Progress",
      progress: 60,
      currentValue: 30,
      targetValue: 50,
      unit: "% reduction",
      startDate: "2023-03-15",
      targetDate: "2024-12-31",
      collaborations: [],
      customerImpact: {
        participants: 25000,
        actions: "25,000 switched to e-billing",
        impact: "5 tonnes paper saved",
      },
      progressData: [
        { month: "Mar", value: 5 },
        { month: "May", value: 10 },
        { month: "Jul", value: 15 },
        { month: "Sep", value: 20 },
        { month: "Nov", value: 25 },
        { month: "Jan", value: 30 },
      ],
    },
    {
      id: 3,
      title: "Sustainable Packaging Initiative",
      description: "Eliminating single-use plastics from all product packaging",
      goal: "Achieve 100% plastic-free packaging",
      tags: ["packaging", "plasticreduction", "circulareconomy"],
      resourcesNeeded: "Sustainable packaging suppliers, Design expertise",
      resourcesOffered: "Packaging specifications, Consumer feedback",
      customerAction: "Rate our new sustainable packaging",
      status: "Completed",
      progress: 100,
      currentValue: 100,
      targetValue: 100,
      unit: "% plastic-free",
      startDate: "2022-06-01",
      targetDate: "2023-12-31",
      collaborations: [],
      customerImpact: {
        participants: 10000,
        actions: "10,000 rated sustainable packaging",
        impact: "95% positive feedback",
      },
      progressData: [
        { month: "Jun", value: 20 },
        { month: "Aug", value: 40 },
        { month: "Oct", value: 60 },
        { month: "Dec", value: 80 },
        { month: "Feb", value: 90 },
        { month: "Apr", value: 95 },
        { month: "Jun", value: 100 },
      ],
    },
  ],
}

// Available tags for projects
const availableTags = [
  "carbonreduction",
  "sustainableaviation",
  "circulareconomy",
  "renewableenergy",
  "wastemanagement",
  "plasticreduction",
  "ewaste",
  "recycling",
  "energy",
  "water",
  "customerengagement",
  "education",
  "innovation",
  "fuelefficiency",
  "modernization",
  "digitalcarbon",
  "packaging",
]

// Status options
const statusOptions = ["Draft", "In Progress", "Completed", "At Risk"]

// Status colors
const STATUS_COLORS = {
  Draft: "bg-gray-100 text-gray-800",
  "In Progress": "bg-red-100 text-red-800",
  Completed: "bg-green-100 text-green-800",
  "At Risk": "bg-yellow-100 text-yellow-800",
}

// Collaboration suggestions based on project tags
const collaborationSuggestions = {
  carbonreduction: [
    { company: "Virgin Atlantic", project: "Flight100 - Sustainable Aviation" },
    { company: "Virgin Hotels", project: "Sustainable Hotel Operations" },
    { company: "Virgin Media O2", project: "Digital Carbon Reduction" },
  ],
  circulareconomy: [
    { company: "Virgin Media O2", project: "O2 Recycle Program" },
    { company: "Virgin Atlantic", project: "Plastic-to-Plane Initiative" },
  ],
  sustainableaviation: [{ company: "Virgin Voyages", project: "Mangrove Restoration Project" }],
  recycling: [{ company: "Virgin Media O2", project: "O2 Recycle Program" }],
  renewableenergy: [{ company: "Virgin Hotels", project: "Renewable Energy Transition" }],
  customerengagement: [{ company: "Virgin Hotels", project: "Guest Eco-Engagement Program" }],
}

// Customer action suggestions based on project tags
const customerActionSuggestions = {
  carbonreduction: [
    "Sign up for carbon reduction updates",
    "Calculate your carbon footprint",
    "Offset your carbon emissions",
  ],
  circulareconomy: ["Recycle your old device", "Return packaging for reuse", "Choose products with recycled content"],
  sustainableaviation: [
    "Learn about sustainable aviation fuel",
    "Opt for carbon offsetting on your flight",
    "Share SAF facts with friends",
  ],
  recycling: ["Recycle your old device", "Find nearest recycling points", "Track your recycling impact"],
  renewableenergy: [
    "Learn about our renewable energy sources",
    "Take a virtual tour of our solar installation",
    "Share renewable energy facts",
  ],
  customerengagement: [
    "Participate in our sustainability survey",
    "Share your sustainability ideas",
    "Join our eco-ambassador program",
  ],
}

export default function ProjectManager() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // State for projects and form
  const [companyType, setCompanyType] = useState<string>("")
  const [projects, setProjects] = useState<any[]>([])
  const [filteredProjects, setFilteredProjects] = useState<any[]>([])
  const [selectedProject, setSelectedProject] = useState<any | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isCollaborationDialogOpen, setIsCollaborationDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"table" | "card">("table")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [tagFilter, setTagFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [collaborationSuggestion, setCollaborationSuggestion] = useState<any | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    tags: [] as string[],
    resourcesNeeded: "",
    resourcesOffered: "",
    customerAction: "",
    status: "Draft",
    targetValue: "",
    unit: "",
    startDate: "",
    targetDate: "",
  })

  // Impact preview state
  const [impactPreview, setImpactPreview] = useState<string | null>(null)

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

    // Set projects based on company type
    const companyProjects = initialProjects[userCompanyType as keyof typeof initialProjects] || []
    setProjects(companyProjects)
    setFilteredProjects(companyProjects)

    // Set default selected project if available
    if (companyProjects.length > 0) {
      setSelectedProject(companyProjects[0])
    }
  }, [isAuthenticated, router, user])

  // Filter projects when filters change
  useEffect(() => {
    if (!projects.length) return

    let filtered = [...projects]

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter)
    }

    // Apply tag filter
    if (tagFilter !== "all") {
      filtered = filtered.filter((project) => project.tags.includes(tagFilter))
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (project) => project.title.toLowerCase().includes(term) || project.description.toLowerCase().includes(term),
      )
    }

    setFilteredProjects(filtered)
  }, [projects, statusFilter, tagFilter, searchTerm])

  // Generate impact preview based on form data
  useEffect(() => {
    if (!formData.goal || !formData.tags.length) {
      setImpactPreview(null)
      return
    }

    // Generate different previews based on tags
    if (formData.tags.includes("carbonreduction")) {
      setImpactPreview(`This project could help reduce carbon emissions and contribute to Virgin's net-zero goals.`)
    } else if (formData.tags.includes("circulareconomy")) {
      setImpactPreview(
        `This circular economy initiative could divert waste from landfills and conserve valuable resources.`,
      )
    } else if (formData.tags.includes("renewableenergy")) {
      setImpactPreview(`Transitioning to renewable energy could significantly reduce your carbon footprint.`)
    } else {
      setImpactPreview(`This sustainability initiative aligns with Virgin's commitment to positive change.`)
    }
  }, [formData.goal, formData.tags])

  // Generate collaboration suggestions based on form tags
  useEffect(() => {
    if (!formData.tags.length || !isAddDialogOpen) {
      setCollaborationSuggestion(null)
      return
    }

    // Find a matching collaboration suggestion based on tags
    for (const tag of formData.tags) {
      const suggestions = collaborationSuggestions[tag as keyof typeof collaborationSuggestions]
      if (suggestions && suggestions.length) {
        // Filter out suggestions from the same company
        const filteredSuggestions = suggestions.filter((s) => {
          if (companyType === "hotels" && !s.company.includes("Hotels")) return true
          if (companyType === "flights" && !s.company.includes("Atlantic")) return true
          if (companyType === "media" && !s.company.includes("Media")) return true
          return false
        })

        if (filteredSuggestions.length) {
          setCollaborationSuggestion(filteredSuggestions[0])
          return
        }
      }
    }

    setCollaborationSuggestion(null)
  }, [formData.tags, isAddDialogOpen, companyType])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle tag selection
  const handleTagToggle = (tag: string) => {
    setFormData((prev) => {
      const isSelected = prev.tags.includes(tag)

      if (isSelected) {
        return {
          ...prev,
          tags: prev.tags.filter((t) => t !== tag),
        }
      } else {
        return {
          ...prev,
          tags: [...prev.tags, tag],
        }
      }
    })
  }

  // Handle customer action suggestions
  const handleCustomerActionSuggestion = () => {
    if (!formData.tags.length) return

    // Find a matching customer action suggestion based on tags
    for (const tag of formData.tags) {
      const suggestions = customerActionSuggestions[tag as keyof typeof customerActionSuggestions]
      if (suggestions && suggestions.length) {
        setFormData((prev) => ({
          ...prev,
          customerAction: suggestions[0],
        }))
        return
      }
    }
  }

  // Reset form data
  const resetFormData = () => {
    setFormData({
      title: "",
      description: "",
      goal: "",
      tags: [],
      resourcesNeeded: "",
      resourcesOffered: "",
      customerAction: "",
      status: "Draft",
      targetValue: "",
      unit: "",
      startDate: "",
      targetDate: "",
    })
  }

  // Populate form with project data for editing
  const populateFormForEdit = (project: any) => {
    setFormData({
      title: project.title,
      description: project.description,
      goal: project.goal,
      tags: project.tags,
      resourcesNeeded: project.resourcesNeeded,
      resourcesOffered: project.resourcesOffered,
      customerAction: project.customerAction,
      status: project.status,
      targetValue: project.targetValue.toString(),
      unit: project.unit,
      startDate: project.startDate,
      targetDate: project.targetDate,
    })
  }

  // Handle add project submission
  const handleAddProject = () => {
    // Validate form
    if (!formData.title || !formData.description || !formData.goal) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Create new project
    const newProject = {
      id: projects.length + 1,
      title: formData.title,
      description: formData.description,
      goal: formData.goal,
      tags: formData.tags,
      resourcesNeeded: formData.resourcesNeeded,
      resourcesOffered: formData.resourcesOffered,
      customerAction: formData.customerAction,
      status: formData.status,
      progress: 0,
      currentValue: 0,
      targetValue: Number.parseInt(formData.targetValue) || 100,
      unit: formData.unit,
      startDate: formData.startDate,
      targetDate: formData.targetDate,
      collaborations: [],
      customerImpact: {
        participants: 0,
        actions: "No actions yet",
        impact: "No impact yet",
      },
      progressData: [{ month: new Date().toLocaleString("default", { month: "short" }), value: 0 }],
    }

    // Add to projects
    setProjects((prev) => [...prev, newProject])

    // Show success message
    toast({
      title: "Project Created",
      description: "Your new project has been created successfully.",
    })

    // Reset form and close dialog
    resetFormData()
    setIsAddDialogOpen(false)

    // Show collaboration suggestion if available
    if (collaborationSuggestion) {
      setIsCollaborationDialogOpen(true)
    }
  }

  // Handle edit project submission
  const handleEditProject = () => {
    if (!selectedProject) return

    // Validate form
    if (!formData.title || !formData.description || !formData.goal) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Update project
    const updatedProjects = projects.map((project) => {
      if (project.id === selectedProject.id) {
        return {
          ...project,
          title: formData.title,
          description: formData.description,
          goal: formData.goal,
          tags: formData.tags,
          resourcesNeeded: formData.resourcesNeeded,
          resourcesOffered: formData.resourcesOffered,
          customerAction: formData.customerAction,
          status: formData.status,
          targetValue: Number.parseInt(formData.targetValue) || project.targetValue,
          unit: formData.unit,
          startDate: formData.startDate,
          targetDate: formData.targetDate,
        }
      }
      return project
    })

    // Update state
    setProjects(updatedProjects)
    setSelectedProject(updatedProjects.find((p) => p.id === selectedProject.id))

    // Show success message
    toast({
      title: "Project Updated",
      description: "Your project has been updated successfully.",
    })

    // Reset form and close dialog
    resetFormData()
    setIsEditDialogOpen(false)
  }

  // Handle delete project
  const handleDeleteProject = () => {
    if (!selectedProject) return

    // Remove project
    const updatedProjects = projects.filter((project) => project.id !== selectedProject.id)

    // Update state
    setProjects(updatedProjects)
    setSelectedProject(updatedProjects.length ? updatedProjects[0] : null)

    // Show success message
    toast({
      title: "Project Deleted",
      description: "Your project has been deleted successfully.",
    })

    // Close dialog
    setIsDeleteDialogOpen(false)
  }

  // Handle collaboration request
  const handleCollaborationRequest = () => {
    if (!collaborationSuggestion) return

    // Show success message
    toast({
      title: "Collaboration Request Sent",
      description: `Your request to collaborate with ${collaborationSuggestion.company} has been sent.`,
    })

    // Close dialog
    setIsCollaborationDialogOpen(false)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  // Get company display name
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

  if (!isAuthenticated) {
    return null // Don't render anything while redirecting
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-red-600 mb-2">Project Management</h1>
          <p className="text-gray-600">Create, edit, and monitor your sustainability initiatives</p>
        </div>

        <Button
          className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700"
          onClick={() => {
            resetFormData()
            setIsAddDialogOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={tagFilter} onValueChange={setTagFilter}>
              <SelectTrigger className="w-[180px]">
                <Tag className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {availableTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    #{tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setViewMode("table")}>Table View</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setViewMode("card")}>Card View</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects list */}
        <div className="lg:col-span-2">
          {viewMode === "table" ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Goal</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                      <TableRow
                        key={project.id}
                        className={`cursor-pointer ${selectedProject?.id === project.id ? "bg-gray-50" : ""}`}
                        onClick={() => setSelectedProject(project)}
                      >
                        <TableCell>
                          <div>
                            <div className="font-medium">{project.title}</div>
                            <div className="text-sm text-gray-500 truncate max-w-[250px]">{project.description}</div>
                            {project.collaborations.length > 0 && (
                              <Badge variant="outline" className="mt-1 bg-blue-50 text-blue-800">
                                Collaborating with {project.collaborations[0].company}
                                {project.collaborations.length > 1 && ` +${project.collaborations.length - 1}`}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={STATUS_COLORS[project.status as keyof typeof STATUS_COLORS]}>
                            {project.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">{project.progress}%</div>
                            <Progress value={project.progress} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {project.currentValue} / {project.targetValue} {project.unit}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedProject(project)
                                populateFormForEdit(project)
                                setIsEditDialogOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedProject(project)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="text-gray-500">No projects found</div>
                        <Button
                          variant="outline"
                          className="mt-2"
                          onClick={() => {
                            setSearchTerm("")
                            setStatusFilter("all")
                            setTagFilter("all")
                          }}
                        >
                          Clear Filters
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <Card
                    key={project.id}
                    className={`cursor-pointer ${selectedProject?.id === project.id ? "border-red-200 shadow-md" : ""}`}
                    onClick={() => setSelectedProject(project)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge className={STATUS_COLORS[project.status as keyof typeof STATUS_COLORS]}>
                          {project.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedProject(project)
                              populateFormForEdit(project)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedProject(project)
                              setIsDeleteDialogOpen(true)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardTitle className="text-lg mt-2">{project.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>

                        <div className="text-sm">
                          <span className="font-medium">Goal:</span> {project.currentValue} / {project.targetValue}{" "}
                          {project.unit}
                        </div>

                        {project.collaborations.length > 0 && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-800">
                            Collaborating with {project.collaborations[0].company}
                            {project.collaborations.length > 1 && ` +${project.collaborations.length - 1}`}
                          </Badge>
                        )}

                        <div className="flex flex-wrap gap-1">
                          {project.tags.slice(0, 3).map((tag: string) => (
                            <Badge key={tag} variant="outline" className="bg-gray-100">
                              #{tag}
                            </Badge>
                          ))}
                          {project.tags.length > 3 && (
                            <Badge variant="outline" className="bg-gray-100">
                              +{project.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 bg-white rounded-lg shadow p-8 text-center">
                  <div className="text-gray-500">No projects found</div>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      setSearchTerm("")
                      setStatusFilter("all")
                      setTagFilter("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Project details sidebar */}
        <div className="space-y-6">
          {selectedProject ? (
            <>
              <Card>
                <CardHeader className="bg-red-50">
                  <CardTitle>{selectedProject.title}</CardTitle>
                  <CardDescription>{selectedProject.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Goal</h3>
                    <p>{selectedProject.goal}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Progress</h3>
                    <div className="flex items-center gap-2">
                      <Progress value={selectedProject.progress} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{selectedProject.progress}%</span>
                    </div>
                    <div className="text-sm mt-1">
                      {selectedProject.currentValue} / {selectedProject.targetValue} {selectedProject.unit}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Timeline</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>
                        {formatDate(selectedProject.startDate)} - {formatDate(selectedProject.targetDate)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Tags</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedProject.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="bg-gray-100">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedProject.collaborations.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Collaborations</h3>
                      <div className="space-y-2">
                        {selectedProject.collaborations.map((collab: any, index: number) => (
                          <div key={index} className="flex items-center p-2 rounded-md bg-blue-50">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                              {collab.company.charAt(0)}
                            </div>
                            <div>
                              <div className="text-sm font-medium">{collab.company}</div>
                              <div className="text-xs text-gray-500">{collab.project}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Resources</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs text-gray-500">Needed:</span>
                        <p className="text-sm">{selectedProject.resourcesNeeded}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Offered:</span>
                        <p className="text-sm">{selectedProject.resourcesOffered}</p>
                      </div>
                    </div>
                  </div>

                  {selectedProject.customerAction && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Customer Action</h3>
                      <p className="text-sm">{selectedProject.customerAction}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={selectedProject.progressData}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <RechartsTooltip />
                        <Line type="monotone" dataKey="value" stroke="#e41a1c" strokeWidth={2} activeDot={{ r: 8 }} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Customer Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center text-gray-500 mb-1">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-sm">Participants</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {selectedProject.customerImpact.participants.toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Actions</h3>
                    <p className="text-sm">{selectedProject.customerImpact.actions}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Impact</h3>
                    <p className="text-sm">{selectedProject.customerImpact.impact}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/analytics")}>
                    <LineChart className="mr-2 h-4 w-4" />
                    View Detailed Analytics
                  </Button>
                </CardFooter>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <div className="text-gray-500 mb-4">Select a project to view details</div>
                {filteredProjects.length === 0 && projects.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setStatusFilter("all")
                      setTagFilter("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Add Project Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>Create a new sustainability project for {getCompanyDisplayName()}</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Project Details</TabsTrigger>
              <TabsTrigger value="engagement">Customer Engagement</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Flight100 - Sustainable Aviation"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your sustainability initiative"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Project Goal</Label>
                <Input
                  id="goal"
                  name="goal"
                  placeholder="e.g., Reduce carbon emissions by 10,000 kg"
                  value={formData.goal}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetValue">Target Value</Label>
                  <Input
                    id="targetValue"
                    name="targetValue"
                    type="number"
                    placeholder="e.g., 10000"
                    value={formData.targetValue}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    name="unit"
                    placeholder="e.g., kg CO₂, devices, trees"
                    value={formData.unit}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetDate">Target Date</Label>
                  <Input
                    id="targetDate"
                    name="targetDate"
                    type="date"
                    value={formData.targetDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  name="status"
                  value={formData.status}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Tags (select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableTags.map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tag-${tag}`}
                        checked={formData.tags.includes(tag)}
                        onCheckedChange={() => handleTagToggle(tag)}
                      />
                      <label
                        htmlFor={`tag-${tag}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        #{tag}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="resourcesNeeded">Resources Needed</Label>
                <Textarea
                  id="resourcesNeeded"
                  name="resourcesNeeded"
                  placeholder="What resources do you need for this project?"
                  rows={2}
                  value={formData.resourcesNeeded}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resourcesOffered">Resources Offered</Label>
                <Textarea
                  id="resourcesOffered"
                  name="resourcesOffered"
                  placeholder="What resources can you offer to potential collaborators?"
                  rows={2}
                  value={formData.resourcesOffered}
                  onChange={handleInputChange}
                />
              </div>

              {impactPreview && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center text-blue-800 font-medium mb-1">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Impact Preview
                  </div>
                  <p className="text-sm text-blue-700">{impactPreview}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="engagement" className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="customerAction">Customer Action</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCustomerActionSuggestion}
                    disabled={formData.tags.length === 0}
                  >
                    Suggest Action
                  </Button>
                </div>
                <Textarea
                  id="customerAction"
                  name="customerAction"
                  placeholder="What action can customers take to support this project?"
                  rows={3}
                  value={formData.customerAction}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-gray-500">
                  This action will be displayed in the mobile app for customers to participate
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <div className="flex items-center text-yellow-800 font-medium mb-1">
                  <Users className="h-4 w-4 mr-2" />
                  Customer Engagement Tips
                </div>
                <ul className="text-sm text-yellow-700 space-y-1 ml-6 list-disc">
                  <li>Make actions specific and achievable</li>
                  <li>Clearly explain the impact of participation</li>
                  <li>Consider offering rewards or recognition</li>
                  <li>Make it shareable on social media</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleAddProject}>
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Update your sustainability project details</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Project Details</TabsTrigger>
              <TabsTrigger value="engagement">Customer Engagement</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Project Title</Label>
                <Input id="edit-title" name="title" value={formData.title} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-goal">Project Goal</Label>
                <Input id="edit-goal" name="goal" value={formData.goal} onChange={handleInputChange} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-targetValue">Target Value</Label>
                  <Input
                    id="edit-targetValue"
                    name="targetValue"
                    type="number"
                    value={formData.targetValue}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-unit">Unit</Label>
                  <Input id="edit-unit" name="unit" value={formData.unit} onChange={handleInputChange} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-startDate">Start Date</Label>
                  <Input
                    id="edit-startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-targetDate">Target Date</Label>
                  <Input
                    id="edit-targetDate"
                    name="targetDate"
                    type="date"
                    value={formData.targetDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  name="status"
                  value={formData.status}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Tags (select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableTags.map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-tag-${tag}`}
                        checked={formData.tags.includes(tag)}
                        onCheckedChange={() => handleTagToggle(tag)}
                      />
                      <label
                        htmlFor={`edit-tag-${tag}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        #{tag}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-resourcesNeeded">Resources Needed</Label>
                <Textarea
                  id="edit-resourcesNeeded"
                  name="resourcesNeeded"
                  rows={2}
                  value={formData.resourcesNeeded}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-resourcesOffered">Resources Offered</Label>
                <Textarea
                  id="edit-resourcesOffered"
                  name="resourcesOffered"
                  rows={2}
                  value={formData.resourcesOffered}
                  onChange={handleInputChange}
                />
              </div>
            </TabsContent>

            <TabsContent value="engagement" className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="edit-customerAction">Customer Action</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCustomerActionSuggestion}
                    disabled={formData.tags.length === 0}
                  >
                    Suggest Action
                  </Button>
                </div>
                <Textarea
                  id="edit-customerAction"
                  name="customerAction"
                  rows={3}
                  value={formData.customerAction}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-gray-500">
                  This action will be displayed in the mobile app for customers to participate
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleEditProject}>
              Update Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedProject && (
            <div className="py-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <h3 className="font-medium text-red-800 mb-1">{selectedProject.title}</h3>
                <p className="text-sm text-red-700">{selectedProject.description}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProject}>
              Delete Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Collaboration Suggestion Dialog */}
      <Dialog open={isCollaborationDialogOpen} onOpenChange={setIsCollaborationDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Collaboration Opportunity</DialogTitle>
            <DialogDescription>We've found a potential collaboration that matches your project</DialogDescription>
          </DialogHeader>

          {collaborationSuggestion && (
            <div className="py-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                <div className="flex items-center text-blue-800 font-medium mb-2">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Suggested Collaboration
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{collaborationSuggestion.project}</h3>
                <p className="text-sm text-gray-700 mb-2">by {collaborationSuggestion.company}</p>
                <Badge className="bg-green-100 text-green-800">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  Strong Match
                </Badge>
              </div>

              <div className="space-y-2">
                <p className="text-sm">
                  This project aligns well with your initiative. Would you like to reach out to{" "}
                  {collaborationSuggestion.company} to explore collaboration opportunities?
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCollaborationDialogOpen(false)}>
              Not Now
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleCollaborationRequest}>
              Send Collaboration Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

