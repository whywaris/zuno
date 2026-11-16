import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Zuno Clothing, an independent anime fashion blog run from Multan, Pakistan.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-12 border-b border-neutral-100 pb-8">
        <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
          Get in Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-950 mt-2 mb-4">
          Contact
        </h1>
        <p className="text-lg text-neutral-600 leading-relaxed">
          Have a question about a guide, a correction or feedback? Email us.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-7 space-y-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-neutral-100 rounded-lg text-neutral-900 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <p className="text-neutral-700 leading-relaxed">
              Zuno Clothing is an independent anime fashion blog run from
              Multan, Pakistan.
            </p>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-neutral-100 rounded-lg text-neutral-900 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-neutral-700">
                Email:{" "}
                <a
                  href="mailto:editorial@zunoclothing.com"
                  className="font-semibold text-black underline underline-offset-4"
                >
                  editorial@zunoclothing.com
                </a>
              </p>
              <p className="text-sm text-neutral-500 mt-1">
                We usually reply within 2 business days.
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="p-8 bg-neutral-50 border border-neutral-200 rounded-xl text-center space-y-4">
            <p className="text-sm text-neutral-600">
              Writing opens your own email app, so your message goes straight to
              our inbox.
            </p>
            <a
              href="mailto:editorial@zunoclothing.com"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-neutral-900 hover:bg-black text-white rounded-lg text-xs uppercase font-mono tracking-wider font-semibold transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email Zuno Clothing
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
