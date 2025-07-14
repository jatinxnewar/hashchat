"use client"

import { useState, useEffect, useRef } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Shield, MoreVertical, Send, Paperclip, Smile, Phone, Video, Info, Calendar } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface Message {
  id: number
  sender: string
  content: string
  time: string
  isOwn: boolean
  avatar: string
  selfDestruct?: boolean
  selfDestructTime?: number
  scheduledFor?: string
}

const recentChats = [
  {
    id: 1,
    name: "Alice Johnson",
    lastMessage: "Hey! How are you doing?",
    time: "2 min ago",
    unread: 3,
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
  },
  {
    id: 2,
    name: "Development Team",
    lastMessage: "The new feature is ready for testing",
    time: "15 min ago",
    unread: 0,
    avatar: "/placeholder.svg?height=40&width=40",
    online: false,
    isGroup: true,
  },
  {
    id: 3,
    name: "Bob Smith",
    lastMessage: "Thanks for the help!",
    time: "1 hour ago",
    unread: 1,
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
  },
  {
    id: 4,
    name: "Marketing Team",
    lastMessage: "Campaign results are in",
    time: "2 hours ago",
    unread: 0,
    avatar: "/placeholder.svg?height=40&width=40",
    online: false,
    isGroup: true,
  },
]

const autoReplies = [
  "That sounds great! Tell me more about it.",
  "I completely agree with you on that.",
  "Interesting perspective! I hadn't thought of it that way.",
  "Thanks for sharing that information.",
  "Let me think about it and get back to you.",
  "That's a good point. We should definitely consider it.",
  "I'm excited to see how this develops!",
  "Could you elaborate on that a bit more?",
  "That makes perfect sense to me.",
  "I appreciate you keeping me updated.",
]

