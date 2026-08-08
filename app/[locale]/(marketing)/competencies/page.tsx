import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { getCompetencies } from "@/lib/content"
import { buildMetadata } from "@/lib/seo"
import { PageHeader } from "@/components/marketing/page-header"
import { CapabilitiesGrid } from "@/components/marketing/capabilities-grid"
import { CompetencyLevels } from "@/components/marketing/competency-levels"
import { FinalCta } from "@/components/marketing/final-cta"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })
  return buildMetadata({
    locale,
    path: "/competencies",
    title: t("pages.competencies.title"),
    description: t("pages.competencies.description"),
  })
}

export default async function CompetenciesPage({
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
        title={t("pages.competencies.title")}
        description={t("pages.competencies.description")}
      />
      <CapabilitiesGrid
        competencies={getCompetencies(locale)}
        locale={locale}
        showHeading={false}
      />
      <CompetencyLevels locale={locale} />
      <FinalCta locale={locale} />
    </>
  )
}
