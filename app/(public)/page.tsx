import type { Metadata } from "next";
import type { Prisma } from "@prisma/client";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { feedWindow, firstParam, parsePage } from "@/lib/utils";
import HeroPost from "@/components/public/HeroPost";
import HomeSidebar from "@/components/public/HomeSidebar";
import Pagination from "@/components/public/Pagination";
import PostListItem from "@/components/public/PostListItem";
import RankedPostList from "@/components/public/RankedPostList";

interface PageProps {
  searchParams: Promise<{ search?: string | string[]; page?: string | string[] }>;
}

const POSTS_PER_PAGE = 8;
const TRENDING_COUNT = 3;
const MOST_READ_COUNT = 4;

const newestFirst = [
  { createdAt: "desc" },
  { id: "desc" },
] satisfies Prisma.PostOrderByWithRelationInput[];

const summarySelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  featuredImage: true,
  featuredImageAlt: true,
  readingTime: true,
  views: true,
  createdAt: true,
  category: { select: { name: true, slug: true } },
} satisfies Prisma.PostSelect;

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;

  if (firstParam(params.search)) {
    return { title: "Search Results", robots: { index: false, follow: true } };
  }

  const page = parsePage(firstParam(params.page));
  return page > 1
    ? {
        title: `Latest Articles, Page ${page}`,
        alternates: { canonical: `/?page=${page}` },
      }
    : { alternates: { canonical: "/" } };
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = firstParam(params.search);
  const rawPage = firstParam(params.page);

  const feedWhere: Prisma.PostWhereInput = {
    status: "PUBLISHED",
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { excerpt: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [total, newest] = await Promise.all([
    prisma.post.count({ where: feedWhere }),
    search
      ? null
      : prisma.post.findFirst({
          where: feedWhere,
          select: summarySelect,
          orderBy: newestFirst,
        }),
  ]);
  const { page, skip, totalPages } = feedWindow(
    rawPage,
    total,
    !search,
    POSTS_PER_PAGE
  );
  const isLanding = !search && page === 1;
  const hero = isLanding ? newest : null;

  const [feed, ranked, categories] = await Promise.all([
    prisma.post.findMany({
      where: feedWhere,
      select: summarySelect,
      orderBy: newestFirst,
      skip,
      take: POSTS_PER_PAGE,
    }),
    prisma.post.findMany({
      where: {
        status: "PUBLISHED",
        ...(hero ? { NOT: { id: hero.id } } : {}),
      },
      select: summarySelect,
      orderBy: [{ views: "desc" }, ...newestFirst],
      take: TRENDING_COUNT + MOST_READ_COUNT,
    }),
    prisma.category.findMany({
      include: {
        _count: { select: { posts: { where: { status: "PUBLISHED" } } } },
      },
      orderBy: { name: "asc" },
    }),
  ]);

  const trending = isLanding ? ranked.slice(0, TRENDING_COUNT) : [];
  const mostRead = ranked.slice(
    trending.length,
    trending.length + MOST_READ_COUNT
  );
  const FeedHeading = hero ? "h2" : "h1";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {hero && (
        <div
          className={`mb-12 pb-12 border-b border-neutral-100 ${
            trending.length > 0
              ? "grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-10 lg:gap-12"
              : ""
          }`}
        >
          <HeroPost post={hero} />
          {trending.length > 0 && (
            <RankedPostList title="Trending Stories" posts={trending} />
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,17fr)_minmax(300px,8fr)] gap-12">
        <div className="min-w-0">
          {search ? (
            <div className="mb-8 p-4 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="text-xs uppercase font-mono text-neutral-500">
                  Search Results
                </span>
                <h1 className="text-xl font-bold text-neutral-900 break-words">
                  Matches for &ldquo;{search}&rdquo; ({total})
                </h1>
              </div>
              <Link
                href="/"
                className="shrink-0 text-xs underline uppercase tracking-wider text-neutral-500 hover:text-black font-semibold"
              >
                Clear Search
              </Link>
            </div>
          ) : (
            (feed.length > 0 || !hero) && (
              <div className="mb-8 border-b border-neutral-100 pb-4">
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
                  Fresh Perspectives
                </span>
                <FeedHeading className="text-2xl font-black tracking-tight text-neutral-950">
                  Latest Articles
                </FeedHeading>
              </div>
            )
          )}

          {feed.length > 0 ? (
            <div className="space-y-10">
              {feed.map((post) => (
                <PostListItem key={post.id} post={post} />
              ))}
            </div>
          ) : (
            !hero && (
              <div className="text-center py-20 bg-neutral-50 rounded-xl border border-neutral-100">
                <p className="text-neutral-500 text-sm">
                  No articles found. Try a different keyword or browse the topics.
                </p>
              </div>
            )
          )}

          <Pagination
            page={page}
            totalPages={totalPages}
            basePath="/"
            search={search}
          />
        </div>

        <HomeSidebar
          mostRead={mostRead}
          mostReadStartRank={trending.length + 1}
          categories={categories.filter((category) => category._count.posts > 0)}
        />
      </div>
    </div>
  );
}
