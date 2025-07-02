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
 * Smoothly scrolls the given element into view, with optional highlight, callback, offset, horizontal scroll, focus, and only-if-not-visible check.
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
  onlyIfNotVisible: boolean = false
) {
  if (!element) return

  // Only scroll if not visible
  if (onlyIfNotVisible && isElementInViewport(element)) {
    if (focus) element.focus?.()
    if (highlight) {
      const originalTransition = element.style.transition || ""
      const originalBg = element.style.backgroundColor || ""
      requestAnimationFrame(() => {
        element.style.transition = "background-color 0.3s"
        element.style.backgroundColor = highlightColor
        setTimeout(() => {
          element.style.backgroundColor = originalBg
          element.style.transition = originalTransition
          if (onDone) onDone()
        }, highlightDuration)
      })
    } else if (onDone) {
      onDone()
    }
    return
  }

  element.scrollIntoView(options)

  // If offset is set, adjust scroll position after scrollIntoView
  if (offset !== 0) {
    setTimeout(() => {
      if (horizontal) {
        const start = window.scrollX
        const end = start + offset
        animateScroll(start, end, 400, x => window.scrollTo(x, window.scrollY))
      } else {
        const start = window.scrollY
        const end = start + offset
        animateScroll(start, end, 400, y => window.scrollTo(window.scrollX, y))
      }
    }, 100)
  }

  if (highlight) {
    const originalTransition = element.style.transition || ""
    const originalBg = element.style.backgroundColor || ""
    requestAnimationFrame(() => {
      element.style.transition = "background-color 0.3s"
      element.style.backgroundColor = highlightColor
      setTimeout(() => {
        element.style.backgroundColor = originalBg
        element.style.transition = originalTransition
        if (onDone) onDone()
      }, highlightDuration)
    })
  } else if (onDone) {
    setTimeout(onDone, 400)
  }

  if (focus) {
    setTimeout(() => {
      element.focus?.()
    }, 500)
  }
}

/**
 * Checks if an element is in the viewport.
 */
function isElementInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Animate scroll position with easeInOutQuad.
 */
function animateScroll(
  start: number,
  end: number,
  duration: number,
  setPos: (pos: number) => void
) {
  const startTime = performance.now()
  function animate(now: number) {
    const elapsed = now - startTime
    const t = Math.min(1, elapsed / duration)
    const eased = easeInOutQuad(t)
    setPos(start + (end - start) * eased)
    if (t < 1) requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)
}

/**
 * Ease in out quad function for smooth animation.
 */
function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}
