import { getTranslations } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"

const levels = ["exposure", "understanding", "application", "leadership"] as const

/**
 * The four-level competency scale. Rendered as a rising ladder so the jump from
 * "I can explain it" to "I can decide and guide others" is legible at a glance.
 */
export async function CompetencyLevels({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Levels" })

  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <RevealOnScroll
            as="h2"
            className="text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {t("title")}
          </RevealOnScroll>
          <RevealOnScroll delay={120} className="mt-4 text-pretty text-muted-foreground">
            {t("subtitle")}
          </RevealOnScroll>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {levels.map((level, index) => (
            <RevealOnScroll
              key={level}
              delay={index * 90}
              as="li"
              className="flex flex-col rounded-2xl border bg-card p-6"
            >
              {/* Filled segments encode the level, so the progression is visual as well as textual. */}
              <div className="flex gap-1" aria-hidden>
                {levels.map((_, segment) => (
                  <span
                    key={segment}
                    className={
                      segment <= index
                        ? "h-1 flex-1 rounded-full bg-foreground"
                        : "h-1 flex-1 rounded-full bg-border"
                    }
                  />
                ))}
              </div>
              <p className="mt-4 font-mono text-[0.625rem] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 font-heading text-base font-semibold">
                {t(`items.${level}.title`)}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground italic">
                {t(`items.${level}.body`)}
              </p>
            </RevealOnScroll>
          ))}
        </ol>
      </div>
    </section>
  )
}
