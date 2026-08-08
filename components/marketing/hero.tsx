import { useLocale, useTranslations } from "next-intl"
import { ChevronRight } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BlurText } from "@/components/animations/blur-text"
import { CountUp } from "@/components/animations/count-up"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"
import { cohort } from "@/lib/constants"

export function Hero() {
  const t = useTranslations("Home")
  const tc = useTranslations("Common")
  const locale = useLocale()

  const stats = [
    { value: cohort.durationWeeks, label: tc("weeksLabel") },
    { value: cohort.competencies, label: tc("competenciesLabel") },
    { value: cohort.maxSeats, label: tc("participantsLabel") },
  ]

  return (
    <section className="relative overflow-hidden">
      {/* Editorial grid wash. Pure CSS, no image payload, hidden from a11y tree. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28">
        <RevealOnScroll>
          <Badge variant="secondary" className="gap-1.5 rounded-full px-3 py-1 font-normal">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-foreground/60 motion-reduce:hidden" />
              <span className="relative inline-flex size-1.5 rounded-full bg-foreground" />
            </span>
            {t("eyebrow")}
          </Badge>
        </RevealOnScroll>

        <BlurText
          as="h1"
          text={t("headline")}
          animateBy="words"
          delay={70}
          className="mt-6 justify-center text-balance font-heading text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl"
        />

        <RevealOnScroll delay={250}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {t("subhead")}
          </p>
        </RevealOnScroll>

        <RevealOnScroll
          delay={380}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            size="lg"
            className="pr-1.5"
            render={
              <Link href="/apply">
                <span>{tc("applyCta")}</span>
                <ChevronRight className="opacity-50" />
              </Link>
            }
          />
          <Button
            size="lg"
            variant="outline"
            render={<Link href="/diagnostic">{tc("diagnosticCta")}</Link>}
          />
        </RevealOnScroll>

        <RevealOnScroll delay={480} className="mt-16">
          <dl className="mx-auto grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl border bg-border">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background px-4 py-5">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-heading text-3xl font-semibold tabular-nums">
                  <CountUp to={stat.value} locale={locale} />
                </dd>
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </dl>
        </RevealOnScroll>
      </div>
    </section>
  )
}
