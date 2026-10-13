import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  above?: ReactNode;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, lede, above, children }: PageHeroProps) {
  return (
    <section className="border-b border-line">
      <div className="container-site pt-10 pb-16 md:pt-14 md:pb-24">
        {above ? <div className="mb-10 md:mb-14">{above}</div> : null}
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h1 className="display max-w-4xl">{title}</h1>
        <div className="lede mt-7 max-w-2xl">{lede}</div>
        {children}
      </div>
    </section>
  );
}
