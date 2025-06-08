import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { useEffect } from "react"
import { useTheme } from "next-themes"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HashChat - Secure Messaging",
  description: "Military-grade secure messaging with advanced encryption and self-destructive messages",
}

// Keyboard shortcut for theme toggle
function ThemeShortcut() {
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "j") {
        setTheme(theme === "dark" ? "light" : "dark")
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [theme, setTheme])
  return null
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + " relative min-h-screen"}>
        {/* Futuristic animated background */}
        <div
          aria-hidden="true"
          className="fixed inset-0 z-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a192f] animate-pulse opacity-90"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/60 via-transparent to-transparent blur-2xl" />
          {/* Animated floating dots */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="absolute left-1/4 top-1/3 h-4 w-4 rounded-full bg-blue-400 opacity-40 blur-2xl animate-pulse" />
            <div className="absolute right-1/4 bottom-1/4 h-3 w-3 rounded-full bg-cyan-400 opacity-30 blur-xl animate-bounce" />
            <div className="absolute left-1/2 top-2/3 h-2 w-2 rounded-full bg-indigo-400 opacity-30 blur-lg animate-ping" />
          </div>
        </div>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ThemeShortcut />
          {/* Global notification area */}
          <div id="global-toast" className="fixed top-4 right-4 z-50" />
          <main className="relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
