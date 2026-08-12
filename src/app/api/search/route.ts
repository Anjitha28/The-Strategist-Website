import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json({ results: [] });

  const like = { contains: q };

  const [pages, products, courses, posts] = await Promise.all([
    prisma.page.findMany({
      where: { status: "published", title: like },
      select: { slug: true, title: true, seoDescription: true },
      take: 5,
    }),
    prisma.product.findMany({
      where: { status: "published", name: like },
      select: { slug: true, name: true, shortDescription: true },
      take: 5,
    }),
    prisma.course.findMany({
      where: { status: "published", title: like },
      select: { slug: true, title: true, shortDescription: true },
      take: 5,
    }),
    prisma.blogPost.findMany({
      where: { status: "published", title: like },
      select: { slug: true, title: true, excerpt: true },
      take: 5,
    }),
  ]);

  const results = [
    ...pages.map((p) => ({ type: "Page", title: p.title, url: p.slug === "home" ? "/" : `/${p.slug}`, excerpt: p.seoDescription ?? "" })),
    ...products.map((p) => ({ type: "Product", title: p.name, url: `/products/${p.slug}`, excerpt: p.shortDescription })),
    ...courses.map((c) => ({ type: "Course", title: c.title, url: `/training/${c.slug}`, excerpt: c.shortDescription })),
    ...posts.map((b) => ({ type: "Article", title: b.title, url: `/blog/${b.slug}`, excerpt: b.excerpt })),
  ];

  return NextResponse.json({ results });
}
