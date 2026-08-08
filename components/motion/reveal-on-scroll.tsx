"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type Tag = "div" | "p" | "li" | "span" | "h1" | "h2" | "h3"

/**
 * Restrained fade/translate reveal on viewport entry, adapted from reactbits.dev's
 * scroll-reveal concept but rewritten with no external animation dependency and no
 * flashy defaults, matching the "quiet intelligence" visual direction: a single
 * subtle motion, once, never looping or drawing attention to itself.
 */
export function RevealOnScroll({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: Tag
}) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Cast once here rather than threading a generic through every call site:
  // the union of intrinsic element props is not worth the inference cost for a
  // purely presentational wrapper.
  const Component = as as "div"

  return (
    <Component
      ref={ref as React.Ref<HTMLDivElement>}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-3 opacity-0 motion-reduce:opacity-100",
        className
      )}
    >
      {children}
    </Component>
  )
}
