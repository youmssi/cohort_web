import type { MetadataRoute } from "next"

import { routing } from "@/i18n/routing"
import { getCompetencies, getWeeks } from "@/lib/content"
import { cohorts } from "@/lib/cohorts"
import { absoluteUrl, localizedPath } from "@/lib/seo"
import { site } from "@/lib/constants"

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
  { path: "/contact", priority: 0.6 },
  { path: "/faq", priority: 0.6 },
]

/** Every entry advertises its translations, which is what Google expects. */
function alternates(path: string) {
  return {
    languages: Object.fromEntries(
      routing.locales.map((l) => [l, `${site.url}${localizedPath(l, path)}`])
    ),
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const locale of routing.locales) {
    for (const { path, priority } of staticPaths) {
      entries.push({
        url: absoluteUrl(locale, path),
        lastModified,
        changeFrequency: "weekly",
        priority,
        alternates: alternates(path),
      })
    }

    for (const session of cohorts) {
      const path = `/cohorts/${session.id}`
      entries.push({
        url: absoluteUrl(locale, path),
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: alternates(path),
      })
    }

    for (const week of getWeeks(locale)) {
      const path = `/curriculum/${week.week}`
      entries.push({
        url: absoluteUrl(locale, path),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.5,
        alternates: alternates(path),
      })
    }

    for (const competency of getCompetencies(locale)) {
      const path = `/competencies/${competency.slug}`
      entries.push({
        url: absoluteUrl(locale, path),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.5,
        alternates: alternates(path),
      })
    }
  }

  return entries
}
