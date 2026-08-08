import { getTranslations } from "next-intl/server"
import { ChevronRight } from "lucide-react"

import type { Locale } from "@/i18n/routing"
import { ButtonLink } from "@/components/button-link"
import { cohortName, isAcceptingApplications, type Cohort } from "@/lib/cohorts"

/**
 * The primary call to action, driven by cohort status.
 *
 * When applications are open it points at the form. Otherwise it degrades to
 * the waitlist or the contact page rather than sending visitors to a form that
 * cannot accept them, which is the failure mode when a session closes and the
 * CTAs are hardcoded.
 */
export async function CohortCta({
  cohort,
  locale,
  size = "lg",
  className,
}: {
  cohort: Cohort
  locale: Locale
  size?: "sm" | "default" | "lg"
  className?: string
}) {
  const tc = await getTranslations({ locale, namespace: "Common" })
  const t = await getTranslations({ locale, namespace: "CohortStatus" })

  if (isAcceptingApplications(cohort)) {
    return (
      <ButtonLink href="/apply" size={size} className={className ?? "pr-1.5"}>
        <span>{tc("applyCta", { cohort: cohortName(cohort) })}</span>
        <ChevronRight className="opacity-50" />
      </ButtonLink>
    )
  }

  return (
    <ButtonLink href="/contact" size={size} className={className ?? "pr-1.5"}>
      <span>{t("notifyCta")}</span>
      <ChevronRight className="opacity-50" />
    </ButtonLink>
  )
}
