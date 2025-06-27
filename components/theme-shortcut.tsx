"use client"
import { useEffect } from "react"
import { useTheme } from "next-themes"

export function ThemeShortcut() {
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "m") {
        setTheme(theme === "dark" ? "light" : "dark")
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [theme, setTheme])
  return null
}

/**
 * Triggers a CSS animation by adding a class and removing it after animation ends.
 * @param element The HTMLElement to animate
 * @param animationClass The CSS class that defines the animation
 */
export function triggerAnimation(element: HTMLElement, animationClass: string) {
  if (!element) return
  element.classList.add(animationClass)
  function handleAnimationEnd() {
    element.classList.remove(animationClass)
    element.removeEventListener("animationend", handleAnimationEnd)
  }
  element.addEventListener("animationend", handleAnimationEnd)
}

/**
 * Smoothly scrolls the given element into view.
 * @param element The HTMLElement to scroll into view
 * @param options ScrollIntoView options (optional)
 */
export function smoothScrollIntoView(
  element: HTMLElement | null,
  options: ScrollIntoViewOptions = { behavior: "smooth", block: "center" }
) {
  if (element) {
    element.scrollIntoView(options)
  }
}