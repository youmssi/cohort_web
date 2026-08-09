"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

const PixelTrail = dynamic(() => import("@/components/animations/pixel-trail"), {
  ssr: false,
  loading: () => null,
})

/**
 * Decorative cursor trail for the closing section.
 *
 * PixelTrail renders through three.js, which is a heavy runtime for something
 * purely ornamental. This wrapper makes the cost opt-in: the chunk is only
 * requested once the visitor is on a wide viewport, driving a precise pointer
 * (so touch devices are excluded), and has not asked for reduced motion. On a
 * phone or a low-power device nothing is downloaded at all.
 */
export function PixelTrailLayer() {
  const [enabled, setEnabled] = useState(false)
  const probe = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const [trailColor, setTrailColor] = useState<string | null>(null)

  // three.js parses rgb() but not `currentColor` or the oklch() the theme
  // tokens are authored in. Reading the resolved colour off the element keeps
  // the trail tied to --foreground instead of duplicating the palette here,
  // and re-reading on theme change follows the toggle.
  useEffect(() => {
    if (!enabled || !probe.current) return
    setTrailColor(getComputedStyle(probe.current).color)
  }, [enabled, resolvedTheme])

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)")
    const wideViewport = window.matchMedia("(min-width: 1024px)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const evaluate = () =>
      setEnabled(finePointer.matches && wideViewport.matches && !reducedMotion.matches)

    evaluate()

    const queries = [finePointer, wideViewport, reducedMotion]
    queries.forEach((query) => query.addEventListener("change", evaluate))
    return () => queries.forEach((query) => query.removeEventListener("change", evaluate))
  }, [])

  if (!enabled) return null

  return (
    // A dark trail on a light background reads fainter than the inverse at the
    // same alpha, so light mode gets a little more of it.
    <div
      ref={probe}
      aria-hidden
      className="pointer-events-none absolute inset-0 text-foreground opacity-[0.26] dark:opacity-[0.18]"
    >
      {trailColor && (
        <div className="pointer-events-auto size-full">
          <PixelTrail
            gridSize={60}
            trailSize={0.08}
            maxAge={220}
            interpolate={4}
            color={trailColor}
            gooeyFilter={{ id: "cohort-goo", strength: 2 }}
          />
        </div>
      )}
    </div>
  )
}
