/**
 * POST /api/contact — Cloudflare Pages Function.
 *
 * Validates a contact form submission on the server and emails it to the
 * BNX 24 mailbox through the Resend API (https://resend.com/docs/api-reference/emails/send-email).
 * The visitor's address is set as Reply-To, so replying answers them directly.
 *
 * Configuration (Cloudflare Pages → Settings → Variables and Secrets):
 *   RESEND_API_KEY      required, secret. Without it the endpoint answers 503.
 *   CONTACT_TO_EMAIL    optional, defaults to office@bnx24inc.com.
 *   CONTACT_FROM_EMAIL  optional, defaults to "BNX 24 Website <website@bnx24inc.com>".
 *                       The domain must be verified in Resend.
 *   ALLOWED_ORIGINS     optional, comma-separated extra origins allowed to post
 *                       (the site's own origin is always allowed).
 */
import { services } from "../../src/content/services";
import {
  NOT_SURE_SERVICE,
  OTHER_SERVICE,
  companySizes,
  timelines,
  validateContact,
  type ContactPayload,
} from "../../src/lib/contact";

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  ALLOWED_ORIGINS?: string;
}

interface Context {
  request: Request;
  env: Env;
}

const MAX_BODY_BYTES = 32 * 1024;
/** Submissions faster than this after the form rendered are treated as bots. */
const MIN_FILL_MS = 2500;
const RESEND_URL = "https://api.resend.com/emails";

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function serviceLabel(data: ContactPayload) {
  if (data.service === OTHER_SERVICE) return `Other: ${data.serviceOther}`;
  if (data.service === NOT_SURE_SERVICE) return "Not sure yet";
  return services.find((s) => s.slug === data.service)?.title ?? data.service;
}

function buildEmail(data: ContactPayload) {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Job title", data.role],
    ["Company", data.company],
    ["Company size", companySizes.find((s) => s.value === data.companySize)?.label ?? ""],
    ["Service", serviceLabel(data)],
    ["Timeline", timelines.find((t) => t.value === data.timeline)?.label ?? ""],
  ];
  const filled = rows.filter(([, v]) => v);
  const subject = `New inquiry: ${serviceLabel(data)} · ${data.name}, ${data.company}`.slice(0, 200);

  const text = [
    "New inquiry from the BNX 24 website contact form.",
    "",
    ...filled.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    data.message,
    "",
    "Reply to this email to answer the sender directly.",
  ].join("\n");

  const cell = "padding:10px 0;border-bottom:1px solid #e4e1d8;vertical-align:top;font-size:14px;";
  const html = `<!doctype html><html><body style="margin:0;background:#f7f6f2;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#0d1824">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f6f2;padding:32px 16px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e4e1d8">
<tr><td style="background:#0b1f33;padding:24px 32px;color:#ffffff">
<div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#6fcfc2;font-weight:600">BNX 24 · Website inquiry</div>
<div style="margin-top:8px;font-size:22px;font-weight:600;line-height:1.25">${escapeHtml(serviceLabel(data))}</div>
</td></tr>
<tr><td style="padding:24px 32px 8px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${filled
  .map(
    ([k, v]) =>
      `<tr><td style="${cell}width:140px;color:#4a5866">${escapeHtml(k)}</td><td style="${cell}font-weight:500">${
        k === "Email" ? `<a href="mailto:${escapeHtml(v)}" style="color:#0e6b64">${escapeHtml(v)}</a>` : escapeHtml(v)
      }</td></tr>`,
  )
  .join("\n")}
</table></td></tr>
<tr><td style="padding:16px 32px 32px">
<div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#4a5866;font-weight:600">Message</div>
<div style="margin-top:10px;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.message)}</div>
</td></tr>
<tr><td style="padding:16px 32px;background:#edebe5;font-size:12px;color:#4a5866">Reply to this email to answer ${escapeHtml(data.name)} directly.</td></tr>
</table></td></tr></table></body></html>`;

  return { subject, text, html };
}

function originAllowed(request: Request, env: Env) {
  const origin = request.headers.get("Origin");
  // Non-browser clients may omit Origin; they still face validation and the honeypot.
  if (!origin) return true;
  const allowed = new Set([new URL(request.url).origin]);
  for (const o of (env.ALLOWED_ORIGINS ?? "").split(",")) if (o.trim()) allowed.add(o.trim().replace(/\/$/, ""));
  return allowed.has(origin);
}

export async function onRequestPost({ request, env }: Context): Promise<Response> {
  if (!originAllowed(request, env)) return json(403, { ok: false, error: "forbidden" });
  if (!(request.headers.get("Content-Type") ?? "").includes("application/json"))
    return json(415, { ok: false, error: "unsupported_media_type" });

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { ok: false, error: "too_large" });

  let input: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    input = parsed as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, error: "invalid_json" });
  }

  // Spam traps: a hidden field people never fill, and a minimum fill time.
  // Bots get a normal-looking success so they learn nothing.
  const startedAt = Number(input.startedAt);
  if (String(input.website ?? "") !== "" || (Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS)) {
    return json(200, { ok: true });
  }

  const { data, errors } = validateContact(
    input,
    services.map((s) => s.slug),
  );
  if (Object.keys(errors).length > 0) return json(422, { ok: false, error: "validation", errors });

  if (!env.RESEND_API_KEY) {
    console.error("contact: RESEND_API_KEY is not configured");
    return json(503, { ok: false, error: "not_configured" });
  }

  const { subject, text, html } = buildEmail(data);
  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL?.trim() || "BNX 24 Website <website@bnx24inc.com>",
        to: (env.CONTACT_TO_EMAIL?.trim() || "office@bnx24inc.com").split(",").map((s) => s.trim()),
        reply_to: `${data.name.replace(/[<>"]/g, "")} <${data.email}>`,
        subject,
        text,
        html,
      }),
    });
    if (!response.ok) {
      console.error(`contact: Resend responded ${response.status}: ${(await response.text()).slice(0, 300)}`);
      return json(502, { ok: false, error: "delivery_failed" });
    }
  } catch (error) {
    console.error("contact: Resend request failed", error);
    return json(502, { ok: false, error: "delivery_failed" });
  }

  return json(200, { ok: true });
}
