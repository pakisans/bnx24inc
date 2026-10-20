import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ContactDrawer } from "@/components/ContactDrawer";
import { JsonLd } from "@/components/JsonLd";
import { integrations, site } from "@/content/site";
import { services } from "@/content/services";
import { ogImage } from "@/lib/metadata";
import { organizationJsonLd } from "@/lib/structured-data";
import "./globals.css";

const inter = localFont({
  src: "../fonts/inter-latin-wght.woff2",
  variable: "--font-inter",
  weight: "400 700",
  display: "swap",
});

const instrumentSans = localFont({
  src: "../fonts/instrument-sans-latin-wdth-wght.woff2",
  variable: "--font-instrument",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0B1F33",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${inter.variable} ${instrumentSans.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="fixed top-3 left-3 z-50 -translate-y-24 rounded-sm bg-navy-900 px-4 py-3 font-semibold text-white focus:translate-y-0"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <ContactDrawer
          endpoint={integrations.contactFormEndpoint}
          email={site.email}
          phone={site.phone}
          phoneHref={site.phoneHref}
          services={services.map((s) => ({ value: s.slug, label: s.title, number: s.number, focus: s.focus }))}
        />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
