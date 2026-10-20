import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { integrations, primaryCta, site } from "@/content/site";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Contact BNX 24",
  description:
    "Tell BNX 24 about your business and the decisions in front of you. Email office@bnx24inc.com or call +1 (206) 519-8855 to start a conversation.",
  path: "/contact/",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact/" },
];

const helpfulDetails = [
  "What your business does, and roughly how large it is",
  "The situation, problem, or decision that prompted you to reach out",
  "What you have already tried or considered",
  "Any timing that matters, such as a budget cycle, a launch, or a deadline",
  "Who else will be involved in the decision",
];

const nextSteps = [
  {
    title: "We read your message",
    body: "We review what you’ve shared and reply by email.",
  },
  {
    title: "A conversation, if there’s a fit",
    body: "We suggest a time to talk through your situation and the decisions in front of you.",
  },
  {
    title: "A written scope before any work",
    body: "Objectives, activities, deliverables, timing, and fees are agreed in writing first.",
  },
];

export default function ContactPage() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Business consulting inquiry")}`;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <section
        aria-label="Contact BNX 24"
        className="lg:bg-[linear-gradient(to_right,var(--color-navy-900)_50%,var(--color-paper)_50%)]"
      >
        <div className="container-site grid lg:grid-cols-12 lg:gap-12">
          {/* Invitation and expectations */}
          <div className="on-dark -mx-5 bg-navy-900 px-5 pt-8 pb-16 text-white sm:-mx-8 sm:px-8 lg:col-span-5 lg:mx-0 lg:bg-transparent lg:px-0 lg:pt-10 lg:pb-28 lg:pr-6">
            <Breadcrumbs items={crumbs} onDark />
            <div className="enter mt-14 md:mt-20">
              <p className="eyebrow mb-7">Contact</p>
              <h1 className="display text-white">{primaryCta.heading}</h1>
              <p className="lede mt-8 max-w-md">
                Tell us what’s happening in your business and what you’d like to change. A short description is enough
                to start the conversation.
              </p>
            </div>

            <div className="mt-14 md:mt-16">
              <h2 className="font-display text-[0.6875rem] font-semibold tracking-[0.16em] text-teal-light uppercase">
                What happens next
              </h2>
              <ol className="mt-6 space-y-6">
                {nextSteps.map((step, i) => (
                  <li key={step.title} className="grid grid-cols-[2.25rem_1fr] gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-teal-light/60 font-display text-[0.8125rem] font-semibold text-teal-light"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-[1.125rem] font-medium text-white">{step.title}</h3>
                      <p className="mt-1 text-[0.9375rem] text-slate-light">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-14 border-t border-white/15 pt-8 md:mt-16">
              <h2 className="font-display text-[0.6875rem] font-semibold tracking-[0.16em] text-teal-light uppercase">
                Reach us directly
              </h2>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-sm text-slate-light">Email</dt>
                  <dd className="mt-1">
                    <a
                      href={mailto}
                      className="font-display text-[1.375rem] font-medium tracking-[-0.015em] [overflow-wrap:anywhere] text-white underline decoration-teal-light/60 underline-offset-[6px] hover:decoration-teal-light"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-light">Phone</dt>
                  <dd className="mt-1">
                    <a
                      href={site.phoneHref}
                      className="font-display text-[1.375rem] font-medium tracking-[-0.015em] whitespace-nowrap text-white underline decoration-teal-light/60 underline-offset-[6px] hover:decoration-teal-light"
                    >
                      {site.phone}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Form or email panel */}
          <div className="py-16 lg:col-span-6 lg:col-start-7 lg:pt-36 lg:pb-28">
            <div className="rounded-sm border border-navy-900/10 bg-white p-6 shadow-[0_30px_60px_-45px_rgb(11_31_51/0.5)] sm:p-8 md:p-10">
              <h2 className="h2">Send us a message</h2>
              <p className="mt-4 text-slate">
                Prefer to email or call? Write to{" "}
                <a href={mailto} className="text-link">
                  {site.email}
                </a>{" "}
                or call{" "}
                <a href={site.phoneHref} className="text-link whitespace-nowrap">
                  {site.phone}
                </a>
                .
              </p>
              <div className="mt-8">
                <ContactForm
                  endpoint={integrations.contactFormEndpoint}
                  email={site.email}
                  phone={site.phone}
                  phoneHref={site.phoneHref}
                  services={services.map((s) => ({
                    value: s.slug,
                    label: s.title,
                    number: s.number,
                    focus: s.focus,
                  }))}
                />
              </div>
            </div>

            <div className="mt-14">
              <h2 id="prepare-heading" className="h3">
                What helps for a first conversation
              </h2>
              <p className="mt-3 text-slate">You don’t need a formal brief. Any of the following is useful:</p>
              <ul className="mt-6 grid gap-x-8 border-t border-navy-900/15 sm:grid-cols-2">
                {helpfulDetails.map((d) => (
                  <li key={d} className="flex gap-3 border-b border-navy-900/15 py-4 text-[0.9375rem]">
                    <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 flex-none bg-teal" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
