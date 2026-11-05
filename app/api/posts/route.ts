import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { slugify, calculateReadingTime } from "@/lib/utils";
import { ALLOWED_IMAGE_HOSTS, isAllowedImageUrl } from "@/lib/images";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const categoryId = searchParams.get("categoryId");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");

  const where: Record<string, unknown> = {};

  if (status) {
    where.status = status;
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { excerpt: { contains: search, mode: "insensitive" } },
    ];
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.post.count({ where }),
  ]);

  return NextResponse.json({
    posts,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

    if (!title || !content || !excerpt || !categoryId) {
      return NextResponse.json(
        { error: "Title, content, excerpt, and category are required" },
        { status: 400 }
      );
    }

    if (featuredImage && !isAllowedImageUrl(featuredImage)) {
      return NextResponse.json(
        { error: `Featured image must be an upload or hosted on ${ALLOWED_IMAGE_HOSTS.join(", ")}` },
        { status: 400 }
      );
    }

    const slug = customSlug || slugify(title);

    // Check for duplicate slug
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 }
      );
    }

    const readingTime = calculateReadingTime(content);

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        categoryId,
        status: status || "DRAFT",
        featuredImage: featuredImage || "",
        featuredImageAlt: featuredImageAlt || "",
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        readingTime,
      },
      include: { category: true },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
