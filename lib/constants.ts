/**
 * Single source of truth for brand, contact and program facts referenced across
 * pages, metadata, structured data and emails. Never hardcode these values
 * elsewhere, import from here.
 */
export const site = {
  name: "Coh0rt",
  legalName: "Coh0rt",
  domain: "cohort.mrvin100.de",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cohort.mrvin100.de",
  builtBy: "Propulsed by MRVIN100",
  builtByUrl: "https://mrvin100.de",

  /** Public contact channels, also mirrored into ContactPoint structured data. */
  contactEmail: "mrvin100mail@gmail.com",
  /** E.164 for tel: links and schema.org. */
  phoneE164: "+224614179276",
  /** Human readable form for display. */
  phoneDisplay: "+224 614 179 276",
  whatsappUrl: "https://wa.me/224614179276",
  bookingUrl: "https://cal.com/mrvin100/discovery",
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

  /**
   * Founding cohort tuition, per the commercial model in the strategy brief.
   * `standardTuition` is what later cohorts are expected to pay, shown as an
   * anchor so the founding rate reads as a stage of the programme rather than a
   * discount.
   */
  tuitionAmount: 3_900_000,
  standardTuition: 4_500_000,
  tuitionCurrency: "GNF",
  /** Split payment: two instalments, slightly higher in total. */
  instalmentAmount: 2_050_000,
  instalmentCount: 2,
} as const

export const contact = {
  applicationNotificationEmail:
    process.env.APPLICATION_NOTIFICATION_EMAIL ?? site.contactEmail,
  fromEmail: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
} as const
