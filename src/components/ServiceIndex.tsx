import Link from "next/link";
import type { Service } from "@/content/services";
import { servicePath } from "@/content/services";
import { Arrow } from "./ButtonLink";

interface ServiceIndexProps {
  items: Service[];
  headingLevel?: "h3" | "h4";
  /** Compact rows for grouped listings. */
  compact?: boolean;
}

/** An editorial, numbered index of services. Each row is a single link. */
export function ServiceIndex({ items, headingLevel = "h3", compact = false }: ServiceIndexProps) {
  const Heading = headingLevel;
  return (
    <ul className="border-t border-navy-900/15">
      {items.map((s) => (
        <li key={s.slug} className="border-b border-navy-900/15">
          <Link
            href={servicePath(s.slug)}
            className={`group relative grid gap-x-8 gap-y-3 transition-colors duration-300 before:absolute before:inset-y-0 before:-left-px before:w-0.5 before:origin-top before:scale-y-0 before:bg-teal before:transition-transform before:duration-300 hover:before:scale-y-100 motion-reduce:before:transition-none md:grid-cols-12 md:items-baseline ${
              compact ? "py-6 md:py-7" : "py-7 md:py-9"
            }`}
          >
            <span className="index-num md:col-span-1 md:pl-4" aria-hidden="true">
              {s.number}
            </span>
            <div className={compact ? "md:col-span-5" : "md:col-span-5"}>
              <Heading
                className={`font-medium text-navy-900 transition-colors duration-200 group-hover:text-teal ${
                  compact ? "text-[1.375rem] leading-tight" : "text-[1.5rem] leading-[1.15] md:text-[1.875rem]"
                }`}
              >
                {s.title}
              </Heading>
              <span className="mt-2 block font-display text-[0.8125rem] font-medium tracking-[0.06em] text-slate uppercase">
                {s.focus}
              </span>
            </div>
            <p className="text-slate md:col-span-5">{s.summary}</p>
            <span className="hidden justify-end pt-1 text-navy-900 group-hover:text-teal md:col-span-1 md:flex">
              <Arrow className="h-5 w-5" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
