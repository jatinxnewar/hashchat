"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Archive,
  Search,
  ArchiveRestoreIcon as Restore,
  Trash2,
  MessageSquare,
  User,
  Users,
  Calendar,
} from "lucide-react"

const archivedMessages = [
  {
    id: 1,
    sender: "Alice Johnson",
    senderType: "user",
    lastMessage: "Thanks for the project update!",
    archivedDate: "2024-01-10",
    messageCount: 45,
    avatar: "/placeholder.svg?height=40&width=40",
    isGroup: false,
  },
  {
    id: 2,
    sender: "Old Project Team",
    senderType: "group",
    lastMessage: "Final project deliverables completed",
    archivedDate: "2024-01-08",
    messageCount: 128,
    avatar: "/placeholder.svg?height=40&width=40",
    isGroup: true,
  },
  {
    id: 3,
    sender: "Marketing Campaign 2023",
    senderType: "group",
    lastMessage: "Campaign results and analytics",
    archivedDate: "2024-01-05",
    messageCount: 89,
    avatar: "/placeholder.svg?height=40&width=40",
    isGroup: true,
  },
  {
    id: 4,
    sender: "Bob Smith",
    senderType: "user",
    lastMessage: "Great working with you on this!",
    archivedDate: "2024-01-03",
    messageCount: 23,
    avatar: "/placeholder.svg?height=40&width=40",
    isGroup: false,
  },
  {
    id: 5,
    sender: "Design Review Team",
    senderType: "group",
    lastMessage: "Final design approved",
    archivedDate: "2023-12-28",
    messageCount: 67,
    avatar: "/placeholder.svg?height=40&width=40",
    isGroup: true,
  },
]

export default function ArchivedPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMessages = archivedMessages.filter(
    (msg) =>
      msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-black dark:to-gray-900 overflow-hidden">
        <AppSidebar />

        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <div className="p-6 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-primary-900 dark:text-gray-100">Archived Messages</h1>
                  <p className="text-primary-700 dark:text-gray-400">View and manage your archived conversations</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-primary-100 text-primary-800 dark:bg-gray-800 dark:text-gray-300 px-3 py-1">
                    <Archive className="w-3 h-3 mr-1" />
                    {filteredMessages.length} Archived
                  </Badge>
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 dark:text-gray-500 w-4 h-4" />
                <Input
                  placeholder="Search archived messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 max-w-md border-primary-200 focus:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Archive className="w-8 h-8 text-primary-500 dark:text-gray-400" />
                      <div>
                        <p className="text-2xl font-bold text-primary-900 dark:text-gray-100">
                          {filteredMessages.length}
                        </p>
                        <p className="text-sm text-primary-600 dark:text-gray-400">Total Archived</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-8 h-8 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold text-primary-900 dark:text-gray-100">
                          {filteredMessages.reduce((sum, msg) => sum + msg.messageCount, 0)}
                        </p>
                        <p className="text-sm text-primary-600 dark:text-gray-400">Total Messages</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-8 h-8 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold text-primary-900 dark:text-gray-100">
                          {filteredMessages.filter((msg) => msg.isGroup).length}
                        </p>
                        <p className="text-sm text-primary-600 dark:text-gray-400">Group Chats</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Archived Messages List */}
              <div className="space-y-4">
                {filteredMessages.map((message) => (
                  <Card
                    key={message.id}
                    className="hover:shadow-md transition-shadow border-primary-200 dark:border-gray-700 dark:bg-gray-800"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <Avatar className="w-12 h-12 ring-2 ring-primary-200 dark:ring-gray-700">
                            <AvatarImage src={message.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-primary-100 text-primary-700 dark:bg-gray-700 dark:text-gray-300">
                              {message.isGroup ? <Users className="w-6 h-6" /> : <User className="w-6 h-6" />}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-primary-900 dark:text-gray-100 text-lg">
                                {message.sender}
                              </h3>
                              {message.isGroup && <Users className="w-4 h-4 text-primary-500 dark:text-gray-400" />}
                              <Badge className="bg-primary-100 text-primary-800 dark:bg-gray-700 dark:text-gray-300">
                                Archived
                              </Badge>
                            </div>
                            <p className="text-primary-700 dark:text-gray-400 mb-2">{message.lastMessage}</p>
                            <div className="flex items-center space-x-4 text-sm text-primary-500 dark:text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>Archived: {formatDate(message.archivedDate)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageSquare className="w-4 h-4" />
                                <span>{message.messageCount} messages</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-primary-300 text-primary-700 hover:bg-primary-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            <Restore className="w-4 h-4 mr-2" />
                            Restore
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 border-red-300 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Empty State */}
              {filteredMessages.length === 0 && (
                <div className="text-center py-12">
                  <Archive className="w-16 h-16 text-primary-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-primary-900 dark:text-gray-100 mb-2">No archived messages</h3>
                  <p className="text-primary-600 dark:text-gray-400">
                    {searchTerm ? "No archived messages match your search" : "You haven't archived any messages yet"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
