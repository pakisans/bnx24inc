import Link from "next/link";
import { Arrow } from "@/components/ButtonLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceIndex } from "@/components/ServiceIndex";
import { getService, serviceGroups, servicePath, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Business Consulting Services",
  description:
    "Compare BNX 24’s eight business consulting services, from strategy and management to operations, research, and expansion, and find the right starting point.",
  path: "/services/",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services/" },
];

const combinations = [
  {
    title: "Research before a major decision",
    body: "Market research often comes before an expansion or business development decision, so the plan rests on evidence rather than assumptions.",
  },
  {
    title: "From the big picture to a specific fix",
    body: "An operations review frequently reveals one or two processes worth a closer look, which is where process improvement and cost optimization comes in.",
  },
  {
    title: "Strategy, then structure",
    body: "Once priorities are clear, management consulting can help align the organization, budget, and leadership routines behind them.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        above={<Breadcrumbs items={crumbs} />}
        eyebrow="Services"
        title="Consulting services built around the decision in front of you."
        lede="BNX 24 offers eight related services. Each one has a distinct purpose, so you can start with the question that matters most now and add other work only if it is needed."
      />

      {/* Starting-point finder */}
      <section aria-labelledby="finder-heading" className="section">
        <div className="container-site">
          <SectionHeading
            layout="split"
            id="finder-heading"
            eyebrow="Find a starting point"
            title="What question is your business asking?"
            intro="Match the question closest to your situation with the service designed to answer it."
          />
          <ul className="mt-14 border-t border-navy-900/15 md:mt-20">
            {services.map((s) => (
              <li key={s.slug} className="border-b border-navy-900/15">
                <Link
                  href={servicePath(s.slug)}
                  className="group grid gap-3 py-6 transition-colors md:grid-cols-12 md:items-center md:gap-8 md:py-7"
                >
                  <span className="font-display text-[1.375rem] leading-snug font-medium tracking-[-0.018em] text-navy-900 transition-colors group-hover:text-teal md:col-span-8 md:text-[1.625rem]">
                    “{s.question}”
                  </span>
                  <span className="flex items-center gap-3 font-display text-[0.9375rem] font-semibold text-teal md:col-span-4 md:justify-end">
                    <span className="sr-only">Start with </span>
                    {s.title}
                    <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Grouped services */}
      <section aria-labelledby="groups-heading" className="section bg-white">
        <div className="container-site">
          <SectionHeading
            layout="split"
            id="groups-heading"
            eyebrow="All services"
            title="Four areas of focus"
            intro="Each service page describes who the service is for, the situations that usually prompt it, and the kind of outputs it can produce."
          />
          <div className="mt-16 md:mt-20">
            {serviceGroups.map((group, i) => (
              <div
                key={group.title}
                className="grid gap-6 border-t-2 border-navy-900 pt-8 pb-14 last:pb-0 lg:grid-cols-12 lg:gap-12 lg:pt-10"
              >
                <div className="lg:col-span-4">
                  <span className="index-num" aria-hidden="true">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <h3 className="mt-3 text-[1.875rem] leading-tight font-medium tracking-[-0.025em]">{group.title}</h3>
                  <p className="mt-3 max-w-sm text-[0.9375rem] text-slate">{group.description}</p>
                </div>
                <div className="lg:col-span-8">
                  <ServiceIndex
                    compact
                    headingLevel="h4"
                    items={group.slugs.map((slug) => getService(slug)).filter((s) => s !== undefined)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How services combine */}
      <section aria-labelledby="combine-heading" className="on-dark section bg-navy-900 text-white">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5">Working across services</p>
            <h2 id="combine-heading" className="h2 text-white">
              How services fit together
            </h2>
            <p className="lede mt-6">
              Business problems rarely stay in one box. Engagements are scoped to what you need, which may be one
              service or a sequence.
            </p>
          </div>
          <ol className="grid gap-x-10 gap-y-2 sm:grid-cols-3 lg:col-span-8">
            {combinations.map((c, i) => (
              <li key={c.title} className="reveal border-t border-white/20 pt-6 pb-8">
                <span className="index-num" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-[1.25rem] leading-snug font-medium text-white">{c.title}</h3>
                <p className="mt-3 text-[0.9375rem] text-slate-light">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Boundaries */}
      <section aria-labelledby="scope-heading" className="bg-stone py-14 md:py-16">
        <div className="container-site grid gap-4 md:grid-cols-12 md:gap-12">
          <h2 id="scope-heading" className="h3 md:col-span-4">
            What our services don’t include
          </h2>
          <p className="text-slate md:col-span-8">
            BNX 24 provides business consulting. We don’t provide legal, tax, accounting, investment, or other
            regulated professional advice. When a question touches those areas, we’ll say so and help you frame it for
            the qualified professional who should answer it.
          </p>
        </div>
      </section>

      <CtaSection
        heading="Not sure which service fits?"
        body="Describe the situation in your own words. We’ll help you work out which kind of support makes sense, if any, before anything is scoped."
      />
    </>
  );
}
