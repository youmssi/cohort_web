import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"
import { PageHeader } from "@/components/marketing/page-header"
import { DiagnosticFlow } from "@/components/modules/diagnostic"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Diagnostic" })
  return buildMetadata({
    locale,
    path: "/diagnostic",
    title: t("title"),
    description: t("intro"),
  })
}

export default async function DiagnosticPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "Diagnostic" })

  return (
    <div className="pb-24">
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={t("intro")} />
      <p className="mt-2 text-center text-xs text-muted-foreground">{t("duration")}</p>

      <div className="mx-auto mt-14 max-w-2xl px-4 sm:px-6">
        <DiagnosticFlow />
      </div>
    </div>
  )
}
