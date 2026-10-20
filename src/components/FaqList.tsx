import type { FaqItem } from "@/content/services";

/** Native disclosure widgets: accessible, keyboard-friendly, no JavaScript. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-navy-900/15">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-navy-900/15">
          <summary className="flex min-h-14 cursor-pointer list-none items-start justify-between gap-6 py-6 text-left transition-colors hover:text-teal [&::-webkit-details-marker]:hidden">
            <h3 className="text-[1.1875rem] leading-snug font-medium tracking-[-0.01em] text-inherit">
              {item.question}
            </h3>
            <span
              aria-hidden="true"
              className="relative mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-navy-900/20 transition-colors group-open:border-teal group-open:bg-teal before:absolute before:h-px before:w-3 before:bg-navy-900 group-open:before:bg-white after:absolute after:h-3 after:w-px after:bg-navy-900 after:transition-transform group-open:after:scale-y-0 motion-reduce:after:transition-none"
            />
          </summary>
          <p className="max-w-3xl pr-12 pb-7 text-slate">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
