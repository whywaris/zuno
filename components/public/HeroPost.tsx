import Link from "next/link";
import Image from "next/image";
import { DEFAULT_POST_IMAGE } from "@/lib/images";
import { POST_AUTHOR, type PostSummary } from "@/lib/utils";

export default function HeroPost({ post }: { post: PostSummary }) {
  return (
    <article className="group min-w-0">
      <Link
        href={`/guide/${post.slug}`}
        className="block relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-200 mb-6"
      >
        <Image
          src={post.featuredImage || DEFAULT_POST_IMAGE}
          alt={post.featuredImageAlt || post.title}
          fill
          preload
          sizes="(max-width: 1024px) 100vw, 740px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </Link>

      <Link
        href={`/category/${post.category.slug}`}
        className="inline-block px-3 py-1 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded mb-4"
      >
        {post.category.name}
      </Link>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 leading-[1.1] mb-4 group-hover:text-neutral-700 transition-colors">
        <Link href={`/guide/${post.slug}`}>{post.title}</Link>
      </h1>

      <div className="flex flex-wrap items-center gap-x-2 text-xs text-neutral-500 font-mono mb-4">
        <span>By {POST_AUTHOR}</span>
        <span aria-hidden="true">•</span>
        <span>{post.readingTime}</span>
      </div>

      <p className="text-neutral-600 sm:text-lg leading-relaxed">{post.excerpt}</p>
    </article>
  );
}
