"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
// Define ThemeProviderProps manually since it's not exported from next-themes
import type { ReactNode } from "react"
import type { ThemeProviderProps as NextThemeProviderProps } from "next-themes/dist/types"

interface ThemeProviderProps extends Omit<NextThemeProviderProps, "children"> {
  children: ReactNode
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
