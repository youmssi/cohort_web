import type { Competency } from "@/.velite"

import { Link } from "@/i18n/navigation"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"

export function CapabilitiesGrid({ competencies }: { competencies: Competency[] }) {
  return (
    <section id="capabilities" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <RevealOnScroll as="h2" className="text-balance text-center font-heading text-3xl font-semibold sm:text-4xl">
        Les dix capacités que vous développez.
      </RevealOnScroll>
      <RevealOnScroll delay={100} className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
        Pas un catalogue d&apos;outils. Un système de jugement.
      </RevealOnScroll>

      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {competencies.map((competency, index) => (
          <RevealOnScroll
            key={competency.slug}
            delay={(index % 5) * 60}
            className="bg-background p-5"
          >
            <Link href={`/competencies/${competency.slug}`} className="group block h-full">
              <p className="font-mono text-[0.6875rem] text-muted-foreground">
                {competency.code}
              </p>
              <p className="mt-2 font-heading text-sm font-semibold group-hover:underline">
                {competency.title}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {competency.summary}
              </p>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
