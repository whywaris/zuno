import Script from "next/script";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script id="google-tag-init">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`}
      </Script>
      <Script src="https://www.googletagmanager.com/gtm.js?id=GTM-5TQPRZR2" />
      {/* Plain async script: React places it in the server-rendered <head>, where AdSense's site check reads it. */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7076349236738543"
        crossOrigin="anonymous"
      />

      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

