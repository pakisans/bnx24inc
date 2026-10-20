import { approach } from "@/content/company";

interface ApproachStepsProps {
  detailed?: boolean;
}

/**
 * The four-stage approach as a horizontal sequence joined by a single rule.
 * Rendered on dark backgrounds.
 */
export function ApproachSteps({ detailed = false }: ApproachStepsProps) {
  return (
    <ol className="grid gap-y-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-0">
      {approach.map((item, i) => (
        <li key={item.step} className="relative flex flex-col lg:pr-10">
          <div className="flex items-center gap-4" aria-hidden="true">
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-teal-light/60 font-display text-[0.8125rem] font-semibold text-teal-light tabular-nums">
              {i + 1}
            </span>
            <span className={`h-px flex-1 ${i < approach.length - 1 ? "bg-white/20" : "bg-gradient-to-r from-white/20 to-transparent"}`} />
          </div>
          <h3 className="mt-7 text-[1.875rem] leading-none font-medium tracking-[-0.03em] text-white md:text-[2.25rem]">
            {item.step}
          </h3>
          <p className="mt-4 font-display text-[1.0625rem] leading-snug font-medium text-white/90">{item.summary}</p>
          {detailed ? <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate-light">{item.body}</p> : null}
        </li>
      ))}
    </ol>
  );
}
