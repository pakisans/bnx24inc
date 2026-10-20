import { primaryCta, site } from "@/content/site";
import { Arrow, ButtonLink } from "./ButtonLink";

interface CtaSectionProps {
  heading?: string;
  body?: string;
  /** Pre-selects the area of interest on the contact form. */
  interest?: string;
}

export function CtaSection({
  heading = "Have a decision in front of you? Let’s talk it through.",
  body = "Tell us what is happening in your business and what you would like to change. We’ll talk it through and discuss whether BNX 24 is the right fit.",
  interest,
}: CtaSectionProps) {
  const href = interest ? `${primaryCta.href}?interest=${interest}` : primaryCta.href;
  return (
    <section aria-labelledby="cta-heading" className="on-dark relative overflow-hidden bg-navy-900 text-white">
      <div aria-hidden="true" className="grid-lines absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="container-site relative grid gap-12 py-24 md:py-32 lg:grid-cols-12 lg:items-end">
        <div className="reveal lg:col-span-8">
          <p className="eyebrow mb-6">Start a conversation</p>
          <h2 id="cta-heading" className="display max-w-4xl text-white">
            {heading}
          </h2>
          <p className="lede mt-7 max-w-2xl">{body}</p>
        </div>
        <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:items-end lg:pb-2">
          <ButtonLink href={href} variant="onDark" drawer className="min-h-14 px-8 text-base">
            {primaryCta.label}
            <Arrow />
          </ButtonLink>
          <p className="text-[0.9375rem] text-slate-light lg:text-right">
            Or email{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-white underline decoration-teal-light underline-offset-4 hover:decoration-2"
            >
              {site.email}
            </a>
            <br />
            or call{" "}
            <a
              href={site.phoneHref}
              className="whitespace-nowrap text-white underline decoration-teal-light underline-offset-4 hover:decoration-2"
            >
              {site.phone}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
