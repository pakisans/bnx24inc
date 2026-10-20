"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type MouseEvent, type ReactNode } from "react";
import {
  NOT_SURE_SERVICE,
  OTHER_SERVICE,
  companySizes,
  contactFieldOrder,
  contactLimits,
  timelines,
  validateContact,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact";
import { Arrow, buttonClass } from "./ButtonLink";
import { Select, type SelectOption } from "./Select";

type Status = "idle" | "submitting" | "success" | "error";

interface ContactFormProps {
  endpoint: string;
  email: string;
  phone: string;
  phoneHref: string;
  services: { value: string; label: string; number: string; focus: string }[];
  /** Service chosen by whatever opened the form; `nonce` re-applies the same value. */
  preset?: { service: string; nonce: number };
}

const formValues = (form: HTMLFormElement) => {
  const data = new FormData(form);
  return Object.fromEntries([...data.keys()].map((k) => [k, String(data.get(k) ?? "")]));
};

/**
 * Contact form that posts JSON to the site's own server function
 * (functions/api/contact.ts), which validates again and emails the inquiry.
 * Success is shown only when the server confirms delivery.
 */
export function ContactForm({ endpoint, email, phone, phoneHref, services, preset }: ContactFormProps) {
  const id = useId();
  const fid = (f: ContactField) => `${id}-${f}`;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [service, setService] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [timeline, setTimeline] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(0);

  const serviceValues = services.map((s) => s.value);
  const serviceOptions: SelectOption[] = [
    ...services.map((s) => ({ value: s.value, label: s.label, meta: s.number, description: s.focus })),
    {
      value: NOT_SURE_SERVICE,
      label: "Not sure yet",
      description: "Describe the situation and we’ll suggest where to start",
      separated: true,
    },
    { value: OTHER_SERVICE, label: "Other", description: "Something not listed here. Tell us below" },
  ];

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Pre-select the service: from the opener, or from ?interest=slug on the contact page.
  useEffect(() => {
    const interest = preset ? preset.service : new URLSearchParams(window.location.search).get("interest");
    if (interest && services.some((s) => s.value === interest)) setService(interest);
  }, [services, preset?.service, preset?.nonce]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (status === "success" || status === "error") resultRef.current?.focus();
  }, [status]);

  function focusField(field: ContactField) {
    document.getElementById(fid(field))?.focus();
  }

  /** After the first submit attempt, errors update as the visitor fixes them. */
  function revalidate() {
    if (!attempted || !formRef.current) return;
    setErrors(validateContact(formValues(formRef.current), serviceValues).errors);
  }

  // Selects are controlled, so revalidate once their new value is in the DOM.
  useEffect(revalidate, [service, companySize, timeline]); // eslint-disable-line react-hooks/exhaustive-deps

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = formValues(event.currentTarget);
    const { data, errors: found } = validateContact(values, serviceValues);
    setAttempted(true);
    setErrors(found);
    const firstInvalid = contactFieldOrder.find((f) => found[f]);
    if (firstInvalid) return focusField(firstInvalid);

    setStatus("submitting");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, website: values.website ?? "", startedAt: startedAt.current }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; errors?: ContactErrors };
      if (response.status === 422 && result.errors) {
        setErrors(result.errors);
        setStatus("idle");
        const first = contactFieldOrder.find((f) => result.errors?.[f]);
        if (first) requestAnimationFrame(() => focusField(first));
        return;
      }
      if (!response.ok || result.ok !== true) throw new Error(`Contact endpoint responded with ${response.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setService("");
    setCompanySize("");
    setTimeline("");
    setMessageLength(0);
    setErrors({});
    setAttempted(false);
    startedAt.current = Date.now();
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="rounded-sm border border-teal/30 bg-white p-8 focus:outline-none md:p-12"
      >
        <span
          aria-hidden="true"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-teal text-white"
        >
          <svg viewBox="0 0 16 16" className="h-5 w-5" focusable="false">
            <path d="M2.5 8.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </span>
        <p className="eyebrow mt-8">Message sent</p>
        <h2 className="h3 mt-4">Thank you. Your message has been sent.</h2>
        <p className="mt-4 max-w-md text-slate">
          We’ll read it and reply by email. If you’d like to add anything in the meantime, write to{" "}
          <a href={`mailto:${email}`} className="text-link">
            {email}
          </a>
          .
        </p>
        <button type="button" onClick={reset} className="text-link mt-8 min-h-11 font-display font-medium">
          Send another message
        </button>
      </div>
    );
  }

  const described = (f: ContactField, ...extra: string[]) =>
    [...extra, errors[f] ? `${fid(f)}-error` : ""].filter(Boolean).join(" ") || undefined;

  const input = (f: ContactField) => ({
    id: fid(f),
    name: f,
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": described(f),
    onChange: revalidate,
    className: "field-control mt-2",
  });

  const errorText = (f: ContactField) =>
    errors[f] ? (
      <p id={`${fid(f)}-error`} className="field-error">
        {errors[f]}
      </p>
    ) : null;

  const label = (f: ContactField, text: string, required: boolean) => (
    <label
      id={`${fid(f)}-label`}
      htmlFor={fid(f)}
      className="field-label"
      // A label click on the custom select should focus it, not toggle it open.
      onClick={
        f === "service" || f === "companySize" || f === "timeline"
          ? (e: MouseEvent) => {
              e.preventDefault();
              focusField(f);
            }
          : undefined
      }
    >
      {text}
      {required ? (
        <span aria-hidden="true" className="ml-0.5 text-teal">
          *
        </span>
      ) : (
        <span className="field-optional">Optional</span>
      )}
    </label>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${id}-required`}>
      <fieldset disabled={status === "submitting"} className="min-w-0">
        <legend className="sr-only">Tell us about your business</legend>
        <p id={`${id}-required`} className="text-sm text-slate">
          Fields marked <span aria-hidden="true" className="text-teal">*</span>
          <span className="sr-only">with an asterisk</span> are required.
        </p>

        <FormGroup number="01" title="About you">
          <div>
            {label("name", "Full name", true)}
            <input {...input("name")} type="text" autoComplete="name" maxLength={contactLimits.name} required />
            {errorText("name")}
          </div>
          <div>
            {label("email", "Work email", true)}
            <input
              {...input("email")}
              type="email"
              autoComplete="email"
              inputMode="email"
              spellCheck={false}
              maxLength={contactLimits.email}
              required
            />
            {errorText("email")}
          </div>
          <div>
            {label("phone", "Phone", false)}
            <input {...input("phone")} type="tel" autoComplete="tel" maxLength={contactLimits.phone} />
            {errorText("phone")}
          </div>
          <div>
            {label("role", "Job title", false)}
            <input
              {...input("role")}
              type="text"
              autoComplete="organization-title"
              maxLength={contactLimits.role}
            />
            {errorText("role")}
          </div>
        </FormGroup>

        <FormGroup number="02" title="Your company">
          <div>
            {label("company", "Company or organization", true)}
            <input
              {...input("company")}
              type="text"
              autoComplete="organization"
              maxLength={contactLimits.company}
              required
            />
            {errorText("company")}
          </div>
          <div>
            {label("companySize", "Company size", false)}
            <Select
              id={fid("companySize")}
              name="companySize"
              value={companySize}
              onChange={setCompanySize}
              placeholder="Select a size"
              options={[...companySizes]}
            />
          </div>
        </FormGroup>

        <FormGroup number="03" title="How we can help">
          <div className="sm:col-span-2">
            {label("service", "Service you’re interested in", true)}
            <Select
              id={fid("service")}
              name="service"
              value={service}
              onChange={setService}
              placeholder="Choose a service"
              options={serviceOptions}
              variant="rich"
              required
              invalid={!!errors.service}
              describedBy={described("service")}
            />
            {errorText("service")}
          </div>

          {service === OTHER_SERVICE ? (
            <div className="enter sm:col-span-2" style={{ animationDuration: "350ms" }}>
              {label("serviceOther", "What kind of help are you looking for?", true)}
              <input
                {...input("serviceOther")}
                type="text"
                maxLength={contactLimits.serviceOther}
                placeholder="For example: pricing review, board preparation, partner search"
                required
              />
              {errorText("serviceOther")}
            </div>
          ) : null}

          <div className="sm:col-span-2">
            {label("timeline", "When would you like to start?", false)}
            <Select
              id={fid("timeline")}
              name="timeline"
              value={timeline}
              onChange={setTimeline}
              placeholder="Select a timeframe"
              options={[...timelines]}
            />
          </div>

          <div className="sm:col-span-2">
            {label("message", "Tell us about your business and what you need", true)}
            <p id={`${fid("message")}-hint`} className="mt-1 text-sm text-slate">
              A few sentences about the situation or decision you’re facing is enough.
            </p>
            <textarea
              {...input("message")}
              aria-describedby={described("message", `${fid("message")}-hint`, `${fid("message")}-count`)}
              onChange={(e) => {
                setMessageLength(e.currentTarget.value.length);
                revalidate();
              }}
              rows={7}
              maxLength={contactLimits.message}
              required
              className="field-control mt-3 resize-y"
            />
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">{errorText("message")}</div>
              <p
                id={`${fid("message")}-count`}
                className={`mt-2 text-[0.8125rem] tabular-nums ${messageLength > contactLimits.message * 0.9 ? "text-[#a12c2c]" : "text-slate"}`}
              >
                <span className="sr-only">Characters used: </span>
                {messageLength.toLocaleString("en-US")} / {contactLimits.message.toLocaleString("en-US")}
              </p>
            </div>
          </div>
        </FormGroup>

        <div className="mt-10 border-t border-navy-900/15 pt-8">
          <div className="flex gap-3.5">
            <input
              id={fid("consent")}
              name="consent"
              type="checkbox"
              required
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={described("consent")}
              onChange={revalidate}
              className="mt-0.5 h-5 w-5 flex-none cursor-pointer rounded-[3px] accent-teal"
            />
            <label htmlFor={fid("consent")} className="cursor-pointer text-[0.9375rem] leading-snug text-ink">
              I agree that BNX 24 may use the details I’ve provided to reply to my inquiry, as described in the{" "}
              <a href="/privacy-policy/" target="_blank" rel="noopener" className="text-link">
                Privacy Policy
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
              <span aria-hidden="true" className="ml-0.5 text-teal">
                *
              </span>
            </label>
          </div>
          {errorText("consent")}
          <p className="mt-4 text-sm text-slate">
            Please don’t include confidential financial, legal, or personal information in your first message.
          </p>
        </div>

        {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${id}-website`}>Website</label>
          <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {status === "error" ? (
          <div
            ref={resultRef}
            tabIndex={-1}
            role="alert"
            className="mt-8 rounded-sm border-l-4 border-[#A12C2C] bg-white p-5 text-[0.9375rem] focus:outline-none"
          >
            <p className="font-semibold text-navy-900">Your message could not be sent.</p>
            <p className="mt-1 text-slate">
              Nothing you typed has been lost. Please try again in a moment, email us directly at{" "}
              <a href={`mailto:${email}`} className="text-link">
                {email}
              </a>
              , or call{" "}
              <a href={phoneHref} className="text-link whitespace-nowrap">
                {phone}
              </a>
              .
            </p>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            type="submit"
            className={buttonClass("primary", "min-h-14 px-8 disabled:cursor-wait disabled:opacity-75")}
          >
            {status === "submitting" ? (
              <>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white motion-reduce:animate-none"
                />
                Sending…
              </>
            ) : (
              <>
                Send Message
                <Arrow />
              </>
            )}
          </button>
          <p aria-live="polite" className="text-sm text-slate">
            {status === "submitting" ? "Sending your message…" : "We reply by email."}
          </p>
        </div>
      </fieldset>
    </form>
  );
}

function FormGroup({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <fieldset className="mt-10 min-w-0 border-t border-navy-900/15 pt-7 first-of-type:mt-8">
      <legend className="float-left mb-6 flex w-full items-baseline gap-3 font-display text-[1.125rem] font-medium tracking-[-0.01em] text-navy-900">
        <span aria-hidden="true" className="index-num">
          {number}
        </span>
        {title}
      </legend>
      <div className="clear-left grid gap-x-6 gap-y-6 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}
