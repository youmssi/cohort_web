import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"
import { PageHeader } from "@/components/marketing/page-header"
import { CohortGallery, type CohortCardData } from "@/components/marketing/cohort-gallery"
import {
  applicationWindow,
  cohortDates,
  cohortName,
  cohorts,
  cohortStatus,
  intlLocale,
} from "@/lib/cohorts"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })
  return buildMetadata({
    locale,
    path: "/cohorts",
    title: t("pages.cohorts.title"),
    description: t("pages.cohorts.description"),
  })
}

/**
 * The session index. Every cohort ever run or announced lives here, which is
 * also the honest answer to "how established is this": the list is short, and
 * pretending otherwise would not survive the first conversation.
 */
export default async function CohortsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "Cohorts" })
  const tStatus = await getTranslations({ locale, namespace: "CohortStatus" })
  const tMeta = await getTranslations({ locale, namespace: "Metadata" })

  const money = (value: number) =>
    `${new Intl.NumberFormat(intlLocale(locale)).format(value)} GNF`

  const sessions: CohortCardData[] = cohorts.map((cohort) => ({
    id: cohort.id,
    name: cohortName(cohort),
    label: `${String(cohort.year).slice(-2)}${cohort.batch}`,
    status: cohortStatus(cohort),
    statusLabel: tStatus(cohortStatus(cohort)),
    dates: cohortDates(cohort, intlLocale(locale)) ?? tStatus("datesPending"),
    applications: applicationWindow(cohort, intlLocale(locale)) ?? tStatus("datesPending"),
    seats: t("seatsValue", { min: cohort.seats.min, max: cohort.seats.max }),
    tuition: money(cohort.tuition),
    founding: cohort.founding,
    image: `/cohort-card/${cohort.id}`,
  }))

  return (
    <>
      <PageHeader
        title={tMeta("pages.cohorts.title")}
        description={tMeta("pages.cohorts.description")}
      />
      <CohortGallery
        sessions={sessions}
        labels={{
          dates: t("labels.dates"),
          applications: t("labels.applications"),
          seats: t("labels.seats"),
          tuition: t("labels.tuition"),
          founding: t("labels.founding"),
          view: t("labels.view"),
          hint: t("hint"),
          allSessions: t("labels.allSessions"),
        }}
      />
    </>
  )
}
