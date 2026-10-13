import { approach } from "@/content/company";

interface ApproachStepsProps {
  detailed?: boolean;
}

/** The four-stage approach. Rendered on dark backgrounds. */
export function ApproachSteps({ detailed = false }: ApproachStepsProps) {
  return (
    <ol className="grid gap-px overflow-hidden border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-4">
      {approach.map((item, i) => (
        <li key={item.step} className="flex flex-col bg-navy-900 p-6 md:p-7">
          <div className="flex items-center gap-3 text-sm font-semibold tracking-[0.14em] text-teal-light uppercase">
            <span aria-hidden="true">0{i + 1}</span>
            <span aria-hidden="true" className="h-px flex-1 bg-line-dark" />
          </div>
          <h3 className="mt-5 font-serif text-2xl text-white">{item.step}</h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate-light">
            {detailed ? item.body : item.summary}
          </p>
        </li>
      ))}
    </ol>
  );
}
