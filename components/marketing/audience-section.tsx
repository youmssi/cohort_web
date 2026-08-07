import type { Persona } from "@/.velite"

import { MdxContent } from "@/components/mdx-content"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"

export function AudienceSection({ personas }: { personas: Persona[] }) {
  return (
    <section id="audience" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <RevealOnScroll as="h2" className="text-balance text-center font-heading text-3xl font-semibold sm:text-4xl">
        Conçu pour des personnes qui portent une responsabilité.
      </RevealOnScroll>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {personas.map((persona, index) => (
          <RevealOnScroll
            key={persona.slug}
            delay={index * 100}
            className="rounded-2xl border p-6"
          >
            <p className="font-heading text-lg font-semibold">{persona.title}</p>
            <p className="mt-2 text-sm italic text-muted-foreground">
              « {persona.question} »
            </p>
            <MdxContent code={persona.content} className="prose-sm mt-4" />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
