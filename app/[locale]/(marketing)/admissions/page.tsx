import { setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"
import { AdmissionsSteps } from "@/components/marketing/admissions-steps"

const fit = [
  "Vous avez une responsabilité réelle et un problème concret à investiguer.",
  "Vous êtes curieux·se face à ce que vous ne comprenez pas encore.",
  "Vous acceptez d'être challengé·e — et de challenger vos pairs avec respect.",
  "Vous pouvez vous engager sur les 16 semaines.",
] as const

const notFit = [
  "Vous cherchez une bibliothèque de vidéos à consommer passivement.",
  "Vous voulez uniquement un certificat.",
  "Vous cherchez une formation en programmation.",
  "Vous ne pouvez pas participer aux sessions live.",
] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return buildMetadata({
    locale,
    path: "/admissions",
    title: "Admissions",
    description: "L'admission est sélective. Nous cherchons la qualité de la cohorte, pas le nombre de participants.",
  })
}

export default async function AdmissionsPage({
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
          Tout le monde n&apos;a pas besoin de ce programme.
        </RevealOnScroll>
        <RevealOnScroll delay={150} className="mt-5 text-pretty text-lg text-muted-foreground">
          Nous nous soucions davantage de la qualité de la cohorte que du nombre de
          participants.
        </RevealOnScroll>
      </section>

      <AdmissionsSteps />

      <section className="mx-auto grid max-w-4xl gap-6 px-4 pb-20 sm:grid-cols-2 sm:px-6">
        <RevealOnScroll className="rounded-2xl border p-6">
          <p className="font-heading font-semibold">Ce programme est pour vous si</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {fit.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </RevealOnScroll>
        <RevealOnScroll delay={80} className="rounded-2xl border p-6">
          <p className="font-heading font-semibold">Ce n&apos;est probablement pas pour vous si</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {notFit.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </RevealOnScroll>
      </section>
    </>
  )
}
