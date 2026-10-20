import Link from "next/link";

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ items, onDark = false }: { items: Crumb[]; onDark?: boolean }) {
  const muted = onDark ? "text-slate-light" : "text-slate";
  const current = onDark ? "text-white" : "text-ink";
  const hover = onDark ? "hover:text-white" : "hover:text-navy-900";
  return (
    <nav aria-label="Breadcrumb" className={`font-display text-[0.8125rem] font-medium ${muted}`}>
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2.5">
              {last ? (
                <span aria-current="page" className={current}>
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className={`underline-offset-4 transition-colors hover:underline ${hover}`}>
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className="opacity-50">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
