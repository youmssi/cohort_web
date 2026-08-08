import { getTranslations } from "next-intl/server"
import {
  Clock,
  Laptop,
  Languages,
  MessagesSquare,
  Target,
  Wifi,
} from "lucide-react"

import type { Locale } from "@/i18n/routing"
import { RevealOnScroll } from "@/components/animations/reveal-on-scroll"

const items = [
  { key: "device", Icon: Laptop },
  { key: "connection", Icon: Wifi },
  { key: "time", Icon: Clock },
  { key: "problem", Icon: Target },
  { key: "language", Icon: Languages },
  { key: "posture", Icon: MessagesSquare },
] as const

/**
 * What a participant needs before week one.
 *
 * Deliberately blunt about the weekly time commitment: the brief identifies
 * under-estimated workload as the main cause of drop-out, so under-selling it
 * here would cost the cohort later.
 */
export async function Prerequisites({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Prerequisites" })

  return (
    <section id="prerequisites" className="border-y bg-muted/30">
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

        <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ key, Icon }, index) => (
            <RevealOnScroll
              key={key}
              delay={(index % 3) * 80}
              className="bg-background p-6"
            >
              <Icon className="size-5 text-muted-foreground" />
              <dt className="mt-4 font-heading text-base font-semibold">
                {t(`items.${key}.title`)}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {t(`items.${key}.body`)}
              </dd>
            </RevealOnScroll>
          ))}
        </dl>
      </div>
    </section>
  )
}
