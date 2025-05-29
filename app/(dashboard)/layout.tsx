import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-gray-50 dark:bg-black">
        <AppSidebar />
        <main className="flex-1 ml-64 h-screen overflow-hidden">{children}</main>
      </div>
    </SidebarProvider>
  )
}
