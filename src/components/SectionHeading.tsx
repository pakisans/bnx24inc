import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, intro, id, className = "" }: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h2 id={id} className="h2">
        {title}
      </h2>
      {intro ? <div className="lede mt-5">{intro}</div> : null}
    </div>
  );
}
