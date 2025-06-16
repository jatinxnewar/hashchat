"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Plus,
  Search,
  MoreVertical,
  Settings,
  UserPlus,
  MessageSquare,
  Shield,
  Crown,
  Clock,
} from "lucide-react"

const groups = [
  {
    id: 1,
    name: "Development Team",
    description: "Main development discussions and updates",
    members: 12,
    lastActivity: "5 min ago",
    unread: 3,
    avatar: "/placeholder.svg?height=60&width=60",
    isAdmin: true,
    encryption: "AES-256",
  },
  {
    id: 2,
    name: "Marketing Team",
    description: "Marketing campaigns and strategies",
    members: 8,
    lastActivity: "1 hour ago",
    unread: 0,
    avatar: "/placeholder.svg?height=60&width=60",
    isAdmin: false,
    encryption: "AES-256",
  },
  {
    id: 3,
    name: "Project Alpha",
    description: "Secret project discussions",
    members: 5,
    lastActivity: "2 hours ago",
    unread: 1,
    avatar: "/placeholder.svg?height=60&width=60",
    isAdmin: true,
    encryption: "AES-256",
    isPrivate: true,
  },
  {
    id: 4,
    name: "Design Team",
    description: "UI/UX design collaboration",
    members: 6,
    lastActivity: "3 hours ago",
    unread: 0,
    avatar: "/placeholder.svg?height=60&width=60",
    isAdmin: false,
    encryption: "AES-256",
  },
]

export default function GroupsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <AppSidebar />

        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
                <p className="text-gray-600">Manage your group conversations</p>
              </div>

              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Group
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Group</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="group-name">Group Name</Label>
                      <Input id="group-name" placeholder="Enter group name" />
                    </div>
                    <div>
                      <Label htmlFor="group-description">Description</Label>
                      <Textarea id="group-description" placeholder="Enter group description" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="private-group" />
                      <Label htmlFor="private-group">Make this group private</Label>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700">Create Group</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 max-w-md"
              />
            </div>

            {/* Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={group.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            <Users className="w-6 h-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <CardTitle className="text-lg">{group.name}</CardTitle>
                            {group.isAdmin && <Crown className="w-4 h-4 text-yellow-500" />}
                            {group.isPrivate && <Shield className="w-4 h-4 text-red-500" />}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{group.description}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{group.members} members</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{group.lastActivity}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">{group.encryption}</span>
                        </div>
                        {group.unread > 0 && <Badge className="bg-blue-600 text-white">{group.unread} new</Badge>}
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Open Chat
                        </Button>
                        <Button variant="outline" size="sm">
                          <UserPlus className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredGroups.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No groups found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ? "Try adjusting your search terms" : "Create your first group to get started"}
                </p>
                {!searchTerm && (
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Group
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

import React from "react"

const loadingMessages = [
  "Encrypting your messages...",
  "Establishing secure connection...",
  "Synchronizing with the blockchain...",
  "Generating quantum keys...",
  "Activating stealth mode...",
  "Hashing secrets...",
  "Deploying cyber shields...",
  "Optimizing neural pathways...",
]

export function Loading() {
  const [messageIndex, setMessageIndex] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [swap, setSwap] = React.useState(false)

  // Progress bar simulation
  React.useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => setProgress(progress + Math.random() * 10), 250)
      return () => clearTimeout(timer)
    }
  }, [progress])

  // Animated icon swap
  React.useEffect(() => {
    const interval = setInterval(() => setSwap(s => !s), 1000)
    return () => clearInterval(interval)
  }, [])

  // Cycle loading messages every 2 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(idx => (idx + 1) % loadingMessages.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a192f]">
      {/* Animated gradient ring with orbiting dot */}
      <div className="relative flex items-center justify-center mb-8">
        <span className="absolute inline-flex h-20 w-20 rounded-full bg-blue-500 opacity-20 blur-2xl animate-pulse"></span>
        <span className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></span>
        {/* Orbiting dot with color swap */}
        <span className={`absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full shadow-lg animate-orbit ${swap ? "bg-cyan-400" : "bg-pink-400"}`}></span>
        <span className="absolute h-8 w-8 rounded-full bg-blue-400 opacity-60 blur"></span>
      </div>
      {/* Main loading text */}
      <span className="text-2xl font-extrabold tracking-widest text-blue-200 drop-shadow-lg animate-pulse mb-2">
        Loading HashChat...
      </span>
      {/* Cycling futuristic loading message */}
      <span className="text-sm text-blue-300 tracking-wide animate-fade-in mb-4">
        {loadingMessages[messageIndex]}
      </span>
      {/* Progress percentage label */}
      <span className="mb-1 text-xs text-blue-400 font-mono">{Math.min(Math.round(progress), 100)}%</span>
      {/* Progress bar */}
      <div className="w-64 h-2 bg-blue-900 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {/* Animated loading dots */}
      <div className="flex space-x-1">
        <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.2s]"></span>
        <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.1s]"></span>
        <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce"></span>
      </div>
      {/* Custom keyframes for orbit and fade-in */}
      <style>{`
        @keyframes orbit {
          0% { transform: rotate(0deg) translateY(-40px) rotate(0deg);}
          100% { transform: rotate(360deg) translateY(-40px) rotate(-360deg);}
        }
        .animate-orbit {
          animation: orbit 1.2s linear infinite;
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 1s ease-in;
        }
      `}</style>
    </div>
  )
}
