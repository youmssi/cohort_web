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
  /** The cohort page moved from a hardcoded slug to the registry-driven route. */
  async redirects() {
    return [
      { source: "/cohort-01", destination: "/cohorts/26a", permanent: true },
      { source: "/:locale/cohort-01", destination: "/:locale/cohorts/26a", permanent: true },
    ]
  },
  /**
   * Baseline security headers, absent on every route until now.
   *
   * Deliberately no Content-Security-Policy. A useful one for this app has to
   * allow the inline JSON-LD and theme scripts, the Google Fonts and Vercel
   * Analytics origins, and Next's own inline runtime; writing that blind is how
   * a site ships a policy that either blocks its own scripts or is loose enough
   * to be decorative. It wants its own change, with the report-only header run
   * against production first.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Stops a browser second-guessing a declared Content-Type, which is
          // what turns an uploaded file into a script.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // No page here is meant to be framed, so clickjacking has no surface.
          { key: "X-Frame-Options", value: "DENY" },
          // Send the full URL to ourselves, only the origin to third parties,
          // and nothing at all when leaving HTTPS. Applicants reach /apply with
          // paths that need not travel to anyone else's logs.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Nothing on the site uses these, so refuse them site-wide rather
          // than relying on nobody ever asking.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ]
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
}

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

export default withNextIntl(nextConfig)
