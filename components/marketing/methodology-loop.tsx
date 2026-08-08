"use client"

import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"
import { Skeleton } from "@/components/ui/skeleton"
import type { FlowStep } from "./method-flow-canvas"

/**
 * React Flow ships a non-trivial runtime, and this diagram is decorative rather
 * than load bearing. It is loaded on the client only, behind a skeleton, so it
 * never blocks the first paint. The static list below stays in the markup for
 * crawlers, assistive technology and anyone on reduced motion.
 */
const MethodFlowCanvas = dynamic(() => import("./method-flow-canvas"), {
  ssr: false,
  loading: () => <Skeleton className="h-[380px] w-full rounded-2xl" />,
})

const stepKeys = ["challenge", "investigate", "peer", "apply", "defend"] as const

export function MethodologyLoop() {
  const t = useTranslations("Method")
  const tHome = useTranslations("Home")

  const steps: FlowStep[] = stepKeys.map((key) => ({
    id: key,
    title: t(`steps.${key}.title`),
    body: t(`steps.${key}.body`),
  }))

  return (
    <section id="method" className="border-y bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <RevealOnScroll
          as="h2"
          className="mx-auto max-w-2xl text-balance text-center font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {tHome("methodTitle")}
        </RevealOnScroll>
        <RevealOnScroll
          delay={120}
          className="mx-auto mt-4 max-w-xl text-pretty text-center text-muted-foreground"
        >
          {tHome("methodSubtitle")}
        </RevealOnScroll>

        <RevealOnScroll delay={220} className="mt-12 overflow-hidden rounded-2xl border bg-card">
          <MethodFlowCanvas steps={steps} />
        </RevealOnScroll>

        {/* Text equivalent of the diagram. Always rendered for a11y and crawlers. */}
        <ol className="mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {steps.map((step, index) => (
            <RevealOnScroll key={step.id} as="li" delay={index * 70}>
              <p className="font-mono text-[0.625rem] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 font-heading text-sm font-semibold">{step.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </RevealOnScroll>
          ))}
        </ol>
      </div>
    </section>
  )
}
