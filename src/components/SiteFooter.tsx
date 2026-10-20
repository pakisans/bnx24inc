import Link from "next/link";
import { mainNav, site } from "@/content/site";
import { legalPages } from "@/content/legal";
import { services, servicePath } from "@/content/services";
import { Logo } from "./brand/Logo";

const heading = "font-display text-[0.6875rem] font-semibold tracking-[0.16em] text-slate-light uppercase";
const link = "inline-block py-1.5 transition-colors hover:text-white";

export function SiteFooter() {
  return (
    <footer className="on-dark border-t border-white/10 bg-navy-950 text-slate-light">
      <div className="container-site pt-16 pb-10 md:pt-20">
        <div className="border-b border-white/10 pb-14">
          <div>
            <Link href="/" aria-label="BNX 24 Inc. home" className="-m-2 inline-flex p-2">
              <Logo variant="dark" className="h-8 w-auto" />
            </Link>
            <p className="mt-7 max-w-md font-display text-[1.75rem] leading-[1.15] font-medium tracking-[-0.025em] text-white">
              {site.slogan}
            </p>
          </div>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <nav aria-label="Services" className="sm:col-span-2 lg:col-span-6">
            <h2 className={heading}>Services</h2>
            <ul className="mt-5 grid gap-x-8 text-[0.9375rem] sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={servicePath(s.slug)} className={link}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2 lg:col-start-8">
            <h2 className={heading}>Company</h2>
            <ul className="mt-5 text-[0.9375rem]">
              {[{ label: "Home", href: "/" }, ...mainNav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className={heading}>Contact</h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-block py-1.5 text-[0.9375rem] [overflow-wrap:anywhere] text-white underline decoration-teal-light underline-offset-4 hover:decoration-2"
            >
              {site.email}
            </a>
            <a
              href={site.phoneHref}
              className="mt-1 block py-1.5 text-[0.9375rem] whitespace-nowrap text-white transition-colors hover:text-teal-light"
            >
              {site.phone}
            </a>
            <p className="mt-3 text-[0.9375rem]">General business consulting for companies across the United States.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-sm lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {legalPages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className={link}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
