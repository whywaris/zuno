"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  status: string;
  views: number;
  readingTime: string;
  createdAt: string;
  category: Category;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Delete modal state
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (categoryFilter) params.set("categoryId", categoryFilter);
      if (statusFilter) params.set("status", statusFilter);

      const res = await fetch(`/api/posts?${params.toString()}`);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error("Failed to load posts:", err);
    } finally {
      setLoading(false);
    }
  }, [search, categoryFilter, statusFilter]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async () => {
    if (!postToDelete) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/posts/${postToDelete.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== postToDelete.id));
        setPostToDelete(null);
      } else {
        alert("Failed to delete post");
      }
    } catch {
      alert("Error deleting post");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
            Content Library
          </span>
          <h1 className="text-3xl font-black tracking-tight text-neutral-900">
            Posts Management
          </h1>
        </div>

        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs uppercase font-mono tracking-wider font-semibold rounded-lg shadow-xs transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Create New Article
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200/90 shadow-2xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by article title..."
            className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-neutral-900"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-700 focus:outline-none focus:border-neutral-900"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-700 focus:outline-none focus:border-neutral-900"
          >
            <option value="">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Drafts</option>
          </select>
        </div>
      </div>

      {/* Posts Data Table */}
      <div className="bg-white rounded-xl border border-neutral-200/90 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-neutral-400 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-neutral-900" />
            <span className="text-xs font-mono">Loading articles...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center text-neutral-500">
            <p className="text-sm">No articles matched your criteria.</p>
            <Link
              href="/admin/posts/new"
              className="mt-3 inline-block text-xs uppercase font-mono tracking-wider font-semibold text-neutral-900 underline"
            >
              Write your first post →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-600">
              <thead className="bg-neutral-50 text-[11px] uppercase font-mono tracking-wider text-neutral-500 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-3.5">Title & Path</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Reading Time</th>
                  <th className="px-6 py-3.5">Views</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-neutral-50/80 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-neutral-900 line-clamp-1 max-w-sm">
                        {post.title}
                      </div>
                      <div className="text-[11px] font-mono text-neutral-400">
                        /guide/{post.slug}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-neutral-800">
                        {post.category?.name || "Uncategorized"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold ${
                          post.status === "PUBLISHED"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-mono text-xs text-neutral-500">
                      {post.readingTime}
                    </td>

                    <td className="px-6 py-4 font-mono text-xs text-neutral-600">
                      {post.views}
                    </td>

                    <td className="px-6 py-4 font-mono text-xs text-neutral-400">
                      {formatDate(post.createdAt)}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="p-1.5 text-neutral-600 hover:text-black rounded hover:bg-neutral-100 transition-colors"
                          title="Edit Post"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        {post.status === "PUBLISHED" && (
                          <Link
                            href={`/guide/${post.slug}`}
                            target="_blank"
                            className="p-1.5 text-neutral-600 hover:text-black rounded hover:bg-neutral-100 transition-colors"
                            title="Preview Article"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}

                        <button
                          type="button"
                          onClick={() => setPostToDelete(post)}
                          className="p-1.5 text-rose-500 hover:text-rose-700 rounded hover:bg-rose-50 transition-colors"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2 bg-rose-100 rounded-full">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">
                Confirm Deletion
              </h3>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed">
              Are you sure you want to permanently delete &ldquo;
              <strong>{postToDelete.title}</strong>&rdquo;? This action cannot be
              undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setPostToDelete(null)}
                className="px-4 py-2 border border-neutral-300 rounded text-xs font-mono uppercase tracking-wider text-neutral-700 hover:bg-neutral-100"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-mono uppercase tracking-wider font-semibold transition-colors disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Permanently Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

