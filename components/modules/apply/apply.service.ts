"use server"

import { toFieldErrors } from "@/components/shared/form-errors"
import { contact } from "@/lib/constants"
import { cohortName, currentCohort } from "@/lib/cohorts"
import { sendNotificationEmail } from "@/lib/email"

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

  const funding = { self: "Personnel", employer: "Employeur", unsure: "À déterminer" }[
    data.sponsor
  ]

  await sendNotificationEmail({
    to: contact.applicationNotificationEmail,
    subject: `${cohortName(currentCohort())} · Nouvelle candidature : ${data.fullName}`,
    html: `
      <p><strong>${data.fullName}</strong> · ${data.role}, ${data.organization} (${data.industry})</p>
      <p>Email : ${data.email} · Téléphone : ${data.phone}</p>
      <p>Engagement : ${data.commitment === "yes" ? "Confirmé" : "Incertain"} · Financement : ${funding}</p>
      <p><strong>Défi :</strong> ${data.challenge}</p>
      <p><strong>Motivation :</strong> ${data.motivation}</p>
    `,
  })

  return { status: "success" }
}
