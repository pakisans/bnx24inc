import Link from "next/link";
import type { ReactNode } from "react";
import { formatLegalDate, legal, legalPages } from "@/content/legal";
import { site } from "@/content/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { Breadcrumbs } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

interface LegalPageProps {
  title: string;
  path: string;
  intro: ReactNode;
  sections: LegalSection[];
}

/** Shared layout for policy pages: plain document, on-page index, related policies. */
export function LegalPage({ title, path, intro, sections }: LegalPageProps) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: title, path },
  ];
  const others = legalPages.filter((p) => p.href !== path);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <section className="border-b border-navy-900/10">
        <div className="container-site pt-8 pb-14 md:pt-10 md:pb-20">
          <Breadcrumbs items={crumbs} />
          <div className="enter mt-14 max-w-3xl md:mt-20">
            <p className="eyebrow mb-6">Legal</p>
            <h1 className="display">{title}</h1>
            <p className="mt-8 font-display text-[0.9375rem] text-slate">
              Effective <time dateTime={legal.effectiveDate}>{formatLegalDate(legal.effectiveDate)}</time>
            </p>
          </div>
        </div>
      </section>

      <div className="container-site grid gap-12 py-14 md:py-20 lg:grid-cols-12">
        <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-28">
            <p className="font-display text-[0.6875rem] font-semibold tracking-[0.16em] text-slate uppercase">
              On this page
            </p>
            <ol className="mt-5 max-h-[calc(100dvh-12rem)] overflow-y-auto border-l border-navy-900/15">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 font-display text-[0.875rem] leading-snug text-slate transition-colors hover:border-teal hover:text-navy-900"
                  >
                    <span className="index-num w-5 flex-none pt-px" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <article className="legal-prose min-w-0 lg:col-span-8 lg:col-start-5">
          <div className="lede text-ink">{intro}</div>
          {sections.map((s, i) => (
            <section key={s.id} aria-labelledby={s.id} className="scroll-mt-28">
              <h2 id={s.id}>
                <span aria-hidden="true" className="index-num mr-3 align-middle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.title}
              </h2>
              {s.body}
            </section>
          ))}

          <aside className="mt-16 rounded-sm border border-navy-900/10 bg-white p-7 md:p-9">
            <h2 className="!mt-0 !border-0 !pt-0">Questions about this page?</h2>
            <p>
              Email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>
              {legal.mailingAddress ? ", call " : " or call "}
              <a href={site.phoneHref} className="whitespace-nowrap">
                {site.phone}
              </a>
              {legal.mailingAddress ? <>, or write to {legal.mailingAddress}</> : null}.
            </p>
            <p className="!mt-6 font-display text-[0.875rem] text-slate">
              Related:{" "}
              {others.map((p, i) => (
                <span key={p.href}>
                  {i > 0 ? " · " : null}
                  <Link href={p.href}>{p.label}</Link>
                </span>
              ))}
            </p>
          </aside>
        </article>
      </div>
    </>
  );
}
