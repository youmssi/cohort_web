import { Resend } from "resend"

/**
 * Resend client wrapper. The only file allowed to touch the email provider directly.
 * Only imported from *.service.ts files (SERVICE layer), never from components.
 */
let client: Resend | null = null

function getClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  if (!client) client = new Resend(apiKey)
  return client
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
}) {
  const { contact } = await import("@/lib/constants")
  const resend = getClient()

  if (!resend) {
    // No API key configured (e.g. local dev), log instead of failing the request.
    console.warn("[email] RESEND_API_KEY missing, skipping send:", options.subject)
    return { skipped: true as const }
  }

  return resend.emails.send({
    from: contact.fromEmail,
    to: options.to,
    subject: options.subject,
    html: options.html,
    ...(options.replyTo ? { replyTo: options.replyTo } : {}),
  })
}
