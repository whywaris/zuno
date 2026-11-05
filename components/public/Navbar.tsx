"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Anime Streetwear", href: "/category/anime-streetwear" },
  { name: "Anime Clothes", href: "/category/anime-clothes" },
  { name: "Gym Wear", href: "/category/anime-gym-wear" },
  { name: "Store Reviews", href: "/category/store-reviews" },
  { name: "Best Stores", href: "/category/best-anime-stores" },
  { name: "Style Guides", href: "/category/style-guides" },
  { name: "Fabric & Care", href: "/category/fabric-care" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchDialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const openSearch = () => {
    setMobileMenuOpen(false);
    searchDialog.current?.showModal();
  };

  const closeSearch = () => searchDialog.current?.close();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
      setSearchQuery("");
    }
  };

  return (
    <>
      <div className="reading-bar" aria-hidden="true" />

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile hamburger button */}
            <div className="flex items-center xl:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-800 hover:text-black focus:outline-none"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-1 xl:flex-none text-center xl:text-left">
              <Link href="/" className="inline-block group">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-[-0.04em] text-black">
                  ZUNO<span className="font-light tracking-widest text-neutral-400 ml-1.5 text-lg sm:text-xl">CLOTHING</span>
                </span>
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden xl:flex items-center gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="whitespace-nowrap text-[11px] uppercase tracking-wider font-medium text-neutral-600 hover:text-black transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Action icons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openSearch}
                className="p-2.5 text-neutral-600 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="Search articles"
                aria-haspopup="dialog"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-neutral-200 px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm uppercase tracking-wider font-medium text-neutral-700 hover:text-black"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Native dialog: handles Esc, keeps focus inside, and returns it on close. */}
      <dialog
        ref={searchDialog}
        aria-label="Search articles"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeSearch();
        }}
        className="fixed inset-x-0 top-0 m-0 w-full max-w-none bg-white border-b border-neutral-200 backdrop:bg-neutral-950/60 backdrop:backdrop-blur-sm"
      >
        <div className="px-4 sm:px-6 py-8">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex items-center gap-2">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search style guides, fabrics, trends..."
              aria-label="Search articles"
              className="flex-1 min-w-0 px-4 py-3 text-base bg-neutral-50 border border-neutral-200 rounded focus:outline-none focus:border-black"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-neutral-800"
            >
              Search
            </button>
            <button
              type="button"
              onClick={closeSearch}
              className="p-2 text-neutral-500 hover:text-black"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
