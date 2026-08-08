/**
 * `useActionState` seed for the "email me my result" form. Kept out of the
 * "use server" module, which may only export async functions.
 */
export interface EmailResultState {
  status: "idle" | "success" | "error"
  message?: string
}

export const emailResultInitialState: EmailResultState = { status: "idle" }
