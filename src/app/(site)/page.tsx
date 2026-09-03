// Server Component — fetches hero data and dynamic marketing collections from DB
import { HeroSection } from "@/components/site/HeroSection";
import HomePageClient from "@/components/site/HomePageClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let clientLogos: any[] = [];
  let services: any[] = [];
  let testimonials: any[] = [];
  let blogPosts: any[] = [];
  let faqs: any[] = [];

  try {
    clientLogos = await prisma.clientLogo.findMany({
      where: { visible: true },
      orderBy: { order: "asc" },
    });

    services = await prisma.service.findMany({
      where: { status: "published", category: { slug: "corporate" } },
      orderBy: { order: "asc" },
    });

    testimonials = await prisma.testimonial.findMany({
      where: { visible: true },
      orderBy: { order: "asc" },
    });

    blogPosts = await prisma.blogPost.findMany({
      where: { status: "published" },
      include: { category: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });

    faqs = await prisma.faq.findMany({
      where: { visible: true, group: "home" },
      orderBy: { order: "asc" },
    });
  } catch {
    // Database connection fallback — defaults handled below
  }

  // Map database structures to props securely
  const mappedServices = services.length > 0 
    ? services.map((s) => ({
        title: s.name,
        desc: s.shortDescription,
        icon: s.icon,
      }))
    : undefined;

  const mappedBlogPosts = blogPosts.length > 0
    ? blogPosts.map((p) => ({
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt || "",
        category: p.category?.name || "Insights",
      }))
    : undefined;

  return (
    <>
      {/* Hero: DB-driven text overlaid on 3D visualization background */}
      <HeroSection />

      {/* Everything else: client-side animations, solutions, testimonials, FAQs, blog, CTA */}
      <HomePageClient
        clientLogos={clientLogos.length > 0 ? clientLogos : undefined}
        services={mappedServices}
        testimonials={testimonials.length > 0 ? testimonials : undefined}
        blogPosts={mappedBlogPosts}
        faqs={faqs.length > 0 ? faqs : undefined}
      />
    </>
  );
}
