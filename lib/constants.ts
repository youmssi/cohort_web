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
  builtBy: "Powered by MRVIN100",
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

/**
 * Community and social channels.
 *
 * Empty string means "not published yet": every consumer skips the entry
 * rather than rendering a dead link. Fill these in as the channels go live.
 */
export const channels = {
  whatsappCommunity: "",
  discord: "https://discord.gg/JeJV9M6n",
  linkedin: "https://linkedin.com/company/mrvin100",
  facebook: "https://facebook.com/mrvin100.de",
} as const

export type SocialKey = "whatsapp" | "discord" | "linkedin" | "facebook" | "email"

/**
 * What the footer links out to, in display order. WhatsApp falls back to the
 * one-to-one number until the community group exists, so the row is never
 * empty; entries with no destination are dropped rather than shipped dead.
 */
export function liveSocials() {
  const all: { key: SocialKey; url: string }[] = [
    { key: "whatsapp", url: channels.whatsappCommunity || site.whatsappUrl },
    { key: "discord", url: channels.discord },
    { key: "linkedin", url: channels.linkedin },
    { key: "facebook", url: channels.facebook },
    { key: "email", url: `mailto:${site.contactEmail}` },
  ]
  return all.filter((social) => social.url.length > 0)
}

export const program = {
  /** Public-facing name of the flagship experience. */
  name: "Digital Leadership Immersion",
} as const

export const cohort = {
  /**
   * Programme shape, identical across every session. Per-session facts (name,
   * status, dates, seats, tuition) live in `lib/cohorts.ts`.
   */
  durationWeeks: 16,
  phases: 4,
  competencies: 10,
  liveSessionsPerWeek: "1 à 2",
} as const

/**
 * What an organisation can buy, in whole GNF.
 *
 * The commercial model runs one ladder: an individual seat on a public cohort,
 * a personalised executive track above it, then a private cohort run for a
 * single organisation. `from` null means the seat is simply the published
 * tuition of the session, so it never drifts out of step with the registry.
 * Everything above is quoted, not listed.
 */
export const corporateTiers = [
  { key: "seat", from: null },
  { key: "executive", from: 25_000_000 },
  { key: "private", from: 60_000_000 },
] as const

export const contact = {
  applicationNotificationEmail:
    process.env.APPLICATION_NOTIFICATION_EMAIL ?? site.contactEmail,
  fromEmail: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
} as const
