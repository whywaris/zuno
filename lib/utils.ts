import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function calculateReadingTime(content: string): string {
  const text = content.replace(/<[^>]*>/g, "");
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const POST_AUTHOR = "Marceline Avila";

export interface PostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  readingTime: string;
  views: number;
  createdAt: Date;
  category: { name: string; slug: string };
}

// A repeated query parameter (?page=1&page=2) arrives as an array.
export function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parsePage(rawPage: string | undefined): number {
  return Math.max(1, parseInt(rawPage ?? "", 10) || 1);
}

// skipHero: the newest post is shown as the hero, so the feed starts after it on every page.
export function feedWindow(
  rawPage: string | undefined,
  total: number,
  skipHero: boolean,
  limit: number
) {
  const offset = skipHero ? 1 : 0;
  const totalPages = Math.max(1, Math.ceil(Math.max(0, total - offset) / limit));
  const page = Math.min(parsePage(rawPage), totalPages);
  return { page, skip: (page - 1) * limit + offset, totalPages };
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + "...";
}
