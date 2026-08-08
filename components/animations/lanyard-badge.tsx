"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

// The scene pulls in three, rapier's WASM physics and a 2.4 MB model. None of
// that belongs in the initial bundle of a marketing page, and the audience for
// this site was told a stable connection is a prerequisite, not a given.
const Lanyard = dynamic(() => import("./lanyard"), { ssr: false })

/**
 * The hanging cohort badge, loaded only when it is worth loading: once the
 * section is actually on screen, and never for visitors who asked for reduced
 * motion or who are on a connection that says otherwise. Everyone else gets the
 * same card as a flat image, which is the real content either way.
 */
export function LanyardBadge({ image, alt }: { image: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection
    if (connection?.saveData) return
    if (connection?.effectiveType && /2g/.test(connection.effectiveType)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative h-[440px] w-full sm:h-[520px]">
      {active ? (
        <Lanyard
          position={[0, 0, 18]}
          gravity={[0, -40, 0]}
          frontImage={image}
          backImage={image}
          imageFit="cover"
          lanyardWidth={0.8}
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={alt}
            className="h-full max-h-[420px] w-auto rounded-xl border shadow-lg"
          />
        </div>
      )}
    </div>
  )
}
