"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X, Link as LinkIcon, AlertCircle } from "lucide-react";
import { ALLOWED_IMAGE_HOSTS, isAllowedImageUrl } from "@/lib/images";

interface ImageUploaderProps {
  imageUrl: string;
  imageAlt: string;
  onImageChange: (url: string) => void;
  onAltChange: (alt: string) => void;
}

export default function ImageUploader({
  imageUrl,
  imageAlt,
  onImageChange,
  onAltChange,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      onImageChange(data.url);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Upload failed");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      if (!isAllowedImageUrl(urlInput.trim())) {
        setError(`Image URL must be hosted on ${ALLOWED_IMAGE_HOSTS.join(", ")}`);
        return;
      }
      setError(null);
      onImageChange(urlInput.trim());
      setShowUrlInput(false);
      setUrlInput("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono uppercase tracking-wider text-neutral-700">
          Featured Image <span className="text-rose-500">*</span>
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-neutral-500 hover:text-black flex items-center gap-1 font-mono"
        >
          <LinkIcon className="w-3 h-3" />
          {showUrlInput ? "Upload File Instead" : "Enter Image URL"}
        </button>
      </div>

      {showUrlInput && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://pub-xxx.r2.dev/image.webp"
            className="flex-1 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-xs focus:outline-none focus:border-black font-sans"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-4 py-2 bg-neutral-900 text-white text-xs uppercase font-mono rounded hover:bg-neutral-800"
          >
            Apply
          </button>
        </div>
      )}

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs flex items-center gap-2 font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {imageUrl ? (
        <div className="relative aspect-[16/9] w-full max-w-lg rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 group">
          <Image
            src={imageUrl}
            alt={imageAlt || "Featured image preview"}
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={() => onImageChange("")}
            className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black text-white rounded-full transition-colors"
            title="Remove Image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer bg-neutral-50/50 hover:bg-neutral-50 hover:border-neutral-400 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 text-neutral-400 mb-2" />
            <p className="text-xs font-mono uppercase tracking-wider text-neutral-600 font-medium">
              {uploading ? "Uploading file..." : "Click or drag image to upload"}
            </p>
            <p className="text-[11px] text-neutral-400 mt-1 font-sans">
              PNG, JPG, WebP up to 5MB (1200x630 recommended for SEO)
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      )}

      {/* Alt Text Input */}
      <div>
        <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1">
          Featured Image Alt Text <span className="text-rose-500">* (Crucial for AdSense & Google SEO)</span>
        </label>
        <input
          type="text"
          value={imageAlt}
          onChange={(e) => onAltChange(e.target.value)}
          placeholder="Descriptive explanation of the image content (e.g., Men's capsule wardrobe essentials laid out flat)"
          className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-xs focus:outline-none focus:border-black font-sans"
        />
      </div>
    </div>
  );
}

