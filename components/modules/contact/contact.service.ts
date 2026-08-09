"use server"

import { toFieldErrors } from "@/components/shared/form-errors"
import { contact } from "@/lib/constants"
import { sendNotificationEmail } from "@/lib/email"

import { enquirySchema, type EnquiryFieldErrors } from "./schema"

import type { EnquiryState } from "./state"

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
    return {
      status: "error",
      fieldErrors: toFieldErrors<keyof EnquiryFieldErrors>(parsed.error),
    }
  }

  const data = parsed.data

  await sendNotificationEmail({
    to: contact.applicationNotificationEmail,
    subject: `Coh0rt · ${data.subject}`,
    replyTo: data.email,
    html: `
      <p><strong>${data.name}</strong> · ${data.email}</p>
      <p>${data.message.replace(/\n/g, "<br />")}</p>
    `,
  })

  return { status: "success" }
}
