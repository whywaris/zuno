import Link from "next/link";
import Image from "next/image";
import { DEFAULT_POST_IMAGE } from "@/lib/images";
import { formatDate, type PostSummary } from "@/lib/utils";

export default function PostListItem({ post }: { post: PostSummary }) {
  return (
    <article className="group grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-5 sm:gap-6">
      <Link
        href={`/guide/${post.slug}`}
        className="block relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-neutral-100"
      >
        <Image
          src={post.featuredImage || DEFAULT_POST_IMAGE}
          alt={post.featuredImageAlt || post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 300px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-col justify-center min-w-0">
        <Link
          href={`/category/${post.category.slug}`}
          className="self-start px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11px] font-semibold uppercase tracking-wider rounded-full transition-colors mb-3"
        >
          {post.category.name}
        </Link>

        <h3 className="text-xl font-bold tracking-tight text-neutral-950 leading-snug mb-2 group-hover:text-neutral-700 transition-colors">
          <Link href={`/guide/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="text-sm text-neutral-600 leading-relaxed line-clamp-2 mb-3">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-x-2 text-xs text-neutral-500 font-mono">
          <span>{formatDate(post.createdAt)}</span>
          <span aria-hidden="true">•</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </article>
  );
}
