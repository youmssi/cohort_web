"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import OptionWheel from "@/components/animations/option-wheel"
import { LanyardBadge } from "@/components/animations/lanyard-badge"

/**
 * One session's facts, formatted on the server. The client half only picks
 * which one is showing, so no date or currency formatting crosses the boundary.
 */
export interface CohortCardData {
  id: string
  name: string
  label: string
  status: string
  statusLabel: string
  dates: string
  applications: string
  seats: string
  tuition: string
  founding: boolean
  image: string
}

export function CohortGallery({
  sessions,
  labels,
}: {
  sessions: CohortCardData[]
  labels: {
    dates: string
    applications: string
    seats: string
    tuition: string
    founding: string
    view: string
    hint: string
  }
}) {
  const [index, setIndex] = useState(0)
  const selected = sessions[Math.min(index, sessions.length - 1)]

  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="order-2 lg:order-1">
          {/* The wheel doubles as the section's heading: the session names are
              the largest type on the page, which is what people came to read. */}
          <div className="h-[300px] sm:h-[360px]">
            <OptionWheel
              items={sessions.map((session) => session.label)}
              defaultSelected={0}
              onChange={setIndex}
              side="left"
              inset={8}
              fontSize={4}
              spacing={1.25}
              tilt={8}
              blur={1.5}
              loop={false}
              textColor="var(--color-muted-foreground)"
              activeColor="var(--color-foreground)"
            />
          </div>
          <p className="mt-2 pl-2 text-xs text-muted-foreground">{labels.hint}</p>
        </div>

        <div className="order-1 lg:order-2">
          <LanyardBadge image={selected.image} alt={selected.name} />
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-3xl rounded-2xl border bg-card p-8">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            {selected.name}
          </h2>
          <Badge variant={selected.status === "open" ? "default" : "secondary"}>
            {selected.statusLabel}
          </Badge>
          {selected.founding && <Badge variant="outline">{labels.founding}</Badge>}
        </div>

        <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {[
            [labels.dates, selected.dates],
            [labels.applications, selected.applications],
            [labels.seats, selected.seats],
            [labels.tuition, selected.tuition],
          ].map(([term, value]) => (
            <div key={term} className="flex flex-col gap-0.5 border-t pt-3">
              <dt className="text-xs tracking-wide text-muted-foreground uppercase">{term}</dt>
              <dd className="text-sm tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>

        <Button
          nativeButton={false}
          className="mt-8 pr-1.5"
          render={
            <Link href={`/cohorts/${selected.id}`}>
              <span>{labels.view}</span>
              <ChevronRight className="opacity-50" />
            </Link>
          }
        />
      </div>
    </section>
  )
}
