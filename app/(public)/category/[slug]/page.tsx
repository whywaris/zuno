import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { feedWindow, firstParam } from "@/lib/utils";
import PostCard from "@/components/public/PostCard";
import Pagination from "@/components/public/Pagination";
import { ChevronRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/public/JsonLd";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });

  if (!category) {
    return { title: "Category Not Found" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zunoclothing.com";

  return {
    title: `${category.name} Style & Trends`,
    description:
      category.description ||
      `Explore articles, guides, and curated stories in ${category.name} at Zuno Clothing.`,
    alternates: {
      canonical: `${siteUrl}/category/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} | Zuno Clothing`,
      description:
        category.description ||
        `Explore articles, guides, and curated stories in ${category.name} at Zuno Clothing.`,
      url: `${siteUrl}/category/${category.slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;

  const limit = 9;

  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    notFound();
  }

  const where = { categoryId: category.id, status: "PUBLISHED" };
  const totalPosts = await prisma.post.count({ where });
  const { page, skip, totalPages } = feedWindow(
    firstParam(pageParam),
    totalPosts,
    false,
    limit
  );

  const posts = await prisma.post.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: "desc" },
    skip,
    take: limit,
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zunoclothing.com";

  const breadcrumbs = [
    { name: "Home", url: siteUrl },
    { name: "Categories", url: `${siteUrl}/#categories` },
    { name: category.name, url: `${siteUrl}/category/${category.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-neutral-500 mb-6 font-mono"
        >
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-neutral-400">Categories</span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="uppercase font-semibold text-neutral-900">
            {category.name}
          </span>
        </nav>

        {/* Category Header Banner */}
        <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-8 sm:p-12 mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
            Archive Collection
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 mt-2 mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-neutral-600 max-w-2xl text-base sm:text-lg leading-relaxed">
              {category.description}
            </p>
          )}
          <div className="mt-4 text-xs font-mono text-neutral-400">
            {totalPosts} {totalPosts === 1 ? "article" : "articles"} in this category
          </div>
        </div>

        {/* Articles Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {posts.map((post, idx) => (
              <PostCard key={post.id} post={post} eager={idx < 3} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-neutral-50 rounded-xl border border-neutral-100">
            <p className="text-neutral-500 text-sm">
              No articles currently published in this category. Check back soon!
            </p>
          </div>
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          basePath={`/category/${category.slug}`}
        />
      </div>
    </>
  );
}

