/**
 * Single source of truth for company facts, URLs and navigation.
 * Only owner-supplied facts belong here. Do not add social profiles or
 * credentials until the owner confirms them.
 */
export const site = {
  name: "BNX 24 Inc.",
  shortName: "BNX 24",
  legalName: "BNX 24 INC",
  /** Canonical origin. No trailing slash. */
  url: "https://www.bnx24inc.com",
  email: "office@bnx24inc.com",
  /** Owner-supplied business phone, shown as written and dialed as E.164. */
  phone: "+1 (206) 519-8855",
  phoneHref: "tel:+12065198855",
  /** Owner-supplied business address. */
  address: {
    street: "4343 N Clarendon Avenue",
    city: "Chicago",
    region: "IL",
    postalCode: "60613",
    country: "US",
  },
  slogan: "Building Better Businesses Through Strategy.",
  description:
    "BNX 24 Inc. is a business consulting firm helping U.S. companies clarify direction, strengthen operations and organizational structure, and evaluate opportunities for growth.",
  locale: "en_US",
  areaServed: "United States",
} as const;

export const primaryCta = {
  heading: "Let’s Talk About Your Business",
  label: "Let’s Talk",
  href: "/contact/",
} as const;

export const mainNav = [
  { label: "Services", href: "/services/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;

/**
 * Integrations. Values are read at build time.
 * The contact form posts to the site's own Cloudflare Pages Function
 * (functions/api/contact.ts), which sends the email server-side. Override the
 * endpoint only to point the form at another public URL; it is compiled into
 * browser code, so it must never contain a secret.
 */
export const integrations = {
  contactFormEndpoint: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim() || "/api/contact",
} as const;

/** One-line postal address, e.g. for legal pages. */
export const addressLine = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

/** Absolute URL for a site path. Paths must start with "/". */
export function absoluteUrl(path: string): string {
  return `${site.url}${path}`;
}
