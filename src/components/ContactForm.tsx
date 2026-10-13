"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;

interface ContactFormProps {
  endpoint: string;
  email: string;
  interests: { value: string; label: string }[];
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  if (!name) errors.name = "Please enter your name.";
  if (!email) errors.email = "Please enter your work email.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address, like name@company.com.";
  if (!message) errors.message = "Please tell us a little about your business needs.";
  else if (message.length < 20) errors.message = "Please add a bit more detail (at least 20 characters).";
  return errors;
}

/**
 * Posts JSON to a third-party form endpoint and reports success only when the
 * endpoint returns a 2xx response. Server-side validation, spam filtering and
 * delivery are the receiving service's responsibility.
 */
export function ContactForm({ endpoint, email, interests }: ContactFormProps) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const interestRef = useRef<HTMLSelectElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Pre-select the area of interest when arriving from a service page (?interest=slug).
  useEffect(() => {
    const interest = new URLSearchParams(window.location.search).get("interest");
    const select = interestRef.current;
    if (interest && select && interests.some((i) => i.value === interest)) select.value = interest;
  }, [interests]);

  useEffect(() => {
    if (status === "success" || status === "error") resultRef.current?.focus();
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as FieldName[])[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    const interestValue = String(data.get("interest") ?? "");
    const payload = {
      name: String(data.get("name")).trim(),
      email: String(data.get("email")).trim(),
      company: String(data.get("company") ?? "").trim(),
      interest: interests.find((i) => i.value === interestValue)?.label ?? "",
      message: String(data.get("message")).trim(),
      _gotcha: String(data.get("_gotcha") ?? ""),
      _subject: "New inquiry from the BNX 24 website",
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Form endpoint responded with ${response.status}`);
      setStatus("success");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="border border-teal/40 bg-white p-8 focus:outline-none md:p-10"
      >
        <p className="eyebrow">Message sent</p>
        <h2 className="h3 mt-4">Thank you. Your message has been sent.</h2>
        <p className="mt-3 text-slate">
          We’ll read it and reply by email. If you need to add anything in the meantime, write to{" "}
          <a href={`mailto:${email}`} className="text-link">
            {email}
          </a>
          .
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="text-link mt-6 min-h-11 font-medium">
          Send another message
        </button>
      </div>
    );
  }

  const field = (name: FieldName) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
  });

  const inputClass =
    "mt-2 block w-full rounded-[3px] border border-navy-900/25 bg-white px-4 py-3 text-base text-ink placeholder:text-slate/70 transition-colors hover:border-navy-900/50 focus:border-teal focus:outline-2 focus:outline-offset-0 focus:outline-teal aria-[invalid=true]:border-[#A12C2C]";

  const errorText = (name: FieldName) =>
    errors[name] ? (
      <p id={`${id}-${name}-error`} className="mt-2 text-sm font-medium text-[#A12C2C]">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${id}-required`}>
      <fieldset disabled={status === "submitting"} className="space-y-6">
        <legend className="sr-only">Tell us about your business</legend>
        <p id={`${id}-required`} className="text-sm text-slate">
          Fields marked <span aria-hidden="true">*</span>
          <span className="sr-only">with an asterisk</span> are required.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-name`} className="font-medium text-navy-900">
              Name <span aria-hidden="true">*</span>
            </label>
            <input {...field("name")} type="text" autoComplete="name" required className={inputClass} />
            {errorText("name")}
          </div>
          <div>
            <label htmlFor={`${id}-email`} className="font-medium text-navy-900">
              Work email <span aria-hidden="true">*</span>
            </label>
            <input
              {...field("email")}
              type="email"
              autoComplete="email"
              inputMode="email"
              spellCheck={false}
              required
              className={inputClass}
            />
            {errorText("email")}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-company`} className="font-medium text-navy-900">
              Company <span className="font-normal text-slate">(optional)</span>
            </label>
            <input id={`${id}-company`} name="company" type="text" autoComplete="organization" className={inputClass} />
          </div>
          <div>
            <label htmlFor={`${id}-interest`} className="font-medium text-navy-900">
              Area of interest <span className="font-normal text-slate">(optional)</span>
            </label>
            <div className="relative">
              <select
                ref={interestRef}
                id={`${id}-interest`}
                name="interest"
                defaultValue=""
                className={`${inputClass} appearance-none pr-11`}
              >
                <option value="">Select an area</option>
                {interests.map((i) => (
                  <option key={i.value} value={i.value}>
                    {i.label}
                  </option>
                ))}
                <option value="not-sure">Not sure yet</option>
              </select>
              <svg
                viewBox="0 0 16 16"
                className="pointer-events-none absolute top-1/2 right-4 mt-1 h-4 w-4 -translate-y-1/2 text-navy-900"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor={`${id}-message`} className="font-medium text-navy-900">
            How can we help? <span aria-hidden="true">*</span>
          </label>
          <p id={`${id}-message-hint`} className="mt-1 text-sm text-slate">
            A few sentences about your business and the situation or decision you’re facing.
          </p>
          <textarea
            {...field("message")}
            aria-describedby={[`${id}-message-hint`, errors.message ? `${id}-message-error` : ""]
              .filter(Boolean)
              .join(" ")}
            rows={6}
            required
            className={`${inputClass} resize-y`}
          />
          {errorText("message")}
        </div>

        {/* Honeypot for the form provider's spam filtering. Hidden from people and assistive tech. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${id}-gotcha`}>Leave this field empty</label>
          <input id={`${id}-gotcha`} name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {status === "error" ? (
          <div
            ref={resultRef}
            tabIndex={-1}
            role="alert"
            className="border-l-4 border-[#A12C2C] bg-white p-5 text-[0.9375rem] focus:outline-none"
          >
            <p className="font-semibold text-navy-900">Your message could not be sent.</p>
            <p className="mt-1 text-slate">
              Please try again in a moment, or email us directly at{" "}
              <a href={`mailto:${email}`} className="text-link">
                {email}
              </a>
              .
            </p>
          </div>
        ) : null}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center rounded-[3px] bg-teal px-7 font-semibold text-white transition-colors hover:bg-teal-deep disabled:cursor-wait disabled:opacity-70"
          >
            {status === "submitting" ? "Sending…" : "Send Message"}
          </button>
          <p aria-live="polite" className="text-sm text-slate">
            {status === "submitting" ? "Sending your message…" : ""}
          </p>
        </div>
      </fieldset>
    </form>
  );
}
