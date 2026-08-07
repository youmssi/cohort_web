import { setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { Link } from "@/i18n/navigation"
import { buildMetadata } from "@/lib/seo"
import { cohort, site } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"
import { PricingSection } from "@/components/marketing/pricing-section"

const facts = [
  { label: "Durée", value: `${cohort.durationWeeks} semaines` },
  { label: "Participants", value: `${cohort.minSeats}–${cohort.maxSeats} maximum` },
  { label: "Format", value: "En ligne, en direct" },
  { label: "Sessions", value: `${cohort.liveSessionsPerWeek} par semaine` },
  { label: "Lieu", value: site.locationFr },
  { label: "Admission", value: "Sur candidature" },
] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return buildMetadata({
    locale,
    path: "/cohort-01",
    title: cohort.code,
    description: "La première cohorte sera volontairement restreinte pour préserver la qualité de l'apprentissage entre pairs.",
  })
}

export default async function CohortPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pt-20 pb-4 text-center sm:px-6">
        <RevealOnScroll as="p" className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Cohorte fondatrice
        </RevealOnScroll>
        <RevealOnScroll delay={80} as="h1" className="mt-3 text-balance font-heading text-4xl font-semibold sm:text-5xl">
          {cohort.code}
        </RevealOnScroll>
        <RevealOnScroll delay={150} className="mt-5 text-pretty text-lg text-muted-foreground">
          La première cohorte restera volontairement restreinte : c&apos;est une décision
          pédagogique, pas une rareté artificielle.
        </RevealOnScroll>

        <RevealOnScroll delay={220} className="mt-10">
          <Button
            size="lg"
            render={<Link href="/apply">Postuler pour la Cohorte 01</Link>}
          />
        </RevealOnScroll>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 overflow-hidden rounded-2xl border sm:grid-cols-2 sm:divide-x">
          {facts.map((fact) => (
            <div key={fact.label} className="border-t p-6 first:border-t-0 sm:[&:nth-child(-n+2)]:border-t-0">
              <p className="text-xs text-muted-foreground">{fact.label}</p>
              <p className="mt-1 font-heading font-medium">{fact.value}</p>
            </div>
          ))}
        </div>
      </section>

      <PricingSection />
    </>
  )
}
