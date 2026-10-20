import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "BNX 24 Inc. sets no cookies of its own and uses no analytics or advertising trackers. See the security cookies our hosting provider may set and how to control them.",
  path: "/cookie-policy/",
});

const sections: LegalSection[] = [
  {
    id: "what-are-cookies",
    title: "What cookies are",
    body: (
      <p>
        Cookies are small text files a website stores in your browser. Similar technologies include local storage, pixels,
        and device fingerprinting. Websites use them for things like keeping you signed in, remembering preferences,
        measuring traffic, and advertising.
      </p>
    ),
  },
  {
    id: "our-use",
    title: "How this Site uses cookies",
    body: (
      <>
        <p>
          <strong>{site.legalName} does not set any cookies of its own</strong>, and the Site does not use analytics,
          advertising, social media, or other tracking technologies. The Site also does not store anything in your
          browser’s local storage.
        </p>
        <p>
          Our hosting provider, Cloudflare, may set the strictly necessary cookies below to protect the Site from bots,
          spam, and attacks. They do not identify you personally, are not used for advertising, and are not used to track
          you across other websites.
        </p>
        <div className="table-wrap" role="region" aria-label="Cookies that may be set" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col">Cookie</th>
                <th scope="col">Set by</th>
                <th scope="col">Purpose</th>
                <th scope="col">Duration</th>
                <th scope="col">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>__cf_bm</code>
                </td>
                <td>Cloudflare</td>
                <td>Distinguishes people from automated bots to protect the Site</td>
                <td>30 minutes</td>
                <td>Strictly necessary</td>
              </tr>
              <tr>
                <td>
                  <code>cf_clearance</code>
                </td>
                <td>Cloudflare</td>
                <td>Records that your browser passed a security check, so you are not asked again</td>
                <td>Set by the Site’s security settings; 30 minutes by default</td>
                <td>Strictly necessary</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          These cookies are set only when Cloudflare’s security features need them. More information is available in{" "}
          <a href="https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/">
            Cloudflare’s cookie documentation
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "no-banner",
    title: "Why there is no cookie banner",
    body: (
      <p>
        Cookie banners exist to ask for consent to optional cookies such as analytics and advertising. The Site uses
        none, and strictly necessary security cookies do not require consent, so there is nothing to ask. If we ever add
        optional cookies, we will update this policy first and give you a choice where the law requires it.
      </p>
    ),
  },
  {
    id: "signals",
    title: "Do Not Track and Global Privacy Control",
    body: (
      <p>
        Because the Site does not track visitors, Do Not Track and Global Privacy Control signals do not change how it
        behaves. See our <Link href="/privacy-policy/#california">Privacy Policy</Link> for how we would treat these
        signals if our practices change.
      </p>
    ),
  },
  {
    id: "control",
    title: "How to control cookies",
    body: (
      <>
        <p>
          You can view, block, and delete cookies in your browser settings. Blocking the security cookies above may mean
          you are asked to complete a security check more often. Instructions for common browsers:
        </p>
        <ul>
          <li>
            <a href="https://support.google.com/chrome/answer/95647">Google Chrome</a>
          </li>
          <li>
            <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac">Apple Safari</a>
          </li>
          <li>
            <a href="https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox">Mozilla Firefox</a>
          </li>
          <li>
            <a href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09">
              Microsoft Edge
            </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We will update this policy if the cookies used on the Site change. The effective date at the top of this page
        shows when it last changed. For how we handle personal information more broadly, see our{" "}
        <Link href="/privacy-policy/">Privacy Policy</Link>.
      </p>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      path="/cookie-policy/"
      intro={
        <p>
          Short version: we don’t set cookies, and we don’t use analytics or advertising trackers. Our hosting provider
          may set a security cookie to keep bots out.
        </p>
      }
      sections={sections}
    />
  );
}
