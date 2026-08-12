import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ShareButtons } from "@/components/site/ShareButtons";
import { ArticleJsonLd } from "@/components/seo/JsonLd";
import { formatDate, initials } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({ where: { status: "published" }, select: { slug: true } });
    return posts.map((p) => ({ slug: p.slug }));
  } catch (error) {
    console.warn("Failed to generate static params during build:", error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return {};
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { category: true, author: true, tags: { include: { tag: true } } },
  });
  if (!post || post.status !== "published") notFound();

  // Increment view count (best-effort, non-blocking to render).
  prisma.blogPost.update({ where: { id: post.id }, data: { views: { increment: 1 } } }).catch(() => {});

  const related = await prisma.blogPost.findMany({
    where: { status: "published", id: { not: post.id }, categoryId: post.categoryId ?? undefined },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: { category: true },
  });

  const paragraphs = post.content.split("\n").filter((p) => p.trim());

  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", url: "/blog" }, { name: post.title, url: `/blog/${post.slug}` }]} />
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        datePublished={post.publishedAt?.toISOString()}
        author={post.author?.name}
        url={`/blog/${post.slug}`}
      />

      <article>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--border-color)]">
          <div className="aurora absolute inset-0 -z-10 opacity-70" />
          <div className="container-page py-14 sm:py-16">
            <Reveal className="mx-auto flex max-w-3xl flex-col gap-4">
              {post.category && <Pill className="w-fit">{post.category.name}</Pill>}
              <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{post.title}</h1>
              <p className="text-lg text-[var(--muted)]">{post.excerpt}</p>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
                <span className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(135deg,var(--color-primary-500),var(--color-secondary-500))] text-xs font-bold text-white">
                    {initials(post.author?.name ?? "TS")}
                  </span>
                  {post.author?.name}
                </span>
                <span>{formatDate(post.publishedAt)}</span>
                <span>{post.readingMinutes} min read</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Body */}
        <Section>
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex aspect-[16/8] items-center justify-center rounded-3xl bg-[linear-gradient(135deg,var(--color-primary-500),var(--color-secondary-500))] text-white">
              <Icon name={(post.category as any)?.icon ?? "newspaper"} className="h-16 w-16" />
            </div>
            <div className="flex flex-col gap-5 text-lg leading-relaxed text-[var(--fg)]">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {post.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2 border-t border-[var(--border-color)] pt-6">
                {post.tags.map((t) => (
                  <span key={t.tagId} className="rounded-full bg-[var(--surface-2)] px-3 py-1 text-sm text-[var(--muted)]">
                    #{t.tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Author + share */}
            <div className="mt-8 flex flex-col gap-6 rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[linear-gradient(135deg,var(--color-primary-500),var(--color-secondary-500))] font-bold text-white">
                  {initials(post.author?.name ?? "TS")}
                </span>
                <div>
                  <p className="font-semibold">{post.author?.name}</p>
                  <p className="text-sm text-[var(--muted)]">{post.author?.designation}</p>
                </div>
              </div>
              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </div>
        </Section>

        {/* Related */}
        {related.length > 0 && (
          <Section className="bg-[var(--surface-2)]">
            <h2 className="mb-8 text-2xl font-bold">Related Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="group block h-full">
                  <Card className="flex h-full flex-col" hover>
                    {r.category && <Pill className="mb-3 w-fit">{r.category.name}</Pill>}
                    <h3 className="text-lg font-semibold leading-snug transition-colors group-hover:text-primary-600">{r.title}</h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm text-[var(--muted)]">{r.excerpt}</p>
                    <p className="mt-4 text-xs text-[var(--muted)]">{formatDate(r.publishedAt)} · {r.readingMinutes} min</p>
                  </Card>
                </Link>
              ))}
            </div>
          </Section>
        )}

        <Section padded={false} className="py-16 text-center">
          <Button href="/blog" variant="secondary" icon="arrow-right" iconRight>Back to all articles</Button>
        </Section>
      </article>
    </>
  );
}
