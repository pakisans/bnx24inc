import { expect, test } from "@playwright/test";
import { onRequestPost } from "../functions/api/contact";

/**
 * Server function tests. The handler runs directly in Node; the Resend API is
 * replaced with a stub, so no email is sent.
 */
const ORIGIN = "https://www.bnx24inc.com";
const env = { RESEND_API_KEY: "re_test", CONTACT_TO_EMAIL: "office@bnx24inc.com" };

const valid = {
  name: "Test Person",
  email: "Test@Example.com",
  phone: "+1 (555) 010-0000",
  company: "Example Co",
  role: "COO",
  companySize: "11-50",
  service: "management-consulting",
  serviceOther: "",
  timeline: "asap",
  message: "We are reviewing our leadership structure for next year.",
  consent: true,
  website: "",
  startedAt: 0,
};

const post = (body: unknown, headers: Record<string, string> = {}) =>
  new Request(`${ORIGIN}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: ORIGIN, ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

let sent: { url: string; init: RequestInit }[] = [];
let resendStatus = 200;
const realFetch = globalThis.fetch;

test.beforeEach(() => {
  sent = [];
  resendStatus = 200;
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    sent.push({ url, init });
    return new Response('{"id":"test"}', { status: resendStatus });
  }) as typeof fetch;
});
test.afterEach(() => {
  globalThis.fetch = realFetch;
});

test("sends a valid inquiry through Resend with Reply-To set", async () => {
  const res = await onRequestPost({ request: post(valid), env });
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({ ok: true });
  expect(sent).toHaveLength(1);
  expect(sent[0]!.url).toBe("https://api.resend.com/emails");
  expect((sent[0]!.init.headers as Record<string, string>).Authorization).toBe("Bearer re_test");
  const mail = JSON.parse(String(sent[0]!.init.body));
  expect(mail.to).toEqual(["office@bnx24inc.com"]);
  expect(mail.reply_to).toBe("Test Person <test@example.com>");
  expect(mail.subject).toBe("New inquiry: Management Consulting · Test Person, Example Co");
  expect(mail.text).toContain("Company size: 11–50 employees");
  expect(mail.text).toContain("Timeline: As soon as possible");
});

test("escapes HTML and labels Other requests", async () => {
  const res = await onRequestPost({
    request: post({ ...valid, service: "other", serviceOther: "<b>Board</b> prep", name: "A <script>" }),
    env,
  });
  expect(res.status).toBe(200);
  const mail = JSON.parse(String(sent[0]!.init.body));
  expect(mail.subject).toContain("Other: <b>Board</b> prep");
  expect(mail.html).toContain("&lt;b&gt;Board&lt;/b&gt; prep");
  expect(mail.html).not.toContain("<script>");
  expect(mail.reply_to).toBe("A script <test@example.com>");
});

test("rejects invalid submissions with field errors", async () => {
  const res = await onRequestPost({
    request: post({ ...valid, email: "nope", service: "made-up", consent: false, message: "short" }),
    env,
  });
  expect(res.status).toBe(422);
  const body = await res.json();
  expect(Object.keys(body.errors).sort()).toEqual(["consent", "email", "message", "service"]);
  expect(sent).toHaveLength(0);
});

test("requires a description when Other is chosen", async () => {
  const res = await onRequestPost({ request: post({ ...valid, service: "other" }), env });
  expect(res.status).toBe(422);
  expect((await res.json()).errors).toHaveProperty("serviceOther");
});

test("quietly drops honeypot and too-fast submissions", async () => {
  const trap = await onRequestPost({ request: post({ ...valid, website: "spam.example" }), env });
  const fast = await onRequestPost({ request: post({ ...valid, startedAt: Date.now() }), env });
  expect(trap.status).toBe(200);
  expect(fast.status).toBe(200);
  expect(sent).toHaveLength(0);
});

test("refuses other origins, non-JSON and oversized bodies", async () => {
  expect((await onRequestPost({ request: post(valid, { Origin: "https://evil.example" }), env })).status).toBe(403);
  expect((await onRequestPost({ request: post("x", { "Content-Type": "text/plain" }), env })).status).toBe(415);
  expect((await onRequestPost({ request: post("{not json"), env })).status).toBe(400);
  expect((await onRequestPost({ request: post({ ...valid, message: "x".repeat(40_000) }), env })).status).toBe(413);
  expect(sent).toHaveLength(0);
});

test("reports missing configuration and delivery failures honestly", async () => {
  expect((await onRequestPost({ request: post(valid), env: {} })).status).toBe(503);
  resendStatus = 500;
  expect((await onRequestPost({ request: post(valid), env })).status).toBe(502);
});
