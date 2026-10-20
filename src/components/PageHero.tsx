import type { CSSProperties, ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  above?: ReactNode;
  children?: ReactNode;
}

/** Interior page opener: headline left, supporting copy dropped to the baseline on the right. */
export function PageHero({ eyebrow, title, lede, above, children }: PageHeroProps) {
  return (
    <section className="border-b border-navy-900/10">
      <div className="container-site pt-8 pb-16 md:pt-10 md:pb-24">
        {above ? <div className="mb-14 md:mb-20">{above}</div> : null}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="enter lg:col-span-8">
            <p className="eyebrow mb-6">{eyebrow}</p>
            <h1 className="display">{title}</h1>
          </div>
          <div className="enter lg:col-span-4 lg:pb-2" style={{ "--delay": "120ms" } as CSSProperties}>
            <div className="lede border-l border-teal pl-5">{lede}</div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
