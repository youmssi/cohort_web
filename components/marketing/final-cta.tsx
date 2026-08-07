import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { TextReveal } from "@/components/motion/text-reveal"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"

export function FinalCta() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <TextReveal
        as="p"
        text="Le monde n'a pas besoin de plus de dirigeants qui connaissent le vocabulaire de la technologie."
        className="block text-balance font-heading text-2xl font-semibold sm:text-3xl"
      />
      <TextReveal
        as="p"
        text="Il a besoin de dirigeants qui savent quoi en faire."
        className="mt-2 block text-balance font-heading text-2xl font-semibold text-muted-foreground sm:text-3xl"
      />

      <RevealOnScroll delay={200} className="mt-10">
        <Button
          size="lg"
          render={<Link href="/apply">Postuler pour la Cohorte 01</Link>}
        />
        <p className="mt-4 text-xs text-muted-foreground">
          8 à 12 participants · Admission sélective
        </p>
      </RevealOnScroll>
    </section>
  )
}
