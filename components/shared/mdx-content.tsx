import { run } from "@mdx-js/mdx"
import * as runtime from "react/jsx-runtime"

import { cn } from "@/lib/utils"

/**
 * Renders a Velite-compiled MDX body (see velite.config.ts `s.mdx()` fields).
 * `run()` only does in-memory computation, so this stays part of the static shell.
 */
export async function MdxContent({
  code,
  className,
}: {
  code: string
  className?: string
}) {
  const { default: Content } = await run(code, {
    ...runtime,
    baseUrl: import.meta.url,
  })

  return (
    <div
      className={cn(
        "prose prose-neutral dark:prose-invert max-w-none text-pretty",
        "prose-p:leading-relaxed prose-headings:font-heading",
        className
      )}
    >
      <Content />
    </div>
  )
}
