import { prisma } from "@/lib/prisma";

// Menu and footer list only categories a reader can actually browse.
export async function getCategoriesWithPosts() {
  try {
    return await prisma.category.findMany({
      where: { posts: { some: { status: "PUBLISHED" } } },
      select: { name: true, slug: true },
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    console.error("Navigation categories error:", error);
    return [];
  }
}
