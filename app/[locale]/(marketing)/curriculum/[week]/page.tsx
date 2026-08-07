import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { Link } from "@/i18n/navigation"
import { getWeek, getWeeks } from "@/lib/content"
import { buildMetadata } from "@/lib/seo"
import { MdxContent } from "@/components/mdx-content"
import { Button } from "@/components/ui/button"
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
  return buildMetadata({
    locale,
    path: `/curriculum/${week}`,
    title: `Semaine ${item.week} — ${item.title}`,
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

  const all = getWeeks(locale)
  const prev = all.find((w) => w.week === item.week - 1)
  const next = all.find((w) => w.week === item.week + 1)

  return (
    <article className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <RevealOnScroll as="p" className="font-mono text-xs text-muted-foreground">
        Phase {item.phase} · {item.phaseTitle} · Semaine {item.week.toString().padStart(2, "0")}
      </RevealOnScroll>
      <RevealOnScroll delay={80} as="h1" className="mt-2 text-balance font-heading text-3xl font-semibold sm:text-4xl">
        {item.title}
      </RevealOnScroll>
      <RevealOnScroll delay={160} className="mt-4 text-pretty text-lg text-muted-foreground">
        {item.objective}
      </RevealOnScroll>

      <RevealOnScroll delay={220} className="mt-8 grid gap-4 rounded-2xl border p-6 sm:grid-cols-2">
        <div>
          <p className="text-xs text-muted-foreground">Défi</p>
          <p className="mt-1 text-sm">{item.challenge}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Livrable</p>
          <p className="mt-1 text-sm font-medium">{item.deliverable}</p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={280}>
        <MdxContent code={item.content} className="mt-10" />
      </RevealOnScroll>

      <div className="mt-14 flex items-center justify-between border-t pt-6 text-sm">
        {prev ? (
          <Button
            variant="ghost"
            render={<Link href={`/curriculum/${prev.week}`}>← Semaine {prev.week}</Link>}
          />
        ) : (
          <span />
        )}
        {next ? (
          <Button
            variant="ghost"
            render={<Link href={`/curriculum/${next.week}`}>Semaine {next.week} →</Link>}
          />
        ) : (
          <Button render={<Link href="/apply">Postuler pour la Cohorte 01</Link>} />
        )}
      </div>
    </article>
  )
}
