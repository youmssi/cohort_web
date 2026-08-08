import { getTranslations } from "next-intl/server"
import { ChevronRight } from "lucide-react"

import type { Locale } from "@/i18n/routing"
import { ButtonLink } from "@/components/shared"
import { RevealOnScroll } from "@/components/animations/reveal-on-scroll"
import { cohortName, currentCohort } from "@/lib/cohorts"

const stepKeys = ["diagnostic", "application", "conversation", "decision"] as const

export async function AdmissionsSteps({
  locale,
  showCta = true,
}: {
  locale: Locale
  showCta?: boolean
}) {
  const t = await getTranslations({ locale, namespace: "Admissions" })
  const tHome = await getTranslations({ locale, namespace: "Home" })
  const tc = await getTranslations({ locale, namespace: "Common" })

  return (
    <section id="admissions" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <RevealOnScroll
          as="h2"
          className="text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {tHome("admissionsTitle")}
        </RevealOnScroll>
        <RevealOnScroll delay={120} className="mt-4 text-pretty text-muted-foreground">
          {tHome("admissionsSubtitle")}
        </RevealOnScroll>
      </div>

      <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stepKeys.map((key, index) => (
          <RevealOnScroll
            key={key}
            delay={index * 90}
            as="li"
            className="relative rounded-2xl border bg-card p-6"
          >
            <span className="inline-flex size-8 items-center justify-center rounded-full border font-mono text-xs tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-4 font-heading text-base font-semibold">
              {t(`steps.${key}.title`)}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {t(`steps.${key}.body`)}
            </p>
          </RevealOnScroll>
        ))}
      </ol>

      {showCta && (
        <RevealOnScroll delay={400} className="mt-12 flex justify-center">
          <ButtonLink href="/apply" size="lg" className="pr-1.5">
            <span>{tc("applyCta", { cohort: cohortName(currentCohort()) })}</span>
            <ChevronRight className="opacity-50" />
          </ButtonLink>
        </RevealOnScroll>
      )}
    </section>
  )
}
