"use server"

import { contact } from "@/lib/constants"
import { sendNotificationEmail } from "@/lib/email"

import { enquirySchema, type EnquiryFieldErrors } from "./schema"

export interface EnquiryState {
  status: "idle" | "success" | "error"
  fieldErrors?: EnquiryFieldErrors
}

const initialState: EnquiryState = { status: "idle" }
export { initialState as enquiryInitialState }

/**
 * SERVICE. Validates with the shared Zod contract and forwards the enquiry to
 * the programme inbox. The only layer in this module allowed to touch email.
 */
export async function submitEnquiry(
  _prevState: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  const parsed = enquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  })

  if (!parsed.success) {
    const fieldErrors: EnquiryFieldErrors = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof EnquiryFieldErrors
      if (key) fieldErrors[key] = issue.message
    }
    return { status: "error", fieldErrors }
  }

  const data = parsed.data

  await sendNotificationEmail({
    to: contact.applicationNotificationEmail,
    subject: `Coh0rt · ${data.subject}`,
    html: `
      <p><strong>${data.name}</strong> · ${data.email}</p>
      <p>${data.message.replace(/\n/g, "<br />")}</p>
    `,
  })

  return { status: "success" }
}
