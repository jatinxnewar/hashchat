"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Plus, Search, Calendar, Edit, Trash2, Send, User, Users, MessageSquare } from "lucide-react"

const scheduledMessages = [
  {
    id: 1,
    recipient: "Alice Johnson",
    recipientType: "user",
    message: "Happy Birthday! Hope you have a wonderful day! 🎉",
    scheduledTime: "2024-01-15 09:00",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    recipient: "Development Team",
    recipientType: "group",
    message: "Weekly standup meeting reminder - 10 AM today",
    scheduledTime: "2024-01-16 08:30",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    recipient: "Bob Smith",
    recipientType: "user",
    message: "Don't forget about our lunch meeting tomorrow!",
    scheduledTime: "2024-01-17 18:00",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    recipient: "Marketing Team",
    recipientType: "group",
    message: "Campaign results are ready for review",
    scheduledTime: "2024-01-14 14:00",
    status: "sent",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    recipient: "Sarah Wilson",
    recipientType: "user",
    message: "Project deadline reminder - due tomorrow",
    scheduledTime: "2024-01-18 10:00",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function ScheduledPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newMessage, setNewMessage] = useState({
    recipient: "",
    message: "",
    date: "",
    time: "",
  })

  const filteredMessages = scheduledMessages.filter(
    (msg) =>
      msg.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const pendingMessages = filteredMessages.filter((msg) => msg.status === "pending")
  const sentMessages = filteredMessages.filter((msg) => msg.status === "sent")

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "sent":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <AppSidebar />

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Scheduled Messages</h1>
                <p className="text-gray-600">Manage your scheduled messages and reminders</p>
              </div>

              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Message
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Schedule New Message</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="recipient">Recipient</Label>
                      <Input
                        id="recipient"
                        placeholder="Enter name or select contact"
                        value={newMessage.recipient}
                        onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Type your message..."
                        value={newMessage.message}
                        onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={newMessage.date}
                          onChange={(e) => setNewMessage({ ...newMessage, date: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={newMessage.time}
                          onChange={(e) => setNewMessage({ ...newMessage, time: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Clock className="w-4 h-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search scheduled messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 max-w-md"
              />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-8 h-8 text-yellow-500" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{pendingMessages.length}</p>
                      <p className="text-sm text-gray-600">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Send className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{sentMessages.length}</p>
                      <p className="text-sm text-gray-600">Sent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{filteredMessages.length}</p>
                      <p className="text-sm text-gray-600">Total</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Messages List */}
            <div className="space-y-4">
              {filteredMessages.map((message) => {
                const { date, time } = formatDateTime(message.scheduledTime)
                return (
                  <Card key={message.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={message.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {message.recipientType === "group" ? (
                                <Users className="w-5 h-5" />
                              ) : (
                                <User className="w-5 h-5" />
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium text-gray-900">{message.recipient}</h3>
                              {message.recipientType === "group" && <Users className="w-4 h-4 text-gray-500" />}
                              <Badge className={getStatusColor(message.status)}>{message.status}</Badge>
                            </div>
                            <p className="text-gray-700 mb-2">{message.message}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {message.status === "pending" && (
                            <>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          {message.status === "sent" && (
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Empty State */}
            {filteredMessages.length === 0 && (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No scheduled messages</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ? "No messages match your search" : "Schedule your first message to get started"}
                </p>
                {!searchTerm && (
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Message
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
