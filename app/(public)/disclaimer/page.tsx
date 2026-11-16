import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer & Advertising Disclosure",
  description:
    "Advertising, affiliate and content disclaimer for Zuno Clothing.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-12 border-b border-neutral-100 pb-8">
        <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
          Legal & Compliance
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-950 mt-2 mb-4">
          Disclaimer & Disclosure
        </h1>
        <p className="text-sm font-mono text-neutral-500">
          Last updated: November 16, 2026
        </p>
      </header>

      <div className="prose-content space-y-8 text-neutral-700 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            1. Affiliate Links
          </h2>
          <p>
            We currently don&apos;t use affiliate links. If that changes, affected pages will say so at the top.
          </p>
          <p>
            Our store reviews are based on desk research: each store&apos;s own policy pages, Trustpilot, Reviews.io, BBB and customer reports. When we buy and test a product, the review says so and shows our own photos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            2. Google AdSense & Display Advertising
          </h2>
          <p>
            This website displays contextual and personalized advertisements served by Google AdSense and third-party advertising networks. These advertisements are clearly separated from editorial content and marked with labels such as &ldquo;Advertisement&rdquo; or &ldquo;Sponsored.&rdquo; We do not control the specific commercial goods displayed in automated AdSense ad units.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            3. General Information Only
          </h2>
          <p>
            All content on <strong>zunoclothing.com</strong> is published for general lifestyle and educational purposes. While we strive to provide meticulous care routines for cotton, silk, denim, and wool, results may vary based on garment age, dye formulation, and individual washing machine characteristics.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            4. Contact
          </h2>
          <p>
            If you have any questions regarding our disclosures, please contact us at{" "}
            <a
              href="mailto:editorial@zunoclothing.com"
              className="underline text-black font-semibold"
            >
              editorial@zunoclothing.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

