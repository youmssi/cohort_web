import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { ArrowLeft, ArrowRight } from "lucide-react"

import type { Locale } from "@/i18n/routing"
import { Link } from "@/i18n/navigation"
import { getWeek, getWeeks } from "@/lib/content"
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo"
import { MdxContent } from "@/components/mdx-content"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"

export function generateStaticParams({ params }: { params: { locale: string } }) {
  return getWeeks(params.locale as Locale).map((week) => ({ week: String(week.week) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; week: string }>
}) {
  const { locale, week } = await params
  const item = getWeek(locale, Number(week))
  if (!item) return {}

  const t = await getTranslations({ locale, namespace: "Common" })
  return buildMetadata({
    locale,
    path: `/curriculum/${week}`,
    title: `${t("week")} ${item.week}. ${item.title}`,
    description: item.objective,
  })
}

export default async function WeekPage({
  params,
}: {
  params: Promise<{ locale: Locale; week: string }>
}) {
  const { locale, week } = await params
  setRequestLocale(locale)

  const item = getWeek(locale, Number(week))
  if (!item) notFound()

  const t = await getTranslations({ locale, namespace: "Curriculum" })
  const tc = await getTranslations({ locale, namespace: "Common" })
  const tMeta = await getTranslations({ locale, namespace: "Metadata" })

  const all = getWeeks(locale)
  const prev = all.find((w) => w.week === item.week - 1)
  const next = all.find((w) => w.week === item.week + 1)

  const crumbs = breadcrumbJsonLd(locale, [
    { name: tMeta("pages.curriculum.title"), path: "/curriculum" },
    { name: item.title, path: `/curriculum/${item.week}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
    <article className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <RevealOnScroll className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="font-normal">
          {tc("phase")} {item.phase} · {item.phaseTitle}
        </Badge>
        <Badge variant="outline" className="font-mono font-normal tabular-nums">
          {tc("week")} {String(item.week).padStart(2, "0")}
        </Badge>
      </RevealOnScroll>

      <RevealOnScroll
        delay={90}
        as="h1"
        className="mt-5 text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        {item.title}
      </RevealOnScroll>

      <RevealOnScroll delay={170} className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
        {item.objective}
      </RevealOnScroll>

      <RevealOnScroll delay={240} className="mt-8 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
        <div className="bg-background p-5">
          <p className="text-xs text-muted-foreground">{t("challenge")}</p>
          <p className="mt-1.5 text-sm leading-relaxed">{item.challenge}</p>
        </div>
        <div className="bg-background p-5">
          <p className="text-xs text-muted-foreground">{t("deliverable")}</p>
          <p className="mt-1.5 font-heading text-sm font-medium">{item.deliverable}</p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={300}>
        <MdxContent code={item.content} className="mt-10" />
      </RevealOnScroll>

      <nav className="mt-16 flex items-center justify-between gap-3 border-t pt-6">
        {prev ? (
          <Button
            variant="ghost"
            render={
              <Link href={`/curriculum/${prev.week}`}>
                <ArrowLeft className="opacity-50" />
                <span>
                  {tc("week")} {prev.week}
                </span>
              </Link>
            }
          />
        ) : (
          <Button
            variant="ghost"
            render={<Link href="/curriculum">{t("backToCurriculum")}</Link>}
          />
        )}

        {next ? (
          <Button
            variant="ghost"
            render={
              <Link href={`/curriculum/${next.week}`}>
                <span>
                  {tc("week")} {next.week}
                </span>
                <ArrowRight className="opacity-50" />
              </Link>
            }
          />
        ) : (
          <Button render={<Link href="/apply">{tc("applyCta")}</Link>} />
        )}
      </nav>
    </article>
    </>
  )
}
