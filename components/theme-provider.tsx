"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
// Define ThemeProviderProps manually since it's not exported from next-themes
import type { ReactNode } from "react"

interface ThemeProviderProps {
  children: ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  storageKey?: string
  themes?: string[]
  forcedTheme?: string
  value?: string
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
