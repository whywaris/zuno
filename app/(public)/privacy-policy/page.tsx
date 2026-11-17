import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Zuno Clothing" },
  description:
    "How Zuno Clothing collects and uses information, including cookies, Google AdSense, Google Analytics and your privacy rights.",
};

const LAST_UPDATED = "November 17, 2026";
const EMAIL = "help@zunoclothing.com";

const H2 = "text-xl font-bold text-neutral-900 mb-3";
const LINK = "underline text-black font-semibold";

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={LINK}>
      {children}
    </a>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-12 border-b border-neutral-100 pb-8">
        <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
          Legal & Compliance
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-950 mt-2 mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm font-mono text-neutral-500">Last updated: {LAST_UPDATED}</p>
      </header>

      <div className="prose-content space-y-8 text-neutral-700 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className={H2}>1. Introduction</h2>
          <p>
            This Privacy Policy explains how <strong>Zuno Clothing</strong> (&ldquo;we,&rdquo; &ldquo;our&rdquo; or &ldquo;us&rdquo;) collects, uses and protects information when you visit <strong>zunoclothing.com</strong>. By using the site, you agree to the practices described here.
          </p>
        </section>

        <section>
          <h2 className={H2}>2. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Information you send us.</strong> The site has no accounts, comments or contact form. If you email us, we receive your name and email address and whatever you include in your message.
            </li>
            <li>
              <strong>Information collected automatically.</strong> Like most websites, our hosting provider, Google Analytics and Google AdSense receive technical data such as your IP address, browser type, device type, pages visited, referring URLs and approximate location (country or city level), through cookies and similar technologies.
            </li>
            <li>We do not knowingly collect sensitive personal information.</li>
          </ul>
        </section>

        <section>
          <h2 className={H2}>3. How We Use Information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To reply to your emails, corrections and feedback.</li>
            <li>To understand which articles are read so we can improve the site.</li>
            <li>To show ads through Google AdSense, which funds the site.</li>
            <li>To keep the site secure and prevent fraud and abuse.</li>
          </ul>
          <p className="mt-3">We do not sell your personal information.</p>
        </section>

        <section>
          <h2 className={H2}>4. Cookies and Similar Technologies</h2>
          <p>
            Cookies are small text files stored by your browser. Essential cookies keep the site working, analytics cookies tell us how pages are used, and advertising cookies are used by ad partners such as Google. You can block or delete cookies in your browser settings, though some features may then work differently. See our{" "}
            <Link href="/cookies" className={LINK}>
              Cookie Policy
            </Link>{" "}
            for the full list and opt-out options.
          </p>
        </section>

        <section>
          <h2 className={H2}>5. Google AdSense and Third-Party Advertising</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites.</li>
            <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet.</li>
            <li>
              You may opt out of personalized advertising by visiting{" "}
              <Ext href="https://adssettings.google.com">Google Ads Settings</Ext>. You can also opt out of some third-party vendors&apos; use of cookies for personalized advertising at{" "}
              <Ext href="https://www.aboutads.info">www.aboutads.info</Ext>.
            </li>
            <li>
              To learn how Google uses information from sites that use its services, see{" "}
              <Ext href="https://policies.google.com/technologies/partner-sites">How Google uses information from sites or apps that use our services</Ext>.
            </li>
            <li>We do not control the cookies that third-party advertisers use, and their use is governed by their own privacy policies.</li>
            <li>If you opt out of personalized ads, you may still see non-personalized ads, which are based on general context such as the page you are reading rather than your browsing history.</li>
          </ul>
        </section>

        <section>
          <h2 className={H2}>6. Analytics</h2>
          <p>
            We use Google Analytics, loaded through Google Tag Manager, to understand how visitors use the site, such as which pages are read and how people arrive. Google Analytics uses cookies and receives data such as your IP address, browser and the pages you visit. We also use Google Search Console, which shows us how the site appears in Google Search; it does not place cookies on your device. You can opt out of Google Analytics with the{" "}
            <Ext href="https://tools.google.com/dlpage/gaoptout">Google Analytics Opt-out Browser Add-on</Ext>.
          </p>
        </section>

        <section>
          <h2 className={H2}>7. Affiliate Links</h2>
          <p>
            We currently don&apos;t use affiliate links. If that changes, affected pages will say so at the top and this policy will be updated. See our{" "}
            <Link href="/disclaimer" className={LINK}>
              Affiliate &amp; Ad Disclaimer
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className={H2}>8. Third-Party Websites</h2>
          <p>
            Our articles link to stores and other websites we don&apos;t control. Their privacy practices are their own, so please read their privacy policies before sharing information with them.
          </p>
        </section>

        <section>
          <h2 className={H2}>9. Data Retention and Security</h2>
          <p>
            We keep information only as long as needed: emails for as long as it takes to reply and keep a record of the conversation, and data collected by Google according to Google&apos;s own retention settings. We use reasonable safeguards, including HTTPS across the site, but no method of transmission or storage is 100% secure.
          </p>
        </section>

        <section>
          <h2 className={H2}>10. Your Rights</h2>
          <p className="mb-3">
            <strong>EEA and UK visitors:</strong> under the GDPR and UK GDPR you can ask to access, correct or delete your personal data, restrict or object to its processing, request a copy of it, and withdraw consent at any time. You can also complain to your local data protection authority.
          </p>
          <p className="mb-3">
            <strong>California residents:</strong> under the CCPA/CPRA you can ask what personal information we collect, ask us to delete or correct it, and opt out of its sale or sharing. We do not sell personal information. You won&apos;t be treated differently for using these rights.
          </p>
          <p>
            To make a request, email{" "}
            <a href={`mailto:${EMAIL}`} className={LINK}>
              {EMAIL}
            </a>
            . For data held by Google, you can also use the opt-out links above.
          </p>
        </section>

        <section>
          <h2 className={H2}>11. Children&apos;s Privacy</h2>
          <p>
            Zuno Clothing is not directed at children under 13, and we do not knowingly collect personal information from them. If you believe a child has sent us personal information, contact us and we will delete it.
          </p>
        </section>

        <section>
          <h2 className={H2}>12. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Changes take effect when posted on this page, and the &ldquo;Last updated&rdquo; date above will change.
          </p>
        </section>

        <section>
          <h2 className={H2}>13. Contact</h2>
          <p>
            Questions about this Privacy Policy? Email{" "}
            <a href={`mailto:${EMAIL}`} className={LINK}>
              {EMAIL}
            </a>{" "}
            or visit our{" "}
            <Link href="/contact" className={LINK}>
              contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
