"use server"

import { z } from "zod"

import { contact } from "@/lib/constants"
import { sendNotificationEmail } from "@/lib/email"

import { competencyLabel } from "./questions"
import { scoreDiagnostic } from "./scoring"

import type { EmailResultState } from "./state"

const payloadSchema = z.object({
  email: z.email(),
  answers: z.string(), // JSON-encoded Answer[]
})

/**
 * SERVICE. Server Action bound to the "email me my result" form on the
 * Diagnostic result screen. Recomputes the score server-side (never trusts a
 * client-submitted score) and notifies the program team.
 */
export async function emailDiagnosticResult(
  _prevState: EmailResultState,
  formData: FormData
): Promise<EmailResultState> {
  const parsed = payloadSchema.safeParse({
    email: formData.get("email"),
    answers: formData.get("answers"),
  })

  if (!parsed.success) {
    return { status: "error", message: "invalid" }
  }

  let answers: { questionId: string; optionId: string }[]
  try {
    answers = JSON.parse(parsed.data.answers)
  } catch {
    return { status: "error", message: "invalid" }
  }

  const result = scoreDiagnostic(answers)
  const rows = result.scores
    .map((s) => `<tr><td>${competencyLabel(s.competency, "fr")}</td><td>${s.score}</td></tr>`)
    .join("")

  if (contact.applicationNotificationEmail) {
    await sendNotificationEmail({
      to: contact.applicationNotificationEmail,
      subject: `Diagnostic Digital Leadership · ${parsed.data.email}`,
      html: `<p>Score global : ${result.overall}/100</p><table>${rows}</table>`,
    })
  }

  return { status: "success" }
}
