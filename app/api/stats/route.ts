import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [publishedCount, draftCount, categoryCount, totalViews, recentPosts] =
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

  return NextResponse.json({
    stats: {
      publishedCount,
      draftCount,
      categoryCount,
      totalViews: totalViews._sum.views || 0,
    },
    recentPosts,
  });
}
