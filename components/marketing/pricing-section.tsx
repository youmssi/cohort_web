import { getTranslations } from "next-intl/server"
import { Check, ChevronRight } from "lucide-react"

import type { Locale } from "@/i18n/routing"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"
import { cohort } from "@/lib/constants"

export async function PricingSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Pricing" })
  const tc = await getTranslations({ locale, namespace: "Common" })

  const inclusions = t.raw("inclusions") as string[]
  const amount = new Intl.NumberFormat(locale).format(cohort.tuitionAmount)

  return (
    <section id="tuition" className="border-y bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
        <RevealOnScroll className="grid gap-8 overflow-hidden rounded-2xl border bg-card p-8 md:grid-cols-2 md:p-10">
          <div className="flex flex-col">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {t("eyebrow")}
            </p>
            <p className="mt-4 font-heading text-5xl font-semibold tabular-nums">
              {amount}
              <span className="ml-2 align-middle text-lg font-normal text-muted-foreground">
                {cohort.tuitionCurrency}
              </span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{t("note")}</p>

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

          <div className="rounded-xl border bg-muted/40 p-6">
            <p className="text-sm font-medium">{t("includes")}</p>
            <ul className="mt-4 space-y-2.5">
              {inclusions.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
