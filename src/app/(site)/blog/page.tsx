"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, BookOpen, Search, Sparkles, Mail, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SITE_CONFIG } from "@/config/site";

const CATEGORIES = [
  "All Insights",
  "Business Intelligence",
  "Digital Transformation",
  "Artificial Intelligence"
];

const POPULAR_TAGS = [
  "all",
  "business-intelligence",
  "data-driven",
  "decision-making",
  "digital-transformation",
  "cloud",
  "automation",
  "strategy",
  "artificial-intelligence"
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Insights");
  const [activeTag, setActiveTag] = useState("all");
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const featured = {
    ...SITE_CONFIG.blog.featured,
    tags: ["business-intelligence", "data-driven", "decision-making"],
  };

  const articles = [
    {
      ...SITE_CONFIG.blog.articles[0],
      tags: ["digital-transformation", "cloud", "automation", "strategy"],
      isEditorsPick: true,
    },
    {
      ...SITE_CONFIG.blog.articles[1],
      tags: ["artificial-intelligence", "ai", "predictive-analytics", "machine-learning"],
      isEditorsPick: false,
    },
  ];

  const allPosts = [featured, ...articles];

  // Filter posts based on Category, Tag, and Search Query
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      // Category filter
      if (activeCategory !== "All Insights" && post.category !== activeCategory) {
        return false;
      }
      // Tag filter
      if (activeTag !== "all") {
        const postTags = (post.tags || []).map((t) => t.toLowerCase());
        if (!postTags.includes(activeTag.toLowerCase())) {
          return false;
        }
      }
      // Search filter
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = post.title.toLowerCase().includes(q);
        const excerptMatch = post.excerpt.toLowerCase().includes(q);
        const catMatch = post.category.toLowerCase().includes(q);
        return titleMatch || excerptMatch || catMatch;
      }
      return true;
    });
  }, [allPosts, activeCategory, activeTag, searchQuery]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", url: "/blog" }]} />

      {/* Hero Banner — Clean White Theme */}
      <section className="relative overflow-hidden pt-24 pb-16 bg-white border-b border-[#dce6e7]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-20 pointer-events-none" />

        <div className="container-page relative z-10 text-center">
          <Reveal className="flex flex-col items-center gap-5 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#e7f6f4] px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#159f95]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              INSIGHTS / KNOWLEDGE
            </span>
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl text-[#071820] leading-[1.08] tracking-tight font-extrabold">
              Data Analytics, Excel &amp; <br />
              <span className="text-[#18b8ad]">Power BI Insights</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#56666b] max-w-2xl">
              Practical guides, expert tutorials, and corporate insights on building automated dashboard reports, writing advanced Excel models, and unlocking data-driven business intelligence.
            </p>
          </Reveal>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-[#8a979b] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, topic, or keyword..."
                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-[#F1F6FA] border border-[#dce6ee] text-sm text-[#071820] placeholder-[#8a979b] focus:outline-none focus:border-[#18b8ad] focus:bg-white shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-xs font-bold text-[#8a979b] hover:text-[#071820]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs & Popular Tags */}
      <div className="bg-[#f8fafc] py-6 border-b border-[#dce6e7]">
        <div className="container-page flex flex-col gap-4">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveTag("all");
                }}
                className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 shrink-0 ${
                  activeCategory === cat
                    ? "bg-[#071820] text-white shadow-sm"
                    : "bg-white text-[#56666b] hover:text-[#071820] hover:bg-[#F1F6FA] border border-[#dce6ee]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Popular Tag Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none justify-start sm:justify-center text-xs">
            <span className="font-bold text-[#8a979b] uppercase tracking-wider text-[10px] shrink-0 mr-1">
              Popular Tags:
            </span>
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors shrink-0 ${
                  activeTag === tag
                    ? "bg-[#18b8ad] text-white"
                    : "bg-white border border-[#dce6ee] text-[#56666b] hover:border-[#18b8ad] hover:text-[#18b8ad]"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <Section className="bg-[#F1F6FA] py-20 border-b border-[#dce6e7]">
        <div className="container-page">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 max-w-md mx-auto">
              <BookOpen className="w-12 h-12 text-[#8a979b] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#071820] mb-2">No Insights Found</h3>
              <p className="text-sm text-[#56666b] mb-6">
                No articles matched your search or category filter. Try clearing your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All Insights");
                  setActiveTag("all");
                }}
                className="px-6 py-2.5 rounded-full bg-[#071820] text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Featured Article — Shown when viewing All and no search query */}
              {activeCategory === "All Insights" && activeTag === "all" && !searchQuery && (
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                        Spotlight
                      </span>
                      <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#071820] tracking-tight">
                        Featured Article
                      </h2>
                    </div>
                  </div>

                  <Reveal>
                    <Link href={`/blog/${featured.slug}`} className="block group">
                      <div className="grid gap-8 lg:grid-cols-12 items-center bg-white p-8 sm:p-10 shadow-xs rounded-3xl border border-[#dce6ee] hover:shadow-md hover:border-[#18b8ad]/40 transition-all duration-300 relative overflow-hidden">
                        <div className="lg:col-span-8 flex flex-col gap-4">
                          <div className="flex items-center gap-3">
                            <span className="rounded-full bg-[#e7f6f4] border border-[#18b8ad]/30 px-3 py-1 text-xs font-bold text-[#159f95]">
                              {featured.category}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-[#8a979b]">
                              <Calendar className="h-3.5 w-3.5" /> {featured.date}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-[#8a979b]">
                              <Clock className="h-3.5 w-3.5" /> {featured.readTime}
                            </span>
                          </div>

                          <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071820] group-hover:text-[#18b8ad] transition-colors leading-tight">
                            {featured.title}
                          </h3>

                          <p className="text-sm sm:text-base text-[#56666b] leading-relaxed">
                            {featured.excerpt}
                          </p>

                          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#18b8ad] group-hover:gap-3 transition-all">
                            <span>Read Article</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>

                        <div className="lg:col-span-4 flex justify-center">
                          <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#071820] to-[#0f3a35] p-8 flex flex-col justify-between text-white border border-[#18b8ad]/30 relative overflow-hidden">
                            <Sparkles className="w-8 h-8 text-[#18b8ad]" />
                            <div>
                              <span className="text-xs font-mono text-[#a1b4b9] uppercase tracking-wider block">Insight Analysis</span>
                              <span className="text-lg font-bold text-white mt-1 block">The Strategist Research</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                </div>
              )}

              {/* Editor's Picks & Latest Insights */}
              <div>
                <div className="mb-8">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                    Curated Knowledge
                  </span>
                  <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#071820] tracking-tight mt-1">
                    {activeCategory !== "All Insights" ? activeCategory : "Latest Insights & Editor's Picks"}
                  </h2>
                </div>

                <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPosts.map((post) => (
                    <RevealItem key={post.slug}>
                      <Link href={`/blog/${post.slug}`} className="block h-full group">
                        <div className="flex flex-col justify-between p-7 bg-white border border-[#dce6ee] rounded-2xl shadow-xs hover:shadow-md hover:border-[#18b8ad]/40 hover:-translate-y-1 transition-all duration-300 h-full">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-4">
                              <span className="rounded-full bg-[#f8fafc] border border-[#dce6ee] px-3 py-1 text-[11px] font-bold text-[#18b8ad]">
                                {post.category}
                              </span>
                              <span className="flex items-center gap-1 text-[11px] text-[#8a979b]">
                                <Clock className="h-3 w-3" /> {post.readTime}
                              </span>
                            </div>

                            <h3 className="text-xl font-bold text-[#071820] leading-snug group-hover:text-[#18b8ad] transition-colors mb-3">
                              {post.title}
                            </h3>

                            <p className="text-xs sm:text-sm text-[#56666b] leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="mt-6 pt-4 border-t border-[#dce6ee]/70 flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-xs text-[#8a979b]">
                              <Calendar className="h-3.5 w-3.5" /> {post.date}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#18b8ad] group-hover:gap-2 transition-all">
                              Read <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Newsletter Structure */}
      <section className="bg-white py-20 border-b border-[#dce6e7]">
        <div className="container-page max-w-3xl mx-auto text-center">
          <Reveal className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#e7f6f4] border border-[#18b8ad]/30 grid place-items-center text-[#18b8ad] mb-6">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#071820] tracking-tight mb-3">
              Stay Ahead of the Data Curve
            </h2>
            <p className="text-base text-[#56666b] leading-relaxed max-w-lg mb-8">
              Subscribe to get practical tutorials on Power BI, Advanced Excel formulas, automated pipelines, and enterprise data analytics directly in your inbox.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-4 rounded-2xl bg-[#e7f6f4] text-[#159f95] border border-[#18b8ad]/30 text-sm font-bold">
                <CheckCircle2 className="w-5 h-5" />
                <span>Thank you for subscribing! You will receive our latest insights.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your work email..."
                  required
                  className="flex-1 px-5 py-3.5 rounded-full bg-[#F1F6FA] border border-[#dce6ee] text-sm text-[#071820] placeholder-[#8a979b] focus:outline-none focus:border-[#18b8ad]"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-[#071820] text-white text-xs font-bold hover:bg-[#0d2f3a] transition-all shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
