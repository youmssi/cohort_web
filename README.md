# Coh0rt

Marketing site for **Coh0rt**, a selective 16-week digital leadership immersion
for founders, directors and managers, running from Conakry.

Production: **https://cohort.mrvin100.de**

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript, strict |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui on Base UI (`components/ui`, vendored) |
| Content | MDX compiled by Velite into typed collections |
| i18n | next-intl, French default (unprefixed), English at `/en` |
| Email | Resend, via Server Actions |
| Hosting | Vercel |

## Running it

```bash
pnpm install
cp .env.example .env.local   # fill in as needed; forms degrade gracefully without keys
pnpm dev
```

`pnpm dev` runs Velite in watch mode alongside Next, so content edits reload.

| Script | Purpose |
|---|---|
| `pnpm dev` | Velite watch + Next dev |
| `pnpm build` | Compile content, then build |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint |

## Architecture

Modules follow a one-directional layering:

```
routing (app/) → component (*.tsx) → service (*.service.ts) → contract (schema.ts)
```

- `components/ui/` is vendored from the shadcn registry. Do not hand-edit it;
  `shadcn` overwrites it. Anything custom belongs elsewhere.
- `components/modules/<domain>/` holds the three interactive features
  (`apply`, `contact`, `diagnostic`), each with `schema.ts`, a service, a
  component, a `state.ts` and a barrel.
- `components/marketing/` holds presentational sections that take typed props.
- `components/animations/` holds components adapted from React Bits.
- `components/brand/` holds the logo mark.

A `"use server"` module may only export async functions, which is why each
interactive module keeps its `useActionState` seed in `state.ts` rather than
alongside the action.

## Where things are configured

| What | Where |
|---|---|
| Cohort sessions: dates, status, seats, tuition | `lib/cohorts.ts` |
| Brand, contact details, community channels | `lib/constants.ts` |
| Programme shape (16 weeks, 10 capabilities) | `lib/constants.ts` |
| Metadata, JSON-LD, hreflang | `lib/seo.ts` |
| UI copy | `messages/{fr,en}.json` |
| Long-form content | `content/{fr,en}/**` |

`lib/cohorts.ts` is the single source of truth for a session: 12 call sites read
from it, so opening or closing a cohort is a one-file change.

Cohort status is derived from the dates, so the site moves from "opening soon"
to "applications open" to "closed" on its own, without a deploy.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Vercel setup, the
`cohort.mrvin100.de` DNS record, and Google Search Console.
