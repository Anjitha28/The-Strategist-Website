"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SITE_CONFIG } from "@/config/site";

const CATEGORIES = [
  "All Insights",
  "Business Intelligence",
  "Digital Transformation",
  "Artificial Intelligence"
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Insights");
  
  const featured = SITE_CONFIG.blog.featured;
  const articles = SITE_CONFIG.blog.articles;
  const allPosts = [featured, ...articles];

  // Filter posts based on category selection
  const filteredPosts = activeCategory === "All Insights" 
    ? allPosts 
    : allPosts.filter(post => post.category === activeCategory);

  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", url: "/blog" }]} />

      {/* Hero Banner — Clean White Theme */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-white border-b border-[#dce6e7]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-20 pointer-events-none" />

        <div className="container-page relative z-10 text-center">
          <Reveal className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#e7f6f4] px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#159f95]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              INSIGHTS / KNOWLEDGE
            </span>
            <h1 className="font-sans text-4xl sm:text-6xl text-[#071820] leading-[1.08] tracking-tight font-extrabold">
              Data Analytics, Excel &amp; <br />
              <span className="text-[#18b8ad]">Power BI Insights</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#56666b] max-w-2xl">
              Practical guides, expert tutorials, and corporate insights on building automated dashboard reports, writing advanced Excel models, and unlocking data-driven business intelligence.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Category Filters */}
      <div className="bg-white py-6 border-b border-[#dce6e7] sticky top-[72px] sm:top-[88px] z-30">
        <div className="container-page">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 shrink-0 ${
                  activeCategory === cat
                    ? "bg-[#071820] text-white shadow-sm"
                    : "bg-[#F1F6FA] text-[#56666b] hover:text-[#071820] hover:bg-[#e4eff5] border border-[#dce6ee]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Article */}
      {activeCategory === "All" && (
        <Section className="bg-[#F1F6FA] py-20 border-b border-[#dce6e7]">
          <div className="container-page">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-10">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                  Featured Article
                </span>
                <h2
                  className="font-sans mt-3 text-[#071820] font-extrabold tracking-tight"
                  style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.035em" }}
                >
                  Editor&apos;s Choice
                </h2>
              </div>
            </div>
            
            <Reveal>
              <div
                className="grid gap-8 lg:grid-cols-12 items-center bg-white p-7 sm:p-10 shadow-xs rounded-2xl border border-[#dce6ee] relative"
              >
                {/* Graphic Visual Panel */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-full aspect-[16/10] rounded-2xl bg-gradient-to-tr from-[#071820] to-[#12313a] flex items-center justify-center text-white border border-[#18b8ad]/20 shadow-inner">
                    <BookOpen className="h-16 w-16 text-[#18b8ad]" />
                  </div>
                </div>

                {/* Text content */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad] block">
                    {featured.category}
                  </span>
                  <h3 className="font-sans text-2xl sm:text-3xl font-bold text-[#071820] hover:text-[#18b8ad] transition-colors leading-tight">
                    <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                  </h3>
                  <p className="text-sm text-[#56666b] leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-[#56666b] font-medium pt-4 mt-2 border-t border-[#dce6ee]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-[#18b8ad]" /> {featured.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-[#18b8ad]" /> {featured.readTime}
                    </span>
                  </div>
                  <div className="mt-4">
                    <Link
                      href={`/blog/${featured.slug}`}
                      className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-sm"
                      style={{
                        padding: "12px 22px",
                        fontSize: 12,
                        fontWeight: 800
                      }}
                    >
                      Read Article <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      )}

      {/* Grid of Articles */}
      <Section className="bg-white py-24">
        <div className="container-page">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-base text-[#56666b]">No articles found in this category.</p>
            </div>
          ) : (
            <>
              {activeCategory !== "All" && (
                <h2 className="font-sans text-2xl text-[#071820] mb-10 font-bold tracking-tight">
                  {activeCategory} Insights
                </h2>
              )}
              <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Filter out featured post from regular list on 'All' to avoid duplicates */}
                {filteredPosts
                  .filter(post => activeCategory !== "All" || post.slug !== featured.slug)
                  .map((post) => (
                    <RevealItem key={post.slug}>
                      <div
                        className="group flex flex-col justify-between bg-[#F1F6FA] p-7 h-full transition-all duration-300 hover:shadow-md border border-[#dce6ee] rounded-2xl shadow-xs"
                      >
                        <div className="flex flex-col gap-4">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#18b8ad] block">
                            {post.category}
                          </span>
                          <h3 className="font-sans text-lg font-bold text-[#071820] hover:text-[#18b8ad] transition-colors leading-snug">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h3>
                          <p className="text-xs text-[#56666b] leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                        
                        <div className="mt-6 pt-4 flex flex-col gap-4 border-t border-[#dce6ee]/60">
                          <div className="flex items-center gap-4 text-[10px] text-[#56666b] font-medium">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 text-[#18b8ad]" /> {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-[#18b8ad]" /> {post.readTime}
                            </span>
                          </div>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#18b8ad] group-hover:gap-2 transition-all"
                          >
                            Read Article <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </RevealItem>
                  ))}
              </RevealGroup>
            </>
          )}
        </div>
      </Section>

      {/* Newsletter — Stay Ahead of What's Next */}
      <section
        className="py-20 text-center"
        style={{ background: "linear-gradient(135deg,#ddf7f4,#a7e9e3)" }}
      >
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 px-4">
          <Reveal>
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#18b8ad]/10 px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              Newsletter
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-sans text-3xl text-[#071820] sm:text-4xl font-extrabold tracking-tight">
              Stay Ahead of What&apos;s Next
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-base text-[#2d524f] leading-relaxed max-w-xl">
              Practical perspectives on analytics, technology and business transformation. Join data leaders receiving weekly guides directly.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-2 w-full max-w-md">
            <form onSubmit={(e) => { e.preventDefault(); }} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="you@company.com"
                required
                className="px-4 py-3 text-xs bg-white border border-[#18b8ad]/40 rounded-full text-[#071820] focus:outline-none flex-grow shadow-xs"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#071820] hover:bg-[#0d2f3a] text-white text-xs font-bold rounded-full transition-all shadow-sm shrink-0"
              >
                Subscribe →
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
