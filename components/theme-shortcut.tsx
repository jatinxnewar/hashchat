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