"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * Word-by-word reveal for major statements (hero headline, section breaks).
 * Adapted from reactbits.dev's split-text pattern, simplified to plain CSS
 * transitions (no animation library) and restrained to a small upward fade —
 * used sparingly, per the brand's "restraint over spectacle" direction.
 */
export function TextReveal({
  text,
  className,
  wordClassName,
  as: Tag = "span",
}: {
  text: string
  className?: string
  wordClassName?: string
  as?: "span" | "h1" | "h2" | "h3" | "p"
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  const words = text.split(" ")

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
      { threshold: 0.4 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref as never} className={cn("inline", className)}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={cn(
            "inline-block transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0 motion-reduce:opacity-100",
            wordClassName
          )}
          style={{ transitionDelay: `${index * 35}ms` }}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  )
}
