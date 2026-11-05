import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { slugify, calculateReadingTime } from "@/lib/utils";
import { ALLOWED_IMAGE_HOSTS, isAllowedImageUrl } from "@/lib/images";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const {
      title,
      content,
      excerpt,
      categoryId,
      status,
      featuredImage,
      featuredImageAlt,
      metaTitle,
      metaDescription,
      slug: customSlug,
    } = body;

    if (featuredImage && !isAllowedImageUrl(featuredImage)) {
      return NextResponse.json(
        { error: `Featured image must be an upload or hosted on ${ALLOWED_IMAGE_HOSTS.join(", ")}` },
        { status: 400 }
      );
    }

    const slug = customSlug || slugify(title);
    const readingTime = content ? calculateReadingTime(content) : undefined;

    // Check for duplicate slug (excluding current post)
    const existing = await prisma.post.findFirst({
      where: { slug, NOT: { id } },
    });
    if (existing) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 }
      );
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(content && { content }),
        ...(excerpt && { excerpt }),
        ...(categoryId && { categoryId }),
        ...(status && { status }),
        ...(featuredImage !== undefined && { featuredImage }),
        ...(featuredImageAlt !== undefined && { featuredImageAlt }),
        ...(metaTitle !== undefined && { metaTitle: metaTitle || null }),
        ...(metaDescription !== undefined && {
          metaDescription: metaDescription || null,
        }),
        ...(readingTime && { readingTime }),
      },
      include: { category: true },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Update post error:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete post error:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
