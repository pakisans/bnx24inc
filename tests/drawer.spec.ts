import { expect, test } from "@playwright/test";

/**
 * "Let's Talk" links open the contact drawer on a plain click and remain real
 * links to /contact/ for everything else. Requests are intercepted.
 */
test.describe("contact drawer", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("header CTA opens the drawer in place and Escape returns focus", async ({ page }) => {
    await page.goto("/about/");
    const cta = page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Let’s Talk" });
    await cta.click();
    const drawer = page.getByRole("dialog", { name: "Tell us about your business" });
    await expect(drawer).toBeVisible();
    await expect(page).toHaveURL(/\/about\/$/);
    await expect(drawer.getByLabel("Full name")).toBeVisible();
    await expect(drawer.getByRole("button", { name: "Close" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
    await expect(cta).toBeFocused();
  });

  test("closes from the Close button and from the backdrop", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Let’s Talk" }).first().click();
    const drawer = page.getByRole("dialog");
    await drawer.getByRole("button", { name: "Close" }).click();
    await expect(drawer).toBeHidden();
    await page.getByRole("link", { name: "Let’s Talk" }).first().click();
    await expect(drawer).toBeVisible();
    await page.mouse.click(100, 450);
    await expect(drawer).toBeHidden();
  });

  test("service page CTA pre-selects the service and the form sends", async ({ page }) => {
    let body: Record<string, unknown> = {};
    await page.route("**/api/contact", async (route) => {
      body = route.request().postDataJSON();
      return route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
    });
    await page.goto("/services/management-consulting/");
    await page.getByRole("main").getByRole("link", { name: "Let’s Talk" }).first().click();
    const drawer = page.getByRole("dialog");
    await expect(drawer.getByRole("combobox", { name: /Service you’re interested in/ })).toContainText(
      "Management Consulting",
    );
    await drawer.getByLabel("Full name").fill("Test Person");
    await drawer.getByLabel("Work email").fill("test@example.com");
    await drawer.getByLabel("Company or organization").fill("Example Co");
    await drawer.getByLabel("Tell us about your business and what you need").fill("We are reviewing our leadership structure.");
    await drawer.getByLabel(/I agree that BNX 24/).check();
    await drawer.getByRole("button", { name: "Send Message" }).click();
    await expect(drawer.getByRole("status")).toContainText("Your message has been sent.");
    expect(body).toMatchObject({ service: "management-consulting", company: "Example Co" });
  });

  test("on the contact page the CTA does not open a second form", async ({ page }) => {
    await page.goto("/contact/");
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Let’s Talk" }).click();
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(page.locator("form")).toHaveCount(1);
  });

  test("pages ship no drawer form markup until it is opened", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("dialog form")).toHaveCount(0);
  });
});

test.describe("contact drawer on mobile", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test("menu CTA closes the menu and opens a full-screen drawer", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).tap();
    await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "Let’s Talk" }).tap();
    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
    const box = await drawer.boundingBox();
    expect(box?.width).toBe(390);
    expect(box?.x).toBe(0);
  });
});
