import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { POST_AUTHOR } from "@/lib/utils";
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
    default: "Zuno Clothing — Modern Fashion, Apparel & Style Guides",
  },
  description:
    "Discover curated fashion advice, fabric care guides, modern streetwear trends, and timeless wardrobe essentials at Zuno Clothing.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://zunoclothing.com"),
  keywords: ["fashion", "clothing", "apparel", "streetwear", "fabric care", "style guides", "minimalist style"],
  authors: [{ name: POST_AUTHOR }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zunoclothing.com",
    siteName: "Zuno Clothing",
    title: "Zuno Clothing — Modern Fashion, Apparel & Style Guides",
    description: "Curated fashion advice, fabric care guides, streetwear trends, and timeless essentials.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zuno Clothing — Modern Fashion, Apparel & Style Guides",
    description: "Curated fashion advice, fabric care guides, streetwear trends, and timeless essentials.",
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
