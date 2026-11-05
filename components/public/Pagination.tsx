import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
  basePath: string;
  search?: string;
}

export default function Pagination({
  page,
  totalPages,
  basePath,
  search,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const hrefFor = (target: number) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (target > 1) params.set("page", String(target));
    const query = params.toString();
    return query ? `${basePath}?${query}` : basePath;
  };

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-3 mt-16 pt-8 border-t border-neutral-100 font-mono text-sm"
    >
      {page > 1 && (
        <Link
          href={hrefFor(page - 1)}
          className="px-4 py-2 border border-neutral-200 rounded hover:bg-neutral-100 text-xs uppercase"
        >
          ← Previous
        </Link>
      )}

      <span className="text-neutral-500 text-xs">
        Page {page} of {totalPages}
      </span>

      {page < totalPages && (
        <Link
          href={hrefFor(page + 1)}
          className="px-4 py-2 border border-neutral-200 rounded hover:bg-neutral-100 text-xs uppercase"
        >
          Next →
        </Link>
      )}
    </nav>
  );
}
