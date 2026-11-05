import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { POST_AUTHOR, SITE_URL } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Zuno Clothing",
    default: "Zuno Clothing — Anime Streetwear, Store Reviews & Style Guides",
  },
  description:
    "Anime streetwear, anime clothes, store reviews, and styling and fabric care guides from Zuno Clothing.",
  metadataBase: new URL(SITE_URL),
  keywords: ["anime streetwear", "anime clothes", "anime fashion", "anime gym wear", "anime stores", "style guides", "fabric care"],
  other: { "google-adsense-account": "ca-pub-7076349236738543" },
  authors: [{ name: POST_AUTHOR }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Zuno Clothing",
    title: "Zuno Clothing — Anime Streetwear, Store Reviews & Style Guides",
    description: "Anime streetwear, anime clothes, store reviews, and styling and fabric care guides.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zuno Clothing — Anime Streetwear, Store Reviews & Style Guides",
    description: "Anime streetwear, anime clothes, store reviews, and styling and fabric care guides.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
