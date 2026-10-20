# Claude playbook: building a static B2B marketing site

A reusable process for giving Claude a brief like the BNX 24 one. It records the steps that produced this project in order, plus the mistakes caught along the way. Hand this file to Claude together with a new brief.

---

## 0. Ground rules (apply throughout)

- **Facts ledger.** Before writing anything, list every fact the brief actually gives: name, legal name, URL, email, services, slogan, CTA text. Anything not on that list does not exist. That covers clients, testimonials, stats, years in business, bios, credentials, awards, addresses, phone numbers, social profiles, booking links, prices, free consultations, and response times.
- **Intended ≠ confirmed.** The domain and mailbox are *intended*. Write the docs so they say that, and put them on the owner checklist.
- **No outward actions without explicit authorization.** That means no deploys, domain purchases, real form submissions, or emails. Test endpoints use the `.invalid` TLD, and requests are intercepted in tests.
- **Honest states only.** Never show "Message sent" unless the provider returned 2xx. If there is no endpoint, render an email contact panel instead of a fake form.
- **No secrets in browser code.** `NEXT_PUBLIC_*` values are public and documented as such.
- **No tracking scripts.**
- **No legal/tax/investment advice implications.** Every "guarantee" in the copy must be a disclaimer.
- **Never claim a check passed unless it actually ran.**

## 1. Intake

1. Read the whole brief and split it into: constraints, required routes, required deliverables, and verification steps.
2. Check the working directory. If it holds an unrelated project, create a new folder (`~/Sites/<project>`) and don't touch the existing one.
3. Ask a question only if something blocks the work. Otherwise choose a sensible default and log it under "Assumptions" in the launch checklist.

## 2. Stack selection (verify, don't assume)

1. Check the current stable versions with `npm view <pkg> version` for next, react, tailwindcss, typescript, eslint, and @playwright/test.
2. Check compatibility between them, especially the `typescript-eslint` peer range against the TypeScript major. That's why this project uses TS 6.0 and not 7.
3. Check for removed commands. For example, `next lint` is gone in Next 16, so linting runs through the `eslint` CLI.
4. Pin Node with `.nvmrc` and `engines`, use one package manager, and commit the lockfile.
5. Keep runtime dependencies to `next`, `react`, and `react-dom` only.

Config used here:

```ts
// next.config.ts
output: "export", trailingSlash: true, images: { unoptimized: true },
turbopack: { root: import.meta.dirname }
```

- `trailingSlash: true` matches Cloudflare Pages: `/x/index.html` is served at `/x/` and `/x` redirects there.
- Typecheck runs `next typegen && tsc --noEmit`, so the `PageProps<"/route">` types exist.
- tsconfig uses `strict` and `noUncheckedIndexedAccess`.

## 3. Content model first, pages second

Put all copy and facts in typed modules under `src/content/` before building any UI:

| File | Holds |
| --- | --- |
| `site.ts` | name, legalName, url, email, slogan, description, nav, CTA, `integrations.contactFormEndpoint`, `absoluteUrl()` |
| `services.ts` | `Service` interface + one object per service (headline, intro, focus, question, audience, situations, areas, outputs, faqs, related, cta, seo) |
| `company.ts` | approach steps, principles, challenges, client types, FAQs |
| `routes.ts` | `publicPaths`, the single list used by the sitemap **and** the tests |

Copy rules:

- Each service gets a distinct purpose. Write the question it answers in one sentence and never reuse it.
- American B2B tone. Check every page against a banned-phrase list.
- Deliverables are labeled "examples, depend on agreed scope".
- Use the slogan once as the tagline. The H1 says plainly what the company does.

## 4. Brand

1. Define a palette with AA contrast on its intended backgrounds, as Tailwind `@theme` tokens.
2. Use two self-hosted fonts (`next/font/local`, variable WOFF2) and copy the OFL licenses into `src/fonts/`.
3. Logo: outline the glyphs to SVG paths with Python `fontTools` in a scratchpad venv, so the files need no font. Produce a wordmark and a monogram, each in light and dark variants.
4. Raster assets (OG 1200×630, 192/512/maskable icons, apple-icon, favicon.ico) are rendered with a Playwright script (`npm run brand:render`).
5. One visual motif, used sparingly (here: teal corner brackets around navy panels). No stock photos, fake dashboards, or icon-card grids.

## 5. Pages and components

