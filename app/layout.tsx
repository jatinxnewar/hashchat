import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HashChat - Secure Messaging",
  description: "Military-grade secure messaging with advanced encryption and self-destructive messages",
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
        </div>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Global notification area */}
          <div id="global-toast" className="fixed top-4 right-4 z-50" />
          <main className="relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
