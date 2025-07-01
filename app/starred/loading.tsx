/**
 * Smoothly scrolls the given element into view, with optional highlight, callback, and offset.
 * @param element The HTMLElement to scroll into view
 * @param options ScrollIntoView options (optional)
 * @param highlight If true, highlights the element after scrolling (default: false)
 * @param highlightColor The background color to use for highlight (default: yellow)
 * @param highlightDuration How long the highlight lasts in ms (default: 800)
 * @param onDone Optional callback after scrolling and highlight
 * @param offset Optional vertical offset in pixels (e.g., for fixed headers)
 */
export function smoothScrollIntoView(
  element: HTMLElement | null,
  options: ScrollIntoViewOptions = { behavior: "smooth", block: "center" },
  highlight: boolean = false,
  highlightColor: string = "#fef08a",
  highlightDuration: number = 800,
  onDone?: () => void,
  offset: number = 0
) {
  if (!element) return

  element.scrollIntoView(options)

  // If offset is set, adjust scroll position after scrollIntoView
  if (offset !== 0) {
    setTimeout(() => {
      window.scrollBy({ top: offset, behavior: "smooth" })
    }, 100) // Delay to allow scrollIntoView to finish
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
}

export default function Loading() {
  return null
}
