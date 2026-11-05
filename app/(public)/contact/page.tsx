"use client";

import { useState } from "react";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-12 border-b border-neutral-100 pb-8">
        <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
          Get in Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-950 mt-2 mb-4">
          Contact Editorial
        </h1>
        <p className="text-lg text-neutral-600 leading-relaxed">
          Have an editorial inquiry, styling question, partnership pitch, or feedback? We&apos;d love to hear from you.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Info Column */}
        <div className="md:col-span-5 space-y-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-neutral-100 rounded-lg text-neutral-900 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 font-mono">
                Direct Email
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                For general & editorial feedback:
              </p>
              <a
                href="mailto:editorial@zunoclothing.com"
                className="text-sm font-semibold text-neutral-900 hover:underline block mt-1"
              >
                editorial@zunoclothing.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-neutral-100 rounded-lg text-neutral-900 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 font-mono">
                Headquarters
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Zuno Clothing Media Group
              </p>
              <p className="text-sm text-neutral-800 mt-1">
                New York & London Digital Editorial Desks
              </p>
            </div>
          </div>

          <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-100 text-xs text-neutral-600 space-y-2">
            <p className="font-semibold text-neutral-900 font-mono uppercase">
              Response Commitment
            </p>
            <p>
              Our editors review every submitted message and typically respond within 24–48 business hours.
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-7">
          {submitted ? (
            <div className="p-8 bg-neutral-50 border border-neutral-200 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-neutral-900 mx-auto" />
              <h3 className="text-xl font-bold text-neutral-900">
                Message Sent Successfully
              </h3>
              <p className="text-sm text-neutral-600 max-w-sm mx-auto">
                Thank you, {formData.name || "reader"}. Our editorial desk has received your note and will be in touch shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", subject: "", message: "" });
                }}
                className="mt-4 px-4 py-2 border border-neutral-300 text-xs uppercase font-mono rounded hover:bg-neutral-100"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Alex Vance"
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded text-sm focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="alex@example.com"
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded text-sm focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="Styling feedback, press inquiry, etc."
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded text-sm focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Write your note here..."
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded text-sm focus:outline-none focus:border-neutral-900"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors"
              >
                <Send className="w-4 h-4" />
                Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

