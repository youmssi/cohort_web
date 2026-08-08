import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"
import { PageHeader } from "@/components/marketing/page-header"
import { MethodologyLoop } from "@/components/marketing/methodology-loop"
import { CohortCharter } from "@/components/marketing/cohort-charter"
import { FinalCta } from "@/components/marketing/final-cta"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })
  return buildMetadata({
    locale,
    path: "/method",
    title: t("pages.method.title"),
    description: t("pages.method.description"),
  })
}

export default async function MethodPage({
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
        title={t("pages.method.title")}
        description={t("pages.method.description")}
      />
      <MethodologyLoop />
      <CohortCharter locale={locale} />
      <FinalCta locale={locale} />
    </>
  )
}
