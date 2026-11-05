import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing the use of Zuno Clothing blog and services.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-12 border-b border-neutral-100 pb-8">
        <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
          Legal & Compliance
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-950 mt-2 mb-4">
          Terms of Service
        </h1>
        <p className="text-sm font-mono text-neutral-500">
          Last updated: January 1, 2026
        </p>
      </header>

      <div className="prose-content space-y-8 text-neutral-700 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or using <strong>zunoclothing.com</strong>, you agree to be bound by these Terms of Service. If you do not agree to all terms and conditions, you must not access or use this website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            2. Intellectual Property Rights
          </h2>
          <p>
            Unless otherwise stated, Zuno Clothing owns the intellectual property rights for all editorial content, photographs, formatting, logos, and materials published on <em>zunoclothing.com</em>. All intellectual property rights are reserved. You may view and print pages for personal, non-commercial use, subject to restrictions set in these terms.
          </p>
          <p>You must not:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Republish entire articles from Zuno Clothing without written attribution and canonical link.</li>
            <li>Sell, rent, or sub-license material from the website.</li>
            <li>Reproduce, duplicate, or copy material for commercial syndication without prior license.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            3. Accuracy of Materials & Editorial Advice
          </h2>
          <p>
            The fashion, apparel, and fabric care information provided on Zuno Clothing is for general informational and educational purposes only. While we endeavor to keep all fabric maintenance guides accurate and up-to-date, we make no representations or warranties regarding the completeness or suitability of any specific technique for individual garments. Always consult the manufacturer&apos;s sewn-in care label.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            4. External Links & Third-Party Platforms
          </h2>
          <p>
            Our website may contain links to third-party web sites or services that are not owned or controlled by Zuno Clothing. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            5. Modifications to Terms
          </h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. Changes become effective immediately upon posting.
          </p>
        </section>
      </div>
    </div>
  );
}