export default function Dashboard() {
  const [selectedChat, setSelectedChat] = useState(recentChats[0])
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Alice Johnson",
      content: "Hey! How are you doing?",
      time: "10:30 AM",
      isOwn: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      sender: "You",
      content: "I'm doing great! Just working on the new project. How about you?",
      time: "10:32 AM",
      isOwn: true,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      sender: "Alice Johnson",
      content: "That sounds exciting! I'd love to hear more about it.",
      time: "10:33 AM",
      isOwn: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ])

  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [selfDestructTime, setSelfDestructTime] = useState("5")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Self-destruct timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prevMessages) =>
        prevMessages
          .map((msg) => {
            if (msg.selfDestruct && msg.selfDestructTime && msg.selfDestructTime > 0) {
              return { ...msg, selfDestructTime: msg.selfDestructTime - 1 }
            }
            return msg
          })
          .filter((msg) => !msg.selfDestruct || !msg.selfDestructTime || msg.selfDestructTime > 0),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = (scheduled = false) => {
    if (newMessage.trim()) {
      const now = new Date()
      const messageTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

      let scheduledFor = undefined
      if (scheduled && scheduleDate && scheduleTime) {
        const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}`)
        if (scheduledDateTime > now) {
          scheduledFor = scheduledDateTime.toISOString()
        }
      }

      const newMsg: Message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        time: messageTime,
        isOwn: true,
        avatar: "/placeholder.svg?height=32&width=32",
        scheduledFor,
      }

      if (!scheduled) {
        setMessages((prev) => [...prev, newMsg])

        // Auto-reply after 2-3 seconds
        setTimeout(
          () => {
            const replyContent = autoReplies[Math.floor(Math.random() * autoReplies.length)]
            const replyMsg: Message = {
              id: messages.length + 2,
              sender: selectedChat.name,
              content: replyContent,
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              isOwn: false,
              avatar: selectedChat.avatar,
            }
            setMessages((prev) => [...prev, replyMsg])
          },
          2000 + Math.random() * 1000,
        )
      }

      setNewMessage("")
      setIsScheduleDialogOpen(false)
      setScheduleDate("")
      setScheduleTime("")
    }
  }

  const handleSelfDestructMessage = () => {
    if (newMessage.trim()) {
      const now = new Date()
      const messageTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

      const newMsg: Message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        time: messageTime,
        isOwn: true,
        avatar: "/placeholder.svg?height=32&width=32",
        selfDestruct: true,
        selfDestructTime: Number.parseInt(selfDestructTime) * 60, // Convert minutes to seconds
      }

      setMessages((prev) => [...prev, newMsg])
      setNewMessage("")
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-black dark:to-gray-900 overflow-hidden">
        <AppSidebar />

        {/* Main Content - Full Width Chat */}
        <div className="flex-1 flex flex-col h-screen">
          {/* Chat Header */}
          <div className="bg-white dark:bg-gray-900 border-b border-primary-200 dark:border-gray-800 p-4 shadow-sm flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="ring-2 ring-primary-200 dark:ring-gray-700 w-12 h-12">
                  <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary-100 text-primary-700 dark:bg-gray-800 dark:text-gray-300 text-lg">
                    {selectedChat.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-primary-900 dark:text-gray-100 text-lg">{selectedChat.name}</h3>
                  <p className="text-sm text-primary-600 dark:text-gray-400">
                    {selectedChat.online ? "Online" : "Last seen 2 hours ago"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
                >
                  <Phone className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
                >
                  <Video className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
                >
                  <Info className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
                >
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages Area - Full Height */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-primary-50 dark:from-gray-900 dark:to-black">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-end space-x-3 max-w-xs lg:max-w-3xl ${message.isOwn ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  {!message.isOwn && (
                    <Avatar className="w-10 h-10 ring-2 ring-primary-200 dark:ring-gray-700">
                      <AvatarImage src={message.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary-100 text-primary-700 dark:bg-gray-800 dark:text-gray-300">
                        {message.sender.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`px-6 py-4 rounded-2xl shadow-sm ${
                      message.isOwn
                        ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white dark:from-primary-500 dark:to-primary-600"
                        : "bg-white text-primary-900 border border-primary-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                    } ${message.selfDestruct ? "animate-pulse-red border-2" : ""}`}
                  >
                    <p className="text-base leading-relaxed">{message.content}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span
                        className={`text-sm ${message.isOwn ? "text-primary-100" : "text-primary-500 dark:text-gray-400"}`}
                      >
                        {message.time}
                      </span>
                      {message.selfDestruct && message.selfDestructTime && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-red-500 font-medium">
                            {Math.floor(message.selfDestructTime / 60)}:
                            {(message.selfDestructTime % 60).toString().padStart(2, "0")}
                          </span>
                        </div>
                      )}
                      {message.scheduledFor && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-blue-500">Scheduled</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="bg-white dark:bg-gray-900 border-t border-primary-200 dark:border-gray-800 p-6 shadow-lg flex-shrink-0">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
              >
                <Paperclip className="w-5 h-5" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="pr-12 border-primary-200 focus:border-primary-500 bg-primary-50/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 h-12 text-base"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-600 hover:text-primary-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <Smile className="w-5 h-5" />
                </Button>
              </div>
              <Button
                onClick={() => handleSendMessage()}
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg h-12 px-6"
                size="sm"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-3 mt-4">
              <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm border-primary-200 text-primary-700 hover:bg-primary-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                </DialogTrigger>
                <DialogContent className="dark:bg-gray-900 dark:border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="dark:text-gray-100 text-xl">Schedule Message</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="schedule-date" className="dark:text-gray-200 text-base">
                        Date
                      </Label>
                      <Input
                        id="schedule-date"
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 h-12 text-base mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="schedule-time" className="dark:text-gray-200 text-base">
                        Time
                      </Label>
                      <Input
                        id="schedule-time"
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        className="dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 h-12 text-base mt-2"
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => setIsScheduleDialogOpen(false)}
                        className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        Cancel
                      </Button>
                      <Button onClick={() => handleSendMessage(true)} className="bg-primary-600 hover:bg-primary-700">
                        Schedule Message
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm border-primary-200 text-primary-700 hover:bg-primary-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Self-Destruct
                  </Button>
                </DialogTrigger>
                <DialogContent className="dark:bg-gray-900 dark:border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="dark:text-gray-100 text-xl">Self-Destruct Message</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="destruct-time" className="dark:text-gray-200 text-base">
                        Auto-delete after:
                      </Label>
                      <Select value={selfDestructTime} onValueChange={setSelfDestructTime}>
                        <SelectTrigger className="dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 h-12 text-base mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
                          <SelectItem value="1">1 minute</SelectItem>
                          <SelectItem value="5">5 minutes</SelectItem>
                          <SelectItem value="10">10 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <Button
                        variant="outline"
                        className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSelfDestructMessage} className="bg-red-600 hover:bg-red-700">
                        Send Self-Destruct Message
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

/**
 * Smoothly scrolls the given element into view, with many options and a scroll indicator bar.
 * @param element The HTMLElement to scroll into view
 * @param options ScrollIntoView options (optional)
 * @param highlight If true, highlights the element after scrolling (default: false)
 * @param highlightColor The background color to use for highlight (default: yellow)
 * @param highlightDuration How long the highlight lasts in ms (default: 800)
 * @param onDone Optional callback after scrolling and highlight
 * @param offset Optional vertical offset in pixels (e.g., for fixed headers)
 * @param horizontal If true, scrolls horizontally instead of vertically
 * @param focus If true, focuses the element after scrolling
 * @param onlyIfNotVisible If true, only scrolls if the element is not already visible
 * @param animationClass Optional CSS animation class to apply after scrolling
 * @param container Optional scrollable container (defaults to window)
 * @param onScrollStart Optional callback before scrolling starts
 */
export function smoothScrollIntoView(
  element: HTMLElement | null,
  options: ScrollIntoViewOptions = { behavior: "smooth", block: "center" },
  highlight: boolean = false,
  highlightColor: string = "#fef08a",
  highlightDuration: number = 800,
  onDone?: () => void,
  offset: number = 0,
  horizontal: boolean = false,
  focus: boolean = false,
  onlyIfNotVisible: boolean = false,
  animationClass?: string,
  container?: HTMLElement | Window,
  onScrollStart?: () => void
) {
  if (!element) return

  // Only scroll if not visible
  if (onlyIfNotVisible && isElementInViewport(element, container)) {
    if (focus) element.focus?.()
    if (highlight) highlightElement(element, highlightColor, highlightDuration, onDone)
    else if (onDone) onDone()
    if (animationClass) triggerAnimation(element, animationClass)
    return
  }

  /**
   * Triggers a CSS animation by adding and then removing a class.
   */
  function triggerAnimation(el: HTMLElement, className: string) {
    el.classList.add(className)
    // Remove the class after animation ends (assume 1s duration, adjust as needed)
    setTimeout(() => {
      el.classList.remove(className)
    }, 1000)
  }

  /**
   * Checks if the element is visible in the viewport or within a scrollable container.
   */
  function isElementInViewport(el: HTMLElement, cont?: HTMLElement | Window): boolean {
    if (!el) return false
    const rect = el.getBoundingClientRect()
    if (!cont || cont === window) {
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      )
    } else if (cont instanceof HTMLElement) {
      const contRect = cont.getBoundingClientRect()
      return (
        rect.top >= contRect.top &&
        rect.left >= contRect.left &&
        rect.bottom <= contRect.bottom &&
        rect.right <= contRect.right
      )
    }
    return false
  }

  if (onScrollStart) onScrollStart()

  // Show scroll indicator bar
  const indicator = createScrollIndicatorBar()

  // Scroll logic
  const finishScroll = () => {
    removeScrollIndicatorBar(indicator)
    if (highlight) highlightElement(element, highlightColor, highlightDuration, onDone)
    else if (onDone) setTimeout(onDone, 400)
    if (focus) setTimeout(() => element.focus?.(), 500)
    if (animationClass) triggerAnimation(element, animationClass)
  }

  /**
   * Highlights the element with a background color for a duration, then restores it.
   */
  function highlightElement(
    el: HTMLElement,
    color: string,
    duration: number,
    done?: () => void
  ) {
    const original = el.style.backgroundColor
    el.style.transition = "background-color 0.3s"
    el.style.backgroundColor = color
    setTimeout(() => {
      el.style.backgroundColor = original
      if (done) setTimeout(done, 200)
    }, duration)
  }

  if (container && container !== window) {
    scrollElementIntoContainerView(
      element,
      container as HTMLElement,
      options,
      offset,
      horizontal,
      finishScroll
    )
  } else {
    element.scrollIntoView(options)
    if (offset !== 0) {
      setTimeout(() => {
        if (horizontal) {
          const start = window.scrollX
          const end = start + offset
          animateScroll(start, end, 400, x => window.scrollTo(x, window.scrollY), finishScroll)
        } else {
          const start = window.scrollY
          const end = start + offset
          animateScroll(start, end, 400, y => window.scrollTo(window.scrollX, y), finishScroll)
        }
      }, 100)
    } else {
      setTimeout(finishScroll, 500)
    }
  }
}

