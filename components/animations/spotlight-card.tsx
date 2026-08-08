"use client"

import { useRef, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * Cursor tracking spotlight surface, adapted from the SpotlightCard component
 * published by React Bits (reactbits.dev). Changes against the upstream source:
 * styling comes from the project's theme tokens instead of hardcoded neutral
 * colours, and the glow is tuned down so it reads as a highlight rather than an
 * effect.
 */

export function SpotlightCard({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  return (
    <div
      ref={ref}
      onMouseMove={(event) => {
        const node = ref.current
        if (!node) return
        const rect = node.getBoundingClientRect()
        setPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top })
      }}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card transition-colors",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 motion-reduce:hidden"
        style={{
          opacity,
          background: `radial-gradient(340px circle at ${position.x}px ${position.y}px, color-mix(in oklch, var(--foreground) 7%, transparent), transparent 70%)`,
        }}
      />
      {children}
    </div>
  )
}
