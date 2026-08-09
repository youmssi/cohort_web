# Deploying Coh0rt

Target: **https://cohort.mrvin100.de**, hosted on Vercel.

---

## 1. Vercel project

### Import

1. Vercel dashboard, **Add New → Project**, import `youmssi/cohort_web`.
2. **Root Directory**: leave as `./` (the app is at the repository root).
3. Framework preset: **Next.js** (detected automatically).
4. Build command, output directory and install command: leave as detected. The
   `prebuild` script runs `velite build` to compile the MDX content, so the
   default `pnpm build` is correct.

### Environment variables

Set these under **Settings → Environment Variables**, for *Production*,
*Preview* and *Development*:

| Variable | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://cohort.mrvin100.de` | Drives canonical URLs, hreflang, sitemap and OG image URLs. Wrong value here silently breaks SEO. |
| `RESEND_API_KEY` | from resend.com | Without it the forms still succeed but only log; no email is sent. |
| `RESEND_FROM_EMAIL` | `Coh0rt <admissions@contact.mrvin100.de>` | Must be on a domain verified in Resend. The display name is part of the value, not a separate variable. |
| `APPLICATION_NOTIFICATION_EMAIL` | a mailbox you read | A To address, so it need not be on the verified domain. Verifying a domain grants sending, not an inbox. Defaults to the public contact address if unset. |

For Preview deployments set `NEXT_PUBLIC_SITE_URL` to the Vercel preview URL, or
leave it unset, so preview builds never advertise the production domain as
canonical.

---

## 2. Subdomain `cohort.mrvin100.de`

`mrvin100.de` is the apex domain and presumably already points elsewhere. Only
the `cohort` subdomain is being delegated, so the apex is untouched.

### In Vercel

1. Project → **Settings → Domains → Add**.
2. Enter `cohort.mrvin100.de`.
3. Vercel shows the DNS record to create. For a subdomain this is a **CNAME**.

### At your DNS provider (wherever `mrvin100.de` is managed)

Add:

| Type | Name | Value | TTL |
|---|---|---|---|
| `CNAME` | `cohort` | `cname.vercel-dns.com` | 300 (raise later) |

Notes:

- The **Name** is `cohort`, not the full `cohort.mrvin100.de`. Most providers
  append the zone automatically; entering the full name yields
  `cohort.mrvin100.de.mrvin100.de`.
- If your provider requires a trailing dot, use `cname.vercel-dns.com.`
- If the zone is on Cloudflare, set the record to **DNS only** (grey cloud) until
  Vercel issues the certificate. Proxying first blocks domain verification.

### Verify

```bash
nslookup cohort.mrvin100.de
curl -sI https://cohort.mrvin100.de | head -3
```

Propagation is usually minutes, occasionally up to a few hours. Vercel issues
the TLS certificate automatically once the CNAME resolves; the domain shows
**Valid Configuration** in the dashboard when it is done.

---

## 3. Google Search Console

### Choose the property type

Use a **URL prefix** property for `https://cohort.mrvin100.de`, not a Domain
property. A Domain property would cover all of `mrvin100.de`, which mixes this
site's data with whatever else runs on the apex.

### Verify ownership

The simplest route that does not require DNS changes:

1. Search Console → **Add property → URL prefix** →
   `https://cohort.mrvin100.de`.
2. Choose the **HTML tag** method and copy the `content` value of the
   `google-site-verification` meta tag. Copy the value only, not the tag.
3. Set `GOOGLE_SITE_VERIFICATION` in Vercel and redeploy.
4. Back in Search Console, press **Verify**.

`buildMetadata` already reads the variable, so no code change is needed. The
tag is omitted from the markup entirely when the variable is unset, rather than
rendering empty.

The env-var indirection keeps the token out of the repository and lets you
rotate it without a code change.

### Submit the sitemap

Once verified: **Sitemaps → Add a new sitemap →** `sitemap.xml`.

The sitemap is generated at `/sitemap.xml` and already contains, for both
locales: every marketing page, all 16 curriculum weeks, all 10 competency
pages, and the cohort page, each with `xhtml:link` alternates so Google
associates the French and English versions rather than treating them as
duplicates.

### Expect this

- Indexing takes days to weeks for a new domain. This is normal, not a
  misconfiguration.
- **Page indexing** will report pages as "Discovered, currently not indexed"
  early on. Leave it.
- Check **Enhancements** after a week or two: the FAQ, Course and Breadcrumb
  structured data should appear. Validate them first with the
  [Rich Results Test](https://search.google.com/test/rich-results) against a
  live URL.

### Also worth doing

- `robots.txt` is served at `/robots.txt` and already points at the sitemap.
- Add the same property to **Bing Webmaster Tools**; it can import directly from
  Search Console.

---

## 4. After the domain is live

Confirm each of these against production, because they are the things that
silently break on a domain change:

```bash
curl -s https://cohort.mrvin100.de/robots.txt
curl -s https://cohort.mrvin100.de/sitemap.xml | head -20
curl -s https://cohort.mrvin100.de/ | grep -o '<link rel="canonical"[^>]*>'
curl -sI https://cohort.mrvin100.de/fr/opengraph-image | head -3
```

Expected: canonical and OG URLs on `cohort.mrvin100.de` (not `localhost`), the
sitemap listing both locales, and the OG image returning `image/png`.

Then run the URL through the
[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and
[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) once, to
prime their caches before you start sharing links.

---

## 5. Keeping the site current

Most operational changes are one file: `lib/cohorts.ts`.

### Cohort status is automatic

Status is derived from the dates, so the site changes itself without a deploy:

| Date | Status | What the site shows |
|---|---|---|
| before 15 Aug 2026 | `upcoming` | "Opening soon", CTA routes to contact |
| 15 Aug to 7 Nov 2026 | `open` | "Applications open", CTA routes to the form |
| 8 to 13 Nov 2026 | `closed` | "Applications closed" |
| 14 Nov 2026 to 6 Mar 2027 | `running` | "In progress" |
| after 6 Mar 2027 | `completed` | "Completed" |

Set `statusOverride` on the cohort only for what the calendar cannot express,
such as closing early because all 10 seats filled.

> Because status is computed per request, a page cached at the CDN could serve a
> stale badge across a transition boundary. Routes currently render dynamically,
> so this is not an issue today; revisit if you later make them static.

### Opening the next session

Add an entry to `cohorts` and mark the previous one done:

```ts
{ id: "26a", statusOverride: "completed", ... },
{
  id: "26b",
  year: 2026, batch: "B",
  applicationsOpen: "...", applicationsClose: "...",
  start: "...", end: "...",
  seats: { min: 8, max: 10 },
  tuition: 15_000_000,      // standard rate; the founding rate was 26A only
  standardTuition: 15_000_000,
  instalments: [{ count: 2, amount: 8_000_000 }],
  founding: false,
},
```

That single edit updates the badge, every CTA and its label, the price, the
payment split, the seat count, the key-date table, the nav link, the sitemap,
both OG images, the JSON-LD offer, and the application email subject.

### Community channels

`lib/constants.ts` → `channels`. An empty string means "not published yet":
`liveSocials()` drops the entry, so the footer and the contact page never ship a
dead icon. `discord`, `linkedin` and `facebook` are live. `whatsappCommunity` is
still empty and falls back to the one-to-one number until the group URL exists.
