import { setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { getPhases } from "@/lib/content"
import { buildMetadata } from "@/lib/seo"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"
import { JourneyTimeline } from "@/components/marketing/journey-timeline"
import { AdmissionsSteps } from "@/components/marketing/admissions-steps"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return buildMetadata({
    locale,
    path: "/curriculum",
    title: "Les 16 semaines",
    description: "Quatre phases — Comprendre, Explorer, Transformer, Diriger — et un défi de transformation continu.",
  })
}

export default async function CurriculumPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pt-20 pb-4 text-center sm:px-6">
        <RevealOnScroll as="h1" className="text-balance font-heading text-4xl font-semibold sm:text-5xl">
          Les 16 semaines
        </RevealOnScroll>
        <RevealOnScroll delay={150} className="mt-5 text-pretty text-lg text-muted-foreground">
          Quatre phases progressives. Chaque semaine part d&apos;un problème réel et se termine
          par un livrable concret.
        </RevealOnScroll>
      </section>

      <JourneyTimeline phases={getPhases(locale)} />
      <AdmissionsSteps />
    </>
  )
}
