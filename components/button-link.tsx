import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"

type LinkHref = React.ComponentProps<typeof Link>["href"]

type ButtonLinkProps = Omit<
  React.ComponentProps<typeof Button>,
  "render" | "nativeButton"
> & {
  href: LinkHref
  /** Renders a plain anchor with `target="_blank"` instead of the i18n Link. */
  external?: boolean
}

/**
 * A button that navigates.
 *
 * Base UI's `Button` assumes it renders a native `<button>` and warns when the
 * `render` prop produces anything else, so `nativeButton={false}` has to travel
 * with every link-shaped button. Encapsulating it here keeps that easy to get
 * right and stops the warning from reappearing at new call sites.
 */
export function ButtonLink({ href, external, children, ...props }: ButtonLinkProps) {
  const anchor = external ? (
    <a href={String(href)} target="_blank" rel="noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href}>{children}</Link>
  )

  return <Button {...props} nativeButton={false} render={anchor} />
}
