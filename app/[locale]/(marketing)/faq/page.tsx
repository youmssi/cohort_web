import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { getFaqs } from "@/lib/content"
import { buildMetadata, faqJsonLd } from "@/lib/seo"
import { PageHeader } from "@/components/marketing/page-header"
import { FaqAccordion } from "@/components/marketing/faq-accordion"
import { FinalCta } from "@/components/marketing/final-cta"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })
  return buildMetadata({
    locale,
    path: "/faq",
    title: t("pages.faq.title"),
    description: t("pages.faq.description"),
  })
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "Metadata" })

  const faqs = getFaqs(locale)

  // FAQPage structured data needs plain text, so the answer comes from the
  // document's `plain` field rather than the compiled MDX component.
  const jsonLd = faqJsonLd(
    faqs.map((faq) => ({ question: faq.question, answer: faq.plain }))
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        title={t("pages.faq.title")}
        description={t("pages.faq.description")}
      />
      <FaqAccordion faqs={faqs} locale={locale} showHeading={false} />
      <FinalCta locale={locale} />
    </>
  )
}
