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
import { AdmissionsSteps } from "@/components/marketing/admissions-steps"
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
      <PositioningBreak />
      <AudienceSection personas={getPersonas(locale)} />
      <CapabilitiesGrid competencies={getCompetencies(locale)} />
      <MethodologyLoop />
      <JourneyTimeline phases={getPhases(locale)} />
      <AdmissionsSteps />
      <PricingSection />
      <FaqAccordion faqs={getFaqs(locale)} />
      <FinalCta />
    </>
  )
}
