import { getTranslations } from "next-intl/server"
import { ButtonLink } from "@/components/shared"
import { cohortName, currentCohort } from "@/lib/cohorts"


export default async function NotFound() {
  const t = await getTranslations("Common")

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-32 text-center sm:px-6">
      <p className="font-mono text-xs text-muted-foreground">404</p>
      <h1 className="mt-3 text-balance font-heading text-3xl font-semibold tracking-tight">
        Coh0rt
      </h1>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">{t("exploreCta")}</ButtonLink>
        <ButtonLink href="/apply" variant="outline">
          {t("applyCta", { cohort: cohortName(currentCohort()) })}
        </ButtonLink>
      </div>
    </div>
  )
}
