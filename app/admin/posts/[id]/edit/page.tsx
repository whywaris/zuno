import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostForm from "@/components/admin/PostForm";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;

  const [post, categories] = await Promise.all([
    prisma.post.findUnique({
      where: { id },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <PostForm
      categories={categories}
      initialData={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        categoryId: post.categoryId,
        status: post.status,
        featuredImage: post.featuredImage,
        featuredImageAlt: post.featuredImageAlt,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
      }}
      isEditing
    />
  );
}

