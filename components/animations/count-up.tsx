"use client"

import { useCallback, useEffect, useRef } from "react"
import { useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react"

/**
 * Spring driven number counter, adapted from the CountUp component published by
 * React Bits (reactbits.dev). Changes against the upstream source: accepts a
 * locale so French and English pages group digits correctly, and renders the
 * final value immediately when the visitor prefers reduced motion.
 */

interface CountUpProps {
  to: number
  from?: number
  delay?: number
  duration?: number
  className?: string
  locale?: string
  suffix?: string
}

export function CountUp({
  to,
  from = 0,
  delay = 0,
  duration = 1.6,
  className,
  locale = "fr-FR",
  suffix = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(from)
  const reduceMotion = useReducedMotion()

  const springValue = useSpring(motionValue, {
    damping: 20 + 40 * (1 / duration),
    stiffness: 100 * (1 / duration),
  })

  const isInView = useInView(ref, { once: true, margin: "0px" })

  const formatValue = useCallback(
    (latest: number) => Intl.NumberFormat(locale).format(Math.round(latest)) + suffix,
    [locale, suffix]
  )

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(reduceMotion ? to : from)
    }
  }, [from, to, formatValue, reduceMotion])

  useEffect(() => {
    if (reduceMotion || !isInView) return

    const timeoutId = setTimeout(() => motionValue.set(to), delay * 1000)
    return () => clearTimeout(timeoutId)
  }, [isInView, motionValue, to, delay, reduceMotion])

  useEffect(() => {
    if (reduceMotion) return

    return springValue.on("change", (latest: number) => {
      if (ref.current) ref.current.textContent = formatValue(latest)
    })
  }, [springValue, formatValue, reduceMotion])

  return <span ref={ref} className={className} />
}
