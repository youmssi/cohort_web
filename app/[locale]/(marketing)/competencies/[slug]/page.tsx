import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { Link } from "@/i18n/navigation"
import { getCompetencies, getCompetency } from "@/lib/content"
import { buildMetadata } from "@/lib/seo"
import { MdxContent } from "@/components/mdx-content"
import { Button } from "@/components/ui/button"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"

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

  return (
    <article className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <RevealOnScroll as="p" className="font-mono text-xs text-muted-foreground">
        {item.code} · Compétence {item.order.toString().padStart(2, "0")} / 10
      </RevealOnScroll>
      <RevealOnScroll delay={80} as="h1" className="mt-2 text-balance font-heading text-3xl font-semibold sm:text-4xl">
        {item.title}
      </RevealOnScroll>
      <RevealOnScroll delay={160} className="mt-4 text-pretty text-lg italic text-muted-foreground">
        « {item.question} »
      </RevealOnScroll>

      <RevealOnScroll delay={240}>
        <MdxContent code={item.content} className="mt-10" />
      </RevealOnScroll>

      <div className="mt-14 flex items-center justify-between border-t pt-6 text-sm">
        <Button variant="ghost" render={<Link href="/competencies">← Toutes les compétences</Link>} />
        <Button render={<Link href="/apply">Postuler pour la Cohorte 01</Link>} />
      </div>
    </article>
  )
}
