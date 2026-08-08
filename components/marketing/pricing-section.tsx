import { getTranslations } from "next-intl/server"
import { Check, ChevronRight } from "lucide-react"

import type { Locale } from "@/i18n/routing"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"
import { cohort } from "@/lib/constants"

export async function PricingSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Pricing" })
  const tc = await getTranslations({ locale, namespace: "Common" })

  const inclusions = t.raw("inclusions") as string[]
  const money = (value: number) => new Intl.NumberFormat(locale).format(value)

  return (
    <section id="tuition" className="border-y bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <RevealOnScroll className="overflow-hidden rounded-2xl border bg-card">
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col p-8 md:p-10">
              <div className="flex items-center gap-2">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {t("eyebrow")}
                </p>
                <Badge variant="secondary" className="font-normal">
                  {t("foundingLabel")}
                </Badge>
              </div>

              <p className="mt-5 font-heading text-5xl font-semibold tabular-nums">
                {money(cohort.tuitionAmount)}
                <span className="ml-2 align-middle text-lg font-normal text-muted-foreground">
                  {cohort.tuitionCurrency}
                </span>
              </p>

              {/* The standard rate is shown as an anchor, not as a struck-through
                  discount: the founding price reflects the cohort's stage. */}
              <p className="mt-2 text-sm text-muted-foreground">
                {t("standardNote")} : {money(cohort.standardTuition)}{" "}
                {cohort.tuitionCurrency}
              </p>

              <div className="mt-8 border-t pt-6">
                <p className="text-sm font-medium">{t("paymentTitle")}</p>
                <dl className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt>{t("paymentFull")}</dt>
                    <dd className="tabular-nums">
                      {money(cohort.tuitionAmount)} {cohort.tuitionCurrency}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt>{t("paymentSplit")}</dt>
                    <dd className="tabular-nums">
                      {cohort.instalmentCount} &times; {money(cohort.instalmentAmount)}{" "}
                      {cohort.tuitionCurrency}
                    </dd>
                  </div>
                </dl>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  {t("paymentAfter")}
                </p>
              </div>

              <div className="mt-auto pt-8">
                <Button
                  size="lg"
                  className="w-full pr-1.5 sm:w-auto"
                  render={
                    <Link href="/apply">
                      <span>{tc("applyCta")}</span>
                      <ChevronRight className="opacity-50" />
                    </Link>
                  }
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