- Server Components by default. Client components only where they're needed (here: `HeaderNav` and `ContactForm`).
- Dynamic routes use `generateStaticParams` with `dynamicParams = false`.
- Every page has one H1, breadcrumbs (except home), a closing CTA, and service CTAs that link to `/contact/?interest=<slug>`.
- FAQs use native `<details>` elements, with no JS.
- Custom `not-found.tsx` (Next already adds `noindex`, so don't duplicate it).

## 6. SEO

- `pageMetadata({ title, description, path })` helper: absolute canonical, OG, Twitter, OG image.
- Title template `%s | Brand`, with unique titles and descriptions (enforced by a test).
- `sitemap.ts`, `robots.ts`, `manifest.ts` set to `force-static`. The sitemap comes from `publicPaths`.
- JSON-LD: Organization (`@id`), WebSite, Service, BreadcrumbList. Use verified facts only: no address, `sameAs`, ratings, or reviews. FAQPage was dropped on purpose.
- `public/_headers`: `X-Robots-Tag: noindex` only for `https://:project.pages.dev/*` and `https://:version.:project.pages.dev/*`, plus security headers and immutable caching for `/_next/static/*`.
- `docs/seo-content-map.md`: URL, intent, keyword theme (labeled as hypotheses), title, description. Escape `|` inside table cells.

## 7. Accessibility (WCAG 2.2 AA)

- Skip link, visible `:focus-visible`, and a separate focus color on dark backgrounds.
- Mobile menu: focus moves in, focus is trapped, Escape closes and returns focus, scroll is locked, and it works by touch.
- Form: labels, `aria-invalid`, errors linked with `aria-describedby`, and the typed message is kept on error.
- `prefers-reduced-motion` support.

## 8. Contact form contract

```
endpoint unset → email panel + mailto button (no <form>)
endpoint set   → form → POST JSON, Accept: application/json
                 2xx → success | else/network error → error + email fallback
                 honeypot _gotcha, _subject, ?interest= preselect
```

Server-side validation, spam protection, and rate limits are the provider's job. Document that.

## 9. Verification (in this order)

1. `npm run typecheck` → `npm run lint` → `npm run build`.
2. `scripts/serve-out.mjs`: a preview server for `out/` that mimics Pages (trailing-slash 308, `404.html` with status 404, **gzip**).
3. Playwright smoke tests against `out/`:
   - every route returns 200, has one H1, `lang`, and the correct canonical and `og:url`/`og:image`
   - JSON-LD parses and contains no forbidden fields
   - titles and descriptions are unique, with no console or hydration errors
   - the sitemap matches the exported pages exactly, and robots allows `/`
   - redirects, reloads of nested routes, and the 404 status work
   - every internal link and asset resolves
   - no horizontal overflow at 390, 768, and 1440px
   - skip link, desktop nav, and mobile menu (keyboard and touch, plus `toBeInViewport`)
4. `npm run test:form`: build with `https://forms.invalid/...`, intercept requests, test validation, 2xx success, and the error state. Then rebuild normally and confirm the test endpoint is **not** in `out/`.
5. **Screenshots** at 390, 768, and 1440px for each page type, reviewed by eye. Passing tests do not replace this step.
6. Lighthouse (mobile) on the gzip preview for home, one service page, and contact. Report the actual numbers.
7. Copy audit: grep for banned phrases and for "guarantee".

## 10. Lessons from this build (check these early)

| Symptom | Cause | Fix |
| --- | --- | --- |
| Mobile menu opened with 0 height | `backdrop-filter` on the header made it the containing block for the fixed-position panel | Solid header background + `toBeInViewport` test |
| Frame corners rendered as notches | `border` shorthand reset the color | Explicit `border-top/left: 2px solid teal`, positioned outside the panel |
| Two robots meta tags on the 404 page | Next already adds `noindex` | Remove the custom robots metadata |
| Lighthouse Performance 77–82 | Preview server had no compression | gzip in the preview server → 97–98 |
| Alert locator matched two elements | Next's route announcer is also `role=alert` | `.filter({ hasText })` |
| Cramped CTA and footer at 768px | Multi-column layout started at `md` | Start it at `lg` |
| Email broke mid-word in the footer | Long unbroken string | `[overflow-wrap:anywhere]` |
| Turbopack warning about the workspace root | Stray lockfile in the home directory | `turbopack.root: import.meta.dirname` |

## 11. Deliverables

- `README.md`: stack, scripts, structure, editing content, brand assets, form activation, Cloudflare Pages deployment (build `npm run build`, output `out`, Node 24), custom domain, apex→www 301, HTTPS `curl` checks, preview noindex, mailbox (MX/SPF/DKIM/DMARC), Search Console.
- `.env.example`: only `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`, labeled public.
- `docs/seo-content-map.md`, `docs/launch-checklist.md` (done / external / owner confirmation / assumptions), `docs/privacy-notes.md` (draft policy clearly marked **DRAFT, do not publish**).
- `git init` + one commit with the lockfile, fonts, and tests tracked. Do not push.

## 12. Final report format

Four short sections:

1. **What was built.**
2. **Key decisions.**
3. **What was actually tested:** commands, test counts, Lighthouse numbers, and what was *not* done.
4. **What remains before launch:** domain, Pages project, www + apex redirect, HTTPS, mailbox, optional form + privacy policy, Search Console, owner approvals.
