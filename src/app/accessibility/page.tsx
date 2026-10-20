import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Accessibility Statement",
  description:
    "BNX 24 Inc. aims for its website to meet WCAG 2.2 Level AA. Read what we have done, how we test, and how to report a barrier or ask for information in another format.",
  path: "/accessibility/",
});

const mail = <a href={`mailto:${site.email}?subject=Accessibility`}>{site.email}</a>;

const sections: LegalSection[] = [
  {
    id: "commitment",
    title: "Our commitment",
    body: (
      <p>
        {site.legalName} wants everyone, including people with disabilities, to be able to learn about our services and
        contact us. We aim for the Site to conform to the{" "}
        <a href="https://www.w3.org/TR/WCAG22/">Web Content Accessibility Guidelines (WCAG) 2.2</a> at Level AA.
      </p>
    ),
  },
  {
    id: "measures",
    title: "What we have done",
    body: (
      <ul>
        <li>Semantic page structure with one main heading per page, landmarks, and a “Skip to main content” link.</li>
        <li>Everything works with a keyboard, with a clearly visible focus indicator.</li>
        <li>Text and interface colors chosen to meet WCAG AA contrast ratios.</li>
        <li>Text is real text, not images of text, and can be zoomed to 200% without loss of content.</li>
        <li>Every form field has a visible label; errors are described in text and announced to screen readers.</li>
        <li>The service selector and contact panel follow WAI-ARIA patterns and manage focus.</li>
        <li>Meaningful images have text alternatives; decorative images are hidden from assistive technology.</li>
        <li>Animation is subtle and turns off when your device is set to reduce motion.</li>
        <li>No content flashes, auto-plays, or requires a time limit.</li>
      </ul>
    ),
  },
  {
    id: "testing",
    title: "How we test",
    body: (
      <p>
        We test the Site with automated checks, keyboard-only navigation, screen-size and zoom testing on phones,
        tablets, and desktops, and automated browser tests of the contact form and menus. We have not yet had a formal
        audit by an independent accessibility specialist.
      </p>
    ),
  },
  {
    id: "limitations",
    title: "Known limitations",
    body: (
      <p>
        We are not aware of any barriers at this time. Some content we link to, such as third-party websites, is outside
        our control and may not meet the same standard.
      </p>
    ),
  },
  {
    id: "feedback",
    title: "Feedback and alternative formats",
    body: (
      <p>
        If you have difficulty using any part of the Site, or would like information in another format, please email{" "}
        {mail} or call{" "}
        <a href={site.phoneHref} className="whitespace-nowrap">
          {site.phone}
        </a>
        . Tell us the page, what you were trying to do, and the device or assistive technology you use, if you’re
        comfortable sharing it. We will reply and work with you to provide the information or service you need.
      </p>
    ),
  },
];

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility Statement"
      path="/accessibility/"
      intro={<p>We want this Site to work for everyone, whatever device or assistive technology you use.</p>}
      sections={sections}
    />
  );
}
