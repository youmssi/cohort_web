import { useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"
import { Logo } from "@/components/brand/logo"
import { currentCohort } from "@/lib/cohorts"
import { site } from "@/lib/constants"

const programLinks = [
  { href: "/program", key: "program" },
  { href: "/method", key: "method" },
  { href: "/curriculum", key: "curriculum" },
  { href: "/competencies", key: "competencies" },
] as const

const admissionLinks = [
  { href: "/admissions", key: "admissions" },
  { href: `/cohorts/${currentCohort().id}`, key: "cohort" },
  { href: "/diagnostic", key: "diagnostic" },
  { href: "/faq", key: "faq" },
  { href: "/contact", key: "contact" },
] as const

export function SiteFooter() {
  const tNav = useTranslations("Nav")
  const tFooter = useTranslations("Footer")
  const tCommon = useTranslations("Common")

  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.6fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
            {tFooter("tagline")}
          </p>
          <p className="text-xs text-muted-foreground">{tCommon("location")}</p>
        </div>

        <nav className="space-y-3 text-sm">
          <p className="font-medium">{tFooter("sections.program")}</p>
          <div className="flex flex-col gap-2">
            {programLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {tNav(item.key)}
              </Link>
            ))}
          </div>
        </nav>

        <nav className="space-y-3 text-sm">
          <p className="font-medium">{tFooter("sections.company")}</p>
          <div className="flex flex-col gap-2">
            {admissionLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {tNav(item.key)}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.name}. {tFooter("rights")}
          </p>
          <a
            href={site.builtByUrl}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            {site.builtBy}
          </a>
        </div>
      </div>
    </footer>
  )
}
