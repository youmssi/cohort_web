import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { routing, type Locale } from "@/i18n/routing"
import { cohort, site } from "@/lib/constants"

function localizedPath(locale: Locale, path: string) {
  const normalized = path === "/" ? "" : path
  return locale === routing.defaultLocale ? normalized || "/" : `/${locale}${normalized}`
}

/**
 * Shared `generateMetadata` builder. Every marketing page calls this so title
 * templating, canonical URLs and hreflang alternates stay consistent.
 */
export async function buildMetadata({
  locale,
  path = "/",
  title,
  description,
}: {
  locale: Locale
  path?: string
  title?: string
  description?: string
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" })
  const resolvedTitle = title ?? t("defaultTitle")
  const resolvedDescription = description ?? t("description")

  return {
    metadataBase: new URL(site.url),
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: localizedPath(locale, path),
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, localizedPath(l, path)])
      ),
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: localizedPath(locale, path),
      siteName: t("siteName"),
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
    },
  }
}

/** Organization + Course JSON-LD, rendered once in the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Conakry",
      addressCountry: "GN",
    },
  }
}

export function courseJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: site.name,
    description:
      locale === "fr"
        ? "Immersion sélective de 16 semaines en leadership numérique pour dirigeants, directeurs et managers."
        : "A selective 16-week digital leadership immersion for founders, directors and managers.",
    provider: {
      "@type": "EducationalOrganization",
      name: site.name,
      sameAs: site.url,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `P${cohort.durationWeeks}W`,
    },
  }
}
