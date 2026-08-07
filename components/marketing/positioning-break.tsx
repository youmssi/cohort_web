import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"

export function PositioningBreak() {
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <RevealOnScroll as="p" className="text-balance font-heading text-3xl font-semibold sm:text-4xl">
          Vous n&apos;avez pas besoin de devenir technicien.
        </RevealOnScroll>
        <RevealOnScroll delay={150} className="mt-4 text-pretty text-muted-foreground">
          Vous avez besoin de comprendre suffisamment la technologie pour poser la bonne
          question, évaluer une option, reconnaître un risque et défendre une décision.
        </RevealOnScroll>
        <RevealOnScroll delay={300} className="mt-8 font-heading text-xl font-medium">
          La littératie numérique devient une littératie de leadership.
        </RevealOnScroll>
      </div>
    </section>
  )
}
