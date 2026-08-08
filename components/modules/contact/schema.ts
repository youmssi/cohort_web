import { z } from "zod"

/** CONTRACT. General enquiry sent from the contact page. */
export const enquirySchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  subject: z.string().min(2),
  message: z.string().min(20),
})

export type Enquiry = z.infer<typeof enquirySchema>

export type EnquiryFieldErrors = Partial<Record<keyof Enquiry, string>>
