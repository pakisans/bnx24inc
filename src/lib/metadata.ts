import type { Metadata } from "next";
import { absoluteUrl, site } from "@/content/site";

export const ogImage = {
  url: "/og/bnx24-og.png",
  width: 1200,
  height: 630,
  alt: "BNX 24 Inc. — Building Better Businesses Through Strategy.",
} as const;

interface PageMetaInput {
  /** Page title without the brand suffix (the root layout template adds it). */
  title: string;
  description: string;
  /** Site path with leading and trailing slash, e.g. "/about/". */
  path: string;
  /** Use the title as-is, without the " | BNX 24 Inc." suffix. */
  absoluteTitle?: boolean;
}

/**
 * Builds complete per-page metadata. Open Graph and Twitter objects are
 * replaced (not merged) by Next.js when a page defines them, so every page
 * gets the full set here, including the share image.
 */
export function pageMetadata({ title, description, path, absoluteTitle }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url: absoluteUrl(path),
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}
