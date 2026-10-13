import Link from "next/link";
import { mainNav, site } from "@/content/site";
import { services, servicePath } from "@/content/services";
import { Logo } from "./brand/Logo";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-navy-950 text-slate-light">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-12">
        <div className="md:col-span-2 lg:col-span-4">
          <Link href="/" aria-label="BNX 24 Inc. home" className="-m-2 inline-flex p-2">
            <Logo variant="dark" className="h-9 w-auto" />
          </Link>
          <p className="mt-6 max-w-xs font-serif text-xl leading-snug text-paper">{site.slogan}</p>
          <p className="mt-4 max-w-xs text-[0.9375rem]">
            General business consulting for companies across the United States.
          </p>
        </div>

        <nav aria-label="Services" className="lg:col-span-5">
          <h2 className="font-sans text-xs font-semibold tracking-[0.14em] text-paper uppercase">Services</h2>
          <ul className="mt-5 grid gap-x-8 gap-y-1 text-[0.9375rem] sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={servicePath(s.slug)} className="inline-block py-1.5 hover:text-paper hover:underline">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-1 lg:col-span-3">
          <nav aria-label="Company">
            <h2 className="font-sans text-xs font-semibold tracking-[0.14em] text-paper uppercase">Company</h2>
            <ul className="mt-5 space-y-1 text-[0.9375rem]">
              {[{ label: "Home", href: "/" }, ...mainNav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-block py-1.5 hover:text-paper hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="font-sans text-xs font-semibold tracking-[0.14em] text-paper uppercase">Contact</h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-block py-1.5 text-[0.9375rem] [overflow-wrap:anywhere] text-paper underline decoration-teal-light underline-offset-4 hover:decoration-2"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line-dark">
        <div className="container-site flex flex-col gap-2 py-6 text-sm sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>Serving clients nationwide.</p>
        </div>
      </div>
    </footer>
  );
}
