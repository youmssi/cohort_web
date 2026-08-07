import { useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { TextReveal } from "@/components/motion/text-reveal"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"
import { cohort } from "@/lib/constants"

export function Hero() {
  const t = useTranslations("Common")

  return (
    <section className="mx-auto max-w-4xl px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28">
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Digital Leadership Immersion · {cohort.code}
      </p>

      <TextReveal
        as="h1"
        text="Comprendre la technologie. Diriger la décision."
        className="mt-6 block text-balance font-heading text-4xl leading-[1.1] font-semibold sm:text-6xl"
      />

      <RevealOnScroll delay={200}>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
          Une immersion sélective de 16 semaines pour dirigeants, directeurs et managers qui
          doivent évaluer l&apos;IA, challenger un fournisseur et diriger la transformation
          numérique de leur organisation — sans devenir techniciens.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={350} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button size="lg" render={<Link href="/apply">{t("applyCta")}</Link>} />
        <Button size="lg" variant="outline" render={<Link href="/program">{t("exploreCta")}</Link>} />
      </RevealOnScroll>

      <RevealOnScroll
        delay={450}
        className="mx-auto mt-14 flex max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground"
      >
        <span>{cohort.durationWeeks} semaines</span>
        <span aria-hidden>·</span>
        <span>
          {cohort.minSeats}–{cohort.maxSeats} participants
        </span>
        <span aria-hidden>·</span>
        <span>{cohort.liveSessionsPerWeek} sessions live / semaine</span>
        <span aria-hidden>·</span>
        <span>Conakry · Guinée</span>
      </RevealOnScroll>
    </section>
  )
}
