import type { MetadataRoute } from "next"

import { routing } from "@/i18n/routing"
import { getCompetencies, getWeeks } from "@/lib/content"
import { cohorts } from "@/lib/cohorts"
import { canonicalUrl } from "@/lib/seo"

/** Relative priority, so crawlers spend their budget on the conversion pages. */
const staticPaths: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/program", priority: 0.9 },
  { path: "/apply", priority: 0.9 },
  { path: "/diagnostic", priority: 0.8 },
  { path: "/method", priority: 0.7 },
  { path: "/curriculum", priority: 0.7 },
  { path: "/competencies", priority: 0.7 },
  { path: "/admissions", priority: 0.7 },
  { path: "/cohorts", priority: 0.8 },
  { path: "/contact", priority: 0.6 },
  { path: "/faq", priority: 0.6 },
]

/** Every entry advertises its translations, which is what Google expects. */
function alternates(path: string) {
  return {
    languages: Object.fromEntries(routing.locales.map((l) => [l, canonicalUrl(l, path)])),
  }
}

/**
 * No `lastModified`.
 *
 * It used to be `new Date()` evaluated at build time, which told Google that
 * all seventy-eight pages had changed the moment of the last deploy — including
 * the deploys that only touched a component. Google compares a declared lastmod
 * against what it actually finds, and ignores the field across the whole
 * sitemap once it proves unreliable, so an always-now timestamp does not buy a
 * faster recrawl; it spends the credibility of the signal on nothing.
 *
 * Omitting it is what Google asks for when an accurate date is not available.
 * The honest source would be the last edit to each page's MDX, which the Velite
 * schemas do not currently carry; add an `updated` field there and this can
 * come back per entry rather than as one timestamp for the whole site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of routing.locales) {
    for (const { path, priority } of staticPaths) {
      entries.push({
        url: canonicalUrl(locale, path),
        changeFrequency: "weekly",
        priority,
        alternates: alternates(path),
      })
    }

    for (const session of cohorts) {
      const path = `/cohorts/${session.id}`
      entries.push({
        url: canonicalUrl(locale, path),
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: alternates(path),
      })
    }

    for (const week of getWeeks(locale)) {
      const path = `/curriculum/${week.week}`
      entries.push({
        url: canonicalUrl(locale, path),
        changeFrequency: "monthly",
        priority: 0.5,
        alternates: alternates(path),
      })
    }

    for (const competency of getCompetencies(locale)) {
      const path = `/competencies/${competency.slug}`
      entries.push({
        url: canonicalUrl(locale, path),
        changeFrequency: "monthly",
        priority: 0.5,
        alternates: alternates(path),
      })
    }
  }

  return entries
}
