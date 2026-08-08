import { getTranslations, setRequestLocale } from "next-intl/server"
import { CalendarClock, ChevronRight, Mail, MessageCircle } from "lucide-react"

import type { Locale } from "@/i18n/routing"
import { buildMetadata } from "@/lib/seo"
import { site } from "@/lib/constants"
import { EnquiryForm } from "@/components/modules/contact"
import { ButtonLink } from "@/components/shared"
import { SocialLinks } from "@/components/brand/social-links"
import { RevealOnScroll } from "@/components/animations/reveal-on-scroll"
import { cohortName, currentCohort } from "@/lib/cohorts"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })
  return buildMetadata({
    locale,
    path: "/contact",
    title: t("pages.contact.title"),
    description: t("pages.contact.description", { cohort: cohortName(currentCohort()) }),
  })
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "Contact" })
  const tc = await getTranslations({ locale, namespace: "Common" })
  const tf = await getTranslations({ locale, namespace: "Footer" })

  const channels = [
    {
      Icon: Mail,
      label: t("channels.email"),
      value: site.contactEmail,
      href: `mailto:${site.contactEmail}`,
      external: false,
    },
    {
      Icon: MessageCircle,
      label: t("channels.phone"),
      value: site.phoneDisplay,
      href: site.whatsappUrl,
      external: true,
    },
    {
      Icon: CalendarClock,
      label: t("channels.booking"),
      value: t("channels.bookingValue"),
      href: site.bookingUrl,
      external: true,
    },
  ]

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <RevealOnScroll
          as="p"
          className="text-xs font-medium tracking-wide text-muted-foreground uppercase"
        >
          {t("eyebrow")}
        </RevealOnScroll>
        <RevealOnScroll
          delay={80}
          as="h1"
          className="mt-3 text-balance font-heading text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          {t("title")}
        </RevealOnScroll>
        <RevealOnScroll
          delay={160}
          className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          {t("intro")}
        </RevealOnScroll>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-5">
        <div className="space-y-8 lg:col-span-2">
          <ul className="space-y-5">
            {channels.map(({ Icon, label, value, href, external }, index) => (
              <RevealOnScroll key={label} delay={index * 80} as="li">
                <div className="flex items-start gap-3">
                  <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{label}</p>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="text-sm break-words text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      {value}
                    </a>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </ul>

          <RevealOnScroll delay={260} className="rounded-2xl border bg-muted/30 p-5">
            <p className="text-sm font-medium">{t("responseTitle")}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t("responseBody")}
            </p>
          </RevealOnScroll>

          {/* Community channels, kept apart from the one-to-one rows above:
              following us and writing to us are different intentions. */}
          <RevealOnScroll delay={300} className="space-y-3 border-t pt-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {tf("channelsNote")}
            </p>
            <SocialLinks />
          </RevealOnScroll>

          <RevealOnScroll delay={340} className="space-y-3 border-t pt-6">
            <p className="text-sm text-muted-foreground">{t("applyNote", { cohort: cohortName(currentCohort()) })}</p>
            <div className="flex flex-wrap gap-2">
              <ButtonLink href="/apply" size="sm" className="pr-1.5">
                <span>{tc("applyCta", { cohort: cohortName(currentCohort()) })}</span>
                <ChevronRight className="opacity-50" />
              </ButtonLink>
              <ButtonLink href={site.bookingUrl} external size="sm" variant="outline">
                {tc("bookCall")}
              </ButtonLink>
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={200} className="lg:col-span-3">
          <EnquiryForm />
        </RevealOnScroll>
      </div>
    </section>
  )
}
