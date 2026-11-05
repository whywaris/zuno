import { prisma } from "@/lib/prisma";
import PostForm from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return <PostForm categories={categories} />;
}

