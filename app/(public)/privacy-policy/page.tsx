import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Zuno Clothing — Explaining our cookie policies, Google AdSense data usage, GDPR and CCPA compliance.",
};

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
        <p className="text-sm font-mono text-neutral-500">
          Last updated: January 1, 2026 • Effective Date: January 1, 2026
        </p>
      </header>

      <div className="prose-content space-y-8 text-neutral-700 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">1. Introduction</h2>
          <p>
            Welcome to <strong>Zuno Clothing</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), located at <strong>zunoclothing.com</strong>. We are committed to protecting your privacy and transparently disclosing how information is collected, used, and safeguarded when you visit our publication.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            2. Google AdSense & Third-Party Advertising
          </h2>
          <p>
            We use Google AdSense and third-party advertising companies to serve advertisements when you visit our website. These companies may use information about your visits to this and other websites (such as through cookies, web beacons, and JavaScript) to provide advertisements about goods and services of interest to you.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Google&apos;s Use of Cookies:</strong> Google, as a third-party vendor, uses cookies to serve ads on <em>zunoclothing.com</em>.
            </li>
            <li>
              <strong>Google DART / Advertising Cookies:</strong> Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.
            </li>
            <li>
              <strong>Opt-Out of Personalized Advertising:</strong> Users may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-black font-medium"
              >
                Google Ad Settings
              </a>
              . Alternatively, you may opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{" "}
              <a
                href="https://www.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-black font-medium"
              >
                aboutads.info
              </a>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            3. Log Files & Analytics
          </h2>
          <p>
            Like most websites, <em>zunoclothing.com</em> makes use of log files. The information inside the log files includes internet protocol (IP) addresses, type of browser, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and number of clicks. This information is used solely to analyze trends, administer the site, track user movement around the site, and gather demographic insights. IP addresses and other such information are not linked to any personally identifiable information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            4. Cookies & Web Beacons
          </h2>
          <p>
            <em>zunoclothing.com</em> uses cookies to store information about visitors&apos; preferences, to record user-specific information on which pages the user accesses or visits, and to customize Web page content based on visitors&apos; browser type or other information that the visitor sends via their browser.
          </p>
          <p>
            You can choose to disable cookies through your individual browser options. Detailed information about cookie management with specific web browsers can be found at the browsers&apos; respective websites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            5. GDPR Data Protection Rights (European Economic Area)
          </h2>
          <p>
            If you are a resident of the European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR). We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The right to access, update, or delete the information we have on you.</li>
            <li>The right of rectification.</li>
            <li>The right to object to processing.</li>
            <li>The right of restriction.</li>
            <li>The right to data portability.</li>
            <li>The right to withdraw consent.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            6. California Consumer Privacy Act (CCPA) Rights
          </h2>
          <p>
            Under the CCPA, California consumers have the right to request that a business disclose the categories and specific pieces of personal data collected, request deletion of collected personal data, and opt out of the sale of personal data. Zuno Clothing does not sell personal data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            7. Children&apos;s Privacy (COPPA)
          </h2>
          <p>
            Protecting the privacy of young children is especially important. <em>zunoclothing.com</em> does not knowingly collect or maintain personally identifiable information from persons under 13 years of age, and no part of our website is directed to persons under 13.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            8. Contact Information
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact our Data Protection Officer at:{" "}
            <a
              href="mailto:privacy@zunoclothing.com"
              className="underline text-black font-semibold"
            >
              privacy@zunoclothing.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

