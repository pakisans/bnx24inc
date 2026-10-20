import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "onDark" | "ghostOnDark";

const styles: Record<Variant, string> = {
  primary: "bg-navy-900 text-white hover:bg-teal-deep",
  secondary: "border border-navy-900/20 text-navy-900 hover:border-navy-900 hover:bg-white",
  onDark: "bg-teal-light text-navy-950 hover:bg-white",
  ghostOnDark: "border border-white/25 text-white hover:border-white hover:bg-white/5",
};

/** Shared button styling, also used by real <button> elements. */
export function buttonClass(variant: Variant = "primary", className = "") {
  return `group/btn inline-flex min-h-12 items-center justify-center gap-3 rounded-sm px-6 py-3 font-display text-[0.9375rem] font-semibold leading-tight tracking-[-0.005em] transition-colors duration-200 ${styles[variant]} ${className}`;
}

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Opens the contact drawer on a plain click; the href still works everywhere else. */
  drawer?: boolean;
}

export function ButtonLink({ href, children, variant = "primary", className = "", drawer }: ButtonLinkProps) {
  const cls = buttonClass(variant, className);
  return href.startsWith("/") ? (
    <Link href={href} className={cls} data-contact-drawer={drawer || undefined}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}

/** Arrow that nudges forward on hover of its parent link or button. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-4 w-4 flex-none transition-transform duration-300 ease-out-soft group-hover:translate-x-1 group-hover/btn:translate-x-1 motion-reduce:transition-none ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
