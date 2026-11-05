import Link from "next/link";
import RankedPostList from "@/components/public/RankedPostList";
import { POST_AUTHOR, type PostSummary } from "@/lib/utils";

interface HomeSidebarProps {
  mostRead: PostSummary[];
  mostReadStartRank: number;
  categories: {
    id: string;
    name: string;
    slug: string;
    _count: { posts: number };
  }[];
}

export default function HomeSidebar({
  mostRead,
  mostReadStartRank,
  categories,
}: HomeSidebarProps) {
  return (
    <aside className="flex flex-col gap-10" aria-label="Sidebar">
      <section className="p-6 bg-neutral-50 border border-neutral-100 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-full bg-neutral-900 text-white flex items-center justify-center font-serif shrink-0">
            {POST_AUTHOR.split(" ").map((part) => part[0]).join("")}
          </div>
          <h2 className="font-bold tracking-tight text-neutral-950">
            Meet {POST_AUTHOR}
          </h2>
        </div>
        <p className="text-sm text-neutral-600 leading-relaxed mb-3">
          Curating modern wardrobe advice, fabric care insights, and
          contemporary fashion movements for mindful dressers worldwide.
        </p>
        <Link
          href="/about"
          className="text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:underline"
        >
          About Our Mission →
        </Link>
      </section>

      {mostRead.length > 0 && (
        <RankedPostList
          title="Most Read"
          posts={mostRead}
          startRank={mostReadStartRank}
          showThumbnails
          showViews
        />
      )}

      {categories.length > 0 && (
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500 pb-3 mb-4 border-b border-neutral-900">
            Topics
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium rounded-full transition-colors"
              >
                {category.name}
                <span className="text-neutral-500 font-mono text-[11px]">
                  {category._count.posts}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </aside>
  );
}
