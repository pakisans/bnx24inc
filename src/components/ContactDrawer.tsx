"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Loaded on first use so pages without an open drawer ship no form code. */
const ContactForm = dynamic(() => import("./ContactForm").then((m) => m.ContactForm), {
  ssr: false,
  loading: () => <p className="py-10 text-slate">Loading the form…</p>,
});

interface ContactDrawerProps {
  endpoint: string;
  email: string;
  phone: string;
  phoneHref: string;
  services: { value: string; label: string; number: string; focus: string }[];
}

/** Links that should open the drawer carry this attribute and a real /contact/ href. */
export const DRAWER_ATTR = "data-contact-drawer";

/**
 * Slide-in contact panel built on the native <dialog> element (focus
 * containment, Escape and focus return come from the browser).
 * Progressive enhancement: triggers are ordinary links to /contact/, so
 * modified clicks, new tabs, sharing and no-JS visits still reach the page.
 */
export function ContactDrawer({ endpoint, email, phone, phoneHref, services }: ContactDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);
  const [preset, setPreset] = useState({ service: "", nonce: 0 });
  const pathname = usePathname();

  // A link inside the drawer that navigates should not leave it open over the new page.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>(`a[${DRAWER_ATTR}]`);
      if (!link || link.target === "_blank") return;
      // On the contact page itself the form is already there.
      if (window.location.pathname.replace(/\/?$/, "/") === "/contact/") return;
      e.preventDefault();
      const service = new URL(link.href).searchParams.get("interest") ?? "";
      setMounted(true);
      setPreset((p) => ({ service, nonce: p.nonce + 1 }));
      dialogRef.current?.showModal();
    };
    // Warm the form code as soon as someone shows intent.
    const onIntent = (e: Event) => {
      if ((e.target as Element | null)?.closest?.(`a[${DRAWER_ATTR}]`)) void import("./ContactForm");
    };
    // Capture phase, so this runs before Next's <Link> handles the click.
    document.addEventListener("click", onClick, true);
    document.addEventListener("pointerover", onIntent, { passive: true });
    document.addEventListener("focusin", onIntent);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("pointerover", onIntent);
      document.removeEventListener("focusin", onIntent);
    };
  }, []);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="contact-drawer-title"
      className="drawer"
      // A click that lands on the dialog element itself is a click on the backdrop.
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="flex min-h-full flex-col">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-navy-900/10 bg-paper/95 px-5 py-3 backdrop-blur-sm sm:px-8">
          <p className="eyebrow">Let’s talk</p>
          <button
            type="button"
            onClick={close}
            className="-mr-2 inline-flex min-h-12 items-center gap-2.5 rounded-sm px-2 font-display text-[0.9375rem] font-medium text-navy-900"
          >
            Close
            <span aria-hidden="true" className="relative block h-3 w-4">
              <span className="absolute top-[5px] left-0 h-[1.5px] w-4 rotate-45 bg-current" />
              <span className="absolute top-[5px] left-0 h-[1.5px] w-4 -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        <div className="flex-1 px-5 pt-8 pb-12 sm:px-8 sm:pt-10">
          <h2 id="contact-drawer-title" className="h2">
            Tell us about your business
          </h2>
          <p className="mt-4 text-slate">
            A short description is enough to start. Prefer to email or call? Write to{" "}
            <a href={`mailto:${email}`} className="text-link">
              {email}
            </a>{" "}
            or call{" "}
            <a href={phoneHref} className="text-link whitespace-nowrap">
              {phone}
            </a>
            .
          </p>
          <div className="mt-8">
            {mounted ? <ContactForm
                endpoint={endpoint}
                email={email}
                phone={phone}
                phoneHref={phoneHref}
                services={services}
                preset={preset}
              /> : null}
          </div>
        </div>
      </div>
    </dialog>
  );
}
