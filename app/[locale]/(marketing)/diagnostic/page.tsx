import { setRequestLocale } from "next-intl/server"
import { getTranslations } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"
import { DiagnosticFlow } from "@/components/modules/diagnostic"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Diagnostic" })
  return buildMetadata({ locale, path: "/diagnostic", title: t("title"), description: t("intro") })
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
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <p className="text-center text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {t("eyebrow")}
      </p>
      <h1 className="mt-3 text-balance text-center font-heading text-3xl font-semibold sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-pretty text-center text-muted-foreground">
        {t("intro")}
      </p>
      <p className="mt-2 text-center text-xs text-muted-foreground">{t("duration")}</p>

      <div className="mt-14">
        <DiagnosticFlow />
      </div>
    </div>
  )
}
