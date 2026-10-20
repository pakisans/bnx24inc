"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { mainNav, primaryCta, site } from "@/content/site";
import { Arrow } from "./ButtonLink";

function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function HeaderNav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close(true);
        return;
      }
      // Keep Tab focus inside the open menu (toggle button + menu links).
      if (e.key !== "Tab" || !buttonRef.current || !panelRef.current) return;
      const items = [buttonRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a")];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 48rem)");
    const onResize = () => desktop.matches && close(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
      document.documentElement.style.overflow = "";
    };
  }, [open, close]);

  const linkClass = (href: string) =>
    `relative py-2 font-display text-[0.9375rem] font-medium transition-colors duration-200 hover:text-navy-900 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-teal after:transition-transform after:duration-300 motion-reduce:after:transition-none ${
      isCurrent(pathname, href) ? "text-navy-900 after:scale-x-100" : "text-slate after:scale-x-0 hover:after:scale-x-100"
    }`;

  return (
    <>
      <nav aria-label="Main" className="hidden items-center gap-10 md:flex">
        <ul className="flex items-center gap-8">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={linkClass(item.href)}
                aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={primaryCta.href}
          data-contact-drawer
          className="group inline-flex min-h-11 items-center gap-2.5 rounded-sm bg-navy-900 px-5 font-display text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-teal-deep"
        >
          {primaryCta.label}
          <Arrow className="h-3.5 w-3.5" />
        </Link>
      </nav>

      <button
        ref={buttonRef}
        type="button"
        className="-mr-2 inline-flex min-h-12 min-w-12 items-center justify-center gap-2.5 rounded-sm px-2 font-display text-[0.9375rem] font-medium text-navy-900 md:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ease-out-soft motion-reduce:transition-none ${open ? "top-[5px] rotate-45" : "top-0"}`}
          />
          <span
            className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ease-out-soft motion-reduce:transition-none ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`}
          />
        </span>
      </button>

      <div
        id="mobile-menu"
        ref={panelRef}
        data-open={open}
        className="invisible fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto bg-paper opacity-0 transition-[opacity,visibility,translate] duration-300 ease-out-soft -translate-y-2 data-[open=true]:visible data-[open=true]:transition-[opacity,translate] data-[open=true]:translate-y-0 data-[open=true]:opacity-100 motion-reduce:transition-none md:hidden"
      >
        <nav aria-label="Mobile" className="container-site flex min-h-full flex-col pt-6 pb-10">
          <ul className="border-t border-line">
            {[{ label: "Home", href: "/" }, ...mainNav].map((item, i) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => close(false)}
                  aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                  className="group flex min-h-16 items-center gap-5 font-display text-[1.75rem] font-medium tracking-[-0.02em] text-navy-900 aria-[current=page]:text-teal"
                >
                  <span aria-hidden="true" className="index-num w-6">
                    0{i + 1}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <Link
              href={primaryCta.href}
              data-contact-drawer
              onClick={() => close(false)}
              className="group flex min-h-13 w-full items-center justify-center gap-3 rounded-sm bg-navy-900 px-5 font-display font-semibold text-white"
            >
              {primaryCta.label}
              <Arrow />
            </Link>
            <p className="mt-5 text-center text-sm text-slate">
              Or email{" "}
              <a href={`mailto:${site.email}`} className="text-link">
                {site.email}
              </a>
              <br />
              or call{" "}
              <a href={site.phoneHref} className="text-link whitespace-nowrap">
                {site.phone}
              </a>
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
