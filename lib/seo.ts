import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { routing, type Locale } from "@/i18n/routing"
import { cohort, program, site } from "@/lib/constants"
import { currentCohort } from "@/lib/cohorts"

export function localizedPath(locale: Locale, path: string) {
  const normalized = path === "/" ? "" : path
  return locale === routing.defaultLocale ? normalized || "/" : `/${locale}${normalized}`
}

export function absoluteUrl(locale: Locale, path: string) {
  return `${site.url}${localizedPath(locale, path)}`
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
    areaServed: { "@type": "Country", name: "Guinea" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: locale === "fr" ? "Admissions" : "Admissions",
      email: site.contactEmail,
      telephone: site.phoneE164,
      availableLanguage: ["fr", "en"],
    },
  }
}

/**
 * Course schema for the flagship programme. Carries the published tuition so the
 * price is eligible for rich results rather than being locked inside markup.
 */
export function courseJsonLd(locale: Locale) {
  const session = currentCohort()
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${site.url}/#course`,
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
      courseMode: "online",
      courseWorkload: `P${cohort.durationWeeks}W`,
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
