import { getTranslations } from "next-intl/server"
import { Building2, ExternalLink } from "lucide-react"

import type { Locale } from "@/i18n/routing"
import { RevealOnScroll } from "@/components/animations/reveal-on-scroll"
import { intlLocale } from "@/lib/cohorts"
import { corporateTiers, site } from "@/lib/constants"

/**
 * Employer-funded seats. The brief allows an organisation to pay for one or
 * more of its people, so the route is stated rather than left to be discovered
 * in the FAQ. The selection itself is unchanged, which is the point worth
 * making: a company can fund a seat, it cannot buy one.
 */
export async function CorporateNote({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Corporate" })
  const money = (value: number) =>
    `${new Intl.NumberFormat(intlLocale(locale)).format(value)} GNF`

  return (
    <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
      <RevealOnScroll className="flex flex-col gap-5 rounded-2xl border bg-muted/30 p-8 sm:flex-row sm:items-start">
        <Building2 className="size-5 shrink-0 text-muted-foreground" />
        <div className="space-y-5">
          <div className="space-y-3">
            <p className="font-heading text-lg font-semibold">{t("title")}</p>
            <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
              {t("body")}
            </p>
          </div>

          <dl className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-4">
            {corporateTiers.map((tier) => (
              <div key={tier.seats} className="flex flex-col gap-1 bg-background p-4">
                <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                  {tier.price === null
                    ? t("tiers.more", { seats: tier.seats })
                    : t("tiers.seats", { count: tier.seats })}
                </dt>
                <dd className="font-heading text-sm font-semibold tabular-nums">
                  {tier.price === null ? t("tiers.custom") : money(tier.price)}
                </dd>
              </div>
            ))}
          </dl>

          <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
            {t("pricingNote")}
          </p>

          <a
            href={`mailto:${site.contactEmail}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
          >
            {t("cta")}
            <ExternalLink className="size-3.5 opacity-60" />
          </a>
        </div>
      </RevealOnScroll>
    </section>
  )
}
