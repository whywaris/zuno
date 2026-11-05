import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import {
  FileCheck2,
  FileClock,
  FolderTree,
  Eye,
  PlusCircle,
  ExternalLink,
  Edit,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [publishedCount, draftCount, categoryCount, viewsAgg, recentPosts] =
    await Promise.all([
      prisma.post.count({ where: { status: "PUBLISHED" } }),
      prisma.post.count({ where: { status: "DRAFT" } }),
      prisma.category.count(),
      prisma.post.aggregate({ _sum: { views: true } }),
      prisma.post.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { category: true },
      }),
    ]);

  const totalViews = viewsAgg._sum.views || 0;

  const statCards = [
    {
      label: "Published Articles",
      value: publishedCount,
      icon: FileCheck2,
      subtext: "Live on site & indexed",
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
    {
      label: "Drafts in Progress",
      value: draftCount,
      icon: FileClock,
      subtext: "Pending editorial review",
      color: "text-amber-700 bg-amber-50 border-amber-200",
    },
    {
      label: "Fashion Categories",
      value: categoryCount,
      icon: FolderTree,
      subtext: "Active taxonomy sections",
      color: "text-sky-700 bg-sky-50 border-sky-200",
    },
    {
      label: "Total Article Views",
      value: totalViews.toLocaleString(),
      icon: Eye,
      subtext: "Cumulative reader impressions",
      color: "text-neutral-900 bg-neutral-100 border-neutral-300",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Top Banner & Quick Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
            Editorial Overview
          </span>
          <h1 className="text-3xl font-black tracking-tight text-neutral-900">
            Admin Dashboard
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

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white p-6 rounded-xl border border-neutral-200/90 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                  {stat.label}
                </span>
                <div className={`p-2 rounded-lg border ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black tracking-tight text-neutral-900">
                {stat.value}
              </div>
              <p className="text-[11px] text-neutral-400 font-mono">
                {stat.subtext}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Posts Section */}
      <div className="bg-white rounded-xl border border-neutral-200/90 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">
              Recent Articles
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              The 5 most recently created or updated stories
            </p>
          </div>
          <Link
            href="/admin/posts"
            className="text-xs font-mono uppercase tracking-wider text-neutral-900 hover:underline flex items-center gap-1 font-semibold"
          >
            All Posts ({publishedCount + draftCount})
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-600">
            <thead className="bg-neutral-50 text-[11px] uppercase font-mono tracking-wider text-neutral-500 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3.5">Title & Slug</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Views</th>
                <th className="px-6 py-3.5">Created</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {recentPosts.map((post) => (
                <tr key={post.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-neutral-900 line-clamp-1 max-w-md">
                      {post.title}
                    </div>
                    <div className="text-[11px] font-mono text-neutral-400">
                      /guide/{post.slug}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-neutral-800">
                      {post.category.name}
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

                  <td className="px-6 py-4 font-mono text-xs text-neutral-600">
                    {post.views}
                  </td>

                  <td className="px-6 py-4 font-mono text-xs text-neutral-400">
                    {formatDate(post.createdAt)}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="p-1.5 text-neutral-500 hover:text-black rounded hover:bg-neutral-100 transition-colors"
                        title="Edit Post"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      {post.status === "PUBLISHED" && (
                        <Link
                          href={`/guide/${post.slug}`}
                          target="_blank"
                          className="p-1.5 text-neutral-500 hover:text-black rounded hover:bg-neutral-100 transition-colors"
                          title="Preview Live Post"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

