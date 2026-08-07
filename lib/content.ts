import { competencies, faqs, personas, weeks } from "@/.velite"

import type { Locale } from "@/i18n/routing"

/**
 * Typed accessors over the Velite-compiled content collections (see velite.config.ts).
 * English translations are authored progressively — until a document exists in `en`,
 * callers fall back to the French version rather than rendering an empty section.
 */
function byLocale<T extends { locale: string }>(items: readonly T[], locale: Locale) {
  const inLocale = items.filter((item) => item.locale === locale)
  return inLocale.length > 0 ? inLocale : items.filter((item) => item.locale === "fr")
}

export function getWeeks(locale: Locale) {
  return byLocale(weeks, locale).sort((a, b) => a.week - b.week)
}

export function getWeek(locale: Locale, week: number) {
  return getWeeks(locale).find((item) => item.week === week)
}

export function getPhases(locale: Locale) {
  const list = getWeeks(locale)
  const phases = new Map<number, { phase: number; title: string; weeks: typeof list }>()
  for (const week of list) {
    const existing = phases.get(week.phase)
    if (existing) existing.weeks.push(week)
    else phases.set(week.phase, { phase: week.phase, title: week.phaseTitle, weeks: [week] })
  }
  return [...phases.values()].sort((a, b) => a.phase - b.phase)
}

export function getCompetencies(locale: Locale) {
  return byLocale(competencies, locale).sort((a, b) => a.order - b.order)
}

export function getCompetency(locale: Locale, slug: string) {
  return getCompetencies(locale).find((item) => item.slug === slug)
}

export function getFaqs(locale: Locale) {
  return byLocale(faqs, locale).sort((a, b) => a.order - b.order)
}

export function getPersonas(locale: Locale) {
  return byLocale(personas, locale).sort((a, b) => a.order - b.order)
}
