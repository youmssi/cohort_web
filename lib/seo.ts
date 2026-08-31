import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { routing, type Locale } from "@/i18n/routing"
import { liveSocials, program, site } from "@/lib/constants"
import { cohortName, currentCohort } from "@/lib/cohorts"

export function localizedPath(locale: Locale, path: string) {
  const normalized = path === "/" ? "" : path
  return locale === routing.defaultLocale ? normalized || "/" : `/${locale}${normalized}`
}

export function absoluteUrl(locale: Locale, path: string) {
  return `${site.url}${localizedPath(locale, path)}`
}

/**
 * Absolute URL in the exact spelling Next emits for `alternates.canonical`.
 * Next normalises metadata URLs against `trailingSlash: false`, so the home page
 * renders as `https://host` while `absoluteUrl` returns `https://host/`. The
 * sitemap builds its `<loc>` and hreflang values by hand and never goes through
 * that normalisation, so without this the home page ships under two spellings
 * and crawlers report a canonical/sitemap conflict.
 */
export function canonicalUrl(locale: Locale, path: string) {
  return absoluteUrl(locale, path).replace(/\/$/, "")
}

const keywordsByLocale: Record<Locale, string[]> = {
  fr: [
    "leadership numérique",
    "transformation numérique Guinée",
    "formation dirigeants Conakry",
    "IA pour dirigeants",
    "executive education Guinée",
    "cohorte leadership numérique",
    "évaluation technologique",
    "gouvernance du risque numérique",
    "formation entreprise Conakry",
  ],
  en: [
    "digital leadership",
    "digital transformation Guinea",
    "executive education Conakry",
    "AI for business leaders",
    "technology evaluation",
    "digital risk governance",
    "leadership cohort Africa",
    "corporate training Conakry",
  ],
}

/**
 * Shared `generateMetadata` builder. Every marketing page calls this so title
 * templating, canonical URLs, hreflang alternates and social cards stay
 * consistent across the site.
 */
export async function buildMetadata({
  locale,
  path = "/",
  title,
  description,
  type = "website",
}: {
  locale: Locale
  path?: string
  title?: string
  description?: string
  type?: "website" | "article"
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" })
  const resolvedTitle = title ?? t("defaultTitle")
  const resolvedDescription = description ?? t("description")

  // Google picks x-default when no other hreflang matches the user's locale.
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, path)])
  )
  languages["x-default"] = localizedPath(routing.defaultLocale, path)

  // Set explicitly rather than relying on the file convention: because the page
  // defines `openGraph`, Next does not merge the generated image in on its own.
  const ogImage = {
    url: `${site.url}/${locale}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: resolvedTitle,
  }

  return {
    metadataBase: new URL(site.url),
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: keywordsByLocale[locale],
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    alternates: {
      canonical: localizedPath(locale, path),
      languages,
    },
    // Search Console's meta-tag method. Left out of the markup entirely when
    // unset, rather than emitting an empty tag.
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
      : {}),
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: localizedPath(locale, path),
      siteName: t("siteName"),
      locale: locale === "fr" ? "fr_GN" : "en_GB",
      alternateLocale: locale === "fr" ? ["en_GB"] : ["fr_GN"],
      type,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  }
}

/* --------------------------------------------------------------- structured data */

const organizationId = `${site.url}/#organization`

/** Emitted once from the locale layout so every page carries the publisher identity. */
export function organizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": organizationId,
    name: site.name,
    url: site.url,
    description:
      locale === "fr"
        ? "Immersion sélective en leadership numérique pour dirigeants, directeurs et managers."
        : "A selective digital leadership immersion for founders, directors and managers.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Conakry",
      addressCountry: "GN",
    },
    // Conakry is the cohort's market and stays the postal address. The
    // programme is run from Berlin and Yaounde and delivered online, so the
    // served area is wider than the address suggests.
    areaServed: [
      { "@type": "Country", name: "Guinea" },
      { "@type": "Country", name: "Cameroon" },
      { "@type": "Country", name: "Germany" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Admissions",
      email: site.contactEmail,
      telephone: site.phoneE164,
      availableLanguage: ["fr", "en"],
    },
    sameAs: liveSocials()
      .filter((social) => social.key !== "email" && social.key !== "whatsapp")
      .map((social) => social.url),
  }
}

/**
 * Course schema for the flagship programme. Carries the published tuition so the
 * price is eligible for rich results rather than being locked inside markup.
 *
 * Emitted from both `/` and `/program` under one `@id`, which is what schema.org
 * expects: two pages describing the same entity, not two courses. `url` names
 * `/program` as the entity's home so Google knows which page to surface.
 */
export function courseJsonLd(locale: Locale) {
  const session = currentCohort()
  // `courseWorkload` is effort *per week*, not the length of the programme —
  // a distinction Google's validator does not check and so will not flag.
  // "3 to 5 hours a week" is the published commitment; the schema states the
  // top of that range, because overstating the effort is the safe direction to
  // be wrong in for someone deciding whether they can afford the time.
  // Google's rule is `courseWorkload` or `courseSchedule`, never both, so the
  // calendar is carried by startDate/endDate instead.
  const workload = "PT5H"
  // 26B is announced without dates. Emitting `startDate: null` would be an
  // invalid value where omitting the field is simply less information, so the
  // dates are spread in only once they exist.
  const schedule = {
    ...(session.start ? { startDate: session.start } : {}),
    ...(session.end ? { endDate: session.end } : {}),
  }
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${site.url}/#course`,
    url: absoluteUrl(locale, "/program"),
    name: program.name,
    description:
      locale === "fr"
        ? "Immersion sélective de 16 semaines pour dirigeants, directeurs et managers qui doivent évaluer l'IA, challenger un fournisseur et diriger la transformation numérique de leur organisation."
        : "A selective 16-week immersion for founders, directors and managers who have to evaluate AI, challenge a vendor and lead digital transformation inside their organisation.",
    inLanguage: locale,
    provider: { "@id": organizationId },
    educationalLevel: locale === "fr" ? "Cadres dirigeants" : "Executive",
    teaches: locale === "fr" ? "Leadership numérique" : "Digital leadership",
    offers: {
      "@type": "Offer",
      category: "Tuition",
      price: session.tuition,
      priceCurrency: "GNF",
      availability: "https://schema.org/LimitedAvailability",
      url: absoluteUrl(locale, "/apply"),
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      "@id": `${site.url}/#course-${session.id}`,
      name: cohortName(session),
      courseMode: "online",
      courseWorkload: workload,
      ...schedule,
      inLanguage: locale,
      maximumAttendeeCapacity: session.seats.max,
      location: { "@type": "VirtualLocation", url: site.url },
    },
  }
}

/** Powers the FAQ rich result on /faq. */
export function faqJsonLd(entries: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  }
}

/** Breadcrumbs for the two detail routes, so search results show the hierarchy. */
export function breadcrumbJsonLd(
  locale: Locale,
  trail: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(locale, crumb.path),
    })),
  }
}
