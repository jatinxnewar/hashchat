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
import {
  Shield,
  Eye,
  Lock,
  Users,
  Globe,
  UserX,
  Clock,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

export default function PrivacyPage() {
  const [privacy, setPrivacy] = useState({
    // Profile Privacy
    showOnlineStatus: true,
    showLastSeen: true,
    showProfilePhoto: "everyone",
    showAbout: "contacts",

    // Message Privacy
    readReceipts: true,
    allowGroupInvites: "contacts",
    allowCalls: "everyone",

    // Data Privacy
    dataCollection: false,
    analytics: false,
    crashReports: true,

    // Blocking & Restrictions
    blockedUsers: [],
    restrictedMode: false,

    // Advanced Privacy
    disappearingMessages: false,
    disappearingTime: "24h",
    screenshotNotification: true,
    forwardingRestriction: false,
  })

  const updatePrivacy = (key: string, value: any) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }))
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
                  <h1 className="text-3xl font-bold text-primary-900 dark:text-gray-100">Privacy Settings</h1>
                  <p className="text-primary-700 dark:text-gray-400">
                    Control who can see your information and how your data is used
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-3 py-1">
                    <Shield className="w-3 h-3 mr-1" />
                    Privacy Protected
                  </Badge>
                </div>
              </div>

              <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 bg-white border border-primary-200 dark:bg-gray-800 dark:border-gray-700">
                  <TabsTrigger
                    value="profile"
                    className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="messages"
                    className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                  >
                    Messages
                  </TabsTrigger>
                  <TabsTrigger
                    value="data"
                    className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                  >
                    Data
                  </TabsTrigger>
                  <TabsTrigger
                    value="advanced"
                    className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                  >
                    Advanced
                  </TabsTrigger>
                </TabsList>

                {/* Profile Privacy Tab */}
                <TabsContent value="profile">
                  <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                        <Eye className="w-5 h-5 mr-2" />
                        Profile Visibility
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Show Online Status</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Let others see when you're online
                            </p>
                          </div>
                          <Switch
                            checked={privacy.showOnlineStatus}
                            onCheckedChange={(checked) => updatePrivacy("showOnlineStatus", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Show Last Seen</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Let others see when you were last active
                            </p>
                          </div>
                          <Switch
                            checked={privacy.showLastSeen}
                            onCheckedChange={(checked) => updatePrivacy("showLastSeen", checked)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-primary-900 dark:text-gray-100">
                            Profile Photo
                          </label>
                          <Select
                            value={privacy.showProfilePhoto}
                            onValueChange={(value) => updatePrivacy("showProfilePhoto", value)}
                          >
                            <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="everyone">Everyone</SelectItem>
                              <SelectItem value="contacts">My Contacts</SelectItem>
                              <SelectItem value="nobody">Nobody</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-primary-900 dark:text-gray-100">About Info</label>
                          <Select
                            value={privacy.showAbout}
                            onValueChange={(value) => updatePrivacy("showAbout", value)}
                          >
                            <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="everyone">Everyone</SelectItem>
                              <SelectItem value="contacts">My Contacts</SelectItem>
                              <SelectItem value="nobody">Nobody</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Message Privacy Tab */}
                <TabsContent value="messages">
                  <div className="space-y-6">
                    <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                      <CardHeader>
                        <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                          <Lock className="w-5 h-5 mr-2" />
                          Message Privacy
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Read Receipts</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Send read receipts when you view messages
                            </p>
                          </div>
                          <Switch
                            checked={privacy.readReceipts}
                            onCheckedChange={(checked) => updatePrivacy("readReceipts", checked)}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-primary-900 dark:text-gray-100">
                              Group Invites
                            </label>
                            <Select
                              value={privacy.allowGroupInvites}
                              onValueChange={(value) => updatePrivacy("allowGroupInvites", value)}
                            >
                              <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="everyone">Everyone</SelectItem>
                                <SelectItem value="contacts">My Contacts</SelectItem>
                                <SelectItem value="nobody">Nobody</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-primary-900 dark:text-gray-100">
                              Voice & Video Calls
                            </label>
                            <Select
                              value={privacy.allowCalls}
                              onValueChange={(value) => updatePrivacy("allowCalls", value)}
                            >
                              <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="everyone">Everyone</SelectItem>
                                <SelectItem value="contacts">My Contacts</SelectItem>
                                <SelectItem value="nobody">Nobody</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                      <CardHeader>
                        <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                          <Users className="w-5 h-5 mr-2" />
                          Blocked Users
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-primary-900 dark:text-gray-100">Restricted Mode</h4>
                              <p className="text-sm text-primary-700 dark:text-gray-400">
                                Only receive messages from your contacts
                              </p>
                            </div>
                            <Switch
                              checked={privacy.restrictedMode}
                              onCheckedChange={(checked) => updatePrivacy("restrictedMode", checked)}
                            />
                          </div>

                          <div className="bg-primary-50 dark:bg-gray-700/50 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-primary-900 dark:text-gray-100">Blocked Users</h4>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-primary-300 text-primary-700 hover:bg-primary-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                              >
                                <UserX className="w-4 h-4 mr-2" />
                                Block User
                              </Button>
                            </div>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              You haven't blocked any users yet. Blocked users cannot send you messages or see your
                              online status.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Data Privacy Tab */}
                <TabsContent value="data">
                  <div className="space-y-6">
                    <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                      <CardHeader>
                        <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                          <Globe className="w-5 h-5 mr-2" />
                          Data Collection
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-primary-900 dark:text-gray-100">Usage Analytics</h4>
                              <p className="text-sm text-primary-700 dark:text-gray-400">
                                Help improve HashChat by sharing anonymous usage data
                              </p>
                            </div>
                            <Switch
                              checked={privacy.analytics}
                              onCheckedChange={(checked) => updatePrivacy("analytics", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-primary-900 dark:text-gray-100">Crash Reports</h4>
                              <p className="text-sm text-primary-700 dark:text-gray-400">
                                Automatically send crash reports to help fix bugs
                              </p>
                            </div>
                            <Switch
                              checked={privacy.crashReports}
                              onCheckedChange={(checked) => updatePrivacy("crashReports", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-primary-900 dark:text-gray-100">Personalized Ads</h4>
                              <p className="text-sm text-primary-700 dark:text-gray-400">
                                Use your data to show relevant advertisements
                              </p>
                            </div>
                            <Switch
                              checked={privacy.dataCollection}
                              onCheckedChange={(checked) => updatePrivacy("dataCollection", checked)}
                            />
                          </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium text-blue-900 dark:text-blue-400">
                              Zero-Knowledge Architecture
                            </span>
                          </div>
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            HashChat uses zero-knowledge encryption, meaning we cannot read your messages even if we
                            wanted to. Your conversations are completely private.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                      <CardHeader>
                        <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                          <Download className="w-5 h-5 mr-2" />
                          Data Management
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Button
                            variant="outline"
                            className="border-primary-300 text-primary-700 hover:bg-primary-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download My Data
                          </Button>
                          <Button
                            variant="outline"
                            className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete My Data
                          </Button>
                        </div>
                        <p className="text-sm text-primary-700 dark:text-gray-400">
                          You have the right to download or delete your personal data at any time. This includes all
                          messages, media, and account information.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Advanced Privacy Tab */}
                <TabsContent value="advanced">
                  <div className="space-y-6">
                    <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                      <CardHeader>
                        <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                          <Clock className="w-5 h-5 mr-2" />
                          Disappearing Messages
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">
                              Enable Disappearing Messages
                            </h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Messages automatically delete after a set time
                            </p>
                          </div>
                          <Switch
                            checked={privacy.disappearingMessages}
                            onCheckedChange={(checked) => updatePrivacy("disappearingMessages", checked)}
                          />
                        </div>

                        {privacy.disappearingMessages && (
                          <div>
                            <label className="text-sm font-medium text-primary-900 dark:text-gray-100">
                              Default Timer
                            </label>
                            <Select
                              value={privacy.disappearingTime}
                              onValueChange={(value) => updatePrivacy("disappearingTime", value)}
                            >
                              <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="5m">5 minutes</SelectItem>
                                <SelectItem value="1h">1 hour</SelectItem>
                                <SelectItem value="24h">24 hours</SelectItem>
                                <SelectItem value="7d">7 days</SelectItem>
                                <SelectItem value="30d">30 days</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                      <CardHeader>
                        <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                          <Shield className="w-5 h-5 mr-2" />
                          Advanced Security
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-primary-900 dark:text-gray-100">
                                Screenshot Notifications
                              </h4>
                              <p className="text-sm text-primary-700 dark:text-gray-400">
                                Notify you when someone takes a screenshot of your chat
                              </p>
                            </div>
                            <Switch
                              checked={privacy.screenshotNotification}
                              onCheckedChange={(checked) => updatePrivacy("screenshotNotification", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-primary-900 dark:text-gray-100">
                                Forwarding Restriction
                              </h4>
                              <p className="text-sm text-primary-700 dark:text-gray-400">
                                Prevent others from forwarding your messages
                              </p>
                            </div>
                            <Switch
                              checked={privacy.forwardingRestriction}
                              onCheckedChange={(checked) => updatePrivacy("forwardingRestriction", checked)}
                            />
                          </div>
                        </div>

                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                            <span className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                              Privacy Notice
                            </span>
                          </div>
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            While these features enhance privacy, they cannot prevent all forms of content sharing.
                            Always be mindful of what you share.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
