// Utility functions

// Capitalize the first letter of a string
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Format a number as a percentage string
export function formatPercent(value: number, decimals = 0) {
  return `${(value * 100).toFixed(decimals)}%`
}

// Clamp a number between min and max
export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max)
}

// Generate a random hex color
export function randomHexColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`
}