import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  // NOTE: Cache Components (cacheComponents: true) was the initial plan, but
  // next-intl 4.13.5's request-locale resolution (setRequestLocale /
  // RequestLocaleCache, itself deprecated in favor of the still-unstable
  // `next/root-params`) triggers "uncached data accessed outside <Suspense>"
  // on every route once the flag is on, even fully static pages with zero
  // data fetching. Until next-intl ships first-class support for Cache
  // Components, we rely on Next's default automatic static optimization
  // instead: every marketing page is still fully static at build time via
  // generateStaticParams, just without the stricter dynamicIO enforcement.
  typedRoutes: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
}

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

export default withNextIntl(nextConfig)
