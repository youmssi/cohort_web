import { getTranslations } from "next-intl/server"
import { ChevronRight } from "lucide-react"

import type { Locale } from "@/i18n/routing"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"
import { cohort } from "@/lib/constants"

export async function FinalCta({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Home" })
  const tc = await getTranslations({ locale, namespace: "Common" })

  return (
    <section className="mx-auto max-w-3xl px-4 py-28 text-center sm:px-6">
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
        <Button
          size="lg"
          className="pr-1.5"
          render={
            <Link href="/apply">
              <span>{tc("applyCta")}</span>
              <ChevronRight className="opacity-50" />
            </Link>
          }
        />
        <Button
          size="lg"
          variant="outline"
          render={<Link href="/diagnostic">{tc("diagnosticCta")}</Link>}
        />
      </RevealOnScroll>

      <RevealOnScroll delay={360} className="mt-6 text-xs text-muted-foreground">
        {cohort.minSeats}&ndash;{cohort.maxSeats} {tc("participantsLabel")} ·{" "}
        {tc("selectiveAdmission")}
      </RevealOnScroll>
    </section>
  )
}
