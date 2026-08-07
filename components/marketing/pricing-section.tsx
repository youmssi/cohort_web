import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"
import { cohort } from "@/lib/constants"

const inclusions = [
  "Diagnostic d'admission",
  "16 semaines de programme",
  "1 à 2 sessions live par semaine",
  "Cohorte de pairs et relecture croisée",
  "Retours du facilitateur",
  "Projet final et soutenance",
  "Profil de compétences",
  "Communauté des anciens",
] as const

export function PricingSection() {
  return (
    <section id="tuition" className="border-y bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <RevealOnScroll as="p" className="text-center text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Investissement
        </RevealOnScroll>
        <RevealOnScroll delay={100} className="mt-3 text-center">
          <span className="font-heading text-5xl font-semibold tabular-nums">
            {cohort.tuitionAmount.toLocaleString("fr-FR")}
          </span>
          <span className="ml-2 text-lg text-muted-foreground">{cohort.tuitionCurrency}</span>
        </RevealOnScroll>
        <RevealOnScroll delay={150} className="mt-2 text-center text-sm text-muted-foreground">
          Cohorte fondatrice · {cohort.code} · paiement dû après admission
        </RevealOnScroll>

        <RevealOnScroll delay={200} className="mt-10 grid gap-3 sm:grid-cols-2">
          {inclusions.map((item) => (
            <div key={item} className="flex items-start gap-2 text-sm">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-foreground" aria-hidden />
              {item}
            </div>
          ))}
        </RevealOnScroll>

        <RevealOnScroll delay={300} className="mt-10 flex justify-center">
          <Button
            size="lg"
            render={<Link href="/apply">Postuler pour la Cohorte 01</Link>}
          />
        </RevealOnScroll>
      </div>
    </section>
  )
}
