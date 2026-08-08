import { getTranslations } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  cohortName,
  cohortStatus,
  isAcceptingApplications,
  type Cohort,
} from "@/lib/cohorts"

/**
 * Cohort name plus its current status, e.g. "Coh0rt 26A · Candidatures
 * ouvertes". Both halves come from the registry, so closing a session updates
 * every badge on the site at once.
 */
export async function CohortBadge({
  cohort,
  locale,
  className,
}: {
  cohort: Cohort
  locale: Locale
  className?: string
}) {
  const t = await getTranslations({ locale, namespace: "CohortStatus" })
  const live = isAcceptingApplications(cohort)

  return (
    <Badge
      variant="secondary"
      className={cn("gap-1.5 rounded-full px-3 py-1 font-normal", className)}
    >
      {live && (
        <span className="relative flex size-1.5" aria-hidden>
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-foreground/60 motion-reduce:hidden" />
          <span className="relative inline-flex size-1.5 rounded-full bg-foreground" />
        </span>
      )}
      {cohortName(cohort)} · {t(cohortStatus(cohort))}
    </Badge>
  )
}
