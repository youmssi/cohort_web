import { getTranslations } from "next-intl/server"
import { ArrowUpRight } from "lucide-react"

import type { Competency } from "@/.velite"
import type { Locale } from "@/i18n/routing"
import { Link } from "@/i18n/navigation"
import { RevealOnScroll } from "@/components/animations/reveal-on-scroll"

export async function CapabilitiesGrid({
  competencies,
  locale,
  showHeading = true,
}: {
  competencies: Competency[]
  locale: Locale
  showHeading?: boolean
}) {
  const t = await getTranslations({ locale, namespace: "Home" })

  return (
    <section id="capabilities" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      {showHeading && (
        <div className="mx-auto max-w-2xl text-center">
          <RevealOnScroll
            as="h2"
            className="text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {t("capabilitiesTitle")}
          </RevealOnScroll>
          <RevealOnScroll delay={120} className="mt-4 text-pretty text-muted-foreground">
            {t("capabilitiesSubtitle")}
          </RevealOnScroll>
        </div>
      )}

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {competencies.map((competency, index) => (
          <RevealOnScroll key={competency.slug} delay={(index % 3) * 70} className="bg-background">
            <Link
              href={`/competencies/${competency.slug}`}
              className="group flex h-full flex-col p-6 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-[0.625rem] text-muted-foreground">
                  {competency.code}
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="mt-3 font-heading text-base font-semibold">{competency.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {competency.summary}
              </p>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
