"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useReducedMotion, type Transition } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Word by word blur reveal, adapted from the BlurText component published by
 * React Bits (reactbits.dev). Changes against the upstream source: renders a
 * configurable element instead of a hardcoded paragraph, honours
 * prefers-reduced-motion, and uses the project's `cn` helper.
 */

type BlurTextProps = {
  text: string
  className?: string
  delay?: number
  animateBy?: "words" | "letters"
  direction?: "top" | "bottom"
  threshold?: number
  rootMargin?: string
  stepDuration?: number
  as?: "h1" | "h2" | "h3" | "p" | "span"
}

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((step) => Object.keys(step)),
  ])

  const keyframes: Record<string, Array<string | number>> = {}
  keys.forEach((key) => {
    keyframes[key] = [from[key], ...steps.map((step) => step[key])]
  })
  return keyframes
}

export function BlurText({
  text,
  className,
  delay = 80,
  animateBy = "words",
  direction = "top",
  threshold = 0.15,
  rootMargin = "0px",
  stepDuration = 0.35,
  as: Tag = "p",
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("")
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const from = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(8px)", opacity: 0, y: -18 }
        : { filter: "blur(8px)", opacity: 0, y: 18 },
    [direction]
  )

  const to = useMemo(
    () => [
      { filter: "blur(4px)", opacity: 0.55, y: direction === "top" ? 4 : -4 },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  )

  const stepCount = to.length + 1
  const totalDuration = stepDuration * (stepCount - 1)
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  )

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag ref={ref as never} className={cn("flex flex-wrap", className)}>
      {elements.map((segment, index) => {
        const transition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
        }

        return (
          <motion.span
            key={`${segment}-${index}`}
            initial={from}
            animate={inView ? buildKeyframes(from, to) : from}
            transition={transition}
            className="inline-block will-change-[transform,filter,opacity]"
          >
            {segment === " " ? " " : segment}
            {animateBy === "words" && index < elements.length - 1 && " "}
          </motion.span>
        )
      })}
    </Tag>
  )
}
