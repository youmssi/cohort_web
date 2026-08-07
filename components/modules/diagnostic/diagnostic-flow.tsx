"use client"

import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"

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
import type { QuestionnaireItemDefinition } from "@shadcn/react/questionnaire"

import { questions } from "./questions"
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
    const answers: Answer[] = questions
      .map((question) => ({
        questionId: question.id,
        optionId: String(formData.get(question.id) ?? ""),
      }))
      .filter((answer) => answer.optionId.length > 0)

    setAnswers(answers)
    setResult(scoreDiagnostic(answers))
  }

  if (result) {
    return (
      <ResultProfile result={result} answers={answers} onRestart={() => setResult(null)} />
    )
  }

  return (
    <Questionnaire
      items={items}
      item={currentId}
      onItemChange={setCurrentId}
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-xl"
    >
      <p className="mb-6 text-xs font-medium tabular-nums text-muted-foreground">
        {t("progress", { current: currentIndex + 1, total: questions.length })}
      </p>

      {questions.map((question) => (
        <QuestionnaireItem key={question.id} name={question.id} required>
          <QuestionnaireTitle className="text-xl">{question.prompt}</QuestionnaireTitle>
          <QuestionnaireChoices>
            {question.options.map((option) => (
              <QuestionnaireChoice key={option.id} value={option.id}>
                {option.label}
              </QuestionnaireChoice>
            ))}
          </QuestionnaireChoices>
        </QuestionnaireItem>
      ))}

      <QuestionnaireActions className="mt-8">
        <QuestionnairePrevious>{tc("previous")}</QuestionnairePrevious>
        <QuestionnaireNext>{tc("continue")}</QuestionnaireNext>
        <QuestionnaireSubmit>{t("submit")}</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  )
}
