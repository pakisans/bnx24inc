import Link from "next/link";
import { notFound } from "next/navigation";
import { ApproachSteps } from "@/components/ApproachSteps";
import { Arrow, ButtonLink } from "@/components/ButtonLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaSection } from "@/components/CtaSection";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { primaryCta } from "@/content/site";
import { getService, servicePath, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: servicePath(service.slug),
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/" },
    { name: service.title, path: servicePath(service.slug) },
  ];
  const related = service.related.map((r) => getService(r)).filter((s) => s !== undefined);

  return (
    <>
      <JsonLd data={[serviceJsonLd(service), breadcrumbJsonLd(crumbs)]} />

      {/* Hero */}
      <section className="border-b border-line">
        <div className="container-site pt-10 pb-16 md:pt-14 md:pb-24">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-6">
                {service.title}
              </p>
              <h1 className="display">{service.headline}</h1>
              <div className="lede mt-7 max-w-2xl space-y-5">
                {service.intro.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={`${primaryCta.href}?interest=${service.slug}`}>
                  {primaryCta.label}
                  <Arrow />
                </ButtonLink>
                <ButtonLink href="/services/" variant="secondary">
                  All Services
                </ButtonLink>
              </div>
            </div>
            <aside aria-label="Service focus" className="lg:col-span-4 lg:pt-16">
              <div className="frame on-dark bg-navy-900 p-7 text-white">
                <p className="text-sm font-semibold tracking-[0.14em] text-teal-light uppercase">
                  <span aria-hidden="true">{service.number} · </span>Focus
                </p>
                <p className="mt-3 font-serif text-2xl leading-snug">{service.focus}</p>
                <p className="mt-6 border-t border-line-dark pt-5 text-sm text-slate-light">The question it answers</p>
                <p className="mt-2 font-serif text-xl leading-snug text-white">“{service.question}”</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Who it's for + situations */}
      <section aria-labelledby="fit-heading" className="py-20 md:py-28">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">A good fit</p>
            <h2 id="fit-heading" className="h2">
              Who this service is for
            </h2>
            <ul className="mt-8 space-y-4">
              {service.audience.map((a) => (
                <li key={a} className="flex gap-4 text-lg">
                  <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 flex-none bg-teal" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow mb-4">Signs it’s time</p>
            <h2 className="h2">Situations that often prompt this work</h2>
            <ul className="mt-8 border-t border-line">
              {service.situations.map((s) => (
                <li key={s} className="border-b border-line py-4 font-serif text-xl leading-snug text-navy-900">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Areas */}
      <section aria-labelledby="areas-heading" className="border-y border-line bg-white py-20 md:py-28">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Scope</p>
            <h2 id="areas-heading" className="h2">
              What the work may address
            </h2>
            <p className="lede mt-5">
              Not every engagement covers every area. The scope is shaped around your situation and agreed before
              work begins.
            </p>
          </div>
          <ol className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2">
            {service.areas.map((area, i) => (
              <li key={area.title} className="bg-white p-7 md:p-9">
                <span className="text-sm font-semibold tracking-[0.14em] text-teal" aria-hidden="true">
                  {String.fromCharCode(65 + i)}
                </span>
                <h3 className="h3 mt-3">{area.title}</h3>
                <p className="mt-3 text-slate">{area.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Outputs */}
      <section aria-labelledby="outputs-heading" className="py-20 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Possible outputs</p>
            <h2 id="outputs-heading" className="h2">
              What you might receive
            </h2>
            <p className="lede mt-5">
              These are examples only. Actual deliverables depend on the scope agreed for your engagement.
            </p>
          </div>
          <ul className="lg:col-span-6 lg:col-start-7">
            {service.outputs.map((o) => (
              <li key={o} className="flex gap-4 border-b border-line py-4 text-lg first:border-t">
                <svg viewBox="0 0 16 16" className="mt-1.5 h-4 w-4 flex-none text-teal" aria-hidden="true" focusable="false">
                  <path d="M2.5 8.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach */}
      <section aria-labelledby="approach-heading" className="on-dark bg-navy-900 py-20 text-white md:py-24">
        <div className="container-site">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <h2 id="approach-heading" className="h2 text-white md:col-span-6">
              How an engagement works
            </h2>
            <p className="lede md:col-span-6">
              Each engagement moves through four stages. How deep each one goes, and whether follow-through support is
              included, is agreed at the start.
            </p>
          </div>
          <div className="mt-12">
            <ApproachSteps />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section aria-labelledby="faq-heading" className="py-20 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">FAQ</p>
            <h2 id="faq-heading" className="h2">
              Questions about {service.title.toLowerCase().replace(/ & /g, " and ")}
            </h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={service.faqs} />
          </div>
        </div>
      </section>

      {/* Related */}
      <section aria-labelledby="related-heading" className="border-t border-line bg-sand py-20 md:py-24">
        <div className="container-site">
          <h2 id="related-heading" className="h2">
            Related services
          </h2>
          <ul className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug} className="bg-sand">
                <Link href={servicePath(r.slug)} className="group flex h-full flex-col p-7 hover:bg-paper">
                  <span className="text-sm font-semibold tracking-[0.14em] text-teal uppercase">{r.focus}</span>
                  <span className="mt-3 font-serif text-2xl leading-tight text-navy-900 group-hover:text-teal">
                    {r.title}
                  </span>
                  <span className="mt-3 flex-1 text-[0.9375rem] text-slate">{r.summary}</span>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-900">
                    Learn more<span className="sr-only"> about {r.title}</span>
                    <Arrow className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection heading={service.cta.heading} body={service.cta.body} interest={service.slug} />
    </>
  );
}
