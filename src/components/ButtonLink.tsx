import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "onDark" | "ghostOnDark";

const styles: Record<Variant, string> = {
  primary: "bg-teal text-white hover:bg-teal-deep",
  secondary: "border border-navy-900/25 text-navy-900 hover:border-navy-900 hover:bg-white",
  onDark: "bg-paper text-navy-900 hover:bg-white",
  ghostOnDark: "border border-white/30 text-white hover:border-white hover:bg-white/5",
};

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

export function ButtonLink({ href, children, variant = "primary", className = "" }: ButtonLinkProps) {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-[3px] px-6 py-3 text-[0.9375rem] font-semibold leading-tight transition-colors";
  const isInternal = href.startsWith("/");
  const cls = `${base} ${styles[variant]} ${className}`;
  return isInternal ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`h-4 w-4 flex-none ${className}`} aria-hidden="true" focusable="false">
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
