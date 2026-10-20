import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";
import { publicPaths } from "../src/content/routes";
import { site } from "../src/content/site";

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  return errors;
}

test.describe("every public route", () => {
  for (const route of publicPaths) {
    test(`${route} renders with correct SEO basics`, async ({ page }) => {
      const errors = collectErrors(page);
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("html")).toHaveAttribute("lang", "en-US");
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${site.url}${route}`);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", `${site.url}${route}`);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", `${site.url}/og/bnx24-og.png`);
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "en_US");
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description?.length ?? 0).toBeGreaterThan(70);
      expect(description?.length ?? 0).toBeLessThanOrEqual(170);
      await expect(page.locator('meta[name="robots"]')).toHaveCount(0);

      // All JSON-LD blocks parse and contain no ratings/reviews/addresses.
      for (const block of await page.locator('script[type="application/ld+json"]').allTextContents()) {
        expect(() => JSON.parse(block)).not.toThrow();
        expect(block).not.toMatch(/aggregateRating|"review"|"address"|foundingDate|sameAs/);
      }

      // Wait for hydration before checking for runtime errors.
      await page.waitForLoadState("networkidle");
      expect(errors).toEqual([]);
    });
  }

  test("titles and descriptions are unique", async ({ page }) => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const route of publicPaths) {
      await page.goto(route);
      titles.add(await page.title());
      descriptions.add((await page.locator('meta[name="description"]').getAttribute("content")) ?? "");
    }
    expect(titles.size).toBe(publicPaths.length);
    expect(descriptions.size).toBe(publicPaths.length);
  });
});

test("service pages include Service and BreadcrumbList structured data", async ({ page }) => {
  await page.goto("/services/market-research-business-analysis/");
  const types = (await page.locator('script[type="application/ld+json"]').allTextContents())
    .flatMap((b) => [JSON.parse(b)].flat())
    .map((d: { "@type": string }) => d["@type"]);
  expect(types).toEqual(expect.arrayContaining(["Organization", "Service", "BreadcrumbList"]));
  await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
});

test("sitemap lists exactly the generated public pages", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  expect(urls).toEqual(publicPaths.map((p) => `${site.url}${p}`));

  // Every exported HTML page (other than the 404 variants) is in the sitemap.
  const out = path.resolve("out");
  const htmlRoutes: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = path.join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (name === "index.html") htmlRoutes.push(`/${path.relative(out, dir)}/`.replace(/^\/\/$/, "/"));
    }
  };
  walk(out);
  const indexable = htmlRoutes.filter((r) => !/^\/(404|_not-found)\//.test(r)).sort();
  expect(indexable).toEqual([...publicPaths].sort());
});

test("robots.txt allows crawling and points to the sitemap", async ({ request }) => {
  const body = await (await request.get("/robots.txt")).text();
  expect(body).toContain("Allow: /");
  expect(body).not.toMatch(/Disallow: \/\s*$/m);
  expect(body).toContain(`Sitemap: ${site.url}/sitemap.xml`);
});

test("nested routes redirect to the trailing-slash URL and survive reload", async ({ page }) => {
  await page.goto("/services/management-consulting");
  await expect(page).toHaveURL(/\/services\/management-consulting\/$/);
  await page.reload();
  await expect(page.locator("h1")).toBeVisible();
});

test("unknown URLs return the custom 404 page", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("We couldn’t find that page.");
  await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await page.getByRole("link", { name: "Go to the Homepage" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("all internal links and assets resolve", async ({ page, request }) => {
  const targets = new Set<string>();
  for (const route of publicPaths) {
    await page.goto(route);
    const hrefs = await page.$$eval("a[href^='/'], link[href^='/'], img[src^='/'], script[src^='/']", (els) =>
      els.map((el) => el.getAttribute("href") ?? el.getAttribute("src") ?? ""),
    );
    hrefs.forEach((h) => targets.add(h.split("#")[0]!));
  }
  for (const target of targets) {
    const res = await request.get(target, { maxRedirects: 0 });
    expect(res.status(), target).toBe(200);
  }
});

test.describe("layout", () => {
  for (const width of [390, 768, 1440]) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const route of ["/", "/services/", "/services/business-operations-consulting/", "/contact/", "/about/", "/privacy-policy/", "/cookie-policy/"]) {
        await page.goto(route);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, route).toBe(0);
      }
    });
  }
});

test.describe("navigation", () => {
  test("skip link moves focus to main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  test("desktop navigation and CTA reach their pages", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    await nav.getByRole("link", { name: "Services" }).click();
    await expect(page).toHaveURL(/\/services\/$/);
    await expect(nav.getByRole("link", { name: "Services" })).toHaveAttribute("aria-current", "page");
    await expect(nav.getByRole("link", { name: "Let’s Talk" })).toHaveAttribute("href", "/contact/");
    await nav.getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL(/\/contact\/$/);
    await expect(page.locator("h1")).toHaveText("Let’s Talk About Your Business");
  });

  test("mobile menu works with the keyboard", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Menu" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("button", { name: "Close" })).toHaveAttribute("aria-expanded", "true");
    const menu = page.getByRole("navigation", { name: "Mobile" });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: "Contact" })).toBeInViewport();
    await expect(menu.getByRole("link", { name: "Home" })).toBeFocused();

    // Focus stays inside the open menu.
    for (let i = 0; i < 6; i++) await page.keyboard.press("Tab");
    const insideMenu = await page.evaluate(
      () => !!document.activeElement?.closest("#mobile-menu") || document.activeElement?.getAttribute("aria-controls") === "mobile-menu",
    );
    expect(insideMenu).toBe(true);

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
  });

});

test.describe("touch navigation", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test("mobile menu works with touch and closes after navigating", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).tap();
    const menu = page.getByRole("navigation", { name: "Mobile" });
    await menu.getByRole("link", { name: "About" }).tap();
    await expect(page).toHaveURL(/\/about\/$/);
    await expect(menu).toBeHidden();
  });
});

test("footer links to every legal page", async ({ page }) => {
  await page.goto("/");
  const legalNav = page.getByRole("navigation", { name: "Legal" });
  for (const name of ["Privacy Policy", "Terms of Use", "Cookie Policy", "Accessibility"]) {
    await expect(legalNav.getByRole("link", { name })).toBeVisible();
  }
});
