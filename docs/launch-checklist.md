# Launch checklist

## Completed in this project

- [x] Multi-page static site: home, about, services overview, eight service pages, contact, custom 404
- [x] Final American English copy on every page, with no placeholders or invented facts
- [x] Visual identity: SVG wordmark (light/dark), "B." monogram (light/dark), favicon, Apple touch icon, manifest icons, 1200×630 social image
- [x] Typed, centralized content (`src/content/`) and reusable components
- [x] Next.js 16 static export (`out/`), trailing-slash URLs that match Cloudflare Pages behavior
- [x] Metadata API: unique titles and descriptions, absolute canonicals, Open Graph/Twitter, `en-US` / `en_US`
- [x] `sitemap.xml`, `robots.txt`, structured data (Organization, WebSite, Service, BreadcrumbList) with owner-supplied facts only
- [x] `_headers`: `noindex` for `*.pages.dev` previews only, security headers, immutable caching for hashed assets
- [x] Contact page: honest email-only state by default, and an optional form that reports success only on a real 2xx response
- [x] Accessibility: skip link, visible focus, keyboard and touch mobile menu with focus management, labelled form fields with associated errors, reduced-motion support, AA contrast palette
- [x] Verification: typecheck, ESLint, production build, 27 smoke tests (+3 form-state tests with an intercepted endpoint), visual review at 390/768/1440px
- [x] Lighthouse (mobile, local preview with gzip, Lighthouse 13.5): home 97 / 100 / 100 / 100, operations service page 97 / 100 / 100 / 100, contact 98 / 100 / 100 / 100 (Performance / Accessibility / Best Practices / SEO); CLS 0, TBT ≈10 ms, LCP ≈2.5–2.6 s simulated. Re-measure on the live domain.

## External setup (not done, needs the owner's accounts and authorization)

- [ ] Confirm ownership of `bnx24consulting.com` (registration, renewal, registrar access)
- [ ] Create the Git repository and connect it to a Cloudflare Pages project (build `npm run build`, output `out`, Node 24)
- [ ] Add the custom domain `www.bnx24consulting.com` in Pages
- [ ] Apex → www 301 redirect (Cloudflare Redirect Rule or registrar forwarding)
- [ ] Enable Always Use HTTPS, then verify with the `curl` checks in the README
- [ ] Confirm production responses send **no** `X-Robots-Tag` and preview URLs send `noindex`
- [ ] Create the `office@bnx24consulting.com` mailbox (MX, SPF, DKIM, DMARC) and test sending and receiving
- [ ] Optional: choose a form provider, set `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`, redeploy, and send one approved test submission
- [ ] Publish a privacy policy appropriate to the chosen form provider before enabling the form (see `privacy-notes.md`)
- [ ] Verify the domain in Google Search Console (DNS TXT), submit the sitemap, and inspect key URLs
- [ ] Optional: Bing Webmaster Tools
- [ ] Re-run Lighthouse against the production URL

## Owner confirmation items

- [ ] **Domain** ownership and availability of `bnx24consulting.com`
- [ ] **Mailbox** `office@bnx24consulting.com` exists and is monitored
- [ ] **Legal name** shown in the footer copyright and structured data: "BNX 24 INC"
- [ ] **Copy approval** for all pages, including:
  - The proposed approach *Understand → Assess → Recommend → Support*, especially what "Support" includes
  - Process statements: scope, fees, and deliverables "agreed in writing before work begins"; fees set out in a proposal; remote work possible with arrangements agreed per engagement
  - Service boundaries: no legal, tax, accounting, investment, lending, or HR/employment advice
  - The service scope descriptions and example outputs
- [ ] **Slogan** "Building Better Businesses Through Strategy." as the single primary tagline
- [ ] **Logo** approval, including the teal "24"
- [ ] **Future additions**, only once verified: team or founder bios, credentials, office address, phone, booking link, social profiles (`sameAs`), client references or testimonials (with written permission)
- [ ] **Contact provider** choice, its data handling, and the **privacy policy** text (legal review recommended)

## Assumptions made (reversible)

- Nationwide, remote-capable service with no public address. The address is omitted from the site and the schema.
- No phone number, booking link, or social profiles, since none were supplied.
- The email contact experience is the default until a form provider is configured.
- No analytics. If added later, update the privacy policy and consider consent requirements.
