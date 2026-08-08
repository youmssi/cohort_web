import { getTranslations, setRequestLocale } from "next-intl/server"
import { Check, X } from "lucide-react"

import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"
import { PageHeader } from "@/components/marketing/page-header"
import { AdmissionsSteps } from "@/components/marketing/admissions-steps"
import { PaymentWorkflow } from "@/components/marketing/payment-workflow"
import { FinalCta } from "@/components/marketing/final-cta"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })
  return buildMetadata({
    locale,
    path: "/admissions",
    title: t("pages.admissions.title"),
    description: t("pages.admissions.description"),
  })
}

export default async function AdmissionsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "Admissions" })

  const fit = t.raw("fit") as string[]
  const notFit = t.raw("notFit") as string[]

  return (
    <>
      <PageHeader title={t("title")} description={t("subtitle")} />
      <AdmissionsSteps locale={locale} showCta={false} />

      <section className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <RevealOnScroll className="rounded-2xl border bg-card p-6">
            <p className="font-heading text-base font-semibold">{t("fitTitle")}</p>
            <ul className="mt-5 space-y-3">
              {fit.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          <RevealOnScroll delay={100} className="rounded-2xl border bg-muted/30 p-6">
            <p className="font-heading text-base font-semibold">{t("notFitTitle")}</p>
            <ul className="mt-5 space-y-3">
              {notFit.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <X className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </section>

      <PaymentWorkflow locale={locale} />
      <FinalCta locale={locale} />
    </>
  )
}
