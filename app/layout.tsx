import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeShortcut } from "@/components/theme-shortcut"

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ThemeShortcut />
          <main className="relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}


const loadingMessages = [
  "Encrypting your messages...",
  "Establishing secure connection...",
  "Synchronizing with the blockchain...",
  "Generating quantum keys...",
  "Activating stealth mode...",
  "Hashing secrets...",
  "Deploying cyber shields...",
  "Optimizing neural pathways...",
]

export function Loading() {
  const [messageIndex, setMessageIndex] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [swap, setSwap] = React.useState(false)
  const [paused, setPaused] = React.useState(false)

  // Progress bar simulation
  React.useEffect(() => {
    if (!paused && progress < 100) {
      const timer = setTimeout(() => setProgress(progress + Math.random() * 10), 250)
      return () => clearTimeout(timer)
    }
  }, [progress, paused])

  // Animated icon swap
  React.useEffect(() => {
    if (paused) return
    const interval = setInterval(() => setSwap(s => !s), 1000)
    return () => clearInterval(interval)
  }, [paused])

  // Cycle loading messages every 2 seconds
  React.useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setMessageIndex(idx => (idx + 1) % loadingMessages.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [paused])

  // Estimate time remaining (fake, for demo)
  const estimatedSeconds = Math.max(0, Math.round((100 - progress) / 10 * 0.25))

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a192f]"
      aria-busy={progress < 100}
      aria-live="polite"
    >
      {/* Animated gradient ring with orbiting dot */}
      <div className="relative flex items-center justify-center mb-8">
        <span className="absolute inline-flex h-20 w-20 rounded-full bg-blue-500 opacity-20 blur-2xl animate-pulse"></span>
        <span className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></span>
        {/* Orbiting dot with color swap */}
        <span className={`absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full shadow-lg animate-orbit ${swap ? "bg-cyan-400" : "bg-pink-400"}`}></span>
        <span className="absolute h-8 w-8 rounded-full bg-blue-400 opacity-60 blur"></span>
      </div>
      {/* Main loading text */}
      <span className="text-2xl font-extrabold tracking-widest text-blue-200 drop-shadow-lg animate-pulse mb-2">
        Loading HashChat...
      </span>
      {/* Cycling futuristic loading message */}
      <span className="text-sm text-blue-300 tracking-wide animate-fade-in mb-2">
        {loadingMessages[messageIndex]}
      </span>
      {/* Progress percentage label */}
      <span className="mb-1 text-xs text-blue-400 font-mono">{Math.min(Math.round(progress), 100)}%</span>
      {/* Estimated time remaining */}
      <span className="mb-2 text-xs text-blue-500 font-mono">
        {progress < 100 ? `~${estimatedSeconds}s remaining` : "Ready!"}
      </span>
      {/* Progress bar */}
      <div className="w-64 h-2 bg-blue-900 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {/* Animated loading dots */}
      <div className="flex space-x-1 mb-4">
        <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.2s]"></span>
        <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.1s]"></span>
        <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce"></span>
      </div>
      {/* Pause/Resume Button */}
      <button
        className="px-4 py-1 rounded bg-blue-700 text-blue-100 text-xs font-semibold hover:bg-blue-800 transition mb-2"
        onClick={() => setPaused(p => !p)}
      >
        {paused ? "Resume" : "Pause"}
      </button>
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

/**
 * Smoothly scrolls the given element into view, with optional highlight and callback.
 * @param element The HTMLElement to scroll into view
 * @param options ScrollIntoView options (optional)
 * @param highlight If true, highlights the element after scrolling (default: false)
 * @param highlightColor The background color to use for highlight (default: yellow)
 * @param highlightDuration How long the highlight lasts in ms (default: 800)
 * @param onDone Optional callback after scrolling and highlight
 */
export function smoothScrollIntoView(
  element: HTMLElement | null,
  options: ScrollIntoViewOptions = { behavior: "smooth", block: "center" },
  highlight: boolean = false,
  highlightColor: string = "#fef08a",
  highlightDuration: number = 800,
  onDone?: () => void
) {
  if (!element) return

  element.scrollIntoView(options)

  if (highlight) {
    const originalTransition = element.style.transition
    const originalBg = element.style.backgroundColor
    element.style.transition = "background-color 0.3s"
    element.style.backgroundColor = highlightColor

    setTimeout(() => {
      element.style.backgroundColor = originalBg
      element.style.transition = originalTransition
      if (onDone) onDone()
    }, highlightDuration)
  } else if (onDone) {
    setTimeout(onDone, 400) // Estimate scroll duration
  }
}
