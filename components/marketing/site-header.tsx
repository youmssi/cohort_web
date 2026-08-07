import { useTranslations } from "next-intl"
import { MenuIcon } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { LocaleSwitch } from "@/components/locale-switch"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { href: "/program", key: "program" },
  { href: "/method", key: "method" },
  { href: "/curriculum", key: "curriculum" },
  { href: "/competencies", key: "competencies" },
  { href: "/cohort-01", key: "cohort" },
  { href: "/faq", key: "faq" },
] as const

export function SiteHeader() {
  const t = useTranslations("Nav")

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-heading text-sm font-semibold tracking-tight">
          Digital Leadership Immersion
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LocaleSwitch />
          <ThemeToggle />
          <Button size="sm" render={<Link href="/apply">{t("apply")}</Link>} />
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label={t("toggleMenu")}
              >
                <MenuIcon className="size-5" />
              </Button>
            }
          />
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>Digital Leadership Immersion</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-2 py-2.5 text-sm hover:bg-accent"
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex items-center justify-between px-4">
              <LocaleSwitch />
              <ThemeToggle />
            </div>
            <div className="px-4">
              <Button className="w-full" render={<Link href="/apply">{t("apply")}</Link>} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
