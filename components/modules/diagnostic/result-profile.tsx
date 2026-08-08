"use client"

import { useActionState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { CountUp } from "@/components/animations/count-up"

import { emailDiagnosticResult } from "./diagnostic.service"
import { emailResultInitialState } from "./state"
import { competencyLabel } from "./questions"
import type { Answer, DiagnosticResult } from "./schema"
import { ButtonLink } from "@/components/button-link"
import { cohortName, currentCohort } from "@/lib/cohorts"

export function ResultProfile({
  result,
  answers,
  onRestart,
}: {
  result: DiagnosticResult
  answers: Answer[]
  onRestart: () => void
}) {
  const t = useTranslations("Diagnostic")
  const tc = useTranslations("Common")
  const locale = useLocale()
  const [state, formAction, pending] = useActionState(emailDiagnosticResult, emailResultInitialState)

  return (
    <div className="space-y-12">
      <div className="rounded-2xl border bg-card p-8 text-center">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {t("overall")}
        </p>
        <p className="mt-3 font-heading text-6xl font-semibold tabular-nums">
          <CountUp to={result.overall} locale={locale} />
          <span className="text-2xl text-muted-foreground"> / 100</span>
        </p>
      </div>

      <ul className="space-y-5">
        {result.scores.map((score) => (
          <li key={score.competency}>
            <div className="mb-2 flex items-baseline justify-between gap-4 text-sm">
              <span className="font-medium">{competencyLabel(score.competency, locale)}</span>
              <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                {score.score} · {t(`levels.${score.level}`)}
              </span>
            </div>
            <Progress value={score.score} />
          </li>
        ))}
      </ul>

      <div className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
        <div className="bg-background p-5">
          <p className="text-xs text-muted-foreground">{t("strongest")}</p>
          <p className="mt-1 font-heading font-medium">
            {competencyLabel(result.strongest.competency, locale)}
          </p>
        </div>
        <div className="bg-background p-5">
          <p className="text-xs text-muted-foreground">{t("priority")}</p>
          <p className="mt-1 font-heading font-medium">
            {competencyLabel(result.priority.competency, locale)}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border bg-muted/30 p-6">
        {state.status === "success" ? (
          <p className="text-sm text-muted-foreground">{t("emailSent")}</p>
        ) : (
          <form action={formAction} className="flex flex-col gap-2 sm:flex-row">
            <input type="hidden" name="answers" value={JSON.stringify(answers)} />
            <Input
              type="email"
              name="email"
              required
              placeholder={t("emailPlaceholder")}
              aria-label={t("emailPlaceholder")}
              className="flex-1"
            />
            <Button type="submit" variant="secondary" disabled={pending}>
              {t("emailCta")}
            </Button>
          </form>
        )}
        {state.status === "error" && (
          <p className="mt-3 text-sm text-destructive">{t("emailError")}</p>
        )}
      </div>

      <div className="space-y-5 border-t pt-8 text-center">
        <p className="text-pretty text-sm text-muted-foreground">{t("applyPrompt", { cohort: cohortName(currentCohort()) })}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/apply" size="lg" className="pr-1.5">
            <span>{tc("applyCta", { cohort: cohortName(currentCohort()) })}</span>
            <ChevronRight className="opacity-50" />
          </ButtonLink>
          <Button type="button" variant="outline" size="lg" onClick={onRestart}>
            {t("restart")}
          </Button>
        </div>
      </div>
    </div>
  )
}
