import type { MetadataRoute } from "next"

import { routing } from "@/i18n/routing"
import { getCompetencies, getWeeks } from "@/lib/content"
import { site } from "@/lib/constants"

function url(locale: string, path: string) {
  const normalized = path === "/" ? "" : path
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`
  return `${site.url}${prefix}${normalized || "/"}`
}

const staticPaths = [
  "/",
  "/program",
  "/method",
  "/curriculum",
  "/competencies",
  "/admissions",
  "/cohort-01",
  "/faq",
  "/diagnostic",
  "/apply",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({ url: url(locale, path), changeFrequency: "weekly" })
    }
    for (const week of getWeeks(locale)) {
      entries.push({ url: url(locale, `/curriculum/${week.week}`), changeFrequency: "monthly" })
    }
    for (const competency of getCompetencies(locale)) {
      entries.push({
        url: url(locale, `/competencies/${competency.slug}`),
        changeFrequency: "monthly",
      })
    }
  }

  return entries
}
