import type { Week } from "@/.velite"

import { Link } from "@/i18n/navigation"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"

interface Phase {
  phase: number
  title: string
  weeks: Week[]
}

export function JourneyTimeline({ phases }: { phases: Phase[] }) {
  return (
    <section id="journey" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <RevealOnScroll as="h2" className="text-balance text-center font-heading text-3xl font-semibold sm:text-4xl">
        Quatre phases. Seize semaines. Un défi de transformation.
      </RevealOnScroll>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {phases.map((phase, index) => (
          <RevealOnScroll key={phase.phase} delay={index * 100} className="rounded-2xl border p-6">
            <p className="font-mono text-xs text-muted-foreground">
              Phase {phase.phase.toString().padStart(2, "0")}
            </p>
            <p className="mt-1 font-heading text-xl font-semibold">{phase.title}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {phase.weeks.map((week) => (
                <li key={week.week}>
                  <Link
                    href={`/curriculum/${week.week}`}
                    className="transition-colors hover:text-foreground hover:underline"
                  >
                    S{week.week.toString().padStart(2, "0")} · {week.title}
                  </Link>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
