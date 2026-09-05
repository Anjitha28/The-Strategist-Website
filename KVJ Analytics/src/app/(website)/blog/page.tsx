import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BoldStatement } from "@/components/ui/BoldStatement";
import { supabase } from "@/lib/supabase";
import { getPageContent, mergePageContent } from "@/lib/content";
import { FALLBACK_BLOG } from "@/lib/constants";
import { pageMeta } from "@/lib/seo";
import { BlogListClient } from "@/components/blog/BlogListClient";

export const revalidate = 3600;
export const metadata = pageMeta({
  title: "Blog — Excel, Power BI, Automation & Analytics Insights",
  description:
    "Practical guides on Excel automation, Power BI dashboards, report automation, and data analytics for businesses and institutions — from The Strategist team.",
  path: "/blog",
  keywords: ["Excel tips", "Power BI blog", "report automation guide", "data analytics articles", "business intelligence blog"],
});

const FALLBACK_POSTS = [
  {
    id: "post1",
    title: "Why Data-Driven Organizations Consistently Outperform Their Competition",
    slug: "why-data-driven-organizations-consistently-outperform-their-competition",
    description: "Leaders who make decisions backed by evidence rather than assumptions consistently outperform. Discover how Business Intelligence creates a single source of truth for competitive advantage.",
    body_html: "<p>Leaders who make decisions backed by evidence rather than assumptions consistently outperform. Discover how Business Intelligence creates a single source of truth for competitive advantage.</p>",
    published_at: "2026-07-20T08:00:00.000Z",
    featured: true,
    author_name: "The Strategist",
    author_slug: "the-strategist",
    category_title: "Business Intelligence",
    category_slug: "business-intelligence",
    cover_url: "",
    featured_flags: ["featured"],
    tags: ["business-intelligence", "data-driven", "decision-making"],
  },
  {
    id: "post2",
    title: "Digital Transformation: Building Smarter Businesses for the Future",
    slug: "digital-transformation-building-smarter-businesses-for-the-future",
    description: "Digital Transformation is about improving how organisations operate, collaborate, and create value using data, processes, and technology.",
    body_html: "<p>Digital Transformation is a strategic journey that combines people, processes, technology, and data.</p>",
    published_at: "2026-07-15T09:00:00.000Z",
    featured: false,
    author_name: "The Strategist",
    author_slug: "the-strategist",
    category_title: "Digital Transformation",
    category_slug: "digital-transformation",
    cover_url: "",
    featured_flags: ["editors_pick", "trending"],
    tags: ["digital-transformation", "cloud", "automation", "strategy"],
  },
  {
    id: "post3",
    title: "How Artificial Intelligence is Revolutionising Business Analytics",
    slug: "how-artificial-intelligence-is-revolutionising-business-analytics",
    description: "AI has evolved from a futuristic concept into a practical business tool, empowering organisations to move from reactive analytics to proactive business planning.",
    body_html: "<p>AI has evolved from a futuristic concept into a practical business tool, empowering organisations to move from reactive analytics to proactive business planning.</p>",
    published_at: "2026-07-10T09:00:00.000Z",
    featured: false,
    author_name: "The Strategist",
    author_slug: "the-strategist",
    category_title: "Artificial Intelligence",
    category_slug: "artificial-intelligence",
    cover_url: "",
    featured_flags: ["latest"],
    tags: ["artificial-intelligence", "ai", "predictive-analytics", "machine-learning"],
  },
];

export default async function BlogPage() {
  // Fetch posts from Supabase `blog_posts` (or fallback to memory mockDb)
  let fetchedPosts: any[] = [];
  try {
    const { data: rows, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });
      
    if (!error && rows && rows.length > 0) {
      fetchedPosts = rows.map((r: any) => ({
        id: r.id,
        title: r.title,
        slug: r.slug,
        description: r.description || "",
        body_html: r.body_html || "",
        cover_url: r.cover_url || undefined,
        category_title: r.category_title || "Insights",
        category_slug: r.category_slug || "insights",
        author_name: r.author_name || "The Strategist",
        author_slug: r.author_slug || "the-strategist",
        published_at: r.published_at,
        featured: !!r.featured,
        featured_flags: r.featured_flags || (r.featured ? ["featured"] : []),
        tags: r.tags || [],
      }));
    }
  } catch (err) {
    console.warn("Supabase blog fetch error, falling back:", err);
  }

  const header = mergePageContent(await getPageContent("blog"), FALLBACK_BLOG);
  const posts = fetchedPosts.length >= 3 ? fetchedPosts : FALLBACK_POSTS;

  return (
    <div className="relative min-h-screen bg-[#050608] text-white pt-24 pb-16 overflow-hidden">
      {/* Decorative background glows & patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-950/15 rounded-full blur-[130px] pointer-events-none" />

      <BlogListClient posts={posts} header={header} />
    </div>
  );
}
