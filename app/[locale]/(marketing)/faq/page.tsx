import { setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { getFaqs } from "@/lib/content"
import { buildMetadata } from "@/lib/seo"
import { FaqAccordion } from "@/components/marketing/faq-accordion"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return buildMetadata({ locale, path: "/faq", title: "FAQ" })
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="pt-12">
      <FaqAccordion faqs={getFaqs(locale)} />
    </div>
  )
}
