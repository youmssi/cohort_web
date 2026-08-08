import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { getPhases } from "@/lib/content"
import { buildMetadata } from "@/lib/seo"
import { PageHeader } from "@/components/marketing/page-header"
import { JourneyTimeline } from "@/components/marketing/journey-timeline"
import { CompetencyLevels } from "@/components/marketing/competency-levels"
import { OutcomesSection } from "@/components/marketing/outcomes-section"
import { FinalCta } from "@/components/marketing/final-cta"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })
  return buildMetadata({
    locale,
    path: "/program",
    title: t("pages.program.title"),
    description: t("pages.program.description"),
  })
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "Metadata" })

  return (
    <>
      <PageHeader
        title={t("pages.program.title")}
        description={t("pages.program.description")}
      />
      <JourneyTimeline phases={getPhases(locale)} locale={locale} showHeading={false} />
      <CompetencyLevels locale={locale} />
      <OutcomesSection locale={locale} />
      <FinalCta locale={locale} />
    </>
  )
}
