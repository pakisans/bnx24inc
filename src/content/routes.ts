import { legalPages } from "./legal";
import { services, servicePath } from "./services";

/** Every public, indexable route. Used by the sitemap and smoke tests. */
export const publicPaths: string[] = [
  "/",
  "/about/",
  "/services/",
  ...services.map((s) => servicePath(s.slug)),
  "/contact/",
  ...legalPages.map((p) => p.href),
];
