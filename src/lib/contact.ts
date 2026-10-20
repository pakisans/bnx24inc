/**
 * Contact form contract shared by the browser form and the server function
 * (functions/api/contact.ts). Keep this file free of path aliases and
 * framework imports so the Cloudflare Pages Functions bundler can include it.
 */

export const OTHER_SERVICE = "other";
export const NOT_SURE_SERVICE = "not-sure";

export const companySizes = [
  { value: "1-10", label: "1–10 employees" },
  { value: "11-50", label: "11–50 employees" },
  { value: "51-200", label: "51–200 employees" },
  { value: "201-500", label: "201–500 employees" },
  { value: "500+", label: "More than 500 employees" },
] as const;

export const timelines = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "Within 1–3 months" },
  { value: "3-6-months", label: "In 3–6 months" },
  { value: "exploring", label: "Just exploring for now" },
] as const;

export const contactLimits = {
  name: 120,
  email: 254,
  phone: 32,
  company: 160,
  role: 120,
  serviceOther: 160,
  messageMin: 20,
  message: 5000,
} as const;

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  companySize: string;
  service: string;
  serviceOther: string;
  timeline: string;
  message: string;
  consent: boolean;
}

export type ContactField = keyof ContactPayload;
export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s().-]{7,}$/;

const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.replace(/\r\n?/g, "\n").trim().slice(0, max * 2) : "";
/** Single-line values: no line breaks, collapsed whitespace. */
const line = (value: unknown, max: number) => text(value, max).replace(/\s+/g, " ");

/** Field order matters: the first error is the field that receives focus. */
export const contactFieldOrder: ContactField[] = [
  "name",
  "email",
  "phone",
  "role",
  "company",
  "companySize",
  "service",
  "serviceOther",
  "timeline",
  "message",
  "consent",
];

/**
 * Normalizes and validates a submission. `serviceValues` are the slugs of the
 * services that can be chosen; "other" and "not-sure" are always allowed.
 */
export function validateContact(
  input: Record<string, unknown>,
  serviceValues: readonly string[],
): { data: ContactPayload; errors: ContactErrors } {
  const data: ContactPayload = {
    name: line(input.name, contactLimits.name),
    email: line(input.email, contactLimits.email).toLowerCase(),
    phone: line(input.phone, contactLimits.phone),
    company: line(input.company, contactLimits.company),
    role: line(input.role, contactLimits.role),
    companySize: line(input.companySize, 20),
    service: line(input.service, 80),
    serviceOther: line(input.serviceOther, contactLimits.serviceOther),
    timeline: line(input.timeline, 20),
    message: text(input.message, contactLimits.message),
    consent: input.consent === true || input.consent === "on" || input.consent === "true",
  };
  const errors: ContactErrors = {};

  if (!data.name) errors.name = "Please enter your full name.";
  else if (data.name.length > contactLimits.name) errors.name = "Please shorten your name.";

  if (!data.email) errors.email = "Please enter your work email.";
  else if (data.email.length > contactLimits.email || !EMAIL_PATTERN.test(data.email))
    errors.email = "Please enter a valid email address, like name@company.com.";

  if (data.phone && (data.phone.length > contactLimits.phone || !PHONE_PATTERN.test(data.phone)))
    errors.phone = "Please enter a valid phone number, or leave this field empty.";

  if (data.role.length > contactLimits.role) errors.role = "Please shorten your job title.";

  if (!data.company) errors.company = "Please enter your company or organization.";
  else if (data.company.length > contactLimits.company) errors.company = "Please shorten the company name.";

  if (data.companySize && !companySizes.some((s) => s.value === data.companySize)) data.companySize = "";
  if (data.timeline && !timelines.some((t) => t.value === data.timeline)) data.timeline = "";

  const allowed = [...serviceValues, OTHER_SERVICE, NOT_SURE_SERVICE];
  if (!data.service) errors.service = "Please choose the service you’re interested in.";
  else if (!allowed.includes(data.service)) errors.service = "Please choose a service from the list.";

  if (data.service === OTHER_SERVICE) {
    if (!data.serviceOther) errors.serviceOther = "Please tell us what kind of help you’re looking for.";
    else if (data.serviceOther.length > contactLimits.serviceOther) errors.serviceOther = "Please keep this short.";
  } else {
    data.serviceOther = "";
  }

  if (!data.message) errors.message = "Please tell us a little about your business and what you need.";
  else if (data.message.length < contactLimits.messageMin)
    errors.message = `Please add a bit more detail (at least ${contactLimits.messageMin} characters).`;
  else if (data.message.length > contactLimits.message)
    errors.message = `Please keep your message under ${contactLimits.message.toLocaleString("en-US")} characters.`;

  if (!data.consent) errors.consent = "Please confirm we may use these details to reply to you.";

  return { data, errors };
}
