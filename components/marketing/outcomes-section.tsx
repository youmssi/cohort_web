import { getTranslations } from "next-intl/server"
import { FileText, GraduationCap, Layers, Radar, Users } from "lucide-react"

import type { Locale } from "@/i18n/routing"
import { SpotlightCard } from "@/components/animations/spotlight-card"
import { RevealOnScroll } from "@/components/animations/reveal-on-scroll"

const items = [
  { key: "blueprint", Icon: FileText, wide: true },
  { key: "profile", Icon: Radar, wide: false },
  { key: "portfolio", Icon: Layers, wide: false },
  { key: "certificate", Icon: GraduationCap, wide: false },
  { key: "alumni", Icon: Users, wide: false },
] as const

/**
 * "What you leave with", the tangible output of the programme. The strategy
 * brief is explicit that this is the strongest commercial asset, so it gets a
 * bento layout with the blueprint as the anchor tile.
 */
export async function OutcomesSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Outcomes" })

  return (
    <section id="outcomes" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
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

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map(({ key, Icon, wide }, index) => (
          <RevealOnScroll
            key={key}
            delay={index * 80}
            className={wide ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : undefined}
          >
            <SpotlightCard className="flex h-full flex-col p-6">
              <Icon className="size-5 text-muted-foreground" />
              <p className="mt-4 font-heading text-base font-semibold text-balance">
                {t(`items.${key}.title`)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`items.${key}.body`)}
              </p>
            </SpotlightCard>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
