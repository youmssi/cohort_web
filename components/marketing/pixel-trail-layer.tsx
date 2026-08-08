"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

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
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.18]">
      <div className="pointer-events-auto size-full">
        <PixelTrail
          gridSize={60}
          trailSize={0.08}
          maxAge={220}
          interpolate={4}
          color="currentColor"
          gooeyFilter={{ id: "cohort-goo", strength: 2 }}
        />
      </div>
    </div>
  )
}
