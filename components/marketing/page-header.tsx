import { BlurText } from "@/components/animations/blur-text"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"

/** Shared page opener so every inner page has the same vertical rhythm. */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-20 pb-6 text-center sm:px-6">
      {eyebrow && (
        <RevealOnScroll
          as="p"
          className="text-xs font-medium tracking-wide text-muted-foreground uppercase"
        >
          {eyebrow}
        </RevealOnScroll>
      )}
      <BlurText
        as="h1"
        text={title}
        animateBy="words"
        delay={60}
        className="mt-3 justify-center text-balance font-heading text-4xl font-semibold tracking-tight sm:text-5xl"
      />
      {description && (
        <RevealOnScroll
          delay={220}
          className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          {description}
        </RevealOnScroll>
      )}
    </section>
  )
}
