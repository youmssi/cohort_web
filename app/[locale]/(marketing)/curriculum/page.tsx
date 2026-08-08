import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { getPhases, getWeeks } from "@/lib/content"
import { buildMetadata } from "@/lib/seo"
import { PageHeader } from "@/components/marketing/page-header"
import { JourneyTimeline } from "@/components/marketing/journey-timeline"
import { PortfolioList } from "@/components/marketing/portfolio-list"
import { FinalCta } from "@/components/marketing/final-cta"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })
  return buildMetadata({
    locale,
    path: "/curriculum",
    title: t("pages.curriculum.title"),
    description: t("pages.curriculum.description"),
  })
}

export default async function CurriculumPage({
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
        title={t("pages.curriculum.title")}
        description={t("pages.curriculum.description")}
      />
      <JourneyTimeline phases={getPhases(locale)} locale={locale} showHeading={false} />
      <PortfolioList weeks={getWeeks(locale)} locale={locale} />
      <FinalCta locale={locale} />
    </>
  )
}
