import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { DEFAULT_POST_IMAGE } from "@/lib/images";
import { formatDate, POST_AUTHOR } from "@/lib/utils";
import ShareButtons from "@/components/public/ShareButtons";
import AuthorBio from "@/components/public/AuthorBio";
import PostCard from "@/components/public/PostCard";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/public/JsonLd";
import { ChevronRight } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!post || post.status !== "PUBLISHED") {
    return {
      title: "Article Not Found",
    };
  }

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zunoclothing.com";
  const postUrl = `${siteUrl}/guide/${post.slug}`;
  const imageUrl = post.featuredImage || DEFAULT_POST_IMAGE;

  return {
    title: post.metaTitle ? { absolute: post.metaTitle } : post.title,
    authors: [{ name: POST_AUTHOR }],
    description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: "article",
      url: postUrl,
      title,
      description,
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.featuredImageAlt || post.title,
        },
      ],
      section: post.category.name,
      authors: [POST_AUTHOR],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  // Update view count asynchronously
  try {
    await prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });
  } catch {
    // Ignore error in view counting
  }

  // Fetch 3 related posts from same category
  const relatedPosts = await prisma.post.findMany({
    where: {
      categoryId: post.categoryId,
      status: "PUBLISHED",
      NOT: { id: post.id },
    },
    include: { category: true },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zunoclothing.com";
  const postUrl = `${siteUrl}/guide/${post.slug}`;
  const imageUrl = post.featuredImage || DEFAULT_POST_IMAGE;

  const breadcrumbs = [
    { name: "Home", url: siteUrl },
    { name: post.category.name, url: `${siteUrl}/category/${post.category.slug}` },
    { name: post.title, url: postUrl },
  ];

  return (
    <>
      {/* Schema.org Structured Data */}
      <ArticleJsonLd
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt}
        url={postUrl}
        imageUrl={imageUrl}
        datePublished={post.createdAt.toISOString()}
        dateModified={post.updatedAt.toISOString()}
      />
      <BreadcrumbJsonLd items={breadcrumbs} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-neutral-500 mb-6 font-mono"
        >
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <Link
            href={`/category/${post.category.slug}`}
            className="hover:text-black transition-colors uppercase tracking-wider font-semibold text-neutral-800"
          >
            {post.category.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="truncate max-w-[200px] sm:max-w-xs text-neutral-400">
            {post.title}
          </span>
        </nav>

        {/* Title and Metadata */}
        <header className="mb-8">
          <Link
            href={`/category/${post.category.slug}`}
            className="inline-block px-3 py-1 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider rounded mb-4"
          >
            {post.category.name}
          </Link>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-950 leading-[1.15] mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-neutral-500 font-mono pb-6 border-b border-neutral-100">
            <span>By {POST_AUTHOR}</span>
            <span>•</span>
            <time dateTime={post.createdAt.toISOString()}>
              {formatDate(post.createdAt)}
            </time>
            <span>•</span>
            <span>{post.readingTime}</span>
            <span>•</span>
            <span>{post.views + 1} views</span>
          </div>
        </header>

        {/* High Resolution Featured Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-100 mb-8">
          <Image
            src={imageUrl}
            alt={post.featuredImageAlt || post.title}
            fill
            preload
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        {/* Sticky / Inline Social Share */}
        <ShareButtons title={post.title} url={postUrl} />

        {/* Formatted Article Content */}
        <div
          className="prose-content max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author Bio Card */}
        <AuthorBio />

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
                  More in {post.category.name}
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-neutral-950">
                  Related Articles
                </h3>
              </div>
              <Link
                href={`/category/${post.category.slug}`}
                className="text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:underline"
              >
                View Category →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <PostCard key={related.id} post={related} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}

