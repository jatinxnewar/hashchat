"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SettingsIcon, User, Palette, Globe, Download, Trash2, RefreshCw, Save, AlertTriangle } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // General
    language: "en",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",

    // Appearance
    theme: "system",
    fontSize: "medium",
    compactMode: false,
    animations: true,

    // Chat
    enterToSend: true,
    readReceipts: true,
    typingIndicators: true,
    autoDownload: "wifi",

    // Storage
    autoDelete: false,
    autoDeleteDays: 30,
    cacheSize: "500MB",

    // Advanced
    developerMode: false,
    debugLogs: false,
    betaFeatures: false,
  })

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
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
                  <h1 className="text-3xl font-bold text-primary-900 dark:text-gray-100">Settings</h1>
                  <p className="text-primary-700 dark:text-gray-400">Customize your HashChat experience</p>
                </div>
                <Button className="bg-primary-600 hover:bg-primary-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>

              <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5 bg-white border border-primary-200 dark:bg-gray-800 dark:border-gray-700">
                  <TabsTrigger
                    value="general"
                    className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                  >
                    General
                  </TabsTrigger>
                  <TabsTrigger
                    value="appearance"
                    className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                  >
                    Appearance
                  </TabsTrigger>
                  <TabsTrigger
                    value="chat"
                    className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                  >
                    Chat
                  </TabsTrigger>
                  <TabsTrigger
                    value="storage"
                    className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                  >
                    Storage
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
                  <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                        <Globe className="w-5 h-5 mr-2" />
                        Language & Region
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="language" className="text-primary-900 dark:text-gray-100">
                            Language
                          </Label>
                          <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
                            <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="de">Deutsch</SelectItem>
                              <SelectItem value="zh">中文</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="timezone" className="text-primary-900 dark:text-gray-100">
                            Timezone
                          </Label>
                          <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
                            <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="UTC">UTC</SelectItem>
                              <SelectItem value="EST">Eastern Time</SelectItem>
                              <SelectItem value="PST">Pacific Time</SelectItem>
                              <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                              <SelectItem value="CET">Central European Time</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="dateFormat" className="text-primary-900 dark:text-gray-100">
                            Date Format
                          </Label>
                          <Select
                            value={settings.dateFormat}
                            onValueChange={(value) => updateSetting("dateFormat", value)}
                          >
                            <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="timeFormat" className="text-primary-900 dark:text-gray-100">
                            Time Format
                          </Label>
                          <Select
                            value={settings.timeFormat}
                            onValueChange={(value) => updateSetting("timeFormat", value)}
                          >
                            <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="12h">12 Hour</SelectItem>
                              <SelectItem value="24h">24 Hour</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Appearance Tab */}
                <TabsContent value="appearance">
                  <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                        <Palette className="w-5 h-5 mr-2" />
                        Appearance Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="theme" className="text-primary-900 dark:text-gray-100">
                            Theme
                          </Label>
                          <Select value={settings.theme} onValueChange={(value) => updateSetting("theme", value)}>
                            <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="fontSize" className="text-primary-900 dark:text-gray-100">
                            Font Size
                          </Label>
                          <Select value={settings.fontSize} onValueChange={(value) => updateSetting("fontSize", value)}>
                            <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="small">Small</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="large">Large</SelectItem>
                              <SelectItem value="extra-large">Extra Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Compact Mode</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Use a more compact interface layout
                            </p>
                          </div>
                          <Switch
                            checked={settings.compactMode}
                            onCheckedChange={(checked) => updateSetting("compactMode", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Animations</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Enable interface animations and transitions
                            </p>
                          </div>
                          <Switch
                            checked={settings.animations}
                            onCheckedChange={(checked) => updateSetting("animations", checked)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Chat Tab */}
                <TabsContent value="chat">
                  <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                        <SettingsIcon className="w-5 h-5 mr-2" />
                        Chat Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Enter to Send</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Press Enter to send messages (Shift+Enter for new line)
                            </p>
                          </div>
                          <Switch
                            checked={settings.enterToSend}
                            onCheckedChange={(checked) => updateSetting("enterToSend", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Read Receipts</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Send read receipts when you view messages
                            </p>
                          </div>
                          <Switch
                            checked={settings.readReceipts}
                            onCheckedChange={(checked) => updateSetting("readReceipts", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Typing Indicators</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Show when you're typing to others
                            </p>
                          </div>
                          <Switch
                            checked={settings.typingIndicators}
                            onCheckedChange={(checked) => updateSetting("typingIndicators", checked)}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="autoDownload" className="text-primary-900 dark:text-gray-100">
                          Auto-download Media
                        </Label>
                        <Select
                          value={settings.autoDownload}
                          onValueChange={(value) => updateSetting("autoDownload", value)}
                        >
                          <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                            <SelectItem value="never">Never</SelectItem>
                            <SelectItem value="wifi">Wi-Fi Only</SelectItem>
                            <SelectItem value="always">Always</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Storage Tab */}
                <TabsContent value="storage">
                  <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                        <SettingsIcon className="w-5 h-5 mr-2" />
                        Storage & Data
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary-900 dark:text-gray-100">Auto-delete Messages</h4>
                            <p className="text-sm text-primary-700 dark:text-gray-400">
                              Automatically delete old messages to save storage
                            </p>
                          </div>
                          <Switch
                            checked={settings.autoDelete}
                            onCheckedChange={(checked) => updateSetting("autoDelete", checked)}
                          />
                        </div>

                        {settings.autoDelete && (
                          <div>
                            <Label htmlFor="autoDeleteDays" className="text-primary-900 dark:text-gray-100">
                              Delete messages after
                            </Label>
                            <Select
                              value={settings.autoDeleteDays.toString()}
                              onValueChange={(value) => updateSetting("autoDeleteDays", Number.parseInt(value))}
                            >
                              <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="7">7 days</SelectItem>
                                <SelectItem value="30">30 days</SelectItem>
                                <SelectItem value="90">90 days</SelectItem>
                                <SelectItem value="365">1 year</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>

                      <div className="bg-primary-50 dark:bg-gray-700/50 p-4 rounded-lg">
                        <h4 className="font-medium text-primary-900 dark:text-gray-100 mb-2">Storage Usage</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-primary-700 dark:text-gray-400">Messages:</span>
                            <span className="text-primary-900 dark:text-gray-100">245 MB</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-primary-700 dark:text-gray-400">Media:</span>
                            <span className="text-primary-900 dark:text-gray-100">1.2 GB</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-primary-700 dark:text-gray-400">Cache:</span>
                            <span className="text-primary-900 dark:text-gray-100">{settings.cacheSize}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-primary-300 text-primary-700 hover:bg-primary-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Clear Cache
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-primary-300 text-primary-700 hover:bg-primary-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Export Data
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Advanced Tab */}
                <TabsContent value="advanced">
                  <div className="space-y-6">
                    <Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
                      <CardHeader>
                        <CardTitle className="flex items-center text-primary-900 dark:text-gray-100">
                          <SettingsIcon className="w-5 h-5 mr-2" />
                          Advanced Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-primary-900 dark:text-gray-100">Developer Mode</h4>
                              <p className="text-sm text-primary-700 dark:text-gray-400">
                                Enable advanced developer features and debugging
                              </p>
                            </div>
                            <Switch
                              checked={settings.developerMode}
                              onCheckedChange={(checked) => updateSetting("developerMode", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-primary-900 dark:text-gray-100">Debug Logs</h4>
                              <p className="text-sm text-primary-700 dark:text-gray-400">
                                Enable detailed logging for troubleshooting
                              </p>
                            </div>
                            <Switch
                              checked={settings.debugLogs}
                              onCheckedChange={(checked) => updateSetting("debugLogs", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-primary-900 dark:text-gray-100">Beta Features</h4>
                              <p className="text-sm text-primary-700 dark:text-gray-400">
                                Access experimental features before they're released
                              </p>
                            </div>
                            <Switch
                              checked={settings.betaFeatures}
                              onCheckedChange={(checked) => updateSetting("betaFeatures", checked)}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-red-200 dark:border-red-800 dark:bg-red-900/10">
                      <CardHeader>
                        <CardTitle className="flex items-center text-red-900 dark:text-red-400">
                          <AlertTriangle className="w-5 h-5 mr-2" />
                          Danger Zone
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <Button
                            variant="outline"
                            className="w-full justify-start border-red-300 text-red-700 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Reset All Settings
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start border-red-300 text-red-700 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete All Data
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start border-red-300 text-red-700 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            <User className="w-4 h-4 mr-2" />
                            Delete Account
                          </Button>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                          <p className="text-sm text-red-700 dark:text-red-400">
                            These actions are permanent and cannot be undone. Please proceed with caution.
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
