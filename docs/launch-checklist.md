# Launch checklist

## Completed in this project

- [x] Multi-page static site: home, about, services overview, eight service pages, contact, four legal pages, custom 404
- [x] Final American English copy on every page, with no placeholders or invented facts
- [x] Visual identity: SVG wordmark (light/dark), "B." monogram (light/dark), favicon, Apple touch icon, manifest icons, 1200×630 social image
- [x] Typed, centralized content (`src/content/`) and reusable components
- [x] Next.js 16 static export (`out/`), trailing-slash URLs that match Cloudflare Pages behavior
- [x] Metadata API: unique titles and descriptions, absolute canonicals, Open Graph/Twitter, `en-US` / `en_US`
- [x] `sitemap.xml`, `robots.txt`, structured data (Organization, WebSite, Service, BreadcrumbList) with owner-supplied facts only
- [x] `_headers`: `noindex` for `*.pages.dev` previews only, security headers, immutable caching for hashed assets
- [x] Contact page: form with server-side validation and email delivery (`/api/contact`, Resend) that reports success only when delivery is confirmed
- [x] Accessibility: skip link, visible focus, keyboard and touch mobile menu with focus management, labelled form fields with associated errors, reduced-motion support, AA contrast palette
- [x] Verification: typecheck, ESLint, production build, 52 Playwright tests (site smoke tests, contact form and drawer UI with intercepted requests, and the server function with Resend stubbed), visual review at 390/768/1440px
- [ ] Lighthouse: earlier scores were measured before the redesign and no longer apply. Measure again on the live domain. (Local Chromium after the redesign: CLS 0 on home, a service page and About.)

## External setup (not done, needs the owner's accounts and authorization)

- [ ] Confirm ownership of `bnx24inc.com` (registration, renewal, registrar access)
- [ ] Create the Git repository and connect it to a Cloudflare Pages project (build `npm run build`, output `out`, Node 24)
- [ ] Add the custom domain `www.bnx24inc.com` in Pages
- [ ] Apex → www 301 redirect (Cloudflare Redirect Rule or registrar forwarding)
- [ ] Enable Always Use HTTPS, then verify with the `curl` checks in the README
- [ ] Confirm production responses send **no** `X-Robots-Tag` and preview URLs send `noindex`
- [ ] Create the `office@bnx24inc.com` mailbox (MX, SPF, DKIM, DMARC) and test sending and receiving
- [ ] Verify `bnx24inc.com` in Resend, set `RESEND_API_KEY` (secret) in Cloudflare Pages, redeploy, and send one approved test submission
- [ ] Optional: Cloudflare WAF rate-limiting rule for `POST /api/contact`
- [x] Privacy Policy, Terms of Use, Cookie Policy and Accessibility Statement published and linked from the footer and form
- [ ] Attorney review of the legal pages (governing law set to Illinois; mailing address set from `site.address`)
- [ ] DMARC record for `bnx24inc.com` (Zoho mail)
- [ ] Decide the canonical host: `www.bnx24inc.com` does not resolve yet while the code uses `www` (add `www` as a Pages custom domain and redirect the apex to it)
- [ ] Verify the domain in Google Search Console (DNS TXT), submit the sitemap, and inspect key URLs
- [ ] Optional: Bing Webmaster Tools
- [ ] Re-run Lighthouse against the production URL

## Owner confirmation items

- [ ] **Domain** ownership and availability of `bnx24inc.com`
- [ ] **Mailbox** `office@bnx24inc.com` exists and is monitored
- [ ] **Legal name** shown in the footer copyright and structured data: "BNX 24 INC"
- [ ] **Copy approval** for all pages, including:
  - The proposed approach *Understand → Assess → Recommend → Support*, especially what "Support" includes
  - Process statements: scope, fees, and deliverables "agreed in writing before work begins"; fees set out in a proposal; remote work possible with arrangements agreed per engagement
  - Service boundaries: no legal, tax, accounting, investment, lending, or HR/employment advice
  - The service scope descriptions and example outputs
- [ ] **Slogan** "Building Better Businesses Through Strategy." as the single primary tagline
- [ ] **Logo** approval, including the teal "24"
- [ ] **Phone** `+1 (206) 519-8855` is answered or has voicemail during business hours
- [ ] **Future additions**, only once verified: team or founder bios, credentials, booking link, social profiles (`sameAs`), client references or testimonials (with written permission)
- [ ] **Legal pages** reviewed by an attorney

## Assumptions made (reversible)

- Nationwide, remote-capable service. The owner-supplied Chicago address (4343 N Clarendon Avenue, Chicago, IL 60613) is shown in the footer, on the contact page, in the legal pages and in the Organization schema.
- Phone supplied by the owner; no booking link or social profiles, since none were supplied.
- Until `RESEND_API_KEY` is set, the form shows its delivery-error message with the email address.
- No analytics. If added later, update the privacy policy and consider consent requirements.
