import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { integrations, primaryCta, site } from "@/content/site";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Contact BNX 24",
  description:
    "Tell BNX 24 about your business and the decisions in front of you. Reach us at office@bnx24consulting.com to start a conversation about consulting support.",
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

export default function ContactPage() {
  const endpoint = integrations.contactFormEndpoint;
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Business consulting inquiry")}`;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        above={<Breadcrumbs items={crumbs} />}
        eyebrow="Contact"
        title={primaryCta.heading}
        lede="Tell us what’s happening in your business and what you’d like to change. A short description is enough to start the conversation."
      />

      <section aria-label="Contact BNX 24" className="py-16 md:py-24">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {endpoint ? (
              <>
                <h2 className="h2">Send us a message</h2>
                <p className="mt-4 mb-10 text-slate">
                  Prefer email? Write to{" "}
                  <a href={mailto} className="text-link">
                    {site.email}
                  </a>
                  .
                </p>
                <ContactForm
                  endpoint={endpoint}
                  email={site.email}
                  interests={services.map((s) => ({ value: s.slug, label: s.title }))}
                />
              </>
            ) : (
              <div className="frame on-dark bg-navy-900 p-8 text-white sm:p-10 md:p-12">
                <h2 className="h2 text-white">Email us about your business</h2>
                <p className="lede mt-5">
                  The best way to reach BNX 24 is by email. Describe your business and what you’d like help with, and
                  we’ll reply to arrange a conversation.
                </p>
                <p className="mt-8 font-serif text-2xl [overflow-wrap:anywhere] text-white sm:text-3xl">{site.email}</p>
                <a
                  href={mailto}
                  className="mt-8 inline-flex min-h-12 items-center justify-center rounded-[3px] bg-paper px-6 font-semibold text-navy-900 transition-colors hover:bg-white"
                >
                  Email BNX 24
                </a>
                <p className="mt-4 text-sm text-slate-light">
                  The button opens your email app. If it doesn’t, copy the address above.
                </p>
              </div>
            )}
          </div>

          <aside aria-labelledby="prepare-heading" className="lg:col-span-4 lg:col-start-9">
            <h2 id="prepare-heading" className="h3">
              What helps for a first conversation
            </h2>
            <p className="mt-3 text-slate">You don’t need a formal brief. Any of the following is useful:</p>
            <ul className="mt-6 border-t border-line">
              {helpfulDetails.map((d) => (
                <li key={d} className="flex gap-3 border-b border-line py-3.5 text-[0.9375rem]">
                  <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 flex-none bg-teal" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            <h2 className="h3 mt-12">What happens next</h2>
            <p className="mt-3 text-[0.9375rem] text-slate">
              We’ll review your message and reply by email. If there appears to be a fit, we’ll suggest a time to talk
              through your situation. Any engagement is scoped and agreed in writing before work begins.
            </p>

            <p className="mt-10 border-l-2 border-teal pl-4 text-sm text-slate">
              Please don’t include confidential financial, legal, or personal information in your first message.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
