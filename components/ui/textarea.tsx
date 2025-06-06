import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  const innerRef = React.useRef<HTMLTextAreaElement | null>(null)

  // Combine forwarded ref and local ref
  React.useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement)

  // Auto-resize effect
  React.useEffect(() => {
    const textarea = innerRef.current
    if (!textarea) return
    const handleInput = () => {
      textarea.style.height = "auto"
      textarea.style.height = textarea.scrollHeight + "px"
    }
    textarea.addEventListener("input", handleInput)
    // Initial resize
    handleInput()
    return () => textarea.removeEventListener("input", handleInput)
  }, [])

  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
        className,
      )}
      ref={innerRef}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
