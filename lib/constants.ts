/**
 * Single source of truth for program facts referenced across pages, metadata and emails.
 * Never hardcode these values elsewhere — import from here.
 */
export const site = {
  name: "Digital Leadership Immersion",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locationFr: "Conakry, Guinée",
  locationEn: "Conakry, Guinea",
} as const

export const cohort = {
  code: "Cohorte 01",
  minSeats: 8,
  maxSeats: 12,
  durationWeeks: 16,
  liveSessionsPerWeek: "1–2",
  tuitionAmount: 3_900_000,
  tuitionCurrency: "GNF",
} as const

export const contact = {
  applicationNotificationEmail: process.env.APPLICATION_NOTIFICATION_EMAIL ?? "",
  fromEmail: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
} as const
