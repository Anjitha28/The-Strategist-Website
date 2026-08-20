import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SITE_CONFIG } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const allPosts = [SITE_CONFIG.blog.featured, ...SITE_CONFIG.blog.articles];
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const allPosts = [SITE_CONFIG.blog.featured, ...SITE_CONFIG.blog.articles];
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return {};
  
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const allPosts = [SITE_CONFIG.blog.featured, ...SITE_CONFIG.blog.articles];
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  // Simple markdown renderer for headers and paragraphs
  const renderParagraph = (text: string, idx: number) => {
    if (text.startsWith("### ")) {
      return (
        <h3 key={idx} className="text-xl sm:text-2xl font-bold text-[var(--fg)] mt-8 mb-4 font-display">
          {text.replace("### ", "")}
        </h3>
      );
    }
    if (text.startsWith("#### ")) {
      return (
        <h4 key={idx} className="text-lg sm:text-xl font-bold text-[var(--fg)] mt-6 mb-3 font-display">
          {text.replace("#### ", "")}
        </h4>
      );
    }
    if (text.startsWith("* ")) {
      return (
        <li key={idx} className="text-sm sm:text-base text-[var(--muted)] leading-relaxed ml-6 list-disc mb-2">
          {text.replace("* ", "")}
        </li>
      );
    }
    
    // Check for inline bold text e.g. **text**
    const parts = text.split(" ");
    const processedParts = parts.map((part, pidx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={pidx} className="font-extrabold text-[var(--fg)]">{part.replaceAll("**", "")} </strong>;
      }
      return part + " ";
    });

    return (
      <p key={idx} className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mb-4">
        {processedParts}
      </p>
    );
  };

  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", url: "/blog" }, { name: post.title, url: `/blog/${post.slug}` }]} />

      <Section className="bg-[var(--surface)]">
        <article className="max-w-3xl mx-auto flex flex-col gap-6">
          <Reveal className="flex flex-col gap-4">
            <span className="w-fit rounded-full bg-[#00b894]/10 border border-[#00b894]/20 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#00a88a]">
              {post.category}
            </span>
            <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl text-[var(--fg)] leading-tight font-display">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-xs text-[var(--muted)] font-semibold border-y border-[var(--border-color)]/30 py-4 mt-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {post.readTime}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-4">
            <div className="prose prose-lg max-w-none text-[var(--fg)]">
              {post.content.split("\n").filter(Boolean).map((p, i) => renderParagraph(p, i))}
            </div>
          </Reveal>
        </article>
      </Section>

      <Section padded={false} className="py-12 text-center border-t border-[var(--border-color)]/40 bg-[var(--surface-2)]/10">
        <Button href="/blog" variant="secondary" size="md">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to all articles
        </Button>
      </Section>
    </>
  );
}
