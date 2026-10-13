import type { FaqItem } from "@/content/services";

/** Native disclosure widgets: accessible, keyboard-friendly, no JavaScript. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-line">
          <summary className="flex min-h-14 cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="font-sans text-lg font-semibold leading-snug tracking-normal text-navy-900">
              {item.question}
            </h3>
            <span
              aria-hidden="true"
              className="relative mt-1.5 h-4 w-4 flex-none before:absolute before:top-[7px] before:left-0 before:h-0.5 before:w-4 before:bg-teal after:absolute after:top-0 after:left-[7px] after:h-4 after:w-0.5 after:bg-teal after:transition-transform group-open:after:scale-y-0 motion-reduce:after:transition-none"
            />
          </summary>
          <p className="max-w-3xl pb-6 text-slate">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
