import { getTranslations } from "next-intl/server"

import type { Week } from "@/.velite"
import type { Locale } from "@/i18n/routing"
import { Link } from "@/i18n/navigation"
import { RevealOnScroll } from "@/components/animations/reveal-on-scroll"

interface Phase {
  phase: number
  title: string
  weeks: Week[]
}

export async function JourneyTimeline({
  phases,
  locale,
  showHeading = true,
}: {
  phases: Phase[]
  locale: Locale
  showHeading?: boolean
}) {
  const t = await getTranslations({ locale, namespace: "Home" })
  const tc = await getTranslations({ locale, namespace: "Common" })

  return (
    <section id="journey" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      {showHeading && (
        <div className="mx-auto max-w-2xl text-center">
          <RevealOnScroll
            as="h2"
            className="text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {t("journeyTitle")}
          </RevealOnScroll>
          <RevealOnScroll delay={120} className="mt-4 text-pretty text-muted-foreground">
            {t("journeySubtitle")}
          </RevealOnScroll>
        </div>
      )}

      <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {phases.map((phase, index) => (
          <RevealOnScroll
            key={phase.phase}
            delay={index * 90}
            className="flex flex-col rounded-2xl border bg-card p-6"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[0.625rem] text-muted-foreground">
                {tc("phase")} {String(phase.phase).padStart(2, "0")}
              </span>
              <span
                aria-hidden
                className="h-px flex-1 bg-linear-to-r from-border to-transparent"
              />
            </div>
            <p className="mt-2 font-heading text-xl font-semibold">{phase.title}</p>

            <ul className="mt-5 space-y-2.5 text-sm">
              {phase.weeks.map((week) => (
                <li key={week.week} className="flex gap-2.5">
                  <span className="mt-px w-6 shrink-0 font-mono text-[0.625rem] text-muted-foreground tabular-nums">
                    {String(week.week).padStart(2, "0")}
                  </span>
                  <Link
                    href={`/curriculum/${week.week}`}
                    className="text-muted-foreground transition-colors hover:text-foreground hover:underline"
                  >
                    {week.title}
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
