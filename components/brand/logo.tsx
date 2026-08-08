import { cn } from "@/lib/utils"

/**
 * The Coh0rt mark. The zero in the name is the brand's visual hook: a closed
 * ring of participants with one seat still open, which is the whole proposition
 * of a selective cohort.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("size-5", className)}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="42 14"
        transform="rotate(-45 12 12)"
      />
      <circle cx="12" cy="3" r="2.25" fill="currentColor" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="font-heading text-base font-semibold tracking-tight">
        Coh<span className="text-muted-foreground">0</span>rt
      </span>
    </span>
  )
}
