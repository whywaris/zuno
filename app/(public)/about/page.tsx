import type { Metadata } from "next";
import Link from "next/link";
import { POST_AUTHOR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Editorial Mission",
  description:
    "Learn about Zuno Clothing's mission to champion mindful dressing, fabric longevity, and authentic streetwear style.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-12 border-b border-neutral-100 pb-8">
        <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
          Who We Are
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-950 mt-2 mb-4">
          About Zuno Clothing
        </h1>
        <p className="text-lg text-neutral-600 leading-relaxed">
          A publication redefining modern apparel culture through intentional design, fabric preservation, and accessible styling.
        </p>
      </header>

      <div className="space-y-10 text-neutral-700 leading-relaxed text-base sm:text-lg">
        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-3 tracking-tight">
            Our Editorial Purpose
          </h2>
          <p className="mb-4">
            Founded with a vision to slow down the relentless cycle of disposable fashion, <strong>Zuno Clothing</strong> serves as an independent digital sanctuary for individuals who value quality over excess. We believe dressing well is not about amassing endless garments, but about mastering personal silhouette, understanding fiber characteristics, and building a versatile foundation that endures season after season.
          </p>
          <p>
            Whether dissecting the intricate history of 1980s street culture or explaining how cold-water washing extends the lifecycle of selvedge denim, {POST_AUTHOR} writes deeply researched, actionable guides without fluff.
          </p>
        </section>

        <section className="bg-neutral-50 p-8 rounded-xl border border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4 tracking-tight">
            Core Editorial Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-neutral-900 text-sm uppercase tracking-wider mb-2 font-mono">
                01. Mindful Wardrobes
              </h3>
              <p className="text-sm text-neutral-600">
                Encouraging intentional curation through versatile capsule collections, smart layering techniques, and timeless color theory.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 text-sm uppercase tracking-wider mb-2 font-mono">
                02. Fabric Science & Care
              </h3>
              <p className="text-sm text-neutral-600">
                Demystifying textiles — from natural wools and flax linen to cutting-edge recycled synthetics — so your garments look new for years.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 text-sm uppercase tracking-wider mb-2 font-mono">
                03. Street & Youth Culture
              </h3>
              <p className="text-sm text-neutral-600">
                Highlighting the grassroots origins, sneaker movements, and visionary designers shaping contemporary global streetwear.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-3 tracking-tight">
            Independence & Standards
          </h2>
          <p className="mb-4">
            Our coverage is driven purely by editorial curiosity and community utility. We clearly delineate our sponsored content or affiliate product links, adhering strictly to FTC guidelines and ethical journalism standards. For questions about our editorial integrity or to submit a story idea, please reach out to {POST_AUTHOR}.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-neutral-900 text-white rounded text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors"
            >
              Get in Touch with {POST_AUTHOR} →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

