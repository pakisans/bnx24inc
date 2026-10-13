import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/site";
import { publicPaths } from "@/content/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({ url: absoluteUrl(path) }));
}
