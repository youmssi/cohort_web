"use server"

import { contact, cohort } from "@/lib/constants"
import { sendNotificationEmail } from "@/lib/email"

import { applicationSchema, type ApplicationFieldErrors } from "./schema"

export interface ApplyState {
  status: "idle" | "success" | "error"
  fieldErrors?: ApplicationFieldErrors
}

const initialState: ApplyState = { status: "idle" }
export { initialState as applyInitialState }

/**
 * SERVICE — the only layer that touches the email provider for this module.
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
  })

  if (!parsed.success) {
    const fieldErrors: ApplicationFieldErrors = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ApplicationFieldErrors
      if (key) fieldErrors[key] = issue.message
    }
    return { status: "error", fieldErrors }
  }

  const data = parsed.data

  if (contact.applicationNotificationEmail) {
    await sendNotificationEmail({
      to: contact.applicationNotificationEmail,
      subject: `${cohort.code} — Nouvelle candidature : ${data.fullName}`,
      html: `
        <p><strong>${data.fullName}</strong> — ${data.role}, ${data.organization} (${data.industry})</p>
        <p>Email : ${data.email} · Téléphone : ${data.phone}</p>
        <p>Engagement : ${data.commitment === "yes" ? "Confirmé" : "Incertain"}</p>
        <p><strong>Défi :</strong> ${data.challenge}</p>
        <p><strong>Motivation :</strong> ${data.motivation}</p>
      `,
    })
  }

  return { status: "success" }
}
