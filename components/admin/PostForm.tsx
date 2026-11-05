"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Globe, Eye, CheckCircle2, AlertCircle } from "lucide-react";
import { slugify } from "@/lib/utils";
import TipTapEditor from "@/components/admin/TipTapEditor";
import ImageUploader from "@/components/admin/ImageUploader";
import SeoDrawer from "@/components/admin/SeoDrawer";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface PostInitialData {
  id?: string;
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  categoryId?: string;
  status?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

interface PostFormProps {
  categories: Category[];
  initialData?: PostInitialData;
  isEditing?: boolean;
}

export default function PostForm({
  categories,
  initialData,
  isEditing = false,
}: PostFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [manualSlug, setManualSlug] = useState(Boolean(initialData?.slug));
  const [content, setContent] = useState(initialData?.content || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [categoryId, setCategoryId] = useState(
    initialData?.categoryId || (categories[0]?.id ?? "")
  );
  const [featuredImage, setFeaturedImage] = useState(
    initialData?.featuredImage || ""
  );
  const [featuredImageAlt, setFeaturedImageAlt] = useState(
    initialData?.featuredImageAlt || ""
  );
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(
    initialData?.metaDescription || ""
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!manualSlug) {
      setSlug(slugify(val));
    }
  };

  const handleSave = async (targetStatus: "DRAFT" | "PUBLISHED") => {
    setError(null);
    setSuccess(false);

    if (!title.trim()) {
      setError("Article title is required.");
      return;
    }

    if (!content.trim()) {
      setError("Article content cannot be empty.");
      return;
    }

    if (!excerpt.trim()) {
      setError("Please provide a short excerpt (card summary).");
      return;
    }

    if (!categoryId) {
      setError("Please select a fashion category.");
      return;
    }

    setSaving(true);

    const payload = {
      title: title.trim(),
      slug: slug.trim() || slugify(title),
      content,
      excerpt: excerpt.trim(),
      categoryId,
      status: targetStatus,
      featuredImage: featuredImage.trim(),
      featuredImageAlt: featuredImageAlt.trim(),
      metaTitle: metaTitle.trim() || null,
      metaDescription: metaDescription.trim() || null,
    };

    try {
      const endpoint = isEditing
        ? `/api/posts/${initialData?.id}`
        : "/api/posts";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save article");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/posts");
        router.refresh();
      }, 800);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred while saving.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Navigation & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="p-2 rounded-lg border border-neutral-200 hover:bg-white text-neutral-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
              {isEditing ? "Editing Article" : "Drafting Article"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900">
              {title || (isEditing ? "Edit Post" : "New Fashion Article")}
            </h1>
          </div>
        </div>

        {/* Publishing Action Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave("DRAFT")}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 text-xs uppercase font-mono tracking-wider font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            Save as Draft
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave("PUBLISHED")}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs uppercase font-mono tracking-wider font-semibold rounded-lg shadow-xs transition-colors disabled:opacity-50"
          >
            <Globe className="w-3.5 h-3.5" />
            {isEditing ? "Update & Publish" : "Publish Now"}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Article saved successfully! Redirecting...</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Editor Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Post Title */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-2xs space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                Article Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. 10 Essential Wardrobe Staples Every Man Needs in 2026"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-base sm:text-lg font-bold text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>

            {/* Slug Editor */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                  URL Slug (Auto-generated)
                </label>
                <button
                  type="button"
                  onClick={() => setManualSlug(!manualSlug)}
                  className="text-[10px] font-mono text-neutral-400 hover:text-black underline"
                >
                  {manualSlug ? "Reset to Auto" : "Edit Manually"}
                </button>
              </div>
              <div className="flex items-center bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs font-mono text-neutral-500">
                <span>/guide/</span>
                <input
                  type="text"
                  disabled={!manualSlug}
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  className="flex-1 bg-transparent text-neutral-900 focus:outline-none disabled:opacity-70 ml-0.5"
                />
              </div>
            </div>
          </div>

          {/* TipTap Rich Text Editor */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-2xs space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700">
              Article Content (Rich Text) <span className="text-rose-500">*</span>
            </label>
            <TipTapEditor content={content} onChange={setContent} />
          </div>

          {/* SEO Drawer with live Google SERP preview */}
          <SeoDrawer
            metaTitle={metaTitle}
            metaDescription={metaDescription}
            slug={slug}
            defaultTitle={title}
            defaultExcerpt={excerpt}
            onMetaTitleChange={setMetaTitle}
            onMetaDescriptionChange={setMetaDescription}
          />
        </div>

        {/* Sidebar Controls Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Category & Metadata Panel */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-2xs space-y-5">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Taxonomy & Categorization
            </h3>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-900 focus:outline-none focus:border-neutral-900"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700">
                  Excerpt Summary <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] font-mono text-neutral-400">
                  {excerpt.length}/160 chars
                </span>
              </div>
              <textarea
                rows={4}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A compelling 1-2 sentence preview for article cards and Google snippets..."
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-800 focus:outline-none focus:border-neutral-900"
              />
            </div>
          </div>

          {/* Featured Image Component */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-2xs">
            <ImageUploader
              imageUrl={featuredImage}
              imageAlt={featuredImageAlt}
              onImageChange={setFeaturedImage}
              onAltChange={setFeaturedImageAlt}
            />
          </div>

          {/* Quick Preview Link if Editing */}
          {isEditing && initialData?.slug && initialData?.status === "PUBLISHED" && (
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-center">
              <Link
                href={`/guide/${initialData.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-900 hover:underline font-semibold"
              >
                <Eye className="w-4 h-4" />
                View Published Post on Site →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

