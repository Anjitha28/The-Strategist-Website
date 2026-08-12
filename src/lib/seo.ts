import type { Metadata } from "next";
import { prisma } from "./prisma";
import { splitCsv } from "./utils";

/** Build Next.js Metadata for a CMS page by slug. */
export async function buildPageMetadata(slug: string): Promise<Metadata> {
  const page = await prisma.page.findUnique({
    where: { slug },
    select: { title: true, seoTitle: true, seoDescription: true, seoKeywords: true, ogImage: true, canonical: true, robots: true },
  });
  if (!page) return {};

  const path = slug === "home" ? "/" : `/${slug}`;
  const title = page.seoTitle ?? page.title;
  const description = page.seoDescription ?? undefined;

  return {
    title,
    description,
    keywords: page.seoKeywords ? splitCsv(page.seoKeywords) : undefined,
    alternates: { canonical: page.canonical ?? path },
    robots: page.robots ?? undefined,
    openGraph: {
      title,
      description,
      url: path,
      images: page.ogImage ? [{ url: page.ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
