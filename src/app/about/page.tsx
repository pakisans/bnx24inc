import Link from "next/link";
import { ApproachSteps } from "@/components/ApproachSteps";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { SectionHeading } from "@/components/SectionHeading";
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
      {/* Opener: headline with a framed architectural photograph */}
      <section className="border-b border-navy-900/10">
        <div className="container-site pt-8 pb-16 md:pt-10 md:pb-24">
          <Breadcrumbs items={crumbs} />
          <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="enter lg:col-span-7">
              <p className="eyebrow mb-7">About BNX 24</p>
              <h1 className="display">Clear thinking and practical recommendations for growing businesses.</h1>
              <p className="lede mt-8 max-w-2xl">
                {site.name} helps companies across the United States make better decisions about direction,
                organization, operations, and growth, and turn those decisions into work their teams can carry out.
              </p>
            </div>
            <figure className="lg:col-span-4 lg:col-start-9">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-mist sm:aspect-[16/11] lg:aspect-[4/5]">
                <Photo
                  priority
                  alt="Corner of a concrete building with tall shuttered windows catching low afternoon light"
                  renditions={[
                    { name: "about-facade", widths: [640, 960, 1400], sizes: "(min-width: 64rem) 30vw, 100vw", width: 1400, height: 1604 },
                  ]}
                  fallbackWidth={960}
                  className="absolute inset-0"
                  imgClassName="enter-image h-full w-full object-cover object-[50%_35%]"
                />
              </div>
              <figcaption className="mt-4 flex items-center gap-3 font-display text-[0.8125rem] text-slate">
                <span aria-hidden="true" className="h-px w-6 bg-teal" />
                Structure first, then scale.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Purpose */}
      <section aria-labelledby="purpose-heading" className="section">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <h2 id="purpose-heading" className="eyebrow">
              Our purpose
            </h2>
          </div>
          <div className="lg:col-span-9">
            <p className="reveal statement">
              Most businesses reach a point where the questions in front of them deserve more attention than the
              day-to-day allows. <span className="text-slate">BNX 24 exists to give those questions that attention.</span>
            </p>
            <div className="mt-12 grid gap-8 text-slate md:grid-cols-2 md:gap-12">
              <p>
                What should we focus on? Is the organization set up for the next stage? Is this opportunity worth the
                risk? We bring an outside perspective, a disciplined way of examining the problem, and recommendations
                sized to the business.
              </p>
              <p>
                That holds whether the client is a founder-led startup or an established company with an experienced
                leadership team. The scale of the work changes; the standard of thinking does not.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-heading" className="section bg-white">
        <div className="container-site">
          <SectionHeading
            layout="split"
            id="principles-heading"
            eyebrow="Principles"
            title="The principles behind our work"
            intro={site.slogan}
          />
          <ol className="mt-16 grid gap-x-12 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} className="reveal border-t border-navy-900/15 pt-7 pb-10">
                <span className="index-num" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="h3 mt-5">{p.title}</h3>
                <p className="mt-3 text-slate">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Approach */}
      <section aria-labelledby="approach-heading" className="on-dark section relative overflow-hidden bg-navy-900 text-white">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-5">Approach</p>
              <h2 id="approach-heading" className="h2 text-white">
                How we approach an engagement
              </h2>
            </div>
            <p className="lede lg:col-span-5">
              Four stages, applied with as much or as little depth as the situation calls for. The scope of each
              stage, including any support after recommendations are delivered, is agreed with you up front.
            </p>
          </div>
          <div className="reveal mt-16 md:mt-20">
            <ApproachSteps detailed />
          </div>
        </div>
      </section>

      {/* Nationwide + clients */}
      <section aria-labelledby="nationwide-heading" className="section">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">Nationwide</p>
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
            <h3 className="font-display text-xs font-semibold tracking-[0.16em] text-slate uppercase">
              Who we typically work with
            </h3>
            <ul className="mt-5 border-t border-navy-900/15">
              {clientTypes.map((c) => (
                <li key={c.title} className="grid gap-1 border-b border-navy-900/15 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <p className="font-display text-[1.0625rem] font-medium text-navy-900">{c.title}</p>
                  <p className="text-[0.9375rem] text-slate">{c.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section aria-labelledby="expect-heading" className="section bg-stone">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="eyebrow mb-5">What to expect</p>
            <h2 id="expect-heading" className="h2">
              How we work with clients
            </h2>
          </div>
          <ul className="mt-14 grid gap-x-10 md:grid-cols-3">
            {commitments.map((c) => (
              <li key={c.title} className="border-t-2 border-navy-900 pt-6 pb-8">
                <h3 className="text-[1.25rem] leading-snug font-medium">{c.title}</h3>
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
