import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"
import { PageHeader } from "@/components/marketing/page-header"
import { ApplicationForm } from "@/components/modules/apply"
import { Prerequisites } from "@/components/marketing/prerequisites"
import { PaymentWorkflow } from "@/components/marketing/payment-workflow"
import { cohortName, currentCohort } from "@/lib/cohorts"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Apply" })
  return buildMetadata({
    locale,
    path: "/apply",
    title: t("title", { cohort: cohortName(currentCohort()) }),
    description: t("intro"),
  })
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
    <div className="pb-24">
      <PageHeader
        eyebrow={t("eyebrow", { cohort: cohortName(currentCohort()) })}
        title={t("title", { cohort: cohortName(currentCohort()) })}
        description={t("intro")}
      />
      <div className="mx-auto mt-14 max-w-xl px-4 sm:px-6">
        <ApplicationForm />
      </div>
      <Prerequisites locale={locale} />
      <PaymentWorkflow locale={locale} />
    </div>
  )
}
