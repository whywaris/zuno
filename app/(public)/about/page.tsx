import type { Metadata } from "next";
import Link from "next/link";
import { AUTHOR_PROFILE, POST_AUTHOR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Zuno Clothing",
  description:
    "Learn about Zuno Clothing's coverage of anime streetwear, anime clothes, store reviews, and styling and fabric care guides.",
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
          A publication about anime fashion: what to wear, where to buy it, and how to make it last.
        </p>
      </header>

      <div className="space-y-10 text-neutral-700 leading-relaxed text-base sm:text-lg">
        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-3 tracking-tight">
            Our Editorial Purpose
          </h2>
          <p className="mb-4">
            <strong>Zuno Clothing</strong> helps anime fans dress well, on and off the street. We cover anime streetwear and everyday anime clothes, review the stores that sell them, and explain how to style printed pieces and keep them looking good.
          </p>
          <p>
            Whether comparing anime clothing stores or explaining how to wash a printed hoodie, {POST_AUTHOR} writes practical, actionable guides without fluff.
          </p>
        </section>

        <section className="bg-neutral-50 p-8 rounded-xl border border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4 tracking-tight">
            Core Editorial Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-neutral-900 text-sm uppercase tracking-wider mb-2 font-mono">
                01. Anime Style
              </h3>
              <p className="text-sm text-neutral-600">
                Outfit ideas and styling guides for anime streetwear, casual anime clothes, and anime gym wear.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 text-sm uppercase tracking-wider mb-2 font-mono">
                02. Stores & Reviews
              </h3>
              <p className="text-sm text-neutral-600">
                Reviews and comparisons of anime clothing stores, so you know where to shop before you buy.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 text-sm uppercase tracking-wider mb-2 font-mono">
                03. Fabric & Care
              </h3>
              <p className="text-sm text-neutral-600">
                Print wash guides and hoodie care to help your favorite pieces last longer.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-3 tracking-tight">
            Who Runs Zuno Clothing
          </h2>
          <p>
            Zuno Clothing is an independent anime fashion blog run from Multan, Pakistan. Articles are written by {POST_AUTHOR}, a writer based in {AUTHOR_PROFILE.location}.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-3 tracking-tight">
            How We Review Stores
          </h2>
          <p>
            We check each store&apos;s own shipping, returns and size pages, its ratings on Trustpilot, Reviews.io and BBB, and customer reports. When we buy and test a product, the review says so and shows our own photos.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-3 tracking-tight">
            How We Make Money
          </h2>
          <p>
            Zuno Clothing is supported by Google AdSense ads. We currently don&apos;t use affiliate links. If that changes, affected pages will say so at the top.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-3 tracking-tight">
            Independence & Standards
          </h2>
          <p className="mb-4">
            Our coverage is driven by editorial curiosity and what is useful to readers. For questions about a review or to suggest a story, please reach out to {POST_AUTHOR}.
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

