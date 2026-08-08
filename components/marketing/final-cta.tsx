import { getTranslations } from "next-intl/server"
import { ChevronRight } from "lucide-react"

import type { Locale } from "@/i18n/routing"
import { ButtonLink } from "@/components/button-link"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"
import { PixelTrailLayer } from "@/components/marketing/pixel-trail-layer"
import { cohortName, currentCohort } from "@/lib/cohorts"

export async function FinalCta({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Home" })
  const tc = await getTranslations({ locale, namespace: "Common" })
  const session = currentCohort()

  return (
    <section className="relative isolate overflow-hidden px-4 py-28 text-center sm:px-6">
      <PixelTrailLayer />
      <div className="relative mx-auto max-w-3xl">
      <RevealOnScroll
        as="h2"
        className="text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        {t("finalTitle")}
      </RevealOnScroll>
      <RevealOnScroll
        delay={140}
        as="p"
        className="mt-3 text-balance font-heading text-3xl font-semibold tracking-tight text-muted-foreground sm:text-4xl"
      >
        {t("finalSubtitle")}
      </RevealOnScroll>

        <RevealOnScroll delay={280} className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/apply" size="lg" className="pr-1.5">
          <span>{tc("applyCta", { cohort: cohortName(session) })}</span>
          <ChevronRight className="opacity-50" />
        </ButtonLink>
        <ButtonLink href="/diagnostic" size="lg" variant="outline">
          {tc("diagnosticCta")}
        </ButtonLink>
      </RevealOnScroll>

        <RevealOnScroll delay={360} className="mt-6 text-xs text-muted-foreground">
          {session.seats.min}&ndash;{session.seats.max} {tc("participantsLabel")} ·{" "}
          {tc("selectiveAdmission")}
        </RevealOnScroll>
      </div>
    </section>
  )
}
