import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"
import { cohort } from "@/lib/constants"
import { PageHeader } from "@/components/marketing/page-header"
import { PricingSection } from "@/components/marketing/pricing-section"
import { AdmissionsSteps } from "@/components/marketing/admissions-steps"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })
  return buildMetadata({
    locale,
    path: "/cohort-01",
    title: t("pages.cohort.title"),
    description: t("pages.cohort.description"),
  })
}

export default async function CohortPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "Cohort" })
  const tMeta = await getTranslations({ locale, namespace: "Metadata" })
  const tc = await getTranslations({ locale, namespace: "Common" })

  const facts = [
    { label: t("facts.duration"), value: `${cohort.durationWeeks} ${tc("weeksLabel")}` },
    { label: t("facts.participants"), value: t("factValues.participantsMax") },
    { label: t("facts.format"), value: t("factValues.format") },
    { label: t("facts.sessions"), value: `${cohort.liveSessionsPerWeek}` },
    { label: t("facts.location"), value: tc("location") },
    { label: t("facts.admission"), value: t("factValues.admission") },
  ]

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={tMeta("pages.cohort.title")}
        description={t("subtitle")}
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <dl className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact, index) => (
            <RevealOnScroll
              key={fact.label}
              delay={(index % 3) * 70}
              className="bg-background p-5"
            >
              <dt className="text-xs text-muted-foreground">{fact.label}</dt>
              <dd className="mt-1 font-heading text-sm font-medium">{fact.value}</dd>
            </RevealOnScroll>
          ))}
        </dl>
      </section>

      <PricingSection locale={locale} />
      <AdmissionsSteps locale={locale} />
    </>
  )
}
