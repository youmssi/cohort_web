import { setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"
import { MethodologyLoop } from "@/components/marketing/methodology-loop"
import { AdmissionsSteps } from "@/components/marketing/admissions-steps"

const compact = [
  { title: "Curiosité", body: "Poser une question avant de supposer une réponse." },
  { title: "Humilité", body: "Accepter d'avoir tort et de réviser sa position." },
  { title: "Respect", body: "Challenger les idées, jamais les personnes." },
  { title: "Contribution", body: "Donner autant que l'on reçoit du groupe." },
  { title: "Confidentialité", body: "Protéger les informations professionnelles des pairs." },
  { title: "Redevabilité", body: "Faire ce que l'on s'est engagé à faire." },
] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return buildMetadata({
    locale,
    path: "/method",
    title: "La méthode",
    description: "Défi, investigation, pairs, application, défense — la boucle d'apprentissage du programme.",
  })
}

export default async function MethodPage({
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
          On ne forme pas des spectateurs.
        </RevealOnScroll>
        <RevealOnScroll delay={150} className="mt-5 text-pretty text-lg text-muted-foreground">
          Vous n&apos;allez pas simplement consommer du contenu. Vous allez rencontrer des
          problèmes, les investiguer, former une opinion, la voir challengée par vos pairs, la
          réviser — puis défendre votre décision.
        </RevealOnScroll>
      </section>

      <MethodologyLoop />

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <RevealOnScroll as="h2" className="text-balance text-center font-heading text-3xl font-semibold sm:text-4xl">
          La charte de cohorte
        </RevealOnScroll>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {compact.map((item, index) => (
            <RevealOnScroll key={item.title} delay={index * 60} className="rounded-2xl border p-6">
              <p className="font-heading font-semibold">{item.title}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{item.body}</p>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <AdmissionsSteps />
    </>
  )
}
