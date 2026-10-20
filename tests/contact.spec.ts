import { expect, test, type Page } from "@playwright/test";
import { site } from "../src/content/site";

/**
 * Contact form UI. Requests to /api/contact are intercepted, so nothing is
 * ever sent. The server function itself is covered in contact-api.spec.ts.
 */
const API = "**/api/contact";

async function fillValid(page: Page) {
  await page.getByLabel("Full name").fill("Test Person");
  await page.getByLabel("Work email").fill("test@example.com");
  await page.getByLabel("Company or organization").fill("Example Co");
  await page.getByLabel("Tell us about your business and what you need").fill("We are reviewing our leadership structure for next year.");
  await page.getByLabel(/I agree that BNX 24/).check();
}

async function chooseService(page: Page, name: string) {
  await page.getByRole("combobox", { name: /Service you’re interested in/ }).click();
  await page.getByRole("option", { name: new RegExp(`^${name}`) }).click();
}

test("shows the email address alongside the form", async ({ page }) => {
  await page.goto("/contact/");
  await expect(page.locator("main form")).toHaveCount(1);
  await expect(page.locator("main").getByRole("link", { name: site.email }).first()).toHaveAttribute(
    "href",
    new RegExp(`^mailto:${site.email}`),
  );
  await expect(page.locator("main").getByRole("link", { name: site.phone }).first()).toHaveAttribute(
    "href",
    "tel:+12065198855",
  );
});

test("validates required fields accessibly without sending", async ({ page }) => {
  let requests = 0;
  await page.route(API, (route) => {
    requests++;
    return route.fulfill({ status: 200, body: '{"ok":true}' });
  });
  await page.goto("/contact/");
  await page.getByRole("button", { name: "Send Message" }).click();
  const name = page.getByLabel("Full name");
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(name).toBeFocused();
  await expect(page.getByText("Please enter your full name.")).toBeVisible();
  await expect(page.getByText("Please choose the service you’re interested in.")).toBeVisible();
  await expect(page.getByText(/Please confirm we may use/)).toBeVisible();

  await page.getByLabel("Work email").fill("not-an-email");
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByText(/valid email address/)).toBeVisible();
  expect(requests).toBe(0);
});

test("custom service select works with the keyboard", async ({ page }) => {
  await page.goto("/contact/");
  const combo = page.getByRole("combobox", { name: /Service you’re interested in/ });
  await combo.focus();
  await page.keyboard.press("ArrowDown");
  await expect(combo).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("listbox")).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(combo).toHaveAttribute("aria-expanded", "false");
  await expect(combo).toContainText("Business Development & Growth");
  await expect(combo).toBeFocused();
  await page.keyboard.press("End");
  await page.keyboard.press("Enter");
  await expect(combo).toContainText("Other");
  await page.keyboard.press("Escape");
  await expect(page.getByLabel("What kind of help are you looking for?")).toBeVisible();
});

test("choosing Other requires a description and sends it", async ({ page }) => {
  let body: Record<string, unknown> = {};
  await page.route(API, async (route) => {
    body = route.request().postDataJSON();
    return route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
  await page.goto("/contact/");
  await fillValid(page);
  await chooseService(page, "Other");
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByText("Please tell us what kind of help you’re looking for.")).toBeVisible();
  await page.getByLabel("What kind of help are you looking for?").fill("Board preparation");
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByRole("status")).toContainText("Your message has been sent.");
  expect(body).toMatchObject({ service: "other", serviceOther: "Board preparation", consent: true, website: "" });
});

test("shows success only after the server accepts the message", async ({ page }) => {
  let body: Record<string, unknown> = {};
  await page.route(API, async (route) => {
    body = route.request().postDataJSON();
    await new Promise((r) => setTimeout(r, 300));
    return route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
  await page.goto("/contact/?interest=management-consulting");
  const combo = page.getByRole("combobox", { name: /Service you’re interested in/ });
  await expect(combo).toContainText("Management Consulting");
  await fillValid(page);
  await page.getByRole("combobox", { name: "When would you like to start?" }).click();
  await page.getByRole("option", { name: "Within 1–3 months" }).click();
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("Your message has been sent.");
  expect(body).toMatchObject({
    name: "Test Person",
    email: "test@example.com",
    company: "Example Co",
    service: "management-consulting",
    timeline: "1-3-months",
  });
  expect(typeof body.startedAt).toBe("number");
});

test("shows server validation errors on the right field", async ({ page }) => {
  await page.route(API, (route) =>
    route.fulfill({
      status: 422,
      contentType: "application/json",
      body: JSON.stringify({ ok: false, errors: { email: "Please enter a valid email address, like name@company.com." } }),
    }),
  );
  await page.goto("/contact/");
  await fillValid(page);
  await chooseService(page, "Not sure yet");
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByLabel("Work email")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByLabel("Work email")).toBeFocused();
});

test("shows an error and keeps the message when delivery fails", async ({ page }) => {
  await page.route(API, (route) => route.fulfill({ status: 502, body: '{"ok":false}' }));
  await page.goto("/contact/");
  await fillValid(page);
  await chooseService(page, "Business Strategy");
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByRole("alert").filter({ hasText: "could not be sent" })).toBeVisible();
  await expect(page.getByLabel("Tell us about your business and what you need")).toHaveValue(/leadership structure/);
  await expect(page.getByRole("combobox", { name: /Service you’re interested in/ })).toContainText("Business Strategy");
  await expect(page.getByText("Your message has been sent.")).toHaveCount(0);
});

test("consent links to the privacy policy in a new tab", async ({ page }) => {
  await page.goto("/contact/");
  const link = page.locator("main form").getByRole("link", { name: /Privacy Policy/ });
  await expect(link).toHaveAttribute("href", "/privacy-policy/");
  await expect(link).toHaveAttribute("target", "_blank");
});
