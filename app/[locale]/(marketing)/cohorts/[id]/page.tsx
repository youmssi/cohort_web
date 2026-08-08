import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"
import { cohort as programme } from "@/lib/constants"
import {
  applicationWindow,
  cohortDates,
  cohortName,
  cohorts,
  getCohort,
  intlLocale,
} from "@/lib/cohorts"
import { PageHeader } from "@/components/marketing/page-header"
import { CorporateNote } from "@/components/marketing/corporate-note"
import { PricingSection } from "@/components/marketing/pricing-section"
import { Prerequisites } from "@/components/marketing/prerequisites"
import { CohortBadge } from "@/components/marketing/cohort-badge"
import { RevealOnScroll } from "@/components/animations/reveal-on-scroll"

export function generateStaticParams() {
  return cohorts.map((session) => ({ id: session.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>
}) {
  const { locale, id } = await params
  const session = getCohort(id)
  if (!session) return {}

  const t = await getTranslations({ locale, namespace: "Metadata" })
  return buildMetadata({
    locale,
    path: `/cohorts/${id}`,
    title: cohortName(session),
    description: t("pages.cohort.description"),
  })
}

export default async function CohortPage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>
}) {
  const { locale, id } = await params
  setRequestLocale(locale)

  const session = getCohort(id)
  if (!session) notFound()

  const t = await getTranslations({ locale, namespace: "Cohort" })
  const tStatus = await getTranslations({ locale, namespace: "CohortStatus" })
  const tc = await getTranslations({ locale, namespace: "Common" })

  const day = (iso: string | null) =>
    iso
      ? new Intl.DateTimeFormat(intlLocale(locale), {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date(iso))
      : tStatus("datesPending")

  const facts = [
    {
      label: t("facts.duration"),
      value: `${programme.durationWeeks} ${tc("weeksLabel")}`,
    },
    {
      label: t("facts.participants"),
      value: `${session.seats.min}–${session.seats.max} ${tStatus("seatsLabel")}`,
    },
    { label: t("facts.format"), value: t("factValues.format") },
    { label: t("facts.sessions"), value: programme.liveSessionsPerWeek },
    { label: t("facts.location"), value: tc("location") },
    { label: t("facts.admission"), value: t("factValues.admission") },
  ]

  const keyDates = [
    { label: t("keyDates.applicationsOpen"), value: day(session.applicationsOpen) },
    { label: t("keyDates.applicationsClose"), value: day(session.applicationsClose) },
    { label: t("keyDates.start"), value: day(session.start) },
    { label: t("keyDates.end"), value: day(session.end) },
  ]

  return (
    <>
      <PageHeader
        eyebrow={session.founding ? t("eyebrow") : undefined}
        title={cohortName(session)}
        description={t("subtitle")}
      />

      <section className="mx-auto max-w-3xl px-4 pb-4 text-center sm:px-6">
        <RevealOnScroll delay={120}>
          <CohortBadge cohort={session} locale={locale} />
        </RevealOnScroll>
      </section>

      {/* Key dates first: it is the question every prospect arrives with. */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <RevealOnScroll
          as="h2"
          className="text-center font-heading text-sm font-medium tracking-wide text-muted-foreground uppercase"
        >
          {t("keyDatesTitle")}
        </RevealOnScroll>
        <ol className="mt-8 space-y-px overflow-hidden rounded-2xl border bg-border">
          {keyDates.map((entry, index) => (
            <RevealOnScroll
              key={entry.label}
              delay={index * 70}
              as="li"
              className="flex flex-wrap items-baseline justify-between gap-2 bg-background px-5 py-4"
            >
              <span className="text-sm text-muted-foreground">{entry.label}</span>
              <span className="font-heading text-sm font-medium">{entry.value}</span>
            </RevealOnScroll>
          ))}
        </ol>

        <RevealOnScroll delay={320} className="mt-4 text-center text-xs text-muted-foreground">
          {applicationWindow(session, locale)} · {cohortDates(session, locale)}
        </RevealOnScroll>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-14 sm:px-6">
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

      <CorporateNote locale={locale} />
      <Prerequisites locale={locale} />
      <PricingSection locale={locale} cohort={session} />

      <section className="mx-auto max-w-3xl px-4 pb-4 sm:px-6">
        <RevealOnScroll className="rounded-2xl border bg-muted/30 p-6 text-center">
          <p className="font-heading text-base font-semibold">{t("nextCohortTitle")}</p>
          <p className="mx-auto mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
            {t("nextCohortBody")}
          </p>
        </RevealOnScroll>
      </section>

    </>
  )
}
