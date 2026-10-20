import Link from "next/link";
import type { CSSProperties } from "react";
import { ApproachSteps } from "@/components/ApproachSteps";
import { Arrow, ButtonLink } from "@/components/ButtonLink";
import { CtaSection } from "@/components/CtaSection";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceIndex } from "@/components/ServiceIndex";
import { approach, challenges, clientTypes, homeFaqs, homePrinciples } from "@/content/company";
import { primaryCta } from "@/content/site";
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

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

function serviceTitle(slug: ServiceSlug) {
  return getService(slug)?.title ?? slug;
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />

      {/* Hero: text on the container grid, photograph bleeding to the right edge. */}
      <section className="relative overflow-hidden lg:min-h-[min(calc(100svh-4.5rem),56rem)]">
        <div className="container-site relative z-10 lg:flex lg:min-h-[min(calc(100svh-4.5rem),56rem)] lg:items-center">
          <div className="pt-12 pb-12 sm:pt-16 lg:w-1/2 lg:py-20 lg:pr-14 xl:pr-20">
            <p className="enter eyebrow mb-8">Business consulting · United States</p>
            <h1 className="enter display-xl" style={delay(80)}>
              <span className="block">A clearer direction.</span>
              <span className="block text-teal">A stronger business.</span>
            </h1>
            <p className="enter lede mt-8 max-w-[33rem]" style={delay(180)}>
              Practical strategy and business consulting to help you strengthen operations, navigate decisions, and
              plan your next stage of growth.
            </p>
            <div className="enter mt-10 flex flex-col gap-3 sm:flex-row" style={delay(260)}>
              <ButtonLink href={primaryCta.href} className="min-h-14 px-7" drawer>
                {primaryCta.label}
                <Arrow />
              </ButtonLink>
              <ButtonLink href="/services/" variant="secondary" className="min-h-14 px-7">
                Explore Our Services
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:left-1/2">
          <div className="relative aspect-[4/3] overflow-hidden bg-mist sm:aspect-[16/10] lg:aspect-auto lg:h-full">
            <Photo
              priority
              alt="Low-angle view of a contemporary building, its stepped floors and bands of glass set against a blue sky"
              renditions={[
                {
                  name: "hero-desktop",
                  media: "(min-width: 64rem)",
                  widths: [720, 1080, 1440],
                  sizes: "50vw",
                  width: 1440,
                  height: 1800,
                },
                { name: "hero-wide", widths: [800, 1200, 1800], sizes: "100vw", width: 1800, height: 1350 },
              ]}
              fallbackWidth={1200}
              className="absolute inset-0"
              imgClassName="enter-image h-full w-full object-cover object-[50%_40%] lg:object-[38%_50%]"
            />
          </div>
          {/* Approach plate: anchors the image to the type and previews the process. */}
          <div className="relative z-10 -mt-8 px-5 sm:px-8 lg:absolute lg:bottom-12 lg:left-0 lg:mt-0 lg:-translate-x-10 lg:px-0">
            <div className="on-dark enter bg-navy-900 px-6 py-5 text-white shadow-[0_24px_48px_-24px_rgb(7_20_34/0.6)] sm:inline-block sm:px-7" style={delay(420)}>
              <p className="font-display text-[0.6875rem] font-semibold tracking-[0.16em] text-teal-light uppercase">
                How we work
              </p>
              <p className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-display text-[1.0625rem] font-medium">
                {approach.map((a, i) => (
                  <span key={a.step} className="inline-flex items-center gap-2.5">
                    {a.step}
                    {i < approach.length - 1 ? (
                      <span aria-hidden="true" className="text-teal-light">
                        →
                      </span>
                    ) : null}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section aria-labelledby="intro-heading" className="section border-t border-navy-900/10">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-3">
              <h2 id="intro-heading" className="eyebrow">
                What we do
              </h2>
            </div>
            <p className="reveal statement lg:col-span-9">
              BNX 24 Inc. is a business consulting firm for owners and leadership teams across the United States. We
              help companies decide where to focus, organize the work that follows, and judge when they are ready for
              what comes next, <span className="text-slate">with recommendations sized to the business you actually have.</span>
            </p>
          </div>

          <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4 lg:col-start-4">
              <h3 className="font-display text-xs font-semibold tracking-[0.16em] text-slate uppercase">
                Who we work with
              </h3>
              <ul className="mt-5 border-t border-navy-900/15">
                {clientTypes.map((c) => (
                  <li key={c.title} className="border-b border-navy-900/15 py-3.5 font-display text-[1.0625rem] font-medium text-navy-900">
                    {c.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5 text-slate lg:col-span-4 lg:col-start-9">
              <h3 className="font-display text-xs font-semibold tracking-[0.16em] text-slate uppercase">
                Our role
              </h3>
              <p>
                We bring structure, analysis, and an independent point of view to questions that deserve more attention
                than the day-to-day allows: what to work on first, how to organize people and processes, and when to
                take the next step.
              </p>
              <p>Engagements are scoped in writing before work begins, and most of the work can be done remotely.</p>
              <p>
                <Link href="/about/" className="text-link font-medium">
                  How BNX 24 works with clients
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business challenges */}
      <section aria-labelledby="challenges-heading" className="section bg-stone">
        <div className="container-site">
          <SectionHeading
            layout="split"
            id="challenges-heading"
            eyebrow="Where we help"
            title="Situations that bring businesses to us"
            intro="Most engagements begin with a problem leadership already feels. These four come up most often."
          />
          <ol className="mt-16 grid border-t border-navy-900/20 md:mt-20 md:grid-cols-2 xl:grid-cols-4">
            {challenges.map((c, i) => (
              <li
                key={c.title}
                className="reveal flex flex-col border-b border-navy-900/20 py-9 md:px-8 md:odd:border-r md:odd:pl-0 xl:border-r xl:border-b-0 xl:py-10 xl:first:pl-0 xl:last:border-r-0 xl:last:pr-0 xl:[&:nth-child(3)]:pl-8"
              >
                <span className="index-num" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="mt-6 text-[1.5rem] leading-[1.15] font-medium tracking-[-0.022em] md:text-[1.625rem]">
                  {c.title}
                </h3>
                <p className="mt-4 flex-1 text-[0.9875rem] text-slate">{c.body}</p>
                <p className="mt-7 border-t border-navy-900/10 pt-5 text-sm">
                  <span className="mb-1.5 block font-display text-[0.6875rem] font-semibold tracking-[0.14em] text-slate uppercase">
                    Related services
                  </span>
                  {c.services.map((slug) => (
                    <Link
                      key={slug}
                      href={servicePath(slug)}
                      className="group flex min-h-10 items-center justify-between gap-3 py-1.5 font-medium text-navy-900 hover:text-teal"
                    >
                      {serviceTitle(slug)}
                      <Arrow className="h-3.5 w-3.5 text-teal" />
                    </Link>
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="services-heading" className="section bg-white">
        <div className="container-site">
          <SectionHeading
            layout="split"
            id="services-heading"
            eyebrow="Services"
            title="Eight services, each with a distinct job"
            intro={
              <>
                From setting direction to fixing a specific process, each service is scoped to the question your
                business needs answered.{" "}
                <Link href="/services/" className="text-link font-medium whitespace-nowrap">
                  Compare all services
                </Link>
              </>
            }
          />
          <div className="mt-14 md:mt-20">
            <ServiceIndex items={services} />
          </div>
        </div>
      </section>

      {/* Approach */}
      <section aria-labelledby="approach-heading" className="on-dark section relative overflow-hidden bg-navy-900 text-white">
        <div aria-hidden="true" className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
        <div className="container-site relative">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-5">Our approach</p>
              <h2 id="approach-heading" className="h2 text-white">
                Understand the business before recommending changes to it
              </h2>
            </div>
            <p className="lede lg:col-span-5">
              Every engagement follows the same four stages. How deep each one goes is set by the scope you agree to
              before work begins.
            </p>
          </div>
          <div className="reveal mt-16 md:mt-24">
            <ApproachSteps detailed />
          </div>
          <p className="mt-14 flex gap-3 border-t border-white/15 pt-6 text-sm text-slate-light md:mt-20">
            <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 flex-none bg-teal-light" />
            Implementation support is optional. Whether it is included, and to what extent, depends on the scope agreed
            for your engagement.
          </p>
        </div>
      </section>

      {/* Why BNX 24 */}
      <section aria-labelledby="principles-heading" className="section">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow mb-5">Why BNX 24</p>
              <h2 id="principles-heading" className="h2">
                The standards we hold our own work to
              </h2>
              <p className="lede mt-6 max-w-md">
                No inflated promises or packaged programs. A consistent way of working that keeps the attention on your
                business.
              </p>
            </div>
          </div>
          <ol className="lg:col-span-7">
            {homePrinciples.map((p, i) => (
              <li
                key={p.title}
                className="reveal grid gap-4 border-t border-navy-900/15 py-9 first:border-t-0 first:pt-0 sm:grid-cols-[4.5rem_1fr] lg:first:pt-2"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-[2.75rem] leading-none font-medium tracking-[-0.04em] text-navy-900/15 tabular-nums"
                >
                  0{i + 1}
                </span>
                <div>
                  <h3 className="h3">{p.title}</h3>
                  <p className="mt-3 max-w-xl text-slate">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="section border-t border-navy-900/10 bg-stone">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5">FAQ</p>
            <h2 id="faq-heading" className="h2">
              Common questions
            </h2>
            <p className="mt-6 text-slate">
              Have a question that isn’t answered here?{" "}
              <Link href="/contact/" className="text-link">
                Ask us directly.
              </Link>
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <FaqList items={homeFaqs} />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
