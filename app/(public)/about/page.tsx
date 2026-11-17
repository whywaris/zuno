import type { Metadata } from "next";
import Link from "next/link";
import { AUTHOR_PROFILE, POST_AUTHOR } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    absolute: "About Zuno Clothing | Anime Fashion Guides and Store Reviews",
  },
  description:
    "Learn who runs Zuno Clothing, how we review anime clothing stores, and how the site is funded.",
};

const H2 = "text-2xl font-bold text-neutral-900 mb-3 tracking-tight";
const LINK = "underline text-black font-semibold";

const COVERAGE = [
  {
    title: "Anime Style",
    text: "Outfit ideas for everyday wear, the gym and the street.",
    links: [
      ["Anime Streetwear", "/category/anime-streetwear"],
      ["Anime Clothes", "/category/anime-clothes"],
      ["Anime Gym Wear", "/category/anime-gym-wear"],
    ],
  },
  {
    title: "Store Reviews",
    text: "Reviews and comparisons of anime clothing stores, so you know where to shop before you buy.",
    links: [
      ["Store Reviews", "/category/store-reviews"],
      ["Best Anime Stores", "/category/best-anime-stores"],
    ],
  },
  {
    title: "Style Guides",
    text: "How to wear printed and graphic pieces without the outfit looking like a costume.",
    links: [["Style Guides", "/category/style-guides"]],
  },
  {
    title: "Fabric Care",
    text: "Washing and storage guides that help prints and hoodies last longer.",
    links: [["Fabric Care", "/category/fabric-care"]],
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-12 border-b border-neutral-100 pb-8">
        <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
          About
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
          <h2 className={H2}>Who We Are</h2>
          <p className="mb-4">
            <strong>Zuno Clothing</strong> is an independent anime fashion publication. We help anime fans find good anime clothing, from graphic tees and hoodies to gym wear, and steer clear of bootleg or low-quality stores.
          </p>
          <p>
            We write practical guides: which stores are worth buying from, how sizing and shipping work before you order, and how to keep printed pieces looking good after many washes.
          </p>
        </section>

        <section>
          <h2 className={H2}>Meet the Author</h2>
          <p>
            Articles on Zuno Clothing are written by{" "}
            <Link href={AUTHOR_PROFILE.path} className={LINK}>
              {POST_AUTHOR}
            </Link>
            , who covers anime streetwear, anime clothing stores and fabric care. Every store review follows the method below.
          </p>
        </section>

        <section className="bg-neutral-50 p-8 rounded-xl border border-neutral-100">
          <h2 className={H2}>What We Cover</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COVERAGE.map((item) => (
              <div key={item.title}>
                <h3 className="font-semibold text-neutral-900 text-sm uppercase tracking-wider mb-2 font-mono">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 mb-2">{item.text}</p>
                <p className="text-sm">
                  {item.links.map(([label, href], i) => (
                    <span key={href}>
                      {i > 0 && " · "}
                      <Link href={href} className={LINK}>
                        {label}
                      </Link>
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className={H2}>How We Review Stores</h2>
          <p className="mb-4">For every store review, we check:</p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>The store&apos;s own shipping and returns policies.</li>
            <li>Sizing charts and fabric details on the product pages.</li>
            <li>Whether the products are officially licensed or unofficial designs.</li>
            <li>Customer ratings and reports on Trustpilot and Reddit.</li>
          </ul>
          <p className="mb-4">
            When we have not purchased from a store, the review says so. Policies and prices are checked as of the date shown on each article and can change after that.
          </p>
          <p>We do not accept payment for positive reviews.</p>
        </section>

        <section>
          <h2 className={H2}>Advertising Disclosure</h2>
          <p>
            Zuno Clothing may show ads, including Google AdSense, to cover running costs. Ads never change our ratings or what we recommend. We don&apos;t use affiliate links.
          </p>
        </section>

        <section>
          <h2 className={H2}>Corrections and Feedback</h2>
          <p className="mb-4">
            If you spot a mistake, an outdated price or a policy that has changed, email us at{" "}
            <a href="mailto:help@zunoclothing.com" className={LINK}>
              help@zunoclothing.com
            </a>{" "}
            or use our{" "}
            <Link href="/contact" className={LINK}>
              contact page
            </Link>
            . We reply within 2-3 business days.
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
