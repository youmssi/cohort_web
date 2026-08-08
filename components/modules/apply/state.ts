import type { ApplicationFieldErrors } from "./schema"

/**
 * `useActionState` seed for the application form.
 *
 * Lives outside `apply.service.ts` because a "use server" module may only
 * export async functions; exporting a plain object from it is a build error.
 */
export interface ApplyState {
  status: "idle" | "success" | "error"
  fieldErrors?: ApplicationFieldErrors
}

export const applyInitialState: ApplyState = { status: "idle" }
