import { getTranslations } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { BlurText } from "@/components/animations/blur-text"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"

export async function PositioningBreak({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Home" })

  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <BlurText
          as="h2"
          text={t("positioningTitle")}
          animateBy="words"
          delay={60}
          className="justify-center text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
        />
        <RevealOnScroll
          delay={200}
          className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground"
        >
          {t("positioningBody")}
        </RevealOnScroll>
        <RevealOnScroll
          delay={340}
          className="mt-10 border-t pt-8 font-heading text-xl font-medium text-balance"
        >
          {t("positioningClosing")}
        </RevealOnScroll>
      </div>
    </section>
  )
}
