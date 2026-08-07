import { setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { getCompetencies } from "@/lib/content"
import { buildMetadata } from "@/lib/seo"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"
import { CapabilitiesGrid } from "@/components/marketing/capabilities-grid"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return buildMetadata({
    locale,
    path: "/competencies",
    title: "Les compétences",
    description: "Dix compétences de leadership numérique — pas un catalogue d'outils, un système de jugement.",
  })
}

export default async function CompetenciesPage({
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
          Ce que vous développez
        </RevealOnScroll>
        <RevealOnScroll delay={150} className="mt-5 text-pretty text-lg text-muted-foreground">
          Dix compétences, chacune évaluée selon cinq niveaux — de la prise de conscience à la
          capacité de décider et de diriger.
        </RevealOnScroll>
      </section>
      <CapabilitiesGrid competencies={getCompetencies(locale)} />
    </>
  )
}
