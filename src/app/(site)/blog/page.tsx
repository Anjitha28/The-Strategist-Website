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
  "All",
  "Analytics",
  "Business Intelligence",
  "Automation",
  "Technology",
  "Digital Transformation",
  "Education Technology"
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const featured = SITE_CONFIG.blog.featured;
  const articles = SITE_CONFIG.blog.articles;
  const allPosts = [featured, ...articles];

  // Filter posts based on category selection
  const filteredPosts = activeCategory === "All" 
    ? allPosts 
    : allPosts.filter(post => post.category === activeCategory);

  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", url: "/blog" }]} />

      {/* Hero Banner — Exact Selected Brand Theme */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-[#071820]">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-25 pointer-events-none" />

        <div className="container-page relative z-10 text-center">
          <Reveal className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#18b8ad]/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              Insights &amp; Perspectives
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl text-white leading-[1.05] tracking-tight font-medium">
              Ideas for <span className="italic text-[#18b8ad]">Smarter Decisions</span>
            </h1>
            <p className="text-base leading-relaxed text-[#a1b4b9] max-w-xl">
              Explore practical insights on analytics, automation, business intelligence, technology, digital transformation, education technology, and modern business practices.
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
                className={`rounded-full px-4.5 py-2 text-xs font-black uppercase tracking-wider transition-all duration-300 shrink-0 ${
                  activeCategory === cat
                    ? "bg-[#18b8ad] text-[#071820]"
                    : "bg-[#f7f9f8] text-[#68787d] hover:text-[#18b8ad] border border-[#dce6e7]"
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
        <Section className="bg-[#f7f9f8] py-20">
          <div className="container-page">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-10">
              <div>
                <p style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", color: "#18b8ad" }} className="uppercase">
                  Featured Article
                </p>
                <h2
                  className="font-serif mt-3"
                  style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 500, color: "#071820" }}
                >
                  Editor&apos;s Choice
                </h2>
              </div>
            </div>
            
            <Reveal>
              <div
                className="grid gap-8 lg:grid-cols-12 items-center bg-white p-6 sm:p-10 shadow-sm overflow-hidden relative"
                style={{ borderRadius: 24, border: "1px solid #dce6e7" }}
              >
                {/* Graphic Visual Panel */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-full aspect-[16/10] rounded-2xl bg-gradient-to-tr from-[#071820] to-[#12313a] flex items-center justify-center text-white border border-[#18b8ad]/10">
                    <BookOpen className="h-16 w-16 text-[#18b8ad]" />
                  </div>
                </div>

                {/* Text content */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#18b8ad] block">
                    {featured.category}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#071820] hover:text-[#18b8ad] transition-colors leading-tight">
                    <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                  </h3>
                  <p className="text-sm text-[#68787d] leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-[#68787d] font-semibold pt-4 mt-2" style={{ borderTop: "1px solid #dce6e7" }}>
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
                      className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:opacity-90"
                      style={{
                        background: "#071820",
                        color: "#fff",
                        padding: "11px 20px",
                        fontSize: 11,
                        fontWeight: 850
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
              <p className="text-base text-[#68787d]">No articles found in this category.</p>
            </div>
          ) : (
            <>
              {activeCategory !== "All" && (
                <h2 className="font-serif text-2xl text-[#071820] mb-10 font-medium">
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
                        className="group flex flex-col justify-between bg-white p-6 h-full transition-all duration-300 hover:shadow-md"
                        style={{ borderRadius: 18, border: "1px solid #dce6e7" }}
                      >
                        <div className="flex flex-col gap-4">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#18b8ad] block">
                            {post.category}
                          </span>
                          <h3 className="font-serif text-lg font-medium text-[#071820] hover:text-[#18b8ad] transition-colors leading-snug">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h3>
                          <p className="text-xs text-[#68787d] leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                        
                        <div className="mt-6 pt-4 flex flex-col gap-4" style={{ borderTop: "1px solid #dce6e7" }}>
                          <div className="flex items-center gap-4 text-[10px] text-[#68787d] font-semibold">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 text-[#18b8ad]" /> {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-[#18b8ad]" /> {post.readTime}
                            </span>
                          </div>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#18b8ad] group-hover:text-[#159f95] transition-colors"
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

      {/* Blog Final CTA — Teal gradient */}
      <section
        className="py-20 text-center"
        style={{ background: "linear-gradient(135deg,#ddf7f4,#a7e9e3)" }}
      >
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#18b8ad]/10 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              Advisory Services
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-serif text-3xl text-[#071820] sm:text-4xl font-medium">
              Have a Challenge You&apos;d Like Us to Explore?
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-base text-[#3d6461] leading-relaxed">
              If you have a business, analytics, automation, or technology challenge, start a conversation with The Strategist.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-2">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:opacity-90 shadow-md"
              style={{
                background: "#071820",
                color: "#fff",
                padding: "13px 22px",
                fontSize: 11,
                fontWeight: 850
              }}
            >
              Talk to Us <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
