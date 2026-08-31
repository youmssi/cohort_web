"use client"

import { useLocale } from "next-intl"

import { routing } from "@/i18n/routing"
import { usePathname } from "@/i18n/navigation"
import { ButtonLink } from "./button-link"

/**
 * Language switcher.
 *
 * Renders real anchors rather than buttons with an `onClick`. The English half
 * of the site is reachable only through this control, so when it was a
 * `router.replace` handler there was no `href` to `/en` anywhere in the markup:
 * a crawl that follows links found the thirty-nine French pages and none of the
 * English ones. Search engines still reached them through the sitemap and
 * hreflang, but no internal link equity did, and link-following crawlers saw a
 * monolingual site.
 *
 * `usePathname` from the i18n navigation returns the path without its locale
 * prefix, so the same value works as the target for every locale.
 */
export function LocaleSwitch() {
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-0.5 text-xs font-medium">
      {routing.locales.map((l) => (
        <ButtonLink
          key={l}
          href={pathname}
          locale={l}
          variant="ghost"
          size="sm"
          data-active={l === locale}
          className="px-2 uppercase data-[active=true]:text-foreground data-[active=false]:text-muted-foreground"
        >
          {l}
        </ButtonLink>
      ))}
    </div>
  )
}
