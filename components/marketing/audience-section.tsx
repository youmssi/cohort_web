import { getTranslations } from "next-intl/server"

import type { Persona } from "@/.velite"
import type { Locale } from "@/i18n/routing"
import { MdxContent } from "@/components/mdx-content"
import { SpotlightCard } from "@/components/animations/spotlight-card"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"

export async function AudienceSection({
  personas,
  locale,
}: {
  personas: Persona[]
  locale: Locale
}) {
  const t = await getTranslations({ locale, namespace: "Home" })

  return (
    <section id="audience" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <RevealOnScroll
          as="h2"
          className="text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {t("audienceTitle")}
        </RevealOnScroll>
        <RevealOnScroll delay={120} className="mt-4 text-pretty text-muted-foreground">
          {t("audienceSubtitle")}
        </RevealOnScroll>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {personas.map((persona, index) => (
          <RevealOnScroll key={persona.slug} delay={index * 110}>
            <SpotlightCard className="h-full p-6">
              <p className="font-heading text-lg font-semibold">{persona.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground italic">
                {persona.question}
              </p>
              <div className="mt-4 border-t pt-4">
                <MdxContent
                  code={persona.content}
                  className="prose-sm prose-p:text-muted-foreground prose-p:leading-relaxed"
                />
              </div>
            </SpotlightCard>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
