import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-gray-50 dark:bg-black">
        <AppSidebar />
        <main className="flex-1 ml-64 h-screen overflow-hidden">{children}</main>
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
