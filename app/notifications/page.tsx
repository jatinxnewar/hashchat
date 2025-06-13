"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, BellOff, Mail, MessageSquare, Shield, Clock, Settings, CheckCircle } from "lucide-react"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState({
    // General Settings
    masterNotifications: true,
    soundEnabled: true,
    vibrationEnabled: true,

    // Message Notifications
    messageNotifications: true,
    groupNotifications: true,
    mentionNotifications: true,

    // Email Notifications
    emailNotifications: false,
    emailDigest: true,

    // Security Notifications
    securityAlerts: true,
    loginAlerts: true,

    // Do Not Disturb
    doNotDisturb: false,
    quietHours: false,

    // Advanced
    showPreviews: true,
    badgeCount: true,
  })

  const [quietHoursStart, setQuietHoursStart] = useState("22:00")
  const [quietHoursEnd, setQuietHoursEnd] = useState("08:00")
  const [emailFrequency, setEmailFrequency] = useState("daily")

  const updateNotification = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
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
                  <h1 className="text-3xl font-bold text-primary-900 dark:text-gray-100">Notification Settings</h1>
                  <p className="text-primary-700 dark:text-gray-400">
                    Customize how and when you receive notifications
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    className={
                      notifications.masterNotifications
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                    }
                  >
                    {notifications.masterNotifications ? (
                      <>
                        <Bell className="w-3 h-3 mr-1" />
                        Notifications On
                      </>
                    ) : (
                      <>
                        <BellOff className="w-3 h-3 mr-1" />
                        Notifications Off
                      </>
                    )}
                  </Badge>
                </div>
              </div>

              <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 bg-white border border-primary-200 dark:bg-gray-800 dark:border-gray-700">
                  <TabsTrigger
                    value="general"
                    className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                  >
                    General
                  </TabsTrigger>
                  <TabsTrigger
                    value="messages"
                    className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                  >
                    Messages
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                  >
                    Security
                  </TabsTrigger>
                  <TabsTrigger
                    value="advanced"
                    className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                  >
                    Advanced
                  </TabsTrigger>
                </TabsList>

                {/* General Tab */}
                <TabsContent value="general">
                  <div className="space-y-6">
                    <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                      <CardHeader>
                        <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                          <Bell className="w-5 h-5 mr-2" />
                          General Notification Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Master Notifications</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Enable or disable all notifications
                            </p>
                          </div>
                          <Switch
                            checked={notifications.masterNotifications}
                            onCheckedChange={(checked) => updateNotification("masterNotifications", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Sound Notifications</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">Play sound for notifications</p>
                          </div>
                          <Switch
                            checked={notifications.soundEnabled}
                            onCheckedChange={(checked) => updateNotification("soundEnabled", checked)}
                            disabled={!notifications.masterNotifications}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Vibration</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Vibrate for notifications on mobile
                            </p>
                          </div>
                          <Switch
                            checked={notifications.vibrationEnabled}
                            onCheckedChange={(checked) => updateNotification("vibrationEnabled", checked)}
                            disabled={!notifications.masterNotifications}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Do Not Disturb</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Temporarily disable all notifications
                            </p>
                          </div>
                          <Switch
                            checked={notifications.doNotDisturb}
                            onCheckedChange={(checked) => updateNotification("doNotDisturb", checked)}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                      <CardHeader>
                        <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                          <Clock className="w-5 h-5 mr-2" />
                          Quiet Hours
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Enable Quiet Hours</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Automatically disable notifications during specific hours
                            </p>
                          </div>
                          <Switch
                            checked={notifications.quietHours}
                            onCheckedChange={(checked) => updateNotification("quietHours", checked)}
                          />
                        </div>

                        {notifications.quietHours && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-primary-900 dark:text-gray-100">
                                Start Time
                              </label>
                              <Select value={quietHoursStart} onValueChange={setQuietHoursStart}>
                                <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  {Array.from({ length: 24 }, (_, i) => {
                                    const hour = i.toString().padStart(2, "0")
                                    return (
                                      <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                                        {hour}:00
                                      </SelectItem>
                                    )
                                  })}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-primary-900 dark:text-gray-100">
                                End Time
                              </label>
                              <Select value={quietHoursEnd} onValueChange={setQuietHoursEnd}>
                                <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  {Array.from({ length: 24 }, (_, i) => {
                                    const hour = i.toString().padStart(2, "0")
                                    return (
                                      <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                                        {hour}:00
                                      </SelectItem>
                                    )
                                  })}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Messages Tab */}
                <TabsContent value="messages">
                  <div className="space-y-6">
                    <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                      <CardHeader>
                        <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                          <MessageSquare className="w-5 h-5 mr-2" />
                          Message Notifications
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Direct Messages</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Get notified for new direct messages
                            </p>
                          </div>
                          <Switch
                            checked={notifications.messageNotifications}
                            onCheckedChange={(checked) => updateNotification("messageNotifications", checked)}
                            disabled={!notifications.masterNotifications}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Group Messages</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Get notified for group messages
                            </p>
                          </div>
                          <Switch
                            checked={notifications.groupNotifications}
                            onCheckedChange={(checked) => updateNotification("groupNotifications", checked)}
                            disabled={!notifications.masterNotifications}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Mentions & Replies</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Get notified when someone mentions you
                            </p>
                          </div>
                          <Switch
                            checked={notifications.mentionNotifications}
                            onCheckedChange={(checked) => updateNotification("mentionNotifications", checked)}
                            disabled={!notifications.masterNotifications}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                      <CardHeader>
                        <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                          <Mail className="w-5 h-5 mr-2" />
                          Email Notifications
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Email Notifications</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Receive notifications via email
                            </p>
                          </div>
                          <Switch
                            checked={notifications.emailNotifications}
                            onCheckedChange={(checked) => updateNotification("emailNotifications", checked)}
                          />
                        </div>

                        {notifications.emailNotifications && (
                          <>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-primary-900 dark:text-gray-100">Email Digest</h4>
                                <p className="text-sm text-primary-700 dark:text-gray-400">
                                  Receive a summary of missed messages
                                </p>
                              </div>
                              <Switch
                                checked={notifications.emailDigest}
                                onCheckedChange={(checked) => updateNotification("emailDigest", checked)}
                              />
                            </div>

                            <div>
                              <label className="text-sm font-medium text-primary-900 dark:text-gray-100">
                                Email Frequency
                              </label>
                              <Select value={emailFrequency} onValueChange={setEmailFrequency}>
                                <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="immediate">Immediate</SelectItem>
                                  <SelectItem value="hourly">Hourly</SelectItem>
                                  <SelectItem value="daily">Daily</SelectItem>
                                  <SelectItem value="weekly">Weekly</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security">
                  <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                        <Shield className="w-5 h-5 mr-2" />
                        Security Notifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-primary-900 dark:text-gray-100">Security Alerts</h4>
                          <p className="text-sm text-primary-700 dark:text-gray-400">
                            Get notified about security events and threats
                          </p>
                        </div>
                        <Switch
                          checked={notifications.securityAlerts}
                          onCheckedChange={(checked) => updateNotification("securityAlerts", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-primary-900 dark:text-gray-100">Login Alerts</h4>
                          <p className="text-sm text-primary-700 dark:text-gray-400">
                            Get notified when someone logs into your account
                          </p>
                        </div>
                        <Switch
                          checked={notifications.loginAlerts}
                          onCheckedChange={(checked) => updateNotification("loginAlerts", checked)}
                        />
                      </div>

                      <div className="bg-primary-50 dark:bg-gray-700/50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-primary-900 dark:text-gray-100">Recommended</span>
                        </div>
                        <p className="text-sm text-primary-700 dark:text-gray-400">
                          We recommend keeping security notifications enabled to protect your account from unauthorized
                          access.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Advanced Tab */}
                <TabsContent value="advanced">
                  <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                        <Settings className="w-5 h-5 mr-2" />
                        Advanced Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-primary-900 dark:text-gray-100">Show Message Previews</h4>
                          <p className="text-sm text-primary-700 dark:text-gray-400">
                            Display message content in notifications
                          </p>
                        </div>
                        <Switch
                          checked={notifications.showPreviews}
                          onCheckedChange={(checked) => updateNotification("showPreviews", checked)}
                          disabled={!notifications.masterNotifications}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-primary-900 dark:text-gray-100">Badge Count</h4>
                          <p className="text-sm text-primary-700 dark:text-gray-400">
                            Show unread message count on app icon
                          </p>
                        </div>
                        <Switch
                          checked={notifications.badgeCount}
                          onCheckedChange={(checked) => updateNotification("badgeCount", checked)}
                          disabled={!notifications.masterNotifications}
                        />
                      </div>

                      <div className="pt-4 border-t border-primary-200 dark:border-gray-700">
                        <Button
                          variant="outline"
                          className="w-full border-primary-300 text-primary-700 hover:bg-primary-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          Test Notifications
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a192f]">
      {/* Animated gradient ring with orbiting dot */}
      <div className="relative flex items-center justify-center mb-8">
        <span className="absolute inline-flex h-20 w-20 rounded-full bg-blue-500 opacity-20 blur-2xl animate-pulse"></span>
        <span className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></span>
        {/* Orbiting dot */}
        <span className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-cyan-400 shadow-lg animate-orbit"></span>
        <span className="absolute h-8 w-8 rounded-full bg-blue-400 opacity-60 blur"></span>
      </div>
      {/* Main loading text */}
      <span className="text-2xl font-extrabold tracking-widest text-blue-200 drop-shadow-lg animate-pulse mb-2">
        Loading HashChat...
      </span>
      {/* Animated subtitle */}
      <span className="text-sm text-blue-300 tracking-wide animate-fade-in mb-4">
        Military-grade encryption in progress
      </span>
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
