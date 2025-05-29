"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Camera, Shield, Bell, Lock, Eye, Key, Smartphone, Globe, Save, Edit } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Software developer passionate about secure messaging and privacy.",
    status: "Available",
  })

  const [privacy, setPrivacy] = useState({
    showOnlineStatus: true,
    showLastSeen: true,
    allowGroupInvites: true,
    readReceipts: true,
    autoDeleteMessages: false,
    twoFactorAuth: true,
  })

  const [notifications, setNotifications] = useState({
    messageNotifications: true,
    groupNotifications: true,
    soundEnabled: true,
    vibrationEnabled: true,
    emailNotifications: false,
  })

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
                  <h1 className="text-3xl font-bold text-primary-900 dark:text-gray-100">Profile Settings</h1>
                  <p className="text-primary-700 dark:text-gray-400">Manage your account and privacy settings</p>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "outline" : "default"}
                  className={
                    isEditing
                      ? "border-primary-300 text-primary-700 hover:bg-primary-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                      : "bg-primary-600 hover:bg-primary-700"
                  }
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
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
                    value="privacy"
                    className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                  >
                    Privacy
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                  >
                    Security
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                  >
                    Notifications
                  </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile">
                  <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                        <User className="w-5 h-5 mr-2" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Profile Picture */}
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Avatar className="w-20 h-20 ring-2 ring-primary-200 dark:ring-gray-700">
                            <AvatarImage src="/placeholder.svg?height=80&width=80" />
                            <AvatarFallback className="text-lg bg-primary-100 text-primary-700 dark:bg-gray-700 dark:text-gray-300">
                              JD
                            </AvatarFallback>
                          </Avatar>
                          {isEditing && (
                            <Button
                              size="sm"
                              className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-primary-600 hover:bg-primary-700"
                            >
                              <Camera className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-primary-900 dark:text-gray-100 text-lg">{profile.name}</h3>
                          <p className="text-sm text-primary-600 dark:text-gray-400">{profile.email}</p>
                          <Badge className="mt-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            {profile.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Form Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-primary-900 dark:text-gray-100">
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            disabled={!isEditing}
                            className="mt-1 border-primary-200 focus:border-primary-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-primary-900 dark:text-gray-100">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            disabled={!isEditing}
                            className="mt-1 border-primary-200 focus:border-primary-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-primary-900 dark:text-gray-100">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            disabled={!isEditing}
                            className="mt-1 border-primary-200 focus:border-primary-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                          />
                        </div>
                        <div>
                          <Label htmlFor="status" className="text-primary-900 dark:text-gray-100">
                            Status
                          </Label>
                          <Input
                            id="status"
                            value={profile.status}
                            onChange={(e) => setProfile({ ...profile, status: e.target.value })}
                            disabled={!isEditing}
                            className="mt-1 border-primary-200 focus:border-primary-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="bio" className="text-primary-900 dark:text-gray-100">
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          value={profile.bio}
                          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                          disabled={!isEditing}
                          rows={3}
                          className="mt-1 border-primary-200 focus:border-primary-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                        />
                      </div>

                      {isEditing && (
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                            className="border-primary-300 text-primary-700 hover:bg-primary-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            Cancel
                          </Button>
                          <Button className="bg-primary-600 hover:bg-primary-700">
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Privacy Tab */}
                <TabsContent value="privacy">
                  <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                        <Eye className="w-5 h-5 mr-2" />
                        Privacy Settings
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
                            onCheckedChange={(checked) => setPrivacy({ ...privacy, showOnlineStatus: checked })}
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
                            onCheckedChange={(checked) => setPrivacy({ ...privacy, showLastSeen: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Allow Group Invites</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Allow others to add you to groups
                            </p>
                          </div>
                          <Switch
                            checked={privacy.allowGroupInvites}
                            onCheckedChange={(checked) => setPrivacy({ ...privacy, allowGroupInvites: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Read Receipts</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Send read receipts for messages
                            </p>
                          </div>
                          <Switch
                            checked={privacy.readReceipts}
                            onCheckedChange={(checked) => setPrivacy({ ...privacy, readReceipts: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Auto-Delete Messages</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Automatically delete messages after 24 hours
                            </p>
                          </div>
                          <Switch
                            checked={privacy.autoDeleteMessages}
                            onCheckedChange={(checked) => setPrivacy({ ...privacy, autoDeleteMessages: checked })}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security">
                  <div className="space-y-6">
                    <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                      <CardHeader>
                        <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                          <Shield className="w-5 h-5 mr-2" />
                          Security Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">
                              Two-Factor Authentication
                            </h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={
                                privacy.twoFactorAuth
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                              }
                            >
                              {privacy.twoFactorAuth ? "Enabled" : "Disabled"}
                            </Badge>
                            <Switch
                              checked={privacy.twoFactorAuth}
                              onCheckedChange={(checked) => setPrivacy({ ...privacy, twoFactorAuth: checked })}
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Button
                            variant="outline"
                            className="w-full justify-start border-primary-300 text-primary-700 hover:bg-primary-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            <Key className="w-4 h-4 mr-2" />
                            Change Password
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start border-primary-300 text-primary-700 hover:bg-primary-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            <Smartphone className="w-4 h-4 mr-2" />
                            Manage Devices
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start border-primary-300 text-primary-700 hover:bg-primary-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            <Globe className="w-4 h-4 mr-2" />
                            Active Sessions
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                      <CardHeader>
                        <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                          <Lock className="w-5 h-5 mr-2" />
                          Encryption Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div>
                              <h4 className="font-medium text-green-900 dark:text-green-400">End-to-End Encryption</h4>
                              <p className="text-sm text-green-700 dark:text-green-300">
                                All your messages are encrypted with AES-256
                              </p>
                            </div>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                              Active
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div>
                              <h4 className="font-medium text-blue-900 dark:text-blue-400">Key Exchange</h4>
                              <p className="text-sm text-blue-700 dark:text-blue-300">
                                Using Elliptic Curve Diffie-Hellman
                              </p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                              Secure
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications">
                  <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                        <Bell className="w-5 h-5 mr-2" />
                        Notification Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Message Notifications</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">Get notified for new messages</p>
                          </div>
                          <Switch
                            checked={notifications.messageNotifications}
                            onCheckedChange={(checked) =>
                              setNotifications({ ...notifications, messageNotifications: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Group Notifications</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Get notified for group messages
                            </p>
                          </div>
                          <Switch
                            checked={notifications.groupNotifications}
                            onCheckedChange={(checked) =>
                              setNotifications({ ...notifications, groupNotifications: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Sound</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">Play sound for notifications</p>
                          </div>
                          <Switch
                            checked={notifications.soundEnabled}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, soundEnabled: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Vibration</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">Vibrate for notifications</p>
                          </div>
                          <Switch
                            checked={notifications.vibrationEnabled}
                            onCheckedChange={(checked) =>
                              setNotifications({ ...notifications, vibrationEnabled: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Email Notifications</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Receive notifications via email
                            </p>
                          </div>
                          <Switch
                            checked={notifications.emailNotifications}
                            onCheckedChange={(checked) =>
                              setNotifications({ ...notifications, emailNotifications: checked })
                            }
                          />
                        </div>
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
