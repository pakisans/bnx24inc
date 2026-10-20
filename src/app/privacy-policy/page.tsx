import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { legal } from "@/content/legal";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How BNX 24 Inc. collects, uses, shares, and protects information from its website and contact form, and how U.S. visitors can exercise their privacy rights.",
  path: "/privacy-policy/",
});

const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          {site.legalName} (“BNX 24,” “we,” “us,” or “our”) is a business consulting company serving clients in the
          United States. We operate the website at <Link href="/">{site.url.replace("https://", "")}</Link> (the
          “Site”).
        </p>
        <p>
          This Privacy Policy explains what personal information we collect through the Site and when you contact us,
          how we use and share it, and the choices and rights you have. It does not cover information we receive under
          a signed consulting agreement, which is governed by that agreement.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <h3>Information you give us</h3>
        <p>When you use our contact form or email us, we receive the information you choose to provide:</p>
        <ul>
          <li>
            <strong>Contact details:</strong> your name, work email address, and, if you provide it, your phone number.
          </li>
          <li>
            <strong>Professional details:</strong> your company or organization, and optionally your job title, company
            size, and when you would like to start.
          </li>
          <li>
            <strong>Your inquiry:</strong> the service you are interested in and the message you write.
          </li>
          <li>
            <strong>Your consent:</strong> a record that you agreed we may use these details to reply to you.
          </li>
        </ul>
        <p>
          Please do not send confidential financial, legal, health, or other sensitive personal information through the
          Site or in a first email. We do not ask for it, and we have no need for it at that stage.
        </p>

        <h3>Information collected automatically</h3>
        <p>
          Like any website, the Site is delivered by servers that receive standard technical information with each
          request, such as your IP address, browser type, device type, the page requested, the referring page, and the
          date and time. Our hosting provider, Cloudflare, processes this information to deliver the Site, keep it
          secure, and protect it against abuse such as spam and attacks.
        </p>

        <h3>Website analytics</h3>
        <p>
          We use Cloudflare Web Analytics to understand, in aggregate, how the Site is used: which pages are viewed, which
          websites refer visitors, the approximate country, the type of device and browser, and how quickly pages load.
          It does not use cookies or local storage, does not create a profile of you, and does not track you across other
          websites. We see only aggregated statistics, not individual visitors.
        </p>

        <h3>What we do not collect</h3>
        <ul>
          <li>We do not use advertising tools, tracking pixels, social media plugins, or cookie-based analytics such as Google Analytics.</li>
          <li>We do not set cookies of our own. See our <Link href="/cookie-policy/">Cookie Policy</Link>.</li>
          <li>We do not buy personal information from data brokers or other third parties.</li>
          <li>Our fonts and images are served from our own Site, so no third-party font or image service sees your visit.</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use information",
    body: (
      <>
        <p>We use personal information only to:</p>
        <ul>
          <li>respond to your inquiry and communicate with you about it;</li>
          <li>discuss whether and how we can help, and prepare a proposal or scope of work if you ask for one;</li>
          <li>set up and manage an engagement if you become a client;</li>
          <li>keep records of our correspondence and business dealings;</li>
          <li>keep the Site and our systems secure and prevent spam, fraud, and abuse; and</li>
          <li>comply with legal obligations and protect our legal rights.</li>
        </ul>
        <p>
          We do not use your information for advertising, we do not add you to a mailing list, and we do not make
          decisions about you based solely on automated processing.
        </p>
      </>
    ),
  },
  {
    id: "how-we-share",
    title: "How we share information",
    body: (
      <>
        <p>
          <strong>We do not sell your personal information, and we do not share it for targeted (cross-context
          behavioral) advertising.</strong>{" "}
          We have not done so in the past 12 months.
        </p>
        <p>We disclose personal information only in these situations:</p>
        <ul>
          <li>
            <strong>Service providers</strong> that process it on our behalf and under contract, only to provide their
            services to us: Cloudflare (website hosting, security, and cookie-free website analytics), Resend (delivery of contact form messages to our
            mailbox), and our business email provider (storing and sending our email).
          </li>
          <li>
            <strong>Professional advisers</strong>, such as lawyers and accountants, where needed and subject to
            confidentiality obligations.
          </li>
          <li>
            <strong>Legal reasons:</strong> when required by law, subpoena, or court order, or when needed to protect
            the rights, property, or safety of BNX 24, our clients, or others.
          </li>
          <li>
            <strong>Business transfers:</strong> as part of a merger, acquisition, financing, or sale of all or part of
            our business, in which case this Policy will continue to protect the information transferred.
          </li>
          <li>
            <strong>With your permission</strong>, or at your direction.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    body: (
      <p>
        The Site does not set its own cookies and does not use analytics or advertising cookies; our website analytics
        is cookie-free. Our hosting provider may set strictly necessary security cookies to protect the Site from bots
        and attacks. Because we do not use optional cookies, we do not show a cookie banner. Details are in our <Link href="/cookie-policy/">Cookie Policy</Link>.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep information",
    body: (
      <p>
        We keep inquiry information for as long as needed to respond to you and to follow up on any conversation that
        results. If you become a client, we keep information for the duration of the engagement and afterward as needed
        for our records, taxes, accounting, and legal obligations. We periodically review the inquiries we hold and
        delete those we no longer need. Server logs held by our hosting provider are kept for a limited period under its
        own retention practices.
      </p>
    ),
  },
  {
    id: "security",
    title: "How we protect information",
    body: (
      <p>
        The Site is served only over an encrypted (HTTPS) connection, contact form submissions are transmitted
        encrypted, and access to our mailbox is limited to people who need it to respond to you. We use reputable
        service providers that maintain their own security programs. No method of transmission or storage is completely
        secure, so we cannot guarantee absolute security. If we learn of a security incident affecting your personal
        information, we will notify you as required by applicable law.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your privacy rights",
    body: (
      <>
        <p>
          Depending on where you live, state privacy laws (for example in California, Colorado, Connecticut, Oregon,
          Texas, Utah, Virginia, and other states) may give you rights over your personal information. To keep things
          simple, <strong>we honor the following requests from any U.S. resident</strong>, whether or not a particular
          law applies to us or to you:
        </p>
        <ul>
          <li>
            <strong>Know and access:</strong> ask what personal information we hold about you and receive a copy in a
            portable format.
          </li>
          <li>
            <strong>Correct:</strong> ask us to correct inaccurate information.
          </li>
          <li>
            <strong>Delete:</strong> ask us to delete personal information we hold about you, subject to legal
            exceptions (for example records we must keep for tax purposes).
          </li>
          <li>
            <strong>Opt out:</strong> we do not sell personal information, share it for targeted advertising, or use it
            for profiling that produces legal or similarly significant effects, so there is nothing to opt out of. If
            that ever changes, we will update this Policy and provide an opt-out first.
          </li>
          <li>
            <strong>Non-discrimination:</strong> we will not treat you differently for exercising any of these rights.
          </li>
        </ul>

        <h3>How to make a request</h3>
        <p>
          Email {mail} with the subject line “Privacy request,” or call{" "}
          <a href={site.phoneHref} className="whitespace-nowrap">
            {site.phone}
          </a>
          , and tell us what you would like us to do. We may need to
          confirm your identity, usually by replying to the email address we have on file, before acting on a request. You
          may use an authorized agent; we may ask the agent for proof of authorization and ask you to confirm your
          identity directly. We will respond within 45 days, and if we need more time (up to a further 45 days) we will
          tell you why.
        </p>

        <h3>Appeals</h3>
        <p>
          If we decline your request, we will explain why. You can appeal by replying to our decision with the subject
          line “Privacy appeal.” We will respond to an appeal within 60 days. If you are not satisfied with the result,
          you may contact the attorney general of your state.
        </p>
      </>
    ),
  },
  {
    id: "california",
    title: "Additional information for California residents",
    body: (
      <>
        <p>
          This section supplements this Policy for California residents and describes our practices over the past 12
          months, as described by the California Consumer Privacy Act (CCPA), as amended.
        </p>
        <div className="table-wrap" role="region" aria-label="Categories of personal information" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Examples</th>
                <th scope="col">Source</th>
                <th scope="col">Disclosed to</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Identifiers</td>
                <td>Name, email address, phone number, IP address</td>
                <td>You; your device</td>
                <td>Service providers</td>
              </tr>
              <tr>
                <td>Professional information</td>
                <td>Company, job title, company size</td>
                <td>You</td>
                <td>Service providers</td>
              </tr>
              <tr>
                <td>Customer records</td>
                <td>Your inquiry and our correspondence</td>
                <td>You</td>
                <td>Service providers</td>
              </tr>
              <tr>
                <td>Internet activity</td>
                <td>Technical request data processed for security, and aggregated website usage statistics</td>
                <td>Your device</td>
                <td>Hosting provider</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li>We collect these categories for the purposes described in “How we use information.”</li>
          <li>We have not sold or shared (for cross-context behavioral advertising) any of these categories.</li>
          <li>
            We do not intentionally collect sensitive personal information, and we do not use or disclose it for purposes
            that would give rise to a right to limit its use.
          </li>
          <li>
            <strong>Shine the Light:</strong> we do not disclose personal information to third parties for their own
            direct marketing purposes.
          </li>
          <li>
            <strong>Do Not Track and Global Privacy Control:</strong> the Site does not track visitors across websites
            or over time, so Do Not Track and Global Privacy Control signals do not change how the Site behaves. If we
            ever sell or share personal information, we will treat a Global Privacy Control signal as a valid opt-out
            request.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "children",
    title: "Children’s privacy",
    body: (
      <p>
        The Site is intended for businesses and professionals. It is not directed to children, and we do not knowingly
        collect personal information from anyone under 16. If you believe a child has sent us personal information,
        please contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "processing-location",
    title: "Where information is processed",
    body: (
      <p>
        We are based in the United States and the Site is intended for visitors in the United States. Our service
        providers may process information in the United States and in other countries where they or their
        sub-processors operate, under their own safeguards.
      </p>
    ),
  },
  {
    id: "other-websites",
    title: "Links to other websites",
    body: (
      <p>
        The Site may link to websites we do not control. Their privacy practices are governed by their own policies,
        which we encourage you to read.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this Policy",
    body: (
      <p>
        We may update this Policy from time to time. The effective date at the top of this page shows when it was last
        changed. If we make material changes, such as collecting new kinds of information or using it in new ways, we
        will make that clear on the Site before the change takes effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        For questions about this Policy or our privacy practices, or to make a request, email {mail}
        {legal.mailingAddress ? ", call " : " or call "}
        <a href={site.phoneHref} className="whitespace-nowrap">
          {site.phone}
        </a>
        {legal.mailingAddress ? <>, or write to {site.legalName}, {legal.mailingAddress}</> : null}.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy/"
      intro={
        <p>
          We collect very little information, only what you choose to send us, and we use it to reply to you. We don’t
          sell it, we don’t use it for advertising, and the Site doesn’t use cookies or follow you around the web.
        </p>
      }
      sections={sections}
    />
  );
}
