import { Resend } from "resend"

/**
 * Resend client wrapper. The only file allowed to touch the email provider directly.
 * Only imported from *.service.ts files (SERVICE layer), never from components.
 */
let client: Resend | null = null

function getClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  client ??= new Resend(apiKey)
  return client
}

/**
 * Outcome of a send. Callers MUST branch on `ok` before reporting success to
 * the visitor.
 *
 * There is no database behind these forms, so the email *is* the record. A form
 * that renders "candidature reçue" on a send that never left the building loses
 * that application permanently, with nothing to replay and no way to know it
 * happened. Every caller here is therefore required to handle a failed send.
 *
 * `skipped` marks the local-dev path, where no key is configured and the
 * message is logged instead of sent. It is never true in production.
 */
export type EmailResult = { ok: true; skipped?: boolean } | { ok: false }

/**
 * Escapes form input before it is interpolated into an HTML email body. The
 * free-text answers (a challenge description, an enquiry) otherwise reach the
 * inbox verbatim, where a stray angle bracket mangles the message.
 */
export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

export async function sendNotificationEmail(options: {
  to: string
  subject: string
  html: string
  /**
   * Who a reply should reach. Without it, hitting reply on an application
   * notification answers the sending domain, which has no inbox, so the reply
   * is silently lost. Always pass the person who submitted the form.
   */
  replyTo?: string
}): Promise<EmailResult> {
  const { contact } = await import("@/lib/constants")
  const resend = getClient()

  if (!resend) {
    // In production a missing key means the submission has nowhere to go, so it
    // is a hard failure the visitor must see. Locally it stays a convenience:
    // log the message and let the form succeed, so the flows are testable
    // without credentials.
    if (process.env.NODE_ENV === "production") {
      console.error("[email] RESEND_API_KEY missing in production, not sent:", options.subject)
      return { ok: false }
    }
    console.warn("[email] RESEND_API_KEY missing, skipping send:", options.subject)
    return { ok: true, skipped: true }
  }

  try {
    // Resend reports API errors in the resolved payload rather than throwing, so
    // an unchecked call looks identical whether it delivered or was rejected.
    // Both the returned error and a thrown transport failure land as ok: false.
    const { error } = await resend.emails.send({
      from: contact.fromEmail,
      to: options.to,
      subject: options.subject,
      html: options.html,
      ...(options.replyTo ? { replyTo: options.replyTo } : {}),
    })

    if (error) {
      console.error("[email] rejected by Resend:", options.subject, error)
      return { ok: false }
    }

    return { ok: true }
  } catch (cause) {
    console.error("[email] send failed:", options.subject, cause)
    return { ok: false }
  }
}
