import { useTranslations } from "next-intl"
import { MenuIcon } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Logo } from "@/components/brand/logo"
import { LocaleSwitch } from "@/components/locale-switch"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { href: "/program", key: "program" },
  { href: "/method", key: "method" },
  { href: "/curriculum", key: "curriculum" },
  { href: "/competencies", key: "competencies" },
  { href: "/admissions", key: "admissions" },
] as const

export function SiteHeader() {
  const t = useTranslations("Nav")

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="shrink-0" aria-label="Coh0rt">
          <Logo />
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          <LocaleSwitch />
          <ThemeToggle />
          <Separator orientation="vertical" className="mx-1 h-5" />
          <Button
            size="sm"
            variant="ghost"
            render={<Link href="/diagnostic">{t("diagnostic")}</Link>}
          />
          <Button size="sm" render={<Link href="/apply">{t("apply")}</Link>} />
        </div>

        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label={t("toggleMenu")}>
                  <MenuIcon className="size-5" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-start">{t("menuTitle")}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-0.5 px-4">
                {[...navItems, { href: "/cohort-01", key: "cohort" } as const, { href: "/faq", key: "faq" } as const].map(
                  (item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-muted"
                    >
                      {t(item.key)}
                    </Link>
                  )
                )}
              </nav>
              <div className="mt-2 flex items-center justify-between px-4">
                <LocaleSwitch />
              </div>
              <div className="mt-4 grid gap-2 px-4">
                <Button
                  variant="outline"
                  render={<Link href="/diagnostic">{t("diagnostic")}</Link>}
                />
                <Button render={<Link href="/apply">{t("apply")}</Link>} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
