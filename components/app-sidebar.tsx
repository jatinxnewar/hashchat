"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  MessageSquare,
  Users,
  Settings,
  Shield,
  Clock,
  Bell,
  User,
  LogOut,
  ChevronDown,
  Lock,
  Archive,
  Star,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const menuItems = [
  {
    title: "Messages",
    url: "/dashboard",
    icon: MessageSquare,
    badge: 5,
  },
  {
    title: "Groups",
    url: "/groups",
    icon: Users,
    badge: 2,
  },
  {
    title: "Scheduled",
    url: "/scheduled",
    icon: Clock,
    badge: 3,
  },
  {
    title: "Archived",
    url: "/archived",
    icon: Archive,
  },
  {
    title: "Starred",
    url: "/starred",
    icon: Star,
  },
]

const securityItems = [
  {
    title: "Encryption",
    url: "/encryption",
    icon: Shield,
  },
  {
    title: "Privacy",
    url: "/privacy",
    icon: Lock,
  },
]

const settingsItems = [
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <Sidebar className="fixed left-0 top-0 h-screen w-64 border-r border-primary-200 bg-white/95 backdrop-blur-sm dark:bg-black/95 dark:border-gray-800 z-50">
      <SidebarHeader className="border-b border-primary-100 dark:border-gray-800 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center space-x-3 px-2 py-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-700 to-primary-800 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                HashChat
              </span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto py-2">
        <SidebarGroup className="px-2">
          <SidebarGroupLabel className="text-primary-700 dark:text-gray-300 text-sm font-semibold px-3 py-2 mb-1">
            Messages
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="w-full hover:bg-primary-50 data-[state=open]:bg-primary-100 dark:hover:bg-gray-800 dark:data-[state=open]:bg-gray-800 h-10 px-3 rounded-lg transition-colors"
                  >
                    <Link
                      href={item.url}
                      className="flex items-center justify-between text-primary-700 dark:text-gray-300 text-sm"
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge className="bg-primary-600 text-white text-xs h-5 px-2 ml-2 flex-shrink-0">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="px-2 mt-4">
          <SidebarGroupLabel className="text-primary-700 dark:text-gray-300 text-sm font-semibold px-3 py-2 mb-1">
            Security
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {securityItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="w-full hover:bg-primary-50 data-[state=open]:bg-primary-100 dark:hover:bg-gray-800 dark:data-[state=open]:bg-gray-800 h-10 px-3 rounded-lg transition-colors"
                  >
                    <Link
                      href={item.url}
                      className="flex items-center space-x-3 text-primary-700 dark:text-gray-300 text-sm"
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="px-2 mt-4">
          <SidebarGroupLabel className="text-primary-700 dark:text-gray-300 text-sm font-semibold px-3 py-2 mb-1">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="w-full hover:bg-primary-50 data-[state=open]:bg-primary-100 dark:hover:bg-gray-800 dark:data-[state=open]:bg-gray-800 h-10 px-3 rounded-lg transition-colors"
                  >
                    <Link
                      href={item.url}
                      className="flex items-center space-x-3 text-primary-700 dark:text-gray-300 text-sm"
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-primary-100 dark:border-gray-800 p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full hover:bg-primary-50 dark:hover:bg-gray-800 h-14 px-3 rounded-lg">
                  <div className="flex items-center space-x-3 w-full">
                    <Avatar className="w-8 h-8 ring-2 ring-primary-200 dark:ring-gray-700 flex-shrink-0">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-primary-100 text-primary-700 dark:bg-gray-800 dark:text-gray-300">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start min-w-0 flex-1">
                      <span className="text-sm font-medium text-primary-900 dark:text-gray-100 truncate w-full">
                        John Doe
                      </span>
                      <span className="text-xs text-primary-600 dark:text-gray-400 truncate w-full">
                        john@example.com
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-primary-600 dark:text-gray-400 flex-shrink-0" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] dark:bg-gray-900 dark:border-gray-700"
              >
                <DropdownMenuItem className="text-primary-700 dark:text-gray-300 dark:focus:bg-gray-800 h-10 px-3">
                  <User className="w-4 h-4 mr-3" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-primary-700 dark:text-gray-300 dark:focus:bg-gray-800 h-10 px-3">
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-primary-700 dark:text-gray-300 dark:focus:bg-gray-800 h-10 px-3"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
