import { useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"

const programLinks = [
  { href: "/program", key: "program" },
  { href: "/method", key: "method" },
  { href: "/curriculum", key: "curriculum" },
  { href: "/competencies", key: "competencies" },
] as const

const companyLinks = [
  { href: "/admissions", key: "admissions" },
  { href: "/cohort-01", key: "cohort" },
  { href: "/faq", key: "faq" },
  { href: "/apply", key: "apply" },
] as const

export function SiteFooter() {
  const tNav = useTranslations("Nav")
  const tFooter = useTranslations("Footer")

  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-heading text-sm font-semibold">Digital Leadership Immersion</p>
          <p className="max-w-sm text-pretty text-sm text-muted-foreground">
            {tFooter("tagline")}
          </p>
          <p className="text-xs text-muted-foreground">{tFooter("location")}</p>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-medium">{tFooter("sections.program")}</p>
          {programLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-muted-foreground transition-colors hover:text-foreground"
            >
              {tNav(item.key)}
            </Link>
          ))}
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-medium">{tFooter("sections.company")}</p>
          {companyLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-muted-foreground transition-colors hover:text-foreground"
            >
              {tNav(item.key)}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} Digital Leadership Immersion — {tFooter("rights")}
      </div>
    </footer>
  )
}
