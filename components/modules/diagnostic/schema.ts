import { z } from "zod"

import { COMPETENCY_CODES } from "./questions"

/** CONTRACT — one answered question. */
export const answerSchema = z.object({
  questionId: z.string(),
  optionId: z.string(),
})
export type Answer = z.infer<typeof answerSchema>

/** CONTRACT — payload sent to the Server Action once the quiz is complete. */
export const diagnosticLeadSchema = z.object({
  email: z.email(),
  fullName: z.string().min(2).optional(),
  answers: z.array(answerSchema).min(1),
})
export type DiagnosticLead = z.infer<typeof diagnosticLeadSchema>

export const capabilityLevels = [
  "emerging",
  "foundation",
  "developing",
  "strong",
  "advanced",
] as const
export type CapabilityLevel = (typeof capabilityLevels)[number]

export interface CompetencyScore {
  competency: (typeof COMPETENCY_CODES)[number]
  score: number // 0–100
  level: CapabilityLevel
}

export interface DiagnosticResult {
  overall: number
  scores: CompetencyScore[]
  strongest: CompetencyScore
  priority: CompetencyScore
}
