"use server"

import { toFieldErrors } from "@/components/shared/form-errors"
import { contact } from "@/lib/constants"
import { cohortName, currentCohort } from "@/lib/cohorts"
import { escapeHtml, sendNotificationEmail } from "@/lib/email"

import { applicationSchema, type ApplicationFieldErrors } from "./schema"

import type { ApplyState } from "./state"

/**
 * SERVICE. The only layer that touches the email provider for this module.
 * Validates with the same Zod contract shared with the client, so there's no
 * duplicated validation logic between UI and server.
 */
export async function submitApplication(
  _prevState: ApplyState,
  formData: FormData
): Promise<ApplyState> {
  const parsed = applicationSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    role: formData.get("role"),
    organization: formData.get("organization"),
    industry: formData.get("industry"),
    challenge: formData.get("challenge"),
    motivation: formData.get("motivation"),
    commitment: formData.get("commitment"),
    sponsor: formData.get("sponsor"),
  })

  if (!parsed.success) {
    return {
      status: "error",
      fieldErrors: toFieldErrors<keyof ApplicationFieldErrors>(parsed.error),
    }
  }

  const data = parsed.data
  const e = escapeHtml

  const funding = { self: "Personnel", employer: "Employeur", unsure: "À déterminer" }[
    data.sponsor
  ]

  const delivery = await sendNotificationEmail({
    to: contact.applicationNotificationEmail,
    subject: `${cohortName(currentCohort())} · Nouvelle candidature : ${data.fullName}`,
    replyTo: data.email,
    html: `
      <p><strong>${e(data.fullName)}</strong> · ${e(data.role)}, ${e(data.organization)} (${e(data.industry)})</p>
      <p>Email : ${e(data.email)} · Téléphone : ${e(data.phone)}</p>
      <p>Engagement : ${data.commitment === "yes" ? "Confirmé" : "Incertain"} · Financement : ${funding}</p>
      <p><strong>Défi :</strong> ${e(data.challenge)}</p>
      <p><strong>Motivation :</strong> ${e(data.motivation)}</p>
    `,
  })

  // This notification is the only place the application is stored. Reporting
  // success on a failed send would drop it silently, and the candidate would
  // spend weeks waiting on an answer that can never come, so the failure is
  // surfaced and the form offers a human channel instead.
  if (!delivery.ok) return { status: "error" }

  return { status: "success" }
}
