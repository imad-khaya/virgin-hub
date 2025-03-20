"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart,
  Flag,
  Home,
  ListTodo,
  LogOut,
  Menu,
  Settings,
  Target,
  Users,
  Sparkles,
  LineChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/lib/auth-context"

export default function AppSidebar() {
  const pathname = usePathname()
  const { isMobile } = useSidebar()
  const { user, logout } = useAuth()
  const router = useRouter()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  // Determine company type from email
  const companyType = user?.email?.includes("@hotels.virgin.com")
    ? "Virgin Hotels"
    : user?.email?.includes("@flights.virgin.com")
      ? "Virgin Flights"
      : "Virgin Company"

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-gray-200 py-3">
        <div className="flex items-center px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-red-600 flex items-center justify-center">
              <Flag className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-red-600">{companyType}</span>
          </div>
          {isMobile && (
            <SidebarTrigger className="ml-auto">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
              <Link href="/dashboard">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/goals")}>
              <Link href="/dashboard/goals">
                <Target className="h-5 w-5" />
                <span>View Goals</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/add-goal")}>
              <Link href="/dashboard/add-goal">
                <ListTodo className="h-5 w-5" />
                <span>Add Goal</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/discover")}>
              <Link href="/dashboard/discover">
                <Sparkles className="h-5 w-5" />
                <span>Discover & Connect</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/analytics")}>
              <Link href="/dashboard/analytics">
                <LineChart className="h-5 w-5" />
                <span>Impact Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <BarChart className="h-5 w-5" />
                <span>Reports</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <Users className="h-5 w-5" />
                <span>Subcompanies</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-gray-200 p-4">
        {user && (
          <div className="mb-4 px-2 py-3 rounded-md bg-gray-100">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        )}
        <Button variant="outline" className="w-full justify-start text-gray-600" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

