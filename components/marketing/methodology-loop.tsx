import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"

const steps = [
  { title: "Défi", body: "Vous partez d'un problème d'entreprise réel — pas d'une théorie." },
  { title: "Investiguer", body: "Vous recherchez, expérimentez et construisez une première réponse." },
  { title: "Pairs", body: "Vos pairs challengent votre raisonnement — pas votre personne." },
  { title: "Appliquer", body: "Vous transformez votre analyse en recommandation concrète." },
  { title: "Défendre", body: "Vous expliquez, justifiez et défendez votre décision." },
] as const

export function MethodologyLoop() {
  return (
    <section id="method" className="border-y bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <RevealOnScroll as="h2" className="text-balance text-center font-heading text-3xl font-semibold sm:text-4xl">
          On ne conteste pas les idées, jamais les personnes.
        </RevealOnScroll>
        <RevealOnScroll delay={100} className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Le facilitateur ne vous donne pas la réponse. Il vous aide à apprendre comment la
          trouver, l&apos;évaluer et la défendre.
        </RevealOnScroll>

        <div className="mt-14 grid gap-8 sm:grid-cols-5">
          {steps.map((step, index) => (
            <RevealOnScroll key={step.title} delay={index * 80} className="text-center">
              <p className="mx-auto flex size-9 items-center justify-center rounded-full border font-mono text-xs">
                {(index + 1).toString().padStart(2, "0")}
              </p>
              <p className="mt-3 font-heading text-sm font-semibold">{step.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{step.body}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
