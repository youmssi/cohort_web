import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { ArrowLeft } from "lucide-react"

import type { Locale } from "@/i18n/routing"
import { getCompetencies, getCompetency } from "@/lib/content"
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo"
import { MdxContent } from "@/components/shared"
import { Badge } from "@/components/ui/badge"
import { ButtonLink } from "@/components/shared"
import { RevealOnScroll } from "@/components/animations/reveal-on-scroll"
import { cohort } from "@/lib/constants"
import { cohortName, currentCohort } from "@/lib/cohorts"

export function generateStaticParams({ params }: { params: { locale: string } }) {
  return getCompetencies(params.locale as Locale).map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const item = getCompetency(locale, slug)
  if (!item) return {}

  return buildMetadata({
    locale,
    path: `/competencies/${slug}`,
    title: item.title,
    description: item.summary,
  })
}

export default async function CompetencyPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const item = getCompetency(locale, slug)
  if (!item) notFound()

  const tc = await getTranslations({ locale, namespace: "Common" })
  const tMeta = await getTranslations({ locale, namespace: "Metadata" })

  const crumbs = breadcrumbJsonLd(locale, [
    { name: tMeta("pages.competencies.title"), path: "/competencies" },
    { name: item.title, path: `/competencies/${item.slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
    <article className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <RevealOnScroll className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="font-mono font-normal">
          {item.code}
        </Badge>
        <span className="text-xs text-muted-foreground tabular-nums">
          {String(item.order).padStart(2, "0")} / {cohort.competencies}
        </span>
      </RevealOnScroll>

      <RevealOnScroll
        delay={90}
        as="h1"
        className="mt-5 text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        {item.title}
      </RevealOnScroll>

      <RevealOnScroll
        delay={170}
        className="mt-4 border-l-2 pl-5 text-pretty text-lg leading-relaxed text-muted-foreground italic"
      >
        {item.question}
      </RevealOnScroll>

      <RevealOnScroll delay={250}>
        <MdxContent code={item.content} className="mt-10" />
      </RevealOnScroll>

      <nav className="mt-16 flex items-center justify-between gap-3 border-t pt-6">
        <ButtonLink href="/competencies" variant="ghost">
          <ArrowLeft className="opacity-50" />
          <span>{tc("allCompetencies")}</span>
        </ButtonLink>
        <ButtonLink href="/apply">{tc("applyCta", { cohort: cohortName(currentCohort()) })}</ButtonLink>
      </nav>
    </article>
    </>
  )
}
