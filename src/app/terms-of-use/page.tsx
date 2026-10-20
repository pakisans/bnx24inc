import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { legal } from "@/content/legal";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "The terms that apply when you use the BNX 24 Inc. website, including how its content may be used and how consulting engagements are formed.",
  path: "/terms-of-use/",
});

const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of these Terms",
    body: (
      <p>
        These Terms of Use (“Terms”) govern your use of the website at{" "}
        <Link href="/">{site.url.replace("https://", "")}</Link> (the “Site”), operated by {site.legalName} (“BNX 24,”
        “we,” “us,” or “our”). By using the Site, you agree to these Terms. If you do not agree, please do not use the
        Site.
      </p>
    ),
  },
  {
    id: "information-only",
    title: "General information, not professional advice",
    body: (
      <>
        <p>
          The Site describes our company and our consulting services. Its content is general information only. It is
          not business, financial, legal, tax, accounting, or investment advice, and it is not tailored to your
          situation. Do not rely on it as a substitute for advice from a qualified professional who knows your
          circumstances.
        </p>
        <p>
          Descriptions of services, possible outputs, and approaches are examples. The actual scope, deliverables,
          timing, and fees of any work are set only in a written agreement. We do not promise or guarantee any
          particular business result.
        </p>
      </>
    ),
  },
  {
    id: "no-engagement",
    title: "No client relationship from using the Site",
    body: (
      <p>
        Using the Site, sending us a message through the contact form, or emailing us does not create a consulting,
        advisory, or other client relationship, and does not oblige either of us to enter into one. A client relationship
        begins only when both parties sign a written agreement or engagement letter.
      </p>
    ),
  },
  {
    id: "submissions",
    title: "Information you send us",
    body: (
      <>
        <p>
          You are responsible for the information you send through the Site. Please provide accurate contact details and
          do not send confidential, proprietary, or sensitive information before a written agreement is in place. Until
          then, we cannot accept an obligation of confidentiality for unsolicited information, although we handle all
          personal information as described in our <Link href="/privacy-policy/">Privacy Policy</Link>.
        </p>
        <p>
          You must not submit content that is unlawful, misleading, infringing, or harmful, or that you do not have the
          right to share.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <>
        <p>
          The Site and its content, including text, design, graphics, and the BNX 24 name and logo, are owned by or
          licensed to BNX 24 and are protected by U.S. and international intellectual property laws. Photographs are used
          under license from their creators and remain their property.
        </p>
        <p>
          You may view, download, and print pages from the Site for your own non-commercial, informational use, provided
          you keep any copyright and other notices. You may not otherwise copy, modify, republish, sell, or create
          derivative works from the Site’s content, or use our name or logo in a way that suggests endorsement or
          affiliation, without our prior written permission.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <p>When using the Site, you agree not to:</p>
        <ul>
          <li>use it for any unlawful purpose or in violation of these Terms;</li>
          <li>send spam, bulk, or automated messages through the contact form;</li>
          <li>impersonate any person or organization, or misrepresent your affiliation;</li>
          <li>
            attempt to gain unauthorized access to the Site or its systems, or probe, scan, or test them for
            vulnerabilities without our written permission;
          </li>
          <li>introduce malware or interfere with the Site’s operation, security, or availability; or</li>
          <li>scrape or harvest content or contact details in a way that burdens the Site or for unsolicited marketing.</li>
        </ul>
        <p>We may block access to the Site for anyone who violates these Terms.</p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-party services and links",
    body: (
      <p>
        The Site relies on third-party services (such as hosting and email delivery) and may link to other websites. We
        are not responsible for third-party websites or services, their content, or their practices, and a link does not
        mean we endorse them.
      </p>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    body: (
      <p className="legal-conspicuous">
        The Site and its content are provided “as is” and “as available,” without warranties of any kind, express or
        implied, including warranties of merchantability, fitness for a particular purpose, accuracy, and
        non-infringement. We work to keep the Site accurate and available, but we do not warrant that it will be
        uninterrupted, error-free, or free of harmful components, or that its content is complete or current.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <>
        <p className="legal-conspicuous">
          To the fullest extent permitted by law, BNX 24 and its officers, employees, and agents will not be liable for
          any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, revenue,
          data, or business opportunity, arising out of or relating to your use of, or inability to use, the Site or its
          content, even if we have been advised of the possibility of such damages.
        </p>
        <p>
          To the fullest extent permitted by law, our total liability for any claim relating to the Site is limited to
          one hundred U.S. dollars (US$100). Some jurisdictions do not allow certain limitations, so some of these
          limitations may not apply to you. Nothing in these Terms limits liability that cannot be limited by law.
        </p>
        <p>These limitations do not apply to work performed under a signed consulting agreement, which governs that work.</p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnification",
    body: (
      <p>
        You agree to indemnify and hold harmless BNX 24 and its officers, employees, and agents from any claims, losses,
        and expenses (including reasonable attorneys’ fees) arising from your misuse of the Site or your violation of
        these Terms.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: legal.governingState ? (
      <p>
        These Terms are governed by the laws of the State of {legal.governingState} and applicable U.S. federal law,
        without regard to conflict-of-law rules. Any dispute relating to the Site will be brought in the state or federal
        courts located in {legal.governingState}, and you consent to their jurisdiction.
      </p>
    ) : (
      <p>
        These Terms are governed by applicable U.S. federal law and the laws of the state in which {site.legalName} is
        incorporated, without regard to conflict-of-law rules. Any dispute relating to the Site will be brought in the
        state or federal courts of that state, and you consent to their jurisdiction.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to the Site and these Terms",
    body: (
      <p>
        We may change, suspend, or discontinue any part of the Site at any time. We may also update these Terms; the
        effective date at the top of this page shows when they last changed. Continuing to use the Site after an update
        means you accept the updated Terms.
      </p>
    ),
  },
  {
    id: "general",
    title: "General",
    body: (
      <p>
        If any provision of these Terms is found unenforceable, the rest remain in effect. Our failure to enforce a
        provision is not a waiver of it. These Terms, together with our <Link href="/privacy-policy/">Privacy Policy</Link>{" "}
        and <Link href="/cookie-policy/">Cookie Policy</Link>, are the entire agreement between you and BNX 24 about the
        Site. They do not replace any signed agreement for consulting services.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: <p>Questions about these Terms can be sent to {mail}.</p>,
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      path="/terms-of-use/"
      intro={
        <p>
          These terms cover the use of this website. Consulting work is always agreed separately, in writing, before it
          begins.
        </p>
      }
      sections={sections}
    />
  );
}
