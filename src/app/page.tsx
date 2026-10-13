import Link from "next/link";
import { ApproachSteps } from "@/components/ApproachSteps";
import { Arrow, ButtonLink } from "@/components/ButtonLink";
import { CtaSection } from "@/components/CtaSection";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceIndex } from "@/components/ServiceIndex";
import { challenges, clientTypes, homeFaqs, principles } from "@/content/company";
import { primaryCta, site } from "@/content/site";
import { getService, servicePath, services, type ServiceSlug } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { websiteJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "BNX 24 Inc. | Business Consulting for U.S. Companies",
  absoluteTitle: true,
  description:
    "Practical business consulting for owners and leadership teams across the U.S.: strategy and planning, operations, management, research, and growth decisions.",
  path: "/",
});

const heroQuestions: { q: string; slug: ServiceSlug }[] = [
  { q: "Which priorities deserve our time and budget this year?", slug: "business-strategy-planning" },
  { q: "Where is work getting stuck between people and teams?", slug: "business-operations-consulting" },
  { q: "Is this growth opportunity worth pursuing?", slug: "business-development-growth" },
  { q: "Are we ready to expand, and in what order?", slug: "business-expansion-strategic-advisory" },
];

function serviceTitle(slug: ServiceSlug) {
  return getService(slug)?.title ?? slug;
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="container-site grid gap-14 pt-12 pb-16 md:pt-20 md:pb-24 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-7">{site.slogan}</p>
            <h1 className="display">Business consulting that turns hard decisions into a clear plan.</h1>
            <p className="lede mt-7 max-w-2xl">
              BNX 24 Inc. helps owners and leadership teams across the United States set priorities, improve how their
              organizations run, and evaluate opportunities for growth, with practical recommendations built around
              the business you actually have.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primaryCta.href}>
                {primaryCta.label}
                <Arrow />
              </ButtonLink>
              <ButtonLink href="/services/" variant="secondary">
                Explore Services
              </ButtonLink>
            </div>
          </div>

          <aside aria-labelledby="hero-questions" className="lg:col-span-5 lg:pt-3">
            <div className="frame on-dark bg-navy-900 p-7 text-white sm:p-9">
              <h2 id="hero-questions" className="font-sans text-xs font-semibold tracking-[0.14em] text-teal-light uppercase">
                Questions we help answer
              </h2>
              <ul className="mt-6 divide-y divide-line-dark border-y border-line-dark">
                {heroQuestions.map((item) => (
                  <li key={item.slug}>
                    <Link href={servicePath(item.slug)} className="group block py-4">
                      <span className="block font-serif text-xl leading-snug text-white group-hover:text-teal-light">
                        {item.q}
                      </span>
                      <span className="mt-1.5 block text-sm text-slate-light">{serviceTitle(item.slug)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-light">
                <span className="sr-only">Our approach: </span>
                {["Understand", "Assess", "Recommend", "Support"].map((step, i) => (
                  <span key={step} className="inline-flex items-center gap-2">
                    {i > 0 ? (
                      <span aria-hidden="true" className="text-teal-light">
                        →
                      </span>
                    ) : null}
                    {step}
                  </span>
                ))}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Introduction */}
      <section aria-labelledby="intro-heading" className="py-20 md:py-28">
        <div className="container-site grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow mb-4">About BNX 24</p>
            <h2 id="intro-heading" className="h2">
              An outside perspective, sized to the decisions you’re facing.
            </h2>
          </div>
          <div className="space-y-5 text-lg text-slate md:col-span-6 md:col-start-7 md:pt-10">
            <p>
              BNX 24 Inc. is a general business consulting firm working with companies across the United States. We
              focus on the questions that sit between a company’s ambitions and its day-to-day reality: what to work on
              first, how to organize the people and processes doing the work, and when the business is ready for its
              next step.
            </p>
            <p>
              Our role is to bring structure, analysis, and an independent point of view, and to leave you with
              recommendations your team can carry out.
            </p>
            <p>
              <Link href="/about/" className="text-link font-medium">
                How BNX 24 works with clients
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section aria-labelledby="challenges-heading" className="border-y border-line bg-sand py-20 md:py-28">
        <div className="container-site">
          <SectionHeading
            id="challenges-heading"
            eyebrow="Where we help"
            title="Situations that bring businesses to us"
            intro="Most engagements start with a problem the leadership team already feels. These are some of the most common."
          />
          <ul className="mt-14 grid gap-x-12 md:grid-cols-2 lg:grid-cols-3">
            {challenges.map((c) => (
              <li key={c.title} className="border-t border-navy-900/15 py-8">
                <h3 className="h3">{c.title}</h3>
                <p className="mt-3 text-slate">{c.body}</p>
                <p className="mt-4 text-sm">
                  <span className="text-slate">Related: </span>
                  {c.services.map((slug, i) => (
                    <span key={slug}>
                      {i > 0 ? <span className="text-slate">, </span> : null}
                      <Link href={servicePath(slug)} className="text-link">
                        {serviceTitle(slug)}
                      </Link>
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="services-heading" className="py-20 md:py-28">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              id="services-heading"
              eyebrow="Services"
              title="Eight ways we can help, each with a distinct purpose"
              intro="From setting direction to fixing a specific process, every service is scoped to the question your business needs answered."
            />
            <Link href="/services/" className="text-link flex-none font-medium">
              Compare all services
            </Link>
          </div>
          <div className="mt-12">
            <ServiceIndex items={services} />
          </div>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-heading" className="border-t border-line bg-white py-20 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow mb-4">Why BNX 24</p>
              <h2 id="principles-heading" className="h2">
                What you can expect from working with us
              </h2>
              <p className="lede mt-5">
                No inflated promises. Just a consistent way of working that keeps the focus on your business.
              </p>
            </div>
          </div>
          <ol className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {principles.map((p, i) => (
              <li key={p.title} className="border-t border-line py-7">
                <span className="text-sm font-semibold tracking-[0.14em] text-teal" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="h3 mt-3">{p.title}</h3>
                <p className="mt-3 text-slate">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Approach */}
      <section aria-labelledby="approach-heading" className="on-dark bg-navy-900 py-20 text-white md:py-28">
        <div className="container-site">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="eyebrow mb-4">Our approach</p>
              <h2 id="approach-heading" className="h2 text-white">
                Understand the business before recommending changes to it
              </h2>
            </div>
            <p className="lede md:col-span-5">
              Every engagement follows the same logic. The depth of each stage, and whether follow-through support is
              included, is agreed before work begins.
            </p>
          </div>
          <div className="mt-14">
            <ApproachSteps detailed />
          </div>
        </div>
      </section>

      {/* Client types */}
      <section aria-labelledby="clients-heading" className="py-20 md:py-28">
        <div className="container-site">
          <SectionHeading
            id="clients-heading"
            eyebrow="Who we work with"
            title="Businesses at different stages, across industries"
            intro="BNX 24 works with companies throughout the United States. What they have in common is a decision or problem that deserves structured attention."
          />
          <ul className="mt-14 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-5">
            {clientTypes.map((c) => (
              <li key={c.title} className="border-r border-b border-line p-6">
                <h3 className="font-sans text-lg leading-snug font-semibold tracking-normal text-navy-900">{c.title}</h3>
                <p className="mt-3 text-[0.9375rem] text-slate">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="border-t border-line bg-sand py-20 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">FAQ</p>
            <h2 id="faq-heading" className="h2">
              Common questions
            </h2>
            <p className="lede mt-5">
              Have a question that isn’t answered here?{" "}
              <Link href="/contact/" className="text-link">
                Ask us directly.
              </Link>
            </p>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={homeFaqs} />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
