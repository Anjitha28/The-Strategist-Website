import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE_CONFIG } from "@/config/site";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim().toLowerCase() ?? "";
  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const results: { type: string; title: string; url: string; excerpt: string }[] = [];

  // 1. Search Pages
  const pages = [
    { title: "Home", slug: "/", desc: "Strategy, Analytics, Automation, Technology Solutions company." },
    { title: "About Us", slug: "/about", desc: "Strategy, Technology, Analytics, and Practical Transformation." },
    { title: "Corporate Solutions", slug: "/solutions/corporate", desc: "Report Automation, Dashboard Development, Data Visualization, Process Automation, Application Development." },
    { title: "Educational Solutions", slug: "/solutions/educational", desc: "Training Programs, Certification Programs, Curriculum Development, Academic Analytics Solutions." },
    { title: "Products Hub", slug: "/products", desc: "Grade Scope, Proctrix, BeInTrack proprietary technology platforms." },
    { title: "Training Program Directory", slug: "/training", desc: "Practical Learning for Real-World Skills. Advanced Excel, Power BI, Data Analytics." },
    { title: "Blog & Insights", slug: "/blog", desc: "Ideas for Smarter Decisions. Analytics, Automation, Business Intelligence, technology, digital transformation." },
    { title: "Contact The Strategist", slug: "/contact", desc: "Get in touch for custom reporting, automation, dashboards, or training proposals." }
  ];

  for (const page of pages) {
    if (page.title.toLowerCase().includes(q) || page.desc.toLowerCase().includes(q)) {
      results.push({
        type: "Page",
        title: page.title,
        url: page.slug,
        excerpt: page.desc
      });
    }
  }

  // 2. Search Products
  for (const prod of SITE_CONFIG.products) {
    if (prod.name.toLowerCase().includes(q) || prod.description.toLowerCase().includes(q)) {
      results.push({
        type: "Product",
        title: prod.name,
        url: `/products/${prod.slug}`,
        excerpt: prod.description
      });
    }
  }

  // 3. Search Courses
  for (const course of SITE_CONFIG.training.courses) {
    if (course.title.toLowerCase().includes(q) || course.overview.toLowerCase().includes(q)) {
      results.push({
        type: "Course",
        title: course.title,
        url: `/training/${course.slug}`,
        excerpt: course.overview
      });
    }
  }

  // 4. Search Blog Posts
  const allPosts = [SITE_CONFIG.blog.featured, ...SITE_CONFIG.blog.articles];
  for (const post of allPosts) {
    if (post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q) || post.content.toLowerCase().includes(q)) {
      results.push({
        type: "Article",
        title: post.title,
        url: `/blog/${post.slug}`,
        excerpt: post.excerpt
      });
    }
  }

  return NextResponse.json({ results: results.slice(0, 10) });
}
