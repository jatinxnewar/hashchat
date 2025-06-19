// Class name combiner (Tailwind + conditional classes)
export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ")
}

// Delay utility for async/await
export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Random integer in range [min, max]
export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Shuffle an array (Fisher-Yates)
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Custom hook: useInterval
import { useEffect, useRef } from "react"
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  useEffect(() => {
    if (delay === null) return
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

// Custom hook: useTimeout
export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  useEffect(() => {
    if (delay === null) return
    const id = setTimeout(() => savedCallback.current(), delay)
    return () => clearTimeout(id)
  }, [delay])
}
