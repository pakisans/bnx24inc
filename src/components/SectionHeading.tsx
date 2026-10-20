import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  className?: string;
  /** "split" sets the intro beside the heading on large screens. */
  layout?: "stacked" | "split";
}

export function SectionHeading({ eyebrow, title, intro, id, className = "", layout = "stacked" }: SectionHeadingProps) {
  if (layout === "split") {
    return (
      <div className={`grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12 ${className}`}>
        <div className="lg:col-span-7">
          {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
          <h2 id={id} className="h2">
            {title}
          </h2>
        </div>
        {intro ? <div className="lede lg:col-span-5 lg:pb-1">{intro}</div> : null}
      </div>
    );
  }
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
      <h2 id={id} className="h2">
        {title}
      </h2>
      {intro ? <div className="lede mt-6">{intro}</div> : null}
    </div>
  );
}
