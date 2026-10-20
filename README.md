# BNX 24 Inc. — Website

Marketing website for **BNX 24 Inc.**, a general business consulting company serving clients across the United States.

- Intended production URL: `https://www.bnx24inc.com`
- Static Next.js export, deployed to **Cloudflare Pages**, plus one Pages Function (`/api/contact`) that emails contact form submissions. No database or CMS.

## Stack

| Item | Version / choice |
| --- | --- |
| Node.js | 24 LTS (`.nvmrc`, `engines`) |
| Package manager | npm (commit `package-lock.json`) |
| Framework | Next.js 16.4 (App Router, `output: "export"`, `trailingSlash: true`) |
| UI | React 19.3, Tailwind CSS 4.3 |
| Language | TypeScript 6.0 (strict). TypeScript 7 is not used yet because `typescript-eslint` supports `<6.1`. |
| Lint | ESLint 10 + `eslint-config-next` (core-web-vitals + typescript). `next lint` was removed in Next 16. |
| Tests | Playwright smoke tests against the exported `out/` folder |
| Fonts | Instrument Sans (headings, UI) and Inter (text), self-hosted variable WOFF2 via `next/font/local` (SIL OFL 1.1, licenses in `src/fonts/`) |
| Photography | Licensed Unsplash photos, graded and pre-encoded to AVIF/WebP/JPEG in `public/images/`. See `docs/image-credits.md` |

Runtime dependencies: `next`, `react`, `react-dom`. No analytics, tracking, or advertising scripts.

## Getting started

```bash
nvm use               # Node 24
npm ci
npm run dev           # http://localhost:3000
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production static export to `out/` |
| `npm run preview` | Serves `out/` on http://localhost:4173 with Cloudflare-Pages-like routing (trailing-slash redirects, `404.html` with status 404, gzip) |
| `npm run typecheck` | Generates Next route types, then `tsc --noEmit` |
| `npm run lint` | `eslint .` |
| `npm run test:e2e` | Playwright smoke tests against `out/` (build first) |
| `npm run verify` | typecheck → lint → build → e2e |
| `npm run brand:render` | Re-renders PNG/ICO brand assets and the social image (needs `npx playwright install chromium`) |

First-time test setup: `npx playwright install chromium`.

## Project structure

```
src/
  app/                      Routes (all statically pre-rendered)
    page.tsx                /
    about/ services/ contact/
    services/[slug]/        Eight service pages via generateStaticParams (dynamicParams = false)
    not-found.tsx           Custom 404 → out/404.html
    sitemap.ts robots.ts manifest.ts   Static metadata routes (force-static)
    icon.svg apple-icon.png favicon.ico
  content/
    site.ts                 Company name, legal name, URL, email, slogan, nav, integrations
    services.ts             Typed definitions and copy for the eight services
    company.ts              Approach, principles, challenges, client types, homepage FAQ
    routes.ts               List of public routes (sitemap + tests)
  components/               Header, mobile nav (client), footer, contact form (client), shared sections
  lib/                      Metadata helper and JSON-LD builders
public/
  brand/                    SVG logo variants, monograms, PNG icons
  og/bnx24-og.png           1200×630 social sharing image
  _headers                  Cloudflare Pages headers (noindex for *.pages.dev, security, caching)
scripts/                    Preview server, brand asset scripts
tests/                      Playwright smoke tests
docs/                       SEO content map, launch checklist, privacy notes
```

Only two components ship client JavaScript of their own: `HeaderNav` (active link state and the mobile menu) and `ContactForm`. Everything else is a Server Component rendered at build time, so all content is in the initial HTML.

### Editing content

- Company facts, email, and navigation live in `src/content/site.ts`. Change them there only.
- Service copy lives in `src/content/services.ts`. Each service has its own headline, audience, situations, areas, example outputs, FAQs, related services, and CTA. Adding a service means adding an object and its slug to `serviceSlugs`. The page, sitemap, footer, and tests pick it up automatically.
- Don't add testimonials, client names, statistics, credentials, or addresses unless the owner has verified them.

## Brand assets

| File | Use |
| --- | --- |
| `public/brand/bnx24-logo.svg` | Primary wordmark for light backgrounds |
| `public/brand/bnx24-logo-dark.svg` | Wordmark for dark/navy backgrounds |
| `public/brand/bnx24-monogram.svg` / `-dark.svg` | Compact "B." monogram |
| `src/app/icon.svg`, `favicon.ico`, `apple-icon.png` | Browser and device icons |
| `public/brand/icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | Web app manifest icons |
| `public/brand/bnx24-logo-512.png` | Square logo referenced in Organization structured data |
| `public/og/bnx24-og.png` | Social sharing image (static file, works with static export) |

