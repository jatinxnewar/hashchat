"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, MessageSquare, Clock, Users, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate signup
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 dark:from-black dark:via-gray-950 dark:to-gray-900 flex items-center justify-center overflow-hidden">
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      <div className="w-full h-full max-w-7xl grid lg:grid-cols-2 gap-8 items-center px-8">
        {/* Left side - Branding */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-500 dark:to-primary-600 rounded-xl flex items-center justify-center shadow-xl">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-primary-100 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                HashChat
              </h1>
            </div>
            <p className="text-xl text-primary-100 dark:text-gray-300 leading-relaxed">
              Military-grade secure messaging with advanced encryption and self-destructive messages
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center space-x-4 p-6 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30">
              <Shield className="w-12 h-12 text-primary-300 dark:text-gray-300" />
              <div>
                <h3 className="font-semibold text-white text-lg">AES-256 Encryption</h3>
                <p className="text-sm text-primary-200 dark:text-gray-400">Military-grade security</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30">
              <Clock className="w-12 h-12 text-primary-300 dark:text-gray-300" />
              <div>
                <h3 className="font-semibold text-white text-lg">Self-Destructing</h3>
                <p className="text-sm text-primary-200 dark:text-gray-400">Messages disappear</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30">
              <Users className="w-12 h-12 text-primary-300 dark:text-gray-300" />
              <div>
                <h3 className="font-semibold text-white text-lg">Secure Groups</h3>
                <p className="text-sm text-primary-200 dark:text-gray-400">Encrypted team chat</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30">
              <Lock className="w-12 h-12 text-primary-300 dark:text-gray-300" />
              <div>
                <h3 className="font-semibold text-white text-lg">Smart Scheduling</h3>
                <p className="text-sm text-primary-200 dark:text-gray-400">Send messages later</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <Card className="w-full max-w-lg mx-auto shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-3xl text-center text-primary-900 dark:text-gray-100">
              Welcome to HashChat
            </CardTitle>
            <CardDescription className="text-center text-primary-700 dark:text-gray-400 text-lg">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-primary-50 dark:bg-gray-800 h-12">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-primary-600 data-[state=active]:text-white text-lg"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-primary-600 data-[state=active]:text-white text-lg"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6 mt-6">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-primary-900 dark:text-gray-200 text-lg">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="border-primary-200 focus:border-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 h-12 text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-primary-900 dark:text-gray-200 text-lg">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="border-primary-200 focus:border-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 h-12 text-lg"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg h-12 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-6 mt-6">
                <form onSubmit={handleSignup} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-primary-900 dark:text-gray-200 text-lg">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      className="border-primary-200 focus:border-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 h-12 text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-primary-900 dark:text-gray-200 text-lg">
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="border-primary-200 focus:border-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 h-12 text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-primary-900 dark:text-gray-200 text-lg">
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="border-primary-200 focus:border-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 h-12 text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-primary-900 dark:text-gray-200 text-lg">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="border-primary-200 focus:border-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 h-12 text-lg"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg h-12 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
