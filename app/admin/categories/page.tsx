"use client";

import { useState, useEffect } from "react";
import {
  FolderTree,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { slugify } from "@/lib/utils";

interface CategoryWithCount {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  _count?: {
    posts: number;
  };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form states
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [currentCat, setCurrentCat] = useState<CategoryWithCount | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Delete modal state
  const [catToDelete, setCatToDelete] = useState<CategoryWithCount | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch {
      setError("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setName("");
    setDescription("");
    setCurrentCat(null);
    setModalMode("add");
    setError(null);
  };

  const openEditModal = (cat: CategoryWithCount) => {
    setName(cat.name);
    setDescription(cat.description || "");
    setCurrentCat(cat);
    setModalMode("edit");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const isEdit = modalMode === "edit" && currentCat;
      const endpoint = isEdit ? `/api/categories/${currentCat.id}` : "/api/categories";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: description.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save category");
      }

      setSuccess(isEdit ? "Category updated!" : "Category created!");
      setTimeout(() => setSuccess(null), 3000);
      setModalMode(null);
      fetchCategories();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error saving category");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!catToDelete) return;

    setDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/categories/${catToDelete.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete category");
      }

      setSuccess("Category deleted successfully!");
      setTimeout(() => setSuccess(null), 3000);
      setCatToDelete(null);
      fetchCategories();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error deleting category");
      }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
            Taxonomy Architecture
          </span>
          <h1 className="text-3xl font-black tracking-tight text-neutral-900">
            Category Manager
          </h1>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs uppercase font-mono tracking-wider font-semibold rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Category
        </button>
      </div>

      {/* Global notifications */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-white rounded-xl border border-neutral-200/90 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-neutral-400 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-neutral-900" />
            <span className="text-xs font-mono">Loading categories...</span>
          </div>
        ) : categories.length === 0 ? (
          <div className="py-20 text-center text-neutral-500">
            <FolderTree className="w-10 h-10 mx-auto text-neutral-300 mb-2" />
            <p className="text-sm">No categories found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-600">
              <thead className="bg-neutral-50 text-[11px] uppercase font-mono tracking-wider text-neutral-500 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-3.5">Category Name</th>
                  <th className="px-6 py-3.5">Slug</th>
                  <th className="px-6 py-3.5">Description</th>
                  <th className="px-6 py-3.5">Articles</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="hover:bg-neutral-50/80 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-neutral-900">
                        {cat.name}
                      </div>
                    </td>

                    <td className="px-6 py-4 font-mono text-xs text-neutral-500">
                      /category/{cat.slug}
                    </td>

                    <td className="px-6 py-4 text-xs text-neutral-500 max-w-xs truncate">
                      {cat.description || "—"}
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded font-mono text-xs font-semibold">
                        {cat._count?.posts ?? 0}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/category/${cat.slug}`}
                          target="_blank"
                          className="p-1.5 text-neutral-500 hover:text-black rounded hover:bg-neutral-100 transition-colors"
                          title="View on site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => openEditModal(cat)}
                          className="p-1.5 text-neutral-500 hover:text-black rounded hover:bg-neutral-100 transition-colors"
                          title="Edit Category"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setCatToDelete(cat)}
                          className="p-1.5 text-rose-500 hover:text-rose-700 rounded hover:bg-rose-50 transition-colors"
                          title="Delete Category"
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

      {/* Add / Edit Category Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="text-base font-bold text-neutral-900">
                {modalMode === "add" ? "Create New Category" : "Edit Category"}
              </h3>
              <button
                type="button"
                onClick={() => setModalMode(null)}
                className="text-neutral-400 hover:text-black text-xs font-mono"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1">
                  Category Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Denim Maintenance"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-sm focus:outline-none focus:border-black"
                />
                <span className="text-[10px] font-mono text-neutral-400 mt-1 block">
                  Slug: /category/{modalMode === "edit" && currentCat ? currentCat.slug : slugify(name) || "slug"}
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short summary for category archive banner and SEO meta..."
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 border border-neutral-300 rounded text-xs font-mono uppercase text-neutral-700 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-neutral-900 hover:bg-black text-white rounded text-xs font-mono uppercase tracking-wider font-semibold transition-colors disabled:opacity-50"
                >
                  {submitting ? "Saving..." : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {catToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 space-y-4">
            <h3 className="text-base font-bold text-neutral-900 text-rose-600">
              Confirm Category Deletion
            </h3>
            <p className="text-sm text-neutral-600">
              Are you sure you want to delete &ldquo;
              <strong>{catToDelete.name}</strong>&rdquo;?
            </p>

            {(catToDelete._count?.posts ?? 0) > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 font-mono">
                Warning: This category contains {catToDelete._count?.posts} post(s).
                Delete or reassign those posts before deleting this category.
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setCatToDelete(null)}
                className="px-4 py-2 border border-neutral-300 rounded text-xs font-mono uppercase text-neutral-700 hover:bg-neutral-100"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-mono uppercase tracking-wider font-semibold transition-colors disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

