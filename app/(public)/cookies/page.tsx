import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Which cookies zunoclothing.com uses for Google AdSense ads and Google Analytics, and how to opt out.",
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-12 border-b border-neutral-100 pb-8">
        <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
          Legal & Compliance
        </span>
        <h1 className="text-4xl font-black tracking-tight text-neutral-950 mt-2 mb-2">
          Cookie Policy
        </h1>
        <p className="text-xs text-neutral-500 font-mono">
          Last updated: November 16, 2026
        </p>
      </header>

      <div className="prose-content space-y-8 text-neutral-700 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            1. What Cookies Are
          </h2>
          <p>
            Cookies are small text files that a website or a third party stores
            in your browser. This page explains the cookies used on{" "}
            <em>zunoclothing.com</em> and how you can control them. For how we
            handle personal data in general, see our{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            2. Advertising Cookies (Google AdSense)
          </h2>
          <p>
            We show ads through Google AdSense. Google and its partners,
            including its DoubleClick advertising cookie, may use cookies to
            serve ads based on your visits to this and other websites, to limit
            how often you see an ad, and to measure ad performance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            3. Analytics Cookies (Google Analytics)
          </h2>
          <p>
            We use Google Analytics, loaded through Google Tag Manager, to see
            which pages are read and how visitors find the site. Google
            Analytics sets its own cookies to tell visits apart. You can block
            it with Google&apos;s{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics opt-out browser add-on
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            4. How to Opt Out
          </h2>
          <ul>
            <li>
              Manage or turn off personalized Google ads at{" "}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
                adssettings.google.com
              </a>
              .
            </li>
            <li>
              Opt out of interest-based ads from many US advertising companies at{" "}
              <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">
                aboutads.info
              </a>
              .
            </li>
            <li>
              In the EEA and UK, use{" "}
              <a href="https://www.youronlinechoices.eu" target="_blank" rel="noopener noreferrer">
                youronlinechoices.eu
              </a>
              .
            </li>
            <li>
              You can also block or delete cookies in your browser settings. Some
              parts of the site may then work differently.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            5. Consent for EEA and UK Visitors
          </h2>
          <p>
            {/* TODO: update this section once a Google-certified consent banner is set up in AdSense (Privacy & messaging). */}
            The site does not currently show a cookie consent banner.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">6. Contact</h2>
          <p>
            Questions about cookies? Email{" "}
            <a href="mailto:help@zunoclothing.com">help@zunoclothing.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
