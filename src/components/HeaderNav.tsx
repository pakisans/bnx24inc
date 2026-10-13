"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { mainNav, primaryCta } from "@/content/site";

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
    `relative py-2 text-[0.9375rem] font-medium transition-colors hover:text-navy-900 ${
      isCurrent(pathname, href)
        ? "text-navy-900 after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-teal"
        : "text-slate"
    }`;

  return (
    <>
      <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
        <ul className="flex items-center gap-7">
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
          className="inline-flex min-h-11 items-center rounded-[3px] bg-navy-900 px-5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-navy-700"
        >
          {primaryCta.label}
        </Link>
      </nav>

      <button
        ref={buttonRef}
        type="button"
        className="-mr-2 inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-[3px] px-2 text-[0.9375rem] font-medium text-navy-900 md:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true" focusable="false">
          {open ? (
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" fill="none" />
          ) : (
            <path d="M2 6h16M2 14h16" stroke="currentColor" strokeWidth="1.8" fill="none" />
          )}
        </svg>
      </button>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto border-t border-line bg-paper md:hidden"
      >
        <nav aria-label="Mobile" className="container-site py-6">
          <ul className="border-t border-line">
            {[{ label: "Home", href: "/" }, ...mainNav].map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => close(false)}
                  aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                  className="flex min-h-14 items-center justify-between font-serif text-2xl text-navy-900 aria-[current=page]:text-teal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={primaryCta.href}
            onClick={() => close(false)}
            className="mt-8 flex min-h-12 w-full items-center justify-center rounded-[3px] bg-teal px-5 font-semibold text-white"
          >
            {primaryCta.label}
          </Link>
        </nav>
      </div>
    </>
  );
}
