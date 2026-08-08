"use client"

import { useLocale } from "next-intl"

import { routing } from "@/i18n/routing"
import { usePathname, useRouter } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"

export function LocaleSwitch() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex items-center gap-0.5 text-xs font-medium">
      {routing.locales.map((l) => (
        <Button
          key={l}
          type="button"
          variant="ghost"
          size="sm"
          data-active={l === locale}
          className="px-2 uppercase data-[active=true]:text-foreground data-[active=false]:text-muted-foreground"
          onClick={() => router.replace(pathname, { locale: l })}
        >
          {l}
        </Button>
      ))}
    </div>
  )
}
