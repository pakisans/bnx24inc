import { absoluteUrl, site } from "@/content/site";
import { servicePath, type Service } from "@/content/services";

const orgId = `${site.url}/#organization`;

/** Organization facts supplied by the owner. No address, ratings or sameAs until verified. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    legalName: site.legalName,
    url: `${site.url}/`,
    logo: absoluteUrl("/brand/bnx24-logo-512.png"),
    email: site.email,
    telephone: "+1-206-519-8855",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+1-206-519-8855",
      email: site.email,
      areaServed: "US",
      availableLanguage: "English",
    },
    description: site.description,
    slogan: site.slogan,
    areaServed: { "@type": "Country", name: site.areaServed },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: `${site.url}/`,
    inLanguage: "en-US",
    publisher: { "@id": orgId },
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(servicePath(service.slug))}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.summary,
    url: absoluteUrl(servicePath(service.slug)),
    provider: { "@id": orgId },
    areaServed: { "@type": "Country", name: site.areaServed },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
