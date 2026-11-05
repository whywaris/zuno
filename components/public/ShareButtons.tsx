"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="flex items-center gap-2 py-4 my-6 border-y border-neutral-100">
      <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 mr-2 font-mono">
        Share:
      </span>

      {/* X / Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.704 0-1.28.163-1.637.49-.356.326-.525.869-.525 1.713v1.777h4.092l-.587 3.667h-3.505v7.98h-5.45z" />
        </svg>
      </a>

      {/* Pinterest */}
      <a
        href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Pinterest"
        className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors"
      >
        <span className="font-bold text-xs font-serif">P</span>
      </a>

      {/* Copy Link */}
      <button
        type="button"
        onClick={copyToClipboard}
        aria-label="Copy article link"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 h-9 rounded-full border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors ml-auto sm:ml-0 font-mono"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-600">Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}
