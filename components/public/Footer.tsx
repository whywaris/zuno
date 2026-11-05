import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white mt-auto border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <span className="text-2xl font-black tracking-[-0.04em]">
              ZUNO<span className="font-light tracking-widest text-neutral-400 ml-1 text-lg">CLOTHING</span>
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              A fashion, apparel, and lifestyle publication dedicated to mindful style, sustainable fabric care, and modern wardrobe essentials.
            </p>
          </div>

          {/* Categories Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-300 mb-4 font-mono">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/category/anime-streetwear" className="hover:text-white transition-colors">
                  Anime Streetwear
                </Link>
              </li>
              <li>
                <Link href="/category/anime-clothes" className="hover:text-white transition-colors">
                  Casual &amp; Cool Anime Clothes
                </Link>
              </li>
              <li>
                <Link href="/category/anime-gym-wear" className="hover:text-white transition-colors">
                  Anime Gym Wear
                </Link>
              </li>
              <li>
                <Link href="/category/store-reviews" className="hover:text-white transition-colors">
                  Store Reviews
                </Link>
              </li>
              <li>
                <Link href="/category/best-anime-stores" className="hover:text-white transition-colors">
                  Best Anime Stores
                </Link>
              </li>
              <li>
                <Link href="/category/style-guides" className="hover:text-white transition-colors">
                  Style Guides
                </Link>
              </li>
              <li>
                <Link href="/category/fabric-care" className="hover:text-white transition-colors">
                  Fabric &amp; Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / AdSense Mandatory Links Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-300 mb-4 font-mono">
              Legal & Compliance
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors">
                  Affiliate & Ad Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Editorial
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-mono gap-4">
          <p>© 2026 Zuno Clothing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

