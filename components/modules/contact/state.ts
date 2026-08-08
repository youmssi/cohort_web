import type { EnquiryFieldErrors } from "./schema"

/**
 * `useActionState` seed for the enquiry form. Kept out of the "use server"
 * module, which may only export async functions.
 */
export interface EnquiryState {
  status: "idle" | "success" | "error"
  fieldErrors?: EnquiryFieldErrors
}

export const enquiryInitialState: EnquiryState = { status: "idle" }
