"use client"

import { useMemo, useState } from "react"
import { useLocale, useTranslations } from "next-intl"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
import { Progress } from "@/components/ui/progress"
import type { QuestionnaireItemDefinition } from "@shadcn/react/questionnaire"

import { pick, questions } from "./questions"
import type { Answer, DiagnosticResult } from "./schema"
import { scoreDiagnostic } from "./scoring"
import { ResultProfile } from "./result-profile"

const items: QuestionnaireItemDefinition[] = questions.map((question) => ({
  name: question.id,
  required: true,
  choices: question.options.map((option) => ({ value: option.id })),
}))

export function DiagnosticFlow() {
  const t = useTranslations("Diagnostic")
  const tc = useTranslations("Common")
  const locale = useLocale()

  const [currentId, setCurrentId] = useState(questions[0]?.id)
  const [result, setResult] = useState<DiagnosticResult | null>(null)
  const [answers, setAnswers] = useState<Answer[]>([])

  const currentIndex = useMemo(
    () => Math.max(0, questions.findIndex((q) => q.id === currentId)),
    [currentId]
  )

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const collected: Answer[] = questions
      .map((question) => ({
        questionId: question.id,
        optionId: String(formData.get(question.id) ?? ""),
      }))
      .filter((answer) => answer.optionId.length > 0)

    setAnswers(collected)
    setResult(scoreDiagnostic(collected))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (result) {
    return (
      <ResultProfile result={result} answers={answers} onRestart={() => setResult(null)} />
    )
  }

  const progress = ((currentIndex + 1) / questions.length) * 100

  return (
    <Questionnaire
      items={items}
      item={currentId}
      onItemChange={setCurrentId}
      onSubmit={handleSubmit}
      className="w-full"
    >
      <div className="mb-8 space-y-2.5">
        <p className="text-xs font-medium text-muted-foreground tabular-nums">
          {t("progress", { current: currentIndex + 1, total: questions.length })}
        </p>
        <Progress value={progress} />
      </div>

      {questions.map((question) => (
        <QuestionnaireItem key={question.id} name={question.id} required>
          <QuestionnaireTitle className="text-xl leading-snug">
            {pick(question.prompt, locale)}
          </QuestionnaireTitle>
          <QuestionnaireChoices className="mt-4 gap-2">
            {question.options.map((option) => (
              <QuestionnaireChoice
                key={option.id}
                value={option.id}
                className="px-4 py-3 text-sm/relaxed"
              >
                {pick(option.label, locale)}
              </QuestionnaireChoice>
            ))}
          </QuestionnaireChoices>
        </QuestionnaireItem>
      ))}

      <QuestionnaireActions className="mt-10">
        <QuestionnairePrevious>{tc("previous")}</QuestionnairePrevious>
        <QuestionnaireNext>{tc("continue")}</QuestionnaireNext>
        <QuestionnaireSubmit>{t("submit")}</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  )
}
