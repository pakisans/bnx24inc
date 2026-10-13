import { primaryCta, site } from "@/content/site";
import { Arrow, ButtonLink } from "./ButtonLink";

interface CtaSectionProps {
  heading?: string;
  body?: string;
  /** Pre-selects the area of interest on the contact form. */
  interest?: string;
}

export function CtaSection({
  heading = primaryCta.heading,
  body = "Tell us what is happening in your business and what you would like to change. We’ll talk it through and discuss whether BNX 24 is the right fit.",
  interest,
}: CtaSectionProps) {
  const href = interest ? `${primaryCta.href}?interest=${interest}` : primaryCta.href;
  return (
    <section aria-labelledby="cta-heading" className="on-dark bg-navy-900 text-white">
      <div className="container-site grid gap-10 py-20 md:py-24 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-5">Start a conversation</p>
          <h2 id="cta-heading" className="h2 text-white">
            {heading}
          </h2>
          <p className="lede mt-5 max-w-2xl">{body}</p>
        </div>
        <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
          <ButtonLink href={href} variant="onDark">
            {primaryCta.label}
            <Arrow />
          </ButtonLink>
          <p className="text-[0.9375rem] text-slate-light">
            Or email{" "}
            <a href={`mailto:${site.email}`} className="text-white underline decoration-teal-light underline-offset-4">
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
