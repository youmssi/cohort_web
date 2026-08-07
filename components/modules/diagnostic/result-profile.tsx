"use client"

import { useActionState } from "react"
import { useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

import { emailDiagnosticResult, type EmailResultState } from "./diagnostic.service"
import { competencyLabels } from "./questions"
import type { Answer, DiagnosticResult } from "./schema"

const initialState: EmailResultState = { status: "idle" }

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
  const [state, formAction, pending] = useActionState(emailDiagnosticResult, initialState)

  return (
    <div className="mx-auto w-full max-w-xl space-y-10">
      <div>
        <p className="text-xs font-medium text-muted-foreground">{t("resultTitle")}</p>
        <p className="mt-2 font-heading text-4xl font-semibold tabular-nums">
          {result.overall}
          <span className="text-lg text-muted-foreground"> / 100</span>
        </p>
      </div>

      <ul className="space-y-4">
        {result.scores.map((score) => (
          <li key={score.competency}>
            <div className="mb-1.5 flex items-baseline justify-between text-sm">
              <span>{competencyLabels[score.competency]}</span>
              <span className="tabular-nums text-muted-foreground">
                {score.score} · {t(`levels.${score.level}`)}
              </span>
            </div>
            <Progress value={score.score} />
          </li>
        ))}
      </ul>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border p-4">
          <p className="text-xs text-muted-foreground">{t("strongest")}</p>
          <p className="mt-1 font-medium">{competencyLabels[result.strongest.competency]}</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-xs text-muted-foreground">{t("priority")}</p>
          <p className="mt-1 font-medium">{competencyLabels[result.priority.competency]}</p>
        </div>
      </div>

      <p className="text-pretty text-sm text-muted-foreground">{t("applyPrompt")}</p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" render={<Link href="/apply">{t("applyCta")}</Link>} />
        <Button type="button" variant="outline" size="lg" onClick={onRestart}>
          {t("restart")}
        </Button>
      </div>

      {state.status !== "success" && (
        <form action={formAction} className="flex gap-2 border-t pt-6">
          <input type="hidden" name="answers" value={JSON.stringify(answers)} />
          <Input
            type="email"
            name="email"
            required
            placeholder="vous@organisation.com"
            className="max-w-xs"
          />
          <Button type="submit" variant="secondary" disabled={pending}>
            {pending ? "…" : "Recevoir par e-mail"}
          </Button>
        </form>
      )}
      {state.status === "success" && (
        <p className="border-t pt-6 text-sm text-muted-foreground">Envoyé.</p>
      )}
    </div>
  )
}