The wordmark text is outlined from Inter (OFL), so the SVGs don't depend on installed fonts. To change the logo, edit `scripts/brand/generate_logos.py` and run it (instructions are at the top of the file), then run `npm run brand:render`.

Palette: navy `#0B1F33`, deep navy `#06131F`, warm white `#F8F6F1`, sand `#EFEBE3`, slate `#4A5866`, teal `#0E6B64` (on light), light teal `#6FCFC2` (on navy).

## Contact form

`/contact/` renders a form that posts JSON to **`/api/contact`**, a Cloudflare Pages Function in `functions/api/contact.ts`. The function validates the submission again on the server and emails it to the BNX 24 mailbox through [Resend](https://resend.com). The visitor's address is set as Reply-To, so a normal reply answers them.

- **Fields:** full name*, work email*, phone, job title, company*, company size, service* (custom select with the eight services, "Not sure yet" and "Other"; "Other" requires a short description), preferred start, message* (20–5,000 characters), and consent to be contacted*.
- **Shared rules:** `src/lib/contact.ts` holds the field limits, options and validation used by both the browser and the server.
- **Custom select:** `src/components/Select.tsx`, a select-only combobox following the WAI-ARIA APG pattern (arrow keys, Home/End, type-ahead, Escape, Tab commits).
- **Honest states:** success is shown only when the server confirms delivery. Server validation errors are shown on the right field. Delivery failures show an error with the email address, and nothing typed is lost.
- **Spam:** a hidden honeypot field, a minimum fill time, same-origin check, 32 KB body limit. Trapped submissions get a normal-looking 200 and are not sent.
- `?interest=<service-slug>` on `/contact/` pre-selects the service. Service-page CTAs use this.
- **Drawer:** "Let's Talk" links carry `data-contact-drawer` (or `drawer` on `ButtonLink`). A plain click opens the same form in a slide-in `<dialog>` (`src/components/ContactDrawer.tsx`, full screen on phones); modified clicks, new tabs and no-JS visits still go to `/contact/`. The form code loads only when the drawer is first used. On `/contact/` itself the links don't open the drawer.

### Enabling email delivery

1. Create a [Resend](https://resend.com) account, add and verify the domain `bnx24inc.com` (it gives you DNS records: SPF/DKIM, and optionally a return-path MX record), and create an API key with *Sending access*.
2. In Cloudflare Pages → the project → Settings → Variables and Secrets, add for **Production** (and Preview if wanted):

   | Name | Type | Value |
   | --- | --- | --- |
   | `RESEND_API_KEY` | **Secret** | the Resend API key |
   | `CONTACT_TO_EMAIL` | Text (optional) | recipient(s), comma-separated. Default `office@bnx24inc.com` |
   | `CONTACT_FROM_EMAIL` | Text (optional) | sender on the verified domain. Default `BNX 24 Website <website@bnx24inc.com>` |
   | `ALLOWED_ORIGINS` | Text (optional) | extra origins allowed to post, comma-separated. The site's own origin is always allowed |

3. Redeploy. Cloudflare Pages picks up the `functions/` directory automatically for Git deployments and for `npx wrangler pages deploy out` run from the project root.
4. Recommended: add a Cloudflare WAF rate-limiting rule for `POST /api/contact` (for example 5 requests per minute per IP).
5. With the owner's approval, send one real test message and confirm it arrives and that Reply-To is the sender.

Without `RESEND_API_KEY` the endpoint answers 503 and the form shows its error message with the email address. It never pretends to have sent.

**Local testing of the function:** `npm run build && npx wrangler pages dev out` (add the variables to a `.dev.vars` file, which is git-ignored by convention; do not commit it). `npm run preview` serves static files only, so the form there shows the delivery error.

## Verification

```bash
npm run verify        # typecheck, lint, build, 27 smoke tests
npm run preview       # manual review of out/ at http://localhost:4173
```

The smoke tests cover:

- Every route returns 200 with one H1, `lang="en-US"`, the correct absolute canonical and `og:url`, `og:image`, and a description of reasonable length.
- JSON-LD parses and contains no ratings, reviews, addresses, or `sameAs`.
- Titles and descriptions are unique, and there are no console or hydration errors.
- The sitemap matches the exported pages exactly, and robots.txt allows crawling.
- Trailing-slash redirects work and nested routes survive a reload. Unknown URLs return a 404 status with the custom page and `noindex`.
- Every internal link and asset resolves.
- There is no horizontal overflow at 390, 768, or 1440px.
- The skip link works, desktop navigation and the CTA work, and the mobile menu works by keyboard (focus moves in, focus is trapped, Escape closes and restores focus) and by touch.
- The contact page matches its configured state.

## Deployment (Cloudflare Pages)

Nothing has been deployed. These steps are for the owner or their developer.

### 1. Create the Pages project

Connect the Git repository in Cloudflare → Workers & Pages → Create → Pages → Connect to Git. Use these settings:

| Setting | Value |
| --- | --- |
| Framework preset | None (or Next.js (Static HTML Export)) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js version | 24. The build image reads `.nvmrc`, and you can also set the env var `NODE_VERSION=24`. |
| Variables | `RESEND_API_KEY` (secret) and optional `CONTACT_*` values (see Contact form) |

Do **not** use `@cloudflare/next-on-pages` or a Workers adapter. The site is plain static files; the only server code is `functions/api/contact.ts`.

Direct upload alternative: `npm run build && npx wrangler pages deploy out --project-name <name>`.

### 2. Custom domain

1. Add `bnx24inc.com` to Cloudflare as a zone (recommended), or keep DNS elsewhere.
2. Pages project → Custom domains → add `www.bnx24inc.com`. On a Cloudflare zone, the CNAME to `<project>.pages.dev` is created automatically. With external DNS, create `CNAME www → <project>.pages.dev` yourself.

### 3. Apex → www redirect

The canonical origin is `https://www.bnx24inc.com`. Redirect the apex at the DNS/edge layer. Pages `_redirects` can't redirect by hostname.

- **Cloudflare zone:** add a proxied placeholder record for the apex (for example `A @ 192.0.2.1`, orange-cloud proxied). Then Rules → Redirect Rules → create a rule (the "Redirect from root to WWW" template): when hostname equals `bnx24inc.com`, redirect dynamically to `concat("https://www.bnx24inc.com", http.request.uri.path)` with status **301** and *Preserve query string* on.
- **External DNS:** use the registrar's or DNS host's URL-forwarding feature (301, path-preserving) from the apex to `https://www.bnx24inc.com`.

### 4. HTTPS verification

After DNS propagates, check each of these:

```bash
curl -sI https://www.bnx24inc.com/ | head -1                      # HTTP/2 200
curl -sI https://bnx24inc.com/about/ | grep -i location           # https://www.bnx24inc.com/about/
curl -sI http://www.bnx24inc.com/ | grep -i location              # https:// (enable "Always Use HTTPS")
curl -sI https://www.bnx24inc.com/about | grep -i location        # /about/
curl -sI https://www.bnx24inc.com/nope/ | head -1                 # 404
curl -sI https://www.bnx24inc.com/ | grep -i x-robots-tag         # (no output = indexable)
```

In SSL/TLS, enable **Always Use HTTPS**. Consider HSTS once everything works.

### 5. Preview deployments and indexing

`public/_headers` sends `X-Robots-Tag: noindex` only for `https://:project.pages.dev/*` and `https://:version.:project.pages.dev/*`. That covers every preview URL and the production `*.pages.dev` alias. These rules match by hostname, so they **can't** apply to `www.bnx24inc.com`. `robots.txt` always allows crawling, and the smoke tests fail if it ever disallows `/`. Use the last `curl` above to confirm production sends no `X-Robots-Tag`. To restrict who can see previews, add Cloudflare Access to preview deployments (Pages → Settings → Access policy).

### 6. Business mailbox (separate task)

`office@bnx24inc.com` is hosted on **Zoho Mail** (MX `mx.zoho.com`/`mx2`/`mx3`, SPF `include:zohomail.com`, DKIM selector `zmail`). Add a DMARC record (`TXT _dmarc` → `v=DMARC1; p=none; rua=mailto:office@bnx24inc.com`) if it is not there yet. Resend's records live on `send` and `resend._domainkey`, so they don't conflict with Zoho.

### 7. Search Console

1. Add a **Domain property** for `bnx24inc.com` in Google Search Console and verify it with the DNS TXT record.
2. Submit `https://www.bnx24inc.com/sitemap.xml`.
3. Use URL Inspection on the homepage and one service page to confirm they're indexable.
4. Optional: do the same in Bing Webmaster Tools (it can import from Search Console).

Structured data (Organization, WebSite, Service, BreadcrumbList) is valid schema.org markup. It doesn't guarantee rich results.

## Further documentation

- [`docs/seo-content-map.md`](docs/seo-content-map.md): URL, intent, keyword theme (hypotheses), title, and description for each page
- [`docs/launch-checklist.md`](docs/launch-checklist.md): completed work vs. external setup, plus owner confirmation items
- [`docs/privacy-notes.md`](docs/privacy-notes.md): privacy requirements and a **draft** policy that needs owner and legal review