/**
 * Scrolls an element into view within a scrollable container.
 */
function scrollElementIntoContainerView(
  element: HTMLElement,
  container: HTMLElement,
  options: ScrollIntoViewOptions,
  offset: number,
  horizontal: boolean,
  onDone?: () => void
) {
  const elRect = element.getBoundingClientRect()
  const contRect = container.getBoundingClientRect()
  if (horizontal) {
    const scrollLeft = container.scrollLeft + elRect.left - contRect.left + offset
    animateScroll(container.scrollLeft, scrollLeft, 400, pos => (container.scrollLeft = pos), onDone)
  } else {
    const scrollTop = container.scrollTop + elRect.top - contRect.top + offset
    animateScroll(container.scrollTop, scrollTop, 400, pos => (container.scrollTop = pos), onDone)
  }
}

/**
 * Creates a scroll indicator bar at the top of the page.
 */
function createScrollIndicatorBar() {
  const bar = document.createElement("div")
  bar.style.position = "fixed"
  bar.style.top = "0"
  bar.style.left = "0"
  bar.style.width = "0"
  bar.style.height = "4px"
  bar.style.background = "linear-gradient(90deg, #06b6d4, #6366f1)"
  bar.style.zIndex = "9999"
  bar.style.transition = "width 0.4s cubic-bezier(.4,2,.6,1)"
  document.body.appendChild(bar)
  // Animate bar to full width
  setTimeout(() => {
    bar.style.width = "100%"
  }, 10)
  return bar
}

/**
 * Removes the scroll indicator bar.
 */
function removeScrollIndicatorBar(bar: HTMLDivElement | null) {
  if (bar && bar.parentNode) {
    bar.style.opacity = "0"
    setTimeout(() => {
      if (bar.parentNode) bar.parentNode.removeChild(bar)
    }, 300)
  }
}

/**
 * Animate scroll position with easeInOutQuad and call onComplete when done.
 */

/**
 * Easing function for smooth animation (easeInOutQuad).
 * @param t A value between 0 and 1
 * @returns The eased value
 */
function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function animateScroll(
  start: number,
  end: number,
  duration: number,
  setPos: (pos: number) => void,
  onComplete?: () => void
) {
  const startTime = performance.now()
  function animate(now: number) {
    const elapsed = now - startTime
    const t = Math.min(1, elapsed / duration)
    const eased = easeInOutQuad(t)
    setPos(start + (end - start) * eased)
    if (t < 1) requestAnimationFrame(animate)
    else if (onComplete) onComplete()
  }
  requestAnimationFrame(animate)
}
