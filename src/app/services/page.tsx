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
      <section aria-labelledby="finder-heading" className="py-20 md:py-28">
        <div className="container-site">
          <SectionHeading
            id="finder-heading"
            eyebrow="Find a starting point"
            title="What question is your business asking?"
            intro="Match the question closest to your situation with the service designed to answer it."
          />
          <ul className="mt-12 border-t border-line">
            {services.map((s) => (
              <li key={s.slug} className="border-b border-line">
                <Link
                  href={servicePath(s.slug)}
                  className="group grid gap-2 py-5 md:grid-cols-12 md:items-center md:gap-8"
                >
                  <span className="font-serif text-xl leading-snug text-navy-900 md:col-span-7">“{s.question}”</span>
                  <span className="flex items-center gap-3 text-[0.9375rem] font-semibold text-teal group-hover:text-teal-deep md:col-span-5 md:justify-end">
                    <span className="sr-only">Start with </span>
                    {s.title}
                    <Arrow className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Grouped services */}
      <section aria-labelledby="groups-heading" className="border-t border-line bg-white py-20 md:py-28">
        <div className="container-site">
          <SectionHeading
            id="groups-heading"
            eyebrow="All services"
            title="Four areas of focus"
            intro="The services fall into four broad areas. Each page describes who the service is for, the situations that usually prompt it, and the kind of outputs it can produce."
          />
          <div className="mt-14 space-y-16">
            {serviceGroups.map((group) => (
              <div key={group.title} className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-3">
                  <h3 className="h3">{group.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-slate">{group.description}</p>
                </div>
                <div className="lg:col-span-9">
                  <ServiceIndex
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
      <section aria-labelledby="combine-heading" className="py-20 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">Working across services</p>
            <h2 id="combine-heading" className="h2">
              How services fit together
            </h2>
            <p className="lede mt-5">
              The services overlap by design, because business problems rarely stay in one box. Engagements are scoped
              to what you need, which may be one service or a sequence.
            </p>
          </div>
          <ul className="grid gap-x-10 sm:grid-cols-3 lg:col-span-8">
            {combinations.map((c) => (
              <li key={c.title} className="border-t-2 border-navy-900 pt-6 pb-8">
                <h3 className="font-sans text-lg leading-snug font-semibold tracking-normal text-navy-900">{c.title}</h3>
                <p className="mt-3 text-[0.9375rem] text-slate">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Boundaries */}
      <section aria-labelledby="scope-heading" className="border-t border-line bg-sand py-16 md:py-20">
        <div className="container-site grid gap-6 md:grid-cols-12">
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
