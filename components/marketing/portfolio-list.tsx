import { getTranslations } from "next-intl/server"

import type { Week } from "@/.velite"
import type { Locale } from "@/i18n/routing"
import { Link } from "@/i18n/navigation"
import { RevealOnScroll } from "@/components/animations/reveal-on-scroll"

/**
 * The sixteen deliverables, derived from each week's frontmatter rather than
 * duplicated in a hardcoded list. Editing a week's `deliverable` updates this
 * section automatically.
 */
export async function PortfolioList({
  weeks,
  locale,
}: {
  weeks: Week[]
  locale: Locale
}) {
  const t = await getTranslations({ locale, namespace: "Portfolio" })
  const tc = await getTranslations({ locale, namespace: "Common" })

  return (
    <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
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

      <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
        {weeks.map((week, index) => (
          <RevealOnScroll
            key={week.week}
            delay={(index % 2) * 60}
            as="li"
            className="bg-background"
          >
            <Link
              href={`/curriculum/${week.week}`}
              className="flex items-baseline gap-3 p-4 transition-colors hover:bg-muted/50"
            >
              <span className="w-6 shrink-0 font-mono text-[0.625rem] text-muted-foreground tabular-nums">
                {String(week.week).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium">{week.deliverable}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {tc("week")} {week.week} · {week.title}
                </span>
              </span>
            </Link>
          </RevealOnScroll>
        ))}
      </ol>
    </section>
  )
}
