import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AUTHOR_PROFILE, POST_AUTHOR, SITE_URL } from "@/lib/utils";
import PostListItem from "@/components/public/PostListItem";

export const revalidate = 60;

export const metadata: Metadata = {
  title: `${POST_AUTHOR}, Author`,
  description: `Articles by ${POST_AUTHOR} on Zuno Clothing about anime streetwear, anime clothing stores and fabric care.`,
  alternates: { canonical: AUTHOR_PROFILE.path },
};

export default async function AuthorPage() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    select: {
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
    },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: 12,
  });

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: POST_AUTHOR,
    url: `${SITE_URL}${AUTHOR_PROFILE.path}`,
    image: AUTHOR_PROFILE.photo,
    jobTitle: AUTHOR_PROFILE.role,
    sameAs: [AUTHOR_PROFILE.profileUrl],
    worksFor: { "@type": "Organization", name: "Zuno Clothing", url: SITE_URL },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <header className="mb-12 border-b border-neutral-100 pb-8 flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="relative w-28 h-28 rounded-full overflow-hidden shrink-0 border border-neutral-200 bg-neutral-100">
          <Image
            src={AUTHOR_PROFILE.photo}
            alt={POST_AUTHOR}
            fill
            sizes="112px"
            className="object-cover"
            priority
          />
        </div>
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
            {AUTHOR_PROFILE.role}
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-950 mt-2 mb-3">
            {POST_AUTHOR}
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed mb-3">
            {AUTHOR_PROFILE.bio}
          </p>
          <a
            href={AUTHOR_PROFILE.profileUrl}
            target="_blank"
            rel="noopener noreferrer me"
            className="text-xs font-semibold uppercase tracking-wider text-neutral-900 underline underline-offset-4"
          >
            LinkedIn profile
          </a>
        </div>
      </header>

      <section>
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 tracking-tight">
          Latest Articles by {POST_AUTHOR}
        </h2>
        <div className="space-y-10">
          {posts.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </div>
        <p className="mt-10 text-sm text-neutral-600">
          Read how we research store reviews on the{" "}
          <Link href="/about" className="underline text-black font-semibold">
            About page
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
