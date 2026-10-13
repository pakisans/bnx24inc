import { expect, test } from "@playwright/test";
import { site } from "../src/content/site";

/**
 * The contact page must match its build-time configuration:
 *  - no endpoint: an honest email-only experience, no form.
 *  - endpoint set: a working form whose success state depends on the real response.
 * Form tests intercept the request, so nothing is ever sent to a real service.
 * Run them with `npm run test:form` (builds with a non-routable test endpoint).
 */
const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim();

test.describe("contact without a configured endpoint", () => {
  test.skip(!!endpoint, "Built with a form endpoint");

  test("shows email contact and no form", async ({ page }) => {
    await page.goto("/contact/");
    await expect(page.locator("form")).toHaveCount(0);
    const mail = page.getByRole("link", { name: "Email BNX 24" });
    await expect(mail).toHaveAttribute("href", new RegExp(`^mailto:${site.email}`));
    await expect(page.getByText(site.email).first()).toBeVisible();
  });
});

test.describe("contact form with a configured endpoint", () => {
  test.skip(!endpoint, "Built without a form endpoint");

  test("validates required fields accessibly", async ({ page }) => {
    let requests = 0;
    await page.route(endpoint!, (route) => {
      requests++;
      return route.fulfill({ status: 200, body: "{}" });
    });
    await page.goto("/contact/");
    await page.getByRole("button", { name: "Send Message" }).click();
    const name = page.getByLabel("Name");
    await expect(name).toHaveAttribute("aria-invalid", "true");
    await expect(name).toBeFocused();
    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await page.getByLabel("Work email").fill("not-an-email");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText(/valid email address/)).toBeVisible();
    expect(requests).toBe(0);
  });

  test("shows success only after the endpoint accepts the message", async ({ page }) => {
    let body: Record<string, string> = {};
    await page.route(endpoint!, async (route) => {
      body = route.request().postDataJSON();
      await new Promise((r) => setTimeout(r, 300));
      return route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
    });
    await page.goto("/contact/?interest=management-consulting");
    await expect(page.getByLabel("Area of interest")).toHaveValue("management-consulting");
    await page.getByLabel("Name").fill("Test Person");
    await page.getByLabel("Work email").fill("test@example.com");
    await page.getByLabel("How can we help?").fill("We are reviewing our leadership structure for next year.");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
    await expect(page.getByRole("status")).toContainText("Your message has been sent.");
    expect(body).toMatchObject({ name: "Test Person", email: "test@example.com", interest: "Management Consulting" });
  });

  test("shows an error and keeps the message when delivery fails", async ({ page }) => {
    await page.route(endpoint!, (route) => route.fulfill({ status: 500, body: "error" }));
    await page.goto("/contact/");
    await page.getByLabel("Name").fill("Test Person");
    await page.getByLabel("Work email").fill("test@example.com");
    await page.getByLabel("How can we help?").fill("We want to discuss our expansion plans in detail.");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByRole("alert").filter({ hasText: "could not be sent" })).toBeVisible();
    await expect(page.getByLabel("How can we help?")).toHaveValue(/expansion plans/);
    await expect(page.getByText("Your message has been sent.")).toHaveCount(0);
  });
});
