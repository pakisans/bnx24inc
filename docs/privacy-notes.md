# Privacy notes

> **Not legal advice.** This document describes what the website collects today and what a privacy policy will need to cover. The site now publishes four legal pages written for how it actually works: `/privacy-policy/`, `/terms-of-use/`, `/cookie-policy/` and `/accessibility/` (source in `src/app/*/page.tsx`, shared facts in `src/content/legal.ts`). They have **not** been reviewed by a lawyer. Have a U.S. attorney review them before launch.

## What the site collects today

| Area | Current state |
| --- | --- |
| Analytics / tracking / advertising | Cloudflare Web Analytics only (cookie-free, aggregated, enabled in the Pages dashboard). No advertising or tracking. |
| Cookies | None set by the site |
| Third-party scripts | None. Fonts are self-hosted, with no Google Fonts requests. |
| Contact | A contact form posting to the site's own Cloudflare Pages Function, which emails the submission via Resend to `office@bnx24inc.com`. Nothing is stored by the site itself. The email address is also shown for direct contact. |
| Hosting | Cloudflare Pages processes standard request data (IP address, user agent, and so on) to serve and secure the site. See Cloudflare's own privacy terms. |

## Contact form

The form sends **name, work email, company, service of interest, message, and consent**, plus optionally **phone, job title, company size, and preferred start**, to `/api/contact` on the site (Cloudflare). The function does not store anything; it forwards the inquiry as an email through **Resend**, which processes and may retain message data under its own terms, and delivers it to the BNX 24 mailbox. Visitors must tick a consent box before sending.

Before launch, the owner should:

1. Review Resend's data processing terms, retention, and sub-processors.
2. ~~Publish a privacy policy page~~ Done: linked from the form's consent box and the footer.
3. Decide on a retention period for inquiries in the mailbox.
4. Check which state privacy laws may apply. A lawyer should confirm what applies.

## Owner to confirm before launch

- `src/content/legal.ts` → `governingState` is set to **Illinois** (company based in Chicago). Confirm it matches the state of incorporation.
- `src/content/legal.ts` → `mailingAddress` comes from `site.address` (4343 N Clarendon Avenue, Chicago, IL 60613).
- `src/content/legal.ts` → `effectiveDate`: set to the launch date, and update it whenever a policy changes.
- The Privacy Policy names the email provider generically ("our business email provider"). The mailbox is on Zoho Mail; naming it is optional.

## Keep the pages true

Update the policies **before** adding anything that changes what is collected: analytics (Google Analytics, Meta Pixel and similar need a cookie banner/opt-out and policy changes), a newsletter, chat widgets, embedded videos or maps, a client portal, or new form fields.
