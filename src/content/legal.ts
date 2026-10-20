/**
 * Facts used by the legal pages. These are drafts written for this site as it
 * is built today (no analytics, no ads, no cookies of its own). Have them
 * reviewed by a U.S. attorney before launch, and update them whenever the site
 * starts collecting anything new (analytics, newsletter, client portal, etc.).
 */
export const legal = {
  /** Shown as "Effective" on every legal page. Update when the text changes. */
  effectiveDate: "2026-10-20",
  /**
   * State whose law governs the Terms of Use, usually the state of
   * incorporation, e.g. "Delaware". Leave null until the owner confirms it;
   * the Terms then use a neutral fallback.
   */
  governingState: null as string | null,
  /** Optional postal address for privacy requests. Shown only when confirmed. */
  mailingAddress: null as string | null,
} as const;

export const legalPages = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms of Use", href: "/terms-of-use/" },
  { label: "Cookie Policy", href: "/cookie-policy/" },
  { label: "Accessibility", href: "/accessibility/" },
] as const;

export function formatLegalDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
