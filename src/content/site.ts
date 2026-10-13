/**
 * Single source of truth for company facts, URLs and navigation.
 * Only owner-supplied facts belong here. Do not add addresses, phone numbers,
 * social profiles or credentials until the owner confirms them.
 */
export const site = {
  name: "BNX 24 Inc.",
  shortName: "BNX 24",
  legalName: "BNX 24 INC",
  /** Canonical origin. No trailing slash. */
  url: "https://www.bnx24consulting.com",
  email: "office@bnx24consulting.com",
  slogan: "Building Better Businesses Through Strategy.",
  description:
    "BNX 24 Inc. is a business consulting firm helping U.S. companies clarify direction, strengthen operations and organizational structure, and evaluate opportunities for growth.",
  locale: "en_US",
  areaServed: "United States",
} as const;

export const primaryCta = {
  heading: "Let’s Talk About Your Business",
  label: "Start a Conversation",
  href: "/contact/",
} as const;

export const mainNav = [
  { label: "Services", href: "/services/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;

/**
 * Optional third-party integrations. Values are read at build time.
 * The form endpoint is public by nature (it is called from the browser),
 * so it must never be a private API key.
 */
export const integrations = {
  contactFormEndpoint: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim() || null,
} as const;

/** Absolute URL for a site path. Paths must start with "/". */
export function absoluteUrl(path: string): string {
  return `${site.url}${path}`;
}
