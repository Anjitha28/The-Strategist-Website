import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export async function BlogListSection({ data }: { data: { heading?: string } }) {
  const posts = await prisma.blogPost.findMany({
    where: { status: "published" },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    include: { category: true, author: true },
  });

  if (posts.length === 0) {
    return (
      <Section>
        <SectionHeader title={data.heading ?? "Recent Publications"} eyebrow="Insights" eyebrowIcon="newspaper" />
        <p className="mt-10 text-center text-[var(--muted)]">Articles are coming soon.</p>
      </Section>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <Section id="articles">
      {/* Featured */}
      <Reveal>
        <Link href={`/blog/${featured.slug}`} className="group block">
          <div className="grid overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] shadow-[var(--shadow-card)] md:grid-cols-2">
            <div className="flex min-h-56 items-center justify-center bg-[linear-gradient(135deg,var(--color-primary-500),var(--color-secondary-500))] text-white">
              <Icon name="newspaper" className="h-16 w-16" />
            </div>
            <div className="flex flex-col justify-center gap-3 p-8">
              <div className="flex items-center gap-2">
                <Pill>Featured</Pill>
                {featured.category && <span className="text-xs text-[var(--muted)]">{featured.category.name}</span>}
              </div>
              <h2 className="text-2xl font-bold leading-tight transition-colors group-hover:text-primary-600">{featured.title}</h2>
              <p className="text-sm text-[var(--muted)]">{featured.excerpt}</p>
              <p className="text-xs text-[var(--muted)]">
                {featured.author?.name} · {formatDate(featured.publishedAt)} · {featured.readingMinutes} min read
              </p>
            </div>
          </div>
        </Link>
      </Reveal>

      {/* Grid */}
      <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {rest.map((p) => (
          <RevealItem key={p.id}>
            <Link href={`/blog/${p.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col" hover>
                <div className="mb-4 flex aspect-[16/10] items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--color-primary-100),var(--color-secondary-100))] dark:from-primary-950 dark:to-secondary-950">
                  <Icon name={p.category?.name ? "bar-chart" : "newspaper"} className="h-10 w-10 text-primary-400" />
                </div>
                {p.category && <Pill className="mb-3 w-fit">{p.category.name}</Pill>}
                <h3 className="text-lg font-semibold leading-snug transition-colors group-hover:text-primary-600">{p.title}</h3>
                <p className="mt-2 line-clamp-2 flex-1 text-sm text-[var(--muted)]">{p.excerpt}</p>
                <p className="mt-4 text-xs text-[var(--muted)]">
                  {formatDate(p.publishedAt)} · {p.readingMinutes} min read · {p.views} views
                </p>
              </Card>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
