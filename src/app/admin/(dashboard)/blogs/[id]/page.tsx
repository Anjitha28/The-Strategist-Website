import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import { BlogForm } from "./BlogForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Manage Blog Post | Admin" };

type Props = { params: Promise<{ id: string }> };

export default async function EditBlogPage({ params }: Props) {
  await requireUser();
  const { id } = await params;

  let post = null;

  if (id !== "new") {
    post = await prisma.blogPost.findUnique({
      where: { id },
    });
    if (!post) notFound();
  }

  const initialData = post
    ? {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        status: post.status,
        publishedAt: post.publishedAt,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
      }
    : null;

  return <BlogForm initialData={initialData} />;
}
