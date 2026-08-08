import { getTranslations } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { RevealOnScroll } from "@/components/animations/reveal-on-scroll"

const charterKeys = [
  "curiosity",
  "humility",
  "respect",
  "contribution",
  "confidentiality",
  "accountability",
] as const

export async function CohortCharter({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Method" })

  return (
    <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <RevealOnScroll
          as="h2"
          className="text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {t("charterTitle")}
        </RevealOnScroll>
        <RevealOnScroll delay={120} className="mt-4 text-pretty text-muted-foreground">
          {t("charterSubtitle")}
        </RevealOnScroll>
      </div>

      <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {charterKeys.map((key, index) => (
          <RevealOnScroll
            key={key}
            delay={(index % 3) * 80}
            className="bg-background p-6"
          >
            <dt className="font-heading text-base font-semibold">
              {t(`charter.${key}.title`)}
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {t(`charter.${key}.body`)}
            </dd>
          </RevealOnScroll>
        ))}
      </dl>
    </section>
  )
}
