import { setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { getCompetencies, getPhases } from "@/lib/content"
import { buildMetadata } from "@/lib/seo"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"
import { CapabilitiesGrid } from "@/components/marketing/capabilities-grid"
import { MethodologyLoop } from "@/components/marketing/methodology-loop"
import { JourneyTimeline } from "@/components/marketing/journey-timeline"
import { FinalCta } from "@/components/marketing/final-cta"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return buildMetadata({
    locale,
    path: "/program",
    title: "Le programme",
    description:
      "Une immersion de 16 semaines pour développer le jugement numérique nécessaire à la décision et à la transformation.",
  })
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pt-20 pb-12 text-center sm:px-6">
        <RevealOnScroll as="h1" className="text-balance font-heading text-4xl font-semibold sm:text-5xl">
          Le programme
        </RevealOnScroll>
        <RevealOnScroll delay={150} className="mt-5 text-pretty text-lg text-muted-foreground">
          Digital Leadership Immersion développe le jugement numérique de dirigeants, directeurs
          et managers à travers des défis réels, une cohorte de pairs et un projet de
          transformation défendu en fin de programme.
        </RevealOnScroll>
      </section>

      <MethodologyLoop />
      <CapabilitiesGrid competencies={getCompetencies(locale)} />
      <JourneyTimeline phases={getPhases(locale)} />
      <FinalCta />
    </>
  )
}
