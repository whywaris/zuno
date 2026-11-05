import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer & Advertising Disclosure",
  description:
    "Affiliate, advertising, and content disclaimer for Zuno Clothing in compliance with FTC guidelines.",
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
          Last updated: January 1, 2026
        </p>
      </header>

      <div className="prose-content space-y-8 text-neutral-700 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            1. FTC Affiliate Disclosure
          </h2>
          <p>
            In compliance with the Federal Trade Commission (FTC) guidelines, please assume that certain links on <strong>zunoclothing.com</strong> are affiliate links. If you click on an affiliate link and make a purchase, Zuno Clothing may earn a small affiliate commission at absolutely no additional cost to you.
          </p>
          <p>
            Our editorial integrity is paramount. We only recommend apparel items, textile detergents, steamers, and fashion brands that our editorial staff has vetted, tested, or genuinely values. Affiliate partnerships never influence our critical reviews or garment evaluations.
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

