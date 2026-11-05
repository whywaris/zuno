import Link from "next/link";
import Image from "next/image";
import { DEFAULT_POST_IMAGE } from "@/lib/images";
import type { PostSummary } from "@/lib/utils";

interface RankedPostListProps {
  title: string;
  posts: PostSummary[];
  startRank?: number;
  showThumbnails?: boolean;
  showViews?: boolean;
}

export default function RankedPostList({
  title,
  posts,
  startRank = 1,
  showThumbnails = false,
  showViews = false,
}: RankedPostListProps) {
  return (
    <section>
      <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500 pb-3 border-b border-neutral-900">
        {title}
      </h2>

      <ol className="divide-y divide-neutral-100">
        {posts.map((post, idx) => (
          <li key={post.id} className="group flex gap-4 py-5">
            <span className="font-mono text-sm text-neutral-400 shrink-0 pt-0.5">
              {String(startRank + idx).padStart(2, "0")}
            </span>

            {showThumbnails && (
              <Link
                href={`/guide/${post.slug}`}
                aria-hidden="true"
                tabIndex={-1}
                className="block relative w-16 h-16 shrink-0 overflow-hidden rounded bg-neutral-100"
              >
                <Image
                  src={post.featuredImage || DEFAULT_POST_IMAGE}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </Link>
            )}

            <div className="min-w-0">
              <h3 className="font-bold tracking-tight text-neutral-950 leading-snug group-hover:text-neutral-700 transition-colors">
                <Link href={`/guide/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="mt-1.5 text-xs text-neutral-500 font-mono">
                {showViews
                  ? `${post.views.toLocaleString("en-US")} views`
                  : `${post.category.name} • ${post.readingTime}`}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
