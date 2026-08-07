import { COMPETENCY_CODES, questions, type CompetencyCode } from "./questions"
import type { Answer, CapabilityLevel, CompetencyScore, DiagnosticResult } from "./schema"

const MAX_OPTION_SCORE = 3

function levelForScore(score: number): CapabilityLevel {
  if (score < 40) return "emerging"
  if (score < 55) return "foundation"
  if (score < 70) return "developing"
  if (score < 85) return "strong"
  return "advanced"
}

/** Pure function: answers → per-competency scores (0–100) + overall profile. */
export function scoreDiagnostic(answers: Answer[]): DiagnosticResult {
  const answerByQuestion = new Map(answers.map((a) => [a.questionId, a.optionId]))

  const scores: CompetencyScore[] = COMPETENCY_CODES.map((competency) => {
    const competencyQuestions = questions.filter((q) => q.competency === competency)
    let earned = 0
    let possible = 0

    for (const question of competencyQuestions) {
      possible += MAX_OPTION_SCORE
      const chosenOptionId = answerByQuestion.get(question.id)
      const option = question.options.find((o) => o.id === chosenOptionId)
      earned += option?.score ?? 0
    }

    const score = possible > 0 ? Math.round((earned / possible) * 100) : 0
    return { competency, score, level: levelForScore(score) }
  })

  const overall = Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length)
  const strongest = [...scores].sort((a, b) => b.score - a.score)[0]
  const priority = [...scores].sort((a, b) => a.score - b.score)[0]

  return { overall, scores, strongest, priority }
}

export type { CompetencyCode }
