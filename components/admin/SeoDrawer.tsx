"use client";

import { Globe } from "lucide-react";

interface SeoDrawerProps {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  defaultTitle: string;
  defaultExcerpt: string;
  onMetaTitleChange: (val: string) => void;
  onMetaDescriptionChange: (val: string) => void;
}

export default function SeoDrawer({
  metaTitle,
  metaDescription,
  slug,
  defaultTitle,
  defaultExcerpt,
  onMetaTitleChange,
  onMetaDescriptionChange,
}: SeoDrawerProps) {
  const displayTitle = metaTitle || defaultTitle || "Article Title | Zuno Clothing";
  const displayDesc =
    metaDescription ||
    defaultExcerpt ||
    "Discover the latest styling tips, fabric care recommendations, and contemporary wardrobe essentials at Zuno Clothing.";
  const displayUrl = `https://zunoclothing.com/guide/${slug || "article-slug"}`;

  const titleLength = metaTitle.length;
  const descLength = metaDescription.length;

  return (
    <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 space-y-6">
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-3">
        <Globe className="w-4 h-4 text-neutral-700" />
        <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-900">
          SEO & Search Engine Optimization
        </h3>
      </div>

      {/* Live Google SERP Preview */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
          Live Google SERP Preview
        </span>
        <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-2xs font-sans">
          <div className="flex items-center gap-2 text-xs text-neutral-600 mb-1">
            <span className="w-4 h-4 rounded-full bg-neutral-200 flex items-center justify-center text-[9px] font-bold">
              Z
            </span>
            <span className="text-[11px] text-neutral-700 truncate max-w-sm">
              zunoclothing.com &gt; blog &gt; {slug || "article-slug"}
            </span>
          </div>
          <h4 className="text-[#1a0dab] hover:underline text-lg font-medium leading-snug cursor-pointer line-clamp-1">
            {displayTitle}
          </h4>
          <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2 mt-1">
            {displayDesc}
          </p>
        </div>
      </div>

      {/* Meta Title Input */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-neutral-700">
            SEO Title Override
          </label>
          <span
            className={`text-[10px] font-mono ${
              titleLength > 60
                ? "text-amber-600 font-bold"
                : titleLength >= 40
                ? "text-emerald-600"
                : "text-neutral-400"
            }`}
          >
            {titleLength}/60 chars (Recommended: 50-60)
          </span>
        </div>
        <input
          type="text"
          value={metaTitle}
          onChange={(e) => onMetaTitleChange(e.target.value)}
          placeholder={defaultTitle || "Defaults to article title"}
          maxLength={70}
          className="w-full px-3 py-2 bg-white border border-neutral-200 rounded text-xs focus:outline-none focus:border-black font-sans"
        />
      </div>

      {/* Meta Description Input */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-neutral-700">
            SEO Meta Description Override
          </label>
          <span
            className={`text-[10px] font-mono ${
              descLength > 160
                ? "text-amber-600 font-bold"
                : descLength >= 120
                ? "text-emerald-600"
                : "text-neutral-400"
            }`}
          >
            {descLength}/160 chars (Recommended: 140-160)
          </span>
        </div>
        <textarea
          rows={3}
          value={metaDescription}
          onChange={(e) => onMetaDescriptionChange(e.target.value)}
          placeholder={defaultExcerpt || "Defaults to post excerpt"}
          maxLength={180}
          className="w-full px-3 py-2 bg-white border border-neutral-200 rounded text-xs focus:outline-none focus:border-black font-sans"
        />
      </div>
    </div>
  );
}

