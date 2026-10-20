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

const sections = [
  { id: "fit", label: "Who it’s for" },
  { id: "signs", label: "Signs it’s time" },
  { id: "scope", label: "What the work may address" },
  { id: "outputs", label: "Possible outputs" },
  { id: "faq", label: "Questions" },
] as const;

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
  const contactHref = `${primaryCta.href}?interest=${service.slug}`;

  return (
    <>
      <JsonLd data={[serviceJsonLd(service), breadcrumbJsonLd(crumbs)]} />

      {/* Opener */}
      <section className="on-dark relative overflow-hidden bg-navy-900 text-white">
        <div aria-hidden="true" className="grid-lines absolute inset-0 [mask-image:linear-gradient(to_left,black,transparent_75%)]" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -bottom-[0.18em] font-display text-[clamp(12rem,8rem+16vw,26rem)] leading-none font-semibold tracking-[-0.06em] text-transparent select-none [-webkit-text-stroke:1px_rgb(111_207_194/0.35)]"
        >
          {service.number}
        </span>
        <div className="container-site relative pt-8 pb-20 md:pt-10 md:pb-28">
          <Breadcrumbs items={crumbs} onDark />
          <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-12">
            <div className="enter lg:col-span-8">
              <p className="eyebrow mb-7">
                <span aria-hidden="true">{service.number} / 08 ·&nbsp;</span>
                {service.title}
              </p>
              <h1 className="display text-white">{service.headline}</h1>
              <div className="lede mt-8 max-w-2xl space-y-5">
                {service.intro.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={contactHref} variant="onDark" className="min-h-14 px-7" drawer>
                  {primaryCta.label}
                  <Arrow />
                </ButtonLink>
                <ButtonLink href="/services/" variant="ghostOnDark" className="min-h-14 px-7">
                  All Services
                </ButtonLink>
              </div>
            </div>
            <aside aria-label="Service focus" className="enter lg:col-span-4 lg:pt-24" style={{ animationDelay: "160ms" }}>
              <div className="border-t border-teal-light/50 pt-6">
                <p className="font-display text-[0.6875rem] font-semibold tracking-[0.16em] text-teal-light uppercase">
                  The question it answers
                </p>
                <p className="mt-4 font-display text-[1.625rem] leading-[1.2] font-medium tracking-[-0.02em] text-white">
                  “{service.question}”
                </p>
                <p className="mt-6 text-sm text-slate-light">
                  Focus: <span className="text-white">{service.focus}</span>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Body with on-page index */}
      <div className="container-site grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-12">
        <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-32">
            <p className="font-display text-[0.6875rem] font-semibold tracking-[0.16em] text-slate uppercase">
              On this page
            </p>
            <ol className="mt-5 border-l border-navy-900/15">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px flex gap-3 border-l border-transparent py-2 pl-4 font-display text-[0.9375rem] text-slate transition-colors hover:border-teal hover:text-navy-900"
                  >
                    <span className="index-num w-5 pt-px" aria-hidden="true">
                      0{i + 1}
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
            <Link href={contactHref} data-contact-drawer className="text-link mt-8 inline-flex font-display text-[0.9375rem] font-medium">
              Discuss this service
            </Link>
          </div>
        </nav>

        <div className="space-y-20 md:space-y-28 lg:col-span-8 lg:col-start-5">
          <section aria-labelledby="fit" className="scroll-mt-28">
            <p className="eyebrow mb-5">A good fit</p>
            <h2 id="fit" className="h2">
              Who this service is for
            </h2>
            <ul className="mt-10 grid gap-x-10 sm:grid-cols-2">
              {service.audience.map((a) => (
                <li key={a} className="border-t border-navy-900/15 py-5 text-[1.0625rem] text-ink">
                  {a}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="signs" className="scroll-mt-28">
            <p className="eyebrow mb-5">Signs it’s time</p>
            <h2 id="signs" className="h2">
              Situations that often prompt this work
            </h2>
            <ul className="mt-10">
              {service.situations.map((s) => (
                <li
                  key={s}
                  className="reveal flex gap-5 border-t border-navy-900/15 py-6 font-display text-[1.25rem] leading-snug font-medium tracking-[-0.015em] text-navy-900 md:text-[1.4375rem]"
                >
                  <span aria-hidden="true" className="pt-1 text-teal">
                    —
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="scope" className="scroll-mt-28">
            <p className="eyebrow mb-5">Scope</p>
            <h2 id="scope" className="h2">
              What the work may address
            </h2>
            <p className="lede mt-6 max-w-2xl">
              Not every engagement covers every area. The scope is shaped around your situation and agreed before work
              begins.
            </p>
            <ol className="mt-12 grid gap-px overflow-hidden rounded-sm border border-navy-900/10 bg-navy-900/10 sm:grid-cols-2">
              {service.areas.map((area, i) => (
                <li key={area.title} className="bg-white p-7 md:p-9">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-mist font-display text-sm font-semibold text-teal"
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <h3 className="h3 mt-6">{area.title}</h3>
                  <p className="mt-3 text-[0.9875rem] text-slate">{area.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="outputs" className="scroll-mt-28">
            <div className="grid gap-10">
              <div className="max-w-2xl">
                <p className="eyebrow mb-5">Possible outputs</p>
                <h2 id="outputs" className="h2">
                  What you might receive
                </h2>
                <p className="mt-6 text-slate">
                  Examples only. Actual deliverables depend on the scope agreed for your engagement.
                </p>
              </div>
              <ul className="grid gap-x-10 border-t border-navy-900/15 sm:grid-cols-2">
                {service.outputs.map((o) => (
                  <li key={o} className="flex gap-4 border-b border-navy-900/15 py-4.5 text-[1.0625rem]">
                    <svg viewBox="0 0 16 16" className="mt-1.5 h-4 w-4 flex-none text-teal" aria-hidden="true" focusable="false">
                      <path d="M2.5 8.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="faq" className="scroll-mt-28">
            <p className="eyebrow mb-5">FAQ</p>
            <h2 id="faq" className="h2 mb-10">
              Questions about {service.title.toLowerCase().replace(/ & /g, " and ")}
            </h2>
            <FaqList items={service.faqs} />
          </section>
        </div>
      </div>

      {/* Approach */}
      <section aria-labelledby="approach-heading" className="on-dark bg-navy-950 py-20 text-white md:py-24">
        <div className="container-site">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-5">Our approach</p>
              <h2 id="approach-heading" className="h2 text-white">
                How an engagement works
              </h2>
            </div>
            <p className="lede lg:col-span-5">
              Each engagement moves through four stages. How deep each one goes, and whether implementation support is
              included, is agreed at the start.
            </p>
          </div>
          <div className="mt-14 md:mt-16">
            <ApproachSteps />
          </div>
        </div>
      </section>

      {/* Related */}
      <section aria-labelledby="related-heading" className="section bg-stone">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-5">Often paired with</p>
              <h2 id="related-heading" className="h2">
                Related services
              </h2>
            </div>
            <Link href="/services/" className="text-link font-display font-medium">
              View all eight services
            </Link>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={servicePath(r.slug)}
                  className="group flex h-full flex-col rounded-sm border border-navy-900/10 bg-paper p-7 transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-0.5 hover:border-navy-900/25 hover:shadow-[0_18px_40px_-28px_rgb(11_31_51/0.45)] motion-reduce:transition-none md:p-8"
                >
                  <span className="index-num" aria-hidden="true">
                    {r.number}
                  </span>
                  <span className="mt-5 font-display text-[1.5rem] leading-[1.15] font-medium tracking-[-0.02em] text-navy-900 group-hover:text-teal">
                    {r.title}
                  </span>
                  <span className="mt-4 flex-1 text-[0.9375rem] text-slate">{r.summary}</span>
                  <span className="mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold text-navy-900">
                    Learn more<span className="sr-only"> about {r.title}</span>
                    <Arrow />
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
