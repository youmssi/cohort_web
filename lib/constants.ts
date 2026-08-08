/**
 * Single source of truth for brand and program facts referenced across pages,
 * metadata and emails. Never hardcode these values elsewhere, import from here.
 */
export const site = {
  name: "Coh0rt",
  legalName: "Coh0rt",
  domain: "cohort.mrvin100.de",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cohort.mrvin100.de",
  builtBy: "Propulsed by MRVIN100",
  builtByUrl: "https://mrvin100.de",
} as const

export const program = {
  /** Public-facing name of the flagship experience. */
  name: "Digital Leadership Immersion",
} as const

export const cohort = {
  code: "Cohorte 01",
  minSeats: 8,
  maxSeats: 12,
  durationWeeks: 16,
  phases: 4,
  competencies: 10,
  liveSessionsPerWeek: "1 à 2",
  tuitionAmount: 3_900_000,
  tuitionCurrency: "GNF",
} as const

export const contact = {
  applicationNotificationEmail: process.env.APPLICATION_NOTIFICATION_EMAIL ?? "",
  fromEmail: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
} as const
