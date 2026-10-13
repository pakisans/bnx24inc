import Link from "next/link";
import type { Service } from "@/content/services";
import { servicePath } from "@/content/services";
import { Arrow } from "./ButtonLink";

interface ServiceIndexProps {
  items: Service[];
  headingLevel?: "h3" | "h4";
}

/** An editorial, numbered index of services. Each row is a single link. */
export function ServiceIndex({ items, headingLevel = "h3" }: ServiceIndexProps) {
  const Heading = headingLevel;
  return (
    <ul className="border-t border-line">
      {items.map((s) => (
        <li key={s.slug} className="border-b border-line">
          <Link
            href={servicePath(s.slug)}
            className="group grid gap-x-8 gap-y-2 py-7 md:grid-cols-12 md:items-baseline md:py-8"
          >
            <span className="font-sans text-sm font-semibold tracking-[0.14em] text-teal md:col-span-1" aria-hidden="true">
              {s.number}
            </span>
            <div className="md:col-span-5">
              <Heading className="font-serif text-2xl leading-tight text-navy-900 group-hover:text-teal md:text-[1.75rem]">
                {s.title}
              </Heading>
              <span className="mt-1.5 block text-sm font-medium tracking-wide text-slate uppercase">{s.focus}</span>
            </div>
            <p className="text-slate md:col-span-5">{s.summary}</p>
            <span className="hidden justify-end text-navy-900 group-hover:text-teal md:col-span-1 md:flex">
              <Arrow className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
