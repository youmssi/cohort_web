import { getTranslations } from "next-intl/server"
import { Check } from "lucide-react"

import type { Locale } from "@/i18n/routing"
import { Badge } from "@/components/ui/badge"
import { RevealOnScroll } from "@/components/animations/reveal-on-scroll"
import { CohortCta } from "@/components/marketing/cohort-cta"
import { currentCohort, cohortName, type Cohort } from "@/lib/cohorts"

export async function PricingSection({
  locale,
  cohort,
}: {
  locale: Locale
  /** Defaults to the session the site is currently promoting. */
  cohort?: Cohort
}) {
  const t = await getTranslations({ locale, namespace: "Pricing" })
  const session = cohort ?? currentCohort()

  const inclusions = t.raw("inclusions") as string[]
  const money = (value: number) => new Intl.NumberFormat(locale).format(value)

  return (
    <section id="tuition" className="border-y bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <RevealOnScroll className="overflow-hidden rounded-2xl border bg-card">
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {t("eyebrow")}
                </p>
                <Badge variant="secondary" className="font-normal">
                  {session.founding ? t("foundingLabel") : cohortName(session)}
                </Badge>
              </div>

              <p className="mt-5 font-heading text-5xl font-semibold tabular-nums">
                {money(session.tuition)}
                <span className="ml-2 align-middle text-lg font-normal text-muted-foreground">
                  GNF
                </span>
              </p>

              {/* The standard rate is an anchor, not a struck-through discount:
                  the founding price reflects the cohort's stage, and the brief
                  is explicit that fake discounting undercuts the positioning. */}
              {session.founding && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("standardNote")} : {money(session.standardTuition)} GNF
                </p>
              )}

              <div className="mt-8 border-t pt-6">
                <p className="text-sm font-medium">{t("paymentTitle")}</p>
                <dl className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt>{t("paymentFull")}</dt>
                    <dd className="tabular-nums">{money(session.tuition)} GNF</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt>{t("paymentSplit")}</dt>
                    <dd className="tabular-nums">
                      {session.instalment.count} &times;{" "}
                      {money(session.instalment.amount)} GNF
                    </dd>
                  </div>
                </dl>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  {t("paymentAfter")}
                </p>
              </div>

              <div className="mt-auto pt-8">
                <CohortCta
                  cohort={session}
                  locale={locale}
                  className="w-full pr-1.5 sm:w-auto"
                />
              </div>
            </div>

            <div className="border-t bg-muted/40 p-8 md:border-t-0 md:border-l md:p-10">
              <p className="text-sm font-medium">{t("includes")}</p>
              <ul className="mt-5 space-y-3">
                {inclusions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
