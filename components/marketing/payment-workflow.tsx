import { getTranslations } from "next-intl/server"
import { CalendarClock, ExternalLink, Info } from "lucide-react"

import type { Locale } from "@/i18n/routing"
import { RevealOnScroll } from "@/components/animations/reveal-on-scroll"
import { currentCohort, type Cohort } from "@/lib/cohorts"
import { site } from "@/lib/constants"

const steps = ["apply", "conversation", "admission", "payment"] as const

/**
 * How a candidate goes from applying to paying.
 *
 * The brief is explicit that admission precedes payment, so the sequence is
 * shown rather than asserted. Payment rails themselves are deliberately not
 * listed here: they travel with the admission letter, which keeps this page
 * honest and means it does not go stale when a provider changes.
 */
export async function PaymentWorkflow({
  locale,
  cohort,
}: {
  locale: Locale
  cohort?: Cohort
}) {
  const t = await getTranslations({ locale, namespace: "Payment" })
  const tp = await getTranslations({ locale, namespace: "Pricing" })
  const tc = await getTranslations({ locale, namespace: "Common" })
  const session = cohort ?? currentCohort()
  const money = (value: number) => new Intl.NumberFormat(locale).format(value)

  return (
    <section id="payment" className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
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
        {steps.map((step, index) => (
          <RevealOnScroll
            key={step}
            delay={index * 90}
            as="li"
            className="relative flex flex-col rounded-2xl border bg-card p-6"
          >
            <span className="inline-flex size-8 items-center justify-center rounded-full border font-mono text-xs tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-4 font-heading text-base font-semibold">
              {t(`steps.${step}.title`)}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {t(`steps.${step}.body`)}
            </p>

            {step === "conversation" && (
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
              >
                {tc("bookSlot")}
                <ExternalLink className="size-3.5 opacity-60" />
              </a>
            )}
          </RevealOnScroll>
        ))}
      </ol>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <RevealOnScroll className="rounded-2xl border bg-muted/30 p-6">
          <p className="font-heading text-sm font-semibold">{tp("paymentTitle")}</p>
          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted-foreground">{tp("paymentFull")}</dt>
              <dd className="tabular-nums">{money(session.tuition)} GNF</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted-foreground">{tp("paymentSplit")}</dt>
              <dd className="tabular-nums">
                {session.instalment.count} &times; {money(session.instalment.amount)} GNF
              </dd>
            </div>
          </dl>
          <p className="mt-5 flex gap-2.5 border-t pt-4 text-xs leading-relaxed text-muted-foreground">
            <Info className="mt-px size-3.5 shrink-0" />
            {t("methodsBody")}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={100} className="rounded-2xl border p-6">
          <p className="font-heading text-sm font-semibold">{t("refundTitle")}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t("refundBody")}
          </p>
        </RevealOnScroll>
      </div>

      {/* Stated separately because the sequence is a rule, not a suggestion:
          a seat is never confirmed on payment alone. */}
      <RevealOnScroll
        delay={200}
        className="mt-4 flex flex-col gap-4 rounded-2xl border border-foreground/15 bg-muted/30 p-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex gap-2.5">
          <CalendarClock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="font-heading text-sm font-semibold">{t("orderTitle")}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {t("orderBody")}
            </p>
          </div>
        </div>
        <a
          href={site.bookingUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
        >
          {tc("bookSlot")}
          <ExternalLink className="size-3.5 opacity-60" />
        </a>
      </RevealOnScroll>
    </section>
  )
}
