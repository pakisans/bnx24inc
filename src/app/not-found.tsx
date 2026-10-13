import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { services, servicePath } from "@/content/services";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you were looking for could not be found.",
};

export default function NotFound() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-6">Error 404</p>
          <h1 className="display">We couldn’t find that page.</h1>
          <p className="lede mt-7 max-w-xl">
            The link may be out of date, or the address may have a typo. These pages are a good place to continue.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/">Go to the Homepage</ButtonLink>
            <ButtonLink href="/contact/" variant="secondary">
              Contact Us
            </ButtonLink>
          </div>
        </div>
        <nav aria-labelledby="nf-services" className="lg:col-span-5 lg:col-start-8">
          <h2 id="nf-services" className="font-sans text-xs font-semibold tracking-[0.14em] text-slate uppercase">
            Services
          </h2>
          <ul className="mt-4 border-t border-line">
            {services.map((s) => (
              <li key={s.slug} className="border-b border-line">
                <Link href={servicePath(s.slug)} className="flex min-h-12 items-center py-2 font-medium text-navy-900 hover:text-teal">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
