import Link from "next/link";
import { ApproachSteps } from "@/components/ApproachSteps";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { clientTypes, principles } from "@/content/company";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "About BNX 24",
  description:
    "BNX 24 Inc. is a general business consulting firm serving U.S. companies nationwide. Learn about our purpose, the principles behind our work, and our approach.",
  path: "/about/",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about/" },
];

const commitments = [
  {
    title: "Clear scope before work begins",
    body: "Objectives, activities, deliverables, timing, and fees are agreed in writing before an engagement starts.",
  },
  {
    title: "Honest about what we can’t promise",
    body: "Consulting can improve the quality of decisions. It can’t guarantee growth, savings, or market results, and we won’t claim otherwise.",
  },
  {
    title: "Clear about where our work stops",
    body: "BNX 24 doesn’t provide legal, tax, accounting, or investment advice. When a question belongs with another professional, we’ll tell you.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        above={<Breadcrumbs items={crumbs} />}
        eyebrow="About BNX 24"
        title="Clear thinking and practical recommendations for growing businesses."
        lede={`${site.name} helps companies across the United States make better decisions about direction, organization, operations, and growth, and turn those decisions into work their teams can carry out.`}
      />

      {/* Purpose */}
      <section aria-labelledby="purpose-heading" className="py-20 md:py-28">
        <div className="container-site grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow mb-4">Our purpose</p>
            <h2 id="purpose-heading" className="h2">
              Room to step back, and a structured way to move forward
            </h2>
          </div>
          <div className="space-y-5 text-lg text-slate md:col-span-6 md:col-start-7 md:pt-10">
            <p>
              Most businesses reach a point where the questions in front of them deserve more attention than the
              day-to-day allows. What should we focus on? Is the organization set up for the next stage? Is this
              opportunity worth the risk?
            </p>
            <p>
              BNX 24 exists to give those questions that attention. We bring an outside perspective, a disciplined way
              of examining the problem, and recommendations sized to the business, whether it is a founder-led startup
              or an established company with an experienced leadership team.
            </p>
            <p className="font-serif text-2xl leading-snug text-navy-900">{site.slogan}</p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-heading" className="border-y border-line bg-white py-20 md:py-28">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Principles</p>
            <h2 id="principles-heading" className="h2">
              The principles behind our work
            </h2>
          </div>
          <ol className="mt-14 grid gap-x-12 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} className="border-t border-line py-8">
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
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Approach</p>
            <h2 id="approach-heading" className="h2 text-white">
              How we approach an engagement
            </h2>
            <p className="lede mt-5">
              Four stages, applied with as much or as little depth as the situation calls for. The scope of each
              stage, including any support after recommendations are delivered, is agreed with you up front.
            </p>
          </div>
          <div className="mt-14">
            <ApproachSteps detailed />
          </div>
        </div>
      </section>

      {/* Nationwide + clients */}
      <section aria-labelledby="nationwide-heading" className="py-20 md:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Nationwide</p>
            <h2 id="nationwide-heading" className="h2">
              Serving businesses across the United States
            </h2>
            <p className="mt-6 text-lg text-slate">
              BNX 24 works with clients nationwide and across a range of industries. Interviews, document reviews, and
              working sessions can be conducted remotely, so location doesn’t limit who we can help. Working
              arrangements are agreed for each engagement.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="font-sans text-xs font-semibold tracking-[0.14em] text-slate uppercase">
              Who we typically work with
            </h3>
            <ul className="mt-5 border-t border-line">
              {clientTypes.map((c) => (
                <li key={c.title} className="border-b border-line py-5">
                  <p className="font-semibold text-navy-900">{c.title}</p>
                  <p className="mt-1 text-slate">{c.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section aria-labelledby="expect-heading" className="border-t border-line bg-sand py-20 md:py-28">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">What to expect</p>
            <h2 id="expect-heading" className="h2">
              How we work with clients
            </h2>
          </div>
          <ul className="mt-12 grid gap-x-10 md:grid-cols-3">
            {commitments.map((c) => (
              <li key={c.title} className="border-t-2 border-navy-900 pt-6 pb-8">
                <h3 className="font-sans text-lg leading-snug font-semibold tracking-normal text-navy-900">{c.title}</h3>
                <p className="mt-3 text-slate">{c.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate">
            See the full list of{" "}
            <Link href="/services/" className="text-link">
              business consulting services
            </Link>{" "}
            to find where your situation fits.
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
