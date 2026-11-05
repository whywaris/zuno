import Link from "next/link";
import Image from "next/image";
import { DEFAULT_POST_IMAGE } from "@/lib/images";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage?: string | null;
    featuredImageAlt?: string | null;
    readingTime: string;
    createdAt: Date | string;
    category: {
      name: string;
      slug: string;
    };
  };
  eager?: boolean;
}

export default function PostCard({ post, eager = false }: PostCardProps) {
  return (
    <article className="group flex flex-col h-full bg-white transition-all">
      <Link
        href={`/guide/${post.slug}`}
        className="block relative aspect-[16/10] w-full overflow-hidden rounded bg-neutral-100 mb-4"
      >
        <Image
          src={post.featuredImage || DEFAULT_POST_IMAGE}
          alt={post.featuredImageAlt || post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading={eager ? "eager" : "lazy"}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2.5">
          <Link
            href={`/category/${post.category.slug}`}
            className="font-medium uppercase tracking-wider text-neutral-900 hover:underline"
          >
            {post.category.name}
          </Link>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>

        <h3 className="text-xl font-bold tracking-tight text-neutral-950 mb-2 leading-snug group-hover:text-neutral-700 transition-colors">
          <Link href={`/guide/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        <div className="text-xs text-neutral-400 font-mono mt-auto">
          {formatDate(post.createdAt)}
        </div>
      </div>
    </article>
  );
}

