import { setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { getCompetencies, getFaqs, getPersonas, getPhases } from "@/lib/content"
import { buildMetadata, courseJsonLd } from "@/lib/seo"

import { Hero } from "@/components/marketing/hero"
import { PositioningBreak } from "@/components/marketing/positioning-break"
import { AudienceSection } from "@/components/marketing/audience-section"
import { CapabilitiesGrid } from "@/components/marketing/capabilities-grid"
import { MethodologyLoop } from "@/components/marketing/methodology-loop"
import { JourneyTimeline } from "@/components/marketing/journey-timeline"
import { OutcomesSection } from "@/components/marketing/outcomes-section"
import { PricingSection } from "@/components/marketing/pricing-section"
import { FaqAccordion } from "@/components/marketing/faq-accordion"
import { FinalCta } from "@/components/marketing/final-cta"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  return buildMetadata({ locale, path: "/" })
}

/**
 * The home page is a curated overview. Depth lives on the dedicated pages, so
 * sections that also appear elsewhere (admissions steps, the cohort charter,
 * the competency scale, the full week list) are deliberately not repeated here.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd(locale)) }}
      />
      <Hero />
      <PositioningBreak locale={locale} />
      <AudienceSection personas={getPersonas(locale)} locale={locale} />
      <MethodologyLoop />
      <CapabilitiesGrid competencies={getCompetencies(locale)} locale={locale} />
      <JourneyTimeline phases={getPhases(locale)} locale={locale} />
      <OutcomesSection locale={locale} />
      <PricingSection locale={locale} />
      <FaqAccordion faqs={getFaqs(locale).slice(0, 5)} locale={locale} />
      <FinalCta locale={locale} />
    </>
  )
}
