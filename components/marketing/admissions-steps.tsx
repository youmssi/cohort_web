import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"

const steps = [
  { title: "Diagnostic", body: "Faites le Digital Leadership Diagnostic." },
  { title: "Candidature", body: "Parlez-nous de votre contexte et de votre défi." },
  { title: "Conversation", body: "Un échange de 20 à 30 minutes pour évaluer l'adéquation." },
  { title: "Décision", body: "Vous recevez une réponse claire, admis ou non pour cette cohorte." },
] as const

export function AdmissionsSteps() {
  return (
    <section id="admissions" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <RevealOnScroll as="h2" className="text-balance text-center font-heading text-3xl font-semibold sm:text-4xl">
        L&apos;admission commence par une conversation.
      </RevealOnScroll>
      <RevealOnScroll delay={100} className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
        Nous ne cherchons pas à remplir des places. Nous cherchons des personnes prêtes à
        apprendre, contribuer et se laisser challenger.
      </RevealOnScroll>

      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <RevealOnScroll key={step.title} delay={index * 80} as="li" className="rounded-2xl border p-6">
            <p className="font-mono text-xs text-muted-foreground">
              {(index + 1).toString().padStart(2, "0")}
            </p>
            <p className="mt-2 font-heading text-base font-semibold">{step.title}</p>
            <p className="mt-1.5 text-sm text-muted-foreground">{step.body}</p>
          </RevealOnScroll>
        ))}
      </ol>

      <RevealOnScroll delay={350} className="mt-10 flex justify-center">
        <Button
          size="lg"
          render={<Link href="/apply">Postuler pour la Cohorte 01</Link>}
        />
      </RevealOnScroll>
    </section>
  )
}
