# BNX 24 Inc. — Website

Marketing website for **BNX 24 Inc.**, a general business consulting company serving clients across the United States.

- Intended production URL: `https://www.bnx24consulting.com`
- Static Next.js export, deployed to **Cloudflare Pages**. No server, database, or CMS.

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
| Fonts | Inter and Source Serif 4, self-hosted variable WOFF2 via `next/font/local` (SIL OFL 1.1, licenses in `src/fonts/`) |

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
| `npm run test:form` | Builds with a non-routable test endpoint (`https://forms.invalid/...`), runs the contact form tests with intercepted requests, then rebuilds normally. Nothing is sent to a real service. Uses POSIX shell syntax. |
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

The contact page has two honest states, chosen at **build time**:

1. **No endpoint configured (default).** The page shows an email contact panel (`office@bnx24consulting.com`, mailto button). No form is rendered.
2. **Endpoint configured.** The page renders a form (name, work email, company, area of interest, message) that `POST`s JSON to the endpoint. Success is shown **only** when the endpoint returns a 2xx status. Network or server errors show an error message with the email address, and the typed message is kept.

### Enabling it

1. Create a form with a provider that accepts cross-origin JSON posts from the browser and returns JSON. The form was built against Formspree's conventions (`Accept: application/json`, `_gotcha` honeypot, `_subject`). Basin, Getform, and similar services work if they accept JSON. Check before choosing.
2. Configure the provider: the recipient address, an allowed domain of `www.bnx24consulting.com`, spam filtering/CAPTCHA, and data retention.
3. In Cloudflare Pages → Settings → Variables, set `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` (for example `https://formspree.io/f/xxxxxxxx`) for **Production** (and Preview if wanted), then redeploy. The value is compiled into browser code, so it must be a public form URL and never an API key or secret.
4. Verify on the live site: submit a real test message (with the owner's approval), confirm it arrives in the mailbox, and confirm an invalid submission shows field errors.

Client-side validation only improves usability. **Server-side validation, spam protection, rate limiting, and delivery are the provider's responsibility.** Configure them there.

`?interest=<service-slug>` on `/contact/` pre-selects the area of interest. Service-page CTAs use this.

## Verification

```bash
npm run verify        # typecheck, lint, build, 27 smoke tests
npm run test:form     # contact form states with an intercepted test endpoint
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
| Env var (optional) | `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` (see Contact form) |

Do **not** use `@cloudflare/next-on-pages` or a Workers adapter. This site is plain static files.

Direct upload alternative: `npm run build && npx wrangler pages deploy out --project-name <name>`.

### 2. Custom domain

1. Add `bnx24consulting.com` to Cloudflare as a zone (recommended), or keep DNS elsewhere.
2. Pages project → Custom domains → add `www.bnx24consulting.com`. On a Cloudflare zone, the CNAME to `<project>.pages.dev` is created automatically. With external DNS, create `CNAME www → <project>.pages.dev` yourself.

### 3. Apex → www redirect

The canonical origin is `https://www.bnx24consulting.com`. Redirect the apex at the DNS/edge layer. Pages `_redirects` can't redirect by hostname.

- **Cloudflare zone:** add a proxied placeholder record for the apex (for example `A @ 192.0.2.1`, orange-cloud proxied). Then Rules → Redirect Rules → create a rule (the "Redirect from root to WWW" template): when hostname equals `bnx24consulting.com`, redirect dynamically to `concat("https://www.bnx24consulting.com", http.request.uri.path)` with status **301** and *Preserve query string* on.
- **External DNS:** use the registrar's or DNS host's URL-forwarding feature (301, path-preserving) from the apex to `https://www.bnx24consulting.com`.

### 4. HTTPS verification

After DNS propagates, check each of these:

```bash
curl -sI https://www.bnx24consulting.com/ | head -1                      # HTTP/2 200
curl -sI https://bnx24consulting.com/about/ | grep -i location           # https://www.bnx24consulting.com/about/
curl -sI http://www.bnx24consulting.com/ | grep -i location              # https:// (enable "Always Use HTTPS")
curl -sI https://www.bnx24consulting.com/about | grep -i location        # /about/
curl -sI https://www.bnx24consulting.com/nope/ | head -1                 # 404
curl -sI https://www.bnx24consulting.com/ | grep -i x-robots-tag         # (no output = indexable)
```

In SSL/TLS, enable **Always Use HTTPS**. Consider HSTS once everything works.

### 5. Preview deployments and indexing

`public/_headers` sends `X-Robots-Tag: noindex` only for `https://:project.pages.dev/*` and `https://:version.:project.pages.dev/*`. That covers every preview URL and the production `*.pages.dev` alias. These rules match by hostname, so they **can't** apply to `www.bnx24consulting.com`. `robots.txt` always allows crawling, and the smoke tests fail if it ever disallows `/`. Use the last `curl` above to confirm production sends no `X-Robots-Tag`. To restrict who can see previews, add Cloudflare Access to preview deployments (Pages → Settings → Access policy).

### 6. Business mailbox (separate task)

`office@bnx24consulting.com` appears on the site but **is not created by this project**. Set it up with an email provider (Google Workspace, Microsoft 365, Zoho, and so on): add its MX, SPF, DKIM, and DMARC DNS records, then send and receive a test message before launch.

### 7. Search Console

1. Add a **Domain property** for `bnx24consulting.com` in Google Search Console and verify it with the DNS TXT record.
2. Submit `https://www.bnx24consulting.com/sitemap.xml`.
3. Use URL Inspection on the homepage and one service page to confirm they're indexable.
4. Optional: do the same in Bing Webmaster Tools (it can import from Search Console).

Structured data (Organization, WebSite, Service, BreadcrumbList) is valid schema.org markup. It doesn't guarantee rich results.

## Further documentation

- [`docs/seo-content-map.md`](docs/seo-content-map.md): URL, intent, keyword theme (hypotheses), title, and description for each page
- [`docs/launch-checklist.md`](docs/launch-checklist.md): completed work vs. external setup, plus owner confirmation items
- [`docs/privacy-notes.md`](docs/privacy-notes.md): privacy requirements and a **draft** policy that needs owner and legal review
