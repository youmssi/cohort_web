import { site } from "@/lib/constants"

/**
 * Cohort registry: the single source of truth for every session.
 *
 * Naming is `Coh0rt <YY><letter>`, where the two digits are the calendar year
 * and the letter is the batch within that year (26A, then 26B, then 27A). It
 * sorts naturally, survives a skipped year, and never implies a longer history
 * than actually exists.
 *
 * To close a session and open the next one, add an entry below. Every badge,
 * CTA, price, date and email label on the site reads from here, so nothing else
 * needs editing.
 */

export type CohortStatus =
  | "upcoming" // announced, applications not yet open
  | "open" // accepting applications
  | "closed" // applications closed, not yet started
  | "running" // in progress
  | "completed"

export interface Cohort {
  /** URL slug and stable identifier, e.g. "26a". */
  id: string
  /** Calendar year the cohort runs in. */
  year: number
  /** Batch letter within the year. */
  batch: string
  /**
   * Forces a status regardless of the dates. Leave unset in normal operation:
   * the status is then derived from the calendar, so the site opens and closes
   * itself on the published dates without needing a deploy.
   */
  statusOverride?: CohortStatus
  /** ISO dates. Null means "not scheduled yet". */
  applicationsOpen: string | null
  applicationsClose: string | null
  start: string | null
  end: string | null
  seats: { min: number; max: number }
  /** Tuition in whole GNF. */
  tuition: number
  /** Rate later cohorts are expected to pay, shown as an anchor. */
  standardTuition: number
  /**
   * Payment plans, shown in the order listed. The commercial model is explicit
   * that no plan may reduce the total, so each entry's `count * amount` must be
   * at least the tuition.
   */
  instalments: { count: number; amount: number }[]
  /** Marks the inaugural session, which gets the founding-cohort framing. */
  founding: boolean
}

export const cohorts: Cohort[] = [
  {
    id: "26a",
    year: 2026,
    batch: "A",
    applicationsOpen: "2026-08-15",
    applicationsClose: "2026-11-07",
    start: "2026-11-14",
    // 16 teaching weeks from 14 Nov 2026 lands on 6 Mar 2027.
    end: "2027-03-06",
    // "8-10 participants", "10 seats maximum" for the founding cohort.
    seats: { min: 8, max: 10 },
    tuition: 12_000_000,
    standardTuition: 15_000_000,
    instalments: [
      { count: 2, amount: 6_000_000 },
      { count: 4, amount: 3_000_000 },
    ],
    founding: true,
  },
  {
    // Announced, not yet scheduled. Null dates render as "dates to come" rather
    // than inventing a calendar, and the derived status stays "upcoming" until
    // real dates land here. Tuition shows the standard rate: the founding
    // discount belongs to 26A alone.
    id: "26b",
    year: 2026,
    batch: "B",
    applicationsOpen: null,
    applicationsClose: null,
    start: null,
    end: null,
    seats: { min: 8, max: 10 },
    tuition: 15_000_000,
    standardTuition: 15_000_000,
    // The standard rate carries an instalment premium: 2 x 8M totals 16M
    // against 15M upfront, which is the incentive to settle in one go.
    instalments: [{ count: 2, amount: 8_000_000 }],
    founding: false,
  },
]

/** Display name, e.g. "Coh0rt 26A". */
export function cohortName(cohort: Cohort) {
  return `${site.name} ${String(cohort.year).slice(-2)}${cohort.batch}`
}

/**
 * Where the session sits today.
 *
 * Derived from the calendar so the site flips from "opening soon" to
 * "applications open" on the published date on its own. `statusOverride` wins
 * when set, for the cases the calendar cannot express (a cohort cancelled, or
 * applications closed early because it filled).
 */
export function cohortStatus(cohort: Cohort, now: Date = new Date()): CohortStatus {
  if (cohort.statusOverride) return cohort.statusOverride

  const at = (iso: string | null) => (iso ? new Date(iso).getTime() : null)
  const today = now.getTime()

  const opens = at(cohort.applicationsOpen)
  const closes = at(cohort.applicationsClose)
  const starts = at(cohort.start)
  const ends = at(cohort.end)

  if (ends && today > ends) return "completed"
  if (starts && today >= starts) return "running"
  if (closes && today > closes) return "closed"
  if (opens && today >= opens) return "open"
  return "upcoming"
}

export function isAcceptingApplications(cohort: Cohort, now?: Date) {
  return cohortStatus(cohort, now) === "open"
}

/**
 * The cohort the site should promote: the one accepting applications, else the
 * next one announced, else the most recent.
 */
export function currentCohort(now?: Date): Cohort {
  return (
    cohorts.find((c) => cohortStatus(c, now) === "open") ??
    cohorts.find((c) => cohortStatus(c, now) === "upcoming") ??
    cohorts.at(-1)!
  )
}

export function getCohort(id: string) {
  return cohorts.find((cohort) => cohort.id === id)
}

/**
 * Maps the app locale to a full BCP 47 tag for formatting. The English copy is
 * written in British English, and a West African audience reads "15 August
 * 2026" rather than the American ordering, so "en" resolves to en-GB.
 */
export function intlLocale(locale: string) {
  return locale === "en" ? "en-GB" : locale
}

const longDate = (iso: string, locale: string) =>
  new Intl.DateTimeFormat(intlLocale(locale), {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso))

/** "14 novembre 2026 to 6 mars 2027", or null while unscheduled. */
export function cohortDates(cohort: Cohort, locale: string) {
  if (!cohort.start) return null
  const start = longDate(cohort.start, locale)
  return cohort.end ? `${start} – ${longDate(cohort.end, locale)}` : start
}

/** "15 août 2026 – 7 novembre 2026", or null while unscheduled. */
export function applicationWindow(cohort: Cohort, locale: string) {
  if (!cohort.applicationsOpen) return null
  const open = longDate(cohort.applicationsOpen, locale)
  return cohort.applicationsClose
    ? `${open} – ${longDate(cohort.applicationsClose, locale)}`
    : open
}
