import { setRequestLocale, getTranslations } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"
import { ApplicationForm } from "@/components/modules/apply"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Apply" })
  return buildMetadata({ locale, path: "/apply", title: t("title"), description: t("intro") })
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "Apply" })

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <p className="text-center text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {t("eyebrow")}
      </p>
      <h1 className="mt-3 text-balance text-center font-heading text-3xl font-semibold sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-pretty text-center text-muted-foreground">
        {t("intro")}
      </p>

      <div className="mt-14">
        <ApplicationForm />
      </div>
    </div>
  )
}
