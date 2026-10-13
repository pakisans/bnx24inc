import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/site";

export const dynamic = "force-static";

/**
 * Production robots.txt. It always allows crawling: preview deployments are
 * kept out of search engines with an X-Robots-Tag header scoped to
 * *.pages.dev hostnames (see public/_headers), which cannot affect the
 * production domain.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
