import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card, IconBadge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { prisma } from "@/lib/prisma";
import { getFaqs, getTestimonials, getClientLogos } from "@/lib/cms";
import { parseJson, formatDate, initials } from "@/lib/utils";
import { Star, Quote, Clock, Award, BookOpen, User, ArrowRight } from "lucide-react";

export async function FaqsSection({ data }: { data: { heading?: string; group?: string } }) {
  const faqs = await getFaqs(data.group ?? "general");
  if (faqs.length === 0) return null;
  return (
    <Section className="relative overflow-hidden">
      <div className="absolute top-[20%] right-[-10%] w-[350px] aspect-square rounded-full bg-blue-500/5 blur-3xl pointer-events-none -z-10" />
      <SectionHeader title={data.heading ?? "Frequently Asked Questions"} eyebrow="FAQ" eyebrowIcon="message-square" />
      <div className="mt-16 max-w-4xl mx-auto">
        <Accordion items={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
      </div>
    </Section>
  );
}

export async function TestimonialsSection({ data }: { data: { heading?: string } }) {
  const items = await getTestimonials();
  if (items.length === 0) return null;
  return (
    <Section className="bg-[var(--surface-2)] relative overflow-hidden">
      <div className="absolute inset-0 mesh-grid opacity-30 pointer-events-none" />
      <SectionHeader title={data.heading ?? "What Our Clients Say"} eyebrow="Testimonials" eyebrowIcon="quote" />
      <RevealGroup className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-10" stagger={0.08}>
        {items.map((t) => (
          <RevealItem key={t.id}>
            <Card className="flex h-full flex-col justify-between group hover:border-primary-500/40" hover={false}>
              <div className="flex flex-col">
                <Quote className="h-10 w-10 text-blue-500/25 group-hover:text-blue-500/40 transition-colors" />
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-[var(--fg)] italic font-medium">
                  “{t.quote}”
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3.5 border-t border-[var(--border-color)]/60 pt-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-md shadow-blue-500/10 border-2 border-white dark:border-slate-950">
                  {initials(t.name)}
                </span>
                <div>
                  <p className="text-sm font-bold text-[var(--fg)]">{t.name}</p>
                  <p className="text-xs font-medium text-[var(--muted)] mt-0.5">
                    {t.designation}
                    {t.company ? `, ${t.company}` : ""}
                  </p>
                </div>
                <div className="ml-auto flex gap-0.5 bg-yellow-500/8 px-2 py-1 rounded-lg border border-yellow-500/10">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
                  ))}
                </div>
              </div>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

export async function ClientMarquee() {
  const logos = await getClientLogos();
  if (logos.length === 0) return null;
  const doubled = [...logos, ...logos];
  return (
    <section className="border-y border-[var(--border-color)] bg-[var(--surface)] py-12 relative overflow-hidden">
      <div className="container-page relative z-10">
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-widest text-[var(--muted)] opacity-85">
          Trusted by forward-thinking organizations
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex w-max animate-[marquee_36s_linear_infinite] items-center gap-16">
            {doubled.map((l, i) => (
              <span key={i} className="whitespace-nowrap text-lg font-extrabold text-[var(--muted)]/60 transition-colors hover:text-primary-600 cursor-default">
                {l.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function InsightsSection({ data }: { data: { heading?: string; subtitle?: string; ctaLabel?: string; ctaHref?: string } }) {
  return <InsightsSectionInner data={data} />;
}

async function InsightsSectionInner({ data }: { data: { heading?: string; subtitle?: string; ctaLabel?: string; ctaHref?: string } }) {
  const posts = await prisma.blogPost.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: { category: true, author: true },
  });
  if (posts.length === 0) return null;

  return (
    <Section className="relative overflow-hidden bg-white">
      <div className="absolute top-[20%] left-[-10%] w-[350px] aspect-square rounded-full bg-[#18B8AD]/5 blur-3xl pointer-events-none -z-10" />
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeader title={data.heading ?? "Latest Articles & Industry Insights"} subtitle={data.subtitle} align="left" eyebrow="Insights" eyebrowIcon="newspaper" />
        <Button href={data.ctaHref ?? "/blog"} variant="secondary" icon="arrow-right" iconRight className="shrink-0 font-bold border border-[#DCE6E7] text-[#071820]">
          {data.ctaLabel ?? "Read Our Blog"}
        </Button>
      </div>
      <RevealGroup className="mt-16 grid gap-8 md:grid-cols-3" stagger={0.08}>
        {posts.map((p) => (
          <RevealItem key={p.id}>
            <Link href={`/blog/${p.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col justify-between group-hover:border-[#18B8AD]/40 relative overflow-hidden" hover>
                <div>
                  <div className="mb-5 flex aspect-[16/10] items-center justify-center rounded-2xl bg-[#EEF4F3] border border-[#DCE6E7] overflow-hidden relative">
                    <Icon name="newspaper" className="h-10 w-10 text-[#18B8AD] group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-[#18B8AD]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {p.category && <Pill className="mb-3 w-fit bg-[#EEF4F3] text-[#18B8AD] border border-[#DCE6E7]">{p.category.name}</Pill>}
                  <h3 className="text-lg font-bold leading-snug text-[#071820] transition-colors group-hover:text-[#18B8AD] font-display">{p.title}</h3>
                  <p className="mt-2.5 line-clamp-2 text-sm text-[#68787D] leading-relaxed">{p.excerpt}</p>
                </div>
                <div className="mt-5 border-t border-[#DCE6E7] pt-4 flex items-center justify-between text-xs text-[#68787D] font-medium">
                  <span>{p.author?.name}</span>
                  <span>{formatDate(p.publishedAt)}</span>
                </div>
              </Card>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

export async function ProductCatalog({ data }: { data: { heading?: string; subtitle?: string } }) {
  const products = await prisma.product.findMany({ where: { status: "published" }, orderBy: { order: "asc" } });
  return (
    <Section id="catalog" className="bg-white">
      <SectionHeader title={data.heading ?? "Explore Our Product Portfolio"} subtitle={data.subtitle} eyebrow="Products" eyebrowIcon="boxes" />
      <RevealGroup className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {products.map((p) => {
          const features = parseJson<string[]>(p.features, []);
          return (
            <RevealItem key={p.id}>
              <Card className="flex h-full flex-col justify-between group hover:border-[#18B8AD]/40">
                <div>
                  <IconBadge icon={<Icon name={p.icon} className="h-6 w-6 text-[#18B8AD]" />} />
                  <h3 className="mt-5 text-lg font-bold tracking-tight text-[#071820] font-display">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#68787D]">{p.shortDescription}</p>
                  {features.length > 0 && (
                    <ul className="mt-5 flex flex-col gap-2 border-t border-[#DCE6E7] pt-4">
                      {features.slice(0, 5).map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-xs text-[#071820] font-medium">
                          <Icon name="check-circle" className="h-4 w-4 text-[#18B8AD] shrink-0 mt-0.5" /> 
                          <span className="leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Link href={`/products/${p.slug}`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#18B8AD] hover:gap-2.5 transition-all">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}

export async function CourseCategoriesSection({ data }: { data: { heading?: string; subtitle?: string } }) {
  const cats = await prisma.courseCategory.findMany({ orderBy: { order: "asc" } });
  return (
    <Section className="bg-[#F7F9F8] relative overflow-hidden">
      <div className="absolute inset-0 mesh-grid opacity-10 pointer-events-none" />
      <SectionHeader title={data.heading ?? "Explore Learning Categories"} subtitle={data.subtitle} eyebrow="Categories" eyebrowIcon="grid" />
      <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-10" stagger={0.05}>
        {cats.map((c) => {
          const topics = parseJson<string[]>(c.topics, []);
          return (
            <RevealItem key={c.id}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-[#DCE6E7] bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-[#18B8AD]/40 group">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#EEF4F3] border border-[#DCE6E7] text-[#18B8AD] group-hover:scale-110 transition-transform">
                  <Icon name={c.icon} className="h-5.5 w-5.5" />
                </span>
                <h3 className="text-base font-bold text-[#071820] mt-1 font-display">{c.name}</h3>
                <div className="flex flex-wrap gap-1.5 border-t border-[#DCE6E7] pt-3 mt-2">
                  {topics.map((t) => (
                    <span key={t} className="rounded-full bg-[#F7F9F8] px-3 py-1 text-[11px] font-semibold text-[#68787D] border border-[#DCE6E7]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}

export async function CourseCatalog({ data }: { data: { heading?: string; subtitle?: string } }) {
  const courses = await prisma.course.findMany({ where: { status: "published" }, orderBy: [{ featured: "desc" }, { order: "asc" }], include: { category: true } });
  return (
    <Section id="courses">
      <SectionHeader title={data.heading ?? "Popular Learning Programs"} subtitle={data.subtitle} eyebrow="Courses" eyebrowIcon="graduation-cap" />
      <RevealGroup className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {courses.map((c) => (
          <RevealItem key={c.id}>
            <Link href={`/training/${c.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col justify-between group-hover:border-primary-500/40" hover>
                <div>
                  <div className="mb-5 flex aspect-[16/9] items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md relative overflow-hidden">
                    <div className="absolute inset-0 opacity-15 mesh-grid" />
                    <Icon name={c.category?.icon ?? "graduation-cap"} className="h-10 w-10 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center gap-3">
                    {c.category && <Pill>{c.category.name}</Pill>}
                    {c.level && <span className="text-xs font-semibold text-[var(--muted)]">{c.level}</span>}
                  </div>
                  <h3 className="mt-3.5 text-lg font-bold leading-snug text-[var(--fg)] transition-colors group-hover:text-primary-600">{c.title}</h3>
                  <p className="mt-2.5 line-clamp-2 text-sm text-[var(--muted)] leading-relaxed">{c.shortDescription}</p>
                </div>
                <div className="mt-5 border-t border-[var(--border-color)]/60 pt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[var(--muted)] font-medium">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-primary-500" /> {c.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5 text-primary-500" /> {c.modulesCount} modules</span>
                  {c.certificate && <span className="flex items-center gap-1"><Award className="h-3.5 w-3.5 text-primary-500" /> Certificate</span>}
                </div>
              </Card>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

export async function DepartmentsSection({ data }: { data: { heading?: string; subtitle?: string } }) {
  const depts = await prisma.department.findMany({ orderBy: { order: "asc" } });
  return (
    <Section className="bg-[var(--surface-2)] relative overflow-hidden">
      <div className="absolute inset-0 mesh-grid opacity-30 pointer-events-none" />
      <SectionHeader title={data.heading ?? "Career Opportunities Across Multiple Teams"} subtitle={data.subtitle} eyebrow="Teams" eyebrowIcon="users-2" />
      <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-10" stagger={0.04}>
        {depts.map((d) => (
          <RevealItem key={d.id}>
            <div className="flex h-full items-start gap-4 rounded-2xl border border-[var(--border-color)]/80 bg-[var(--surface)] p-6 hover-lift shadow-sm hover:border-primary-500/40 transition-colors">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 dark:bg-slate-900 dark:text-blue-400">
                <Icon name="briefcase" className="h-4.5 w-4.5" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-[var(--fg)] leading-tight">{d.name}</h3>
                {d.description && <p className="mt-2 text-xs text-[var(--muted)] leading-relaxed">{d.description}</p>}
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

export async function TeamSection({ data }: { data: { heading?: string; subtitle?: string } }) {
  const team = await prisma.teamMember.findMany({ where: { visible: true }, orderBy: { order: "asc" } });
  if (team.length === 0) return null;
  return (
    <Section className="relative overflow-hidden">
      <div className="absolute top-[20%] left-[-10%] w-[350px] aspect-square rounded-full bg-blue-500/5 blur-3xl pointer-events-none -z-10" />
      <SectionHeader title={data.heading ?? "Leadership Team"} subtitle={data.subtitle} eyebrow="Our Team" eyebrowIcon="users" />
      <RevealGroup className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
        {team.map((m) => (
          <RevealItem key={m.id}>
            <div className="group flex h-full flex-col items-center rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-7 text-center hover-lift hover:border-primary-500/40">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-xl font-bold text-white shadow-lg border-2 border-white dark:border-slate-950 group-hover:scale-105 transition-transform duration-300">
                {initials(m.name)}
              </span>
              <h3 className="mt-5 text-base font-bold text-[var(--fg)]">{m.name}</h3>
              {m.position && <p className="text-xs font-semibold text-primary-600 mt-1 uppercase tracking-wider">{m.position}</p>}
              {m.bio && <p className="mt-3 text-xs leading-relaxed text-[var(--muted)] border-t border-[var(--border-color)]/50 pt-3 w-full">{m.bio}</p>}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

export function ContactDepartments({ data }: { data: { heading?: string; items?: { title: string; description?: string; icon?: string }[] } }) {
  return (
    <Section className="bg-[var(--surface-2)] relative overflow-hidden">
      <div className="absolute inset-0 mesh-grid opacity-30 pointer-events-none" />
      <SectionHeader title={data.heading ?? "Reach the Right Team"} eyebrow="Departments" eyebrowIcon="users-2" />
      <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-10" stagger={0.05}>
        {(data.items ?? []).map((d) => (
          <RevealItem key={d.title}>
            <div className="flex h-full items-start gap-4 rounded-2xl border border-[var(--border-color)]/80 bg-[var(--surface)] p-6 hover-lift shadow-sm">
              <IconBadge icon={<Icon name={d.icon} className="h-5 w-5" />} className="h-10 w-10 rounded-xl shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-[var(--fg)] leading-tight">{d.title}</h3>
                {d.description && <p className="mt-2 text-xs text-[var(--muted)] leading-relaxed">{d.description}</p>}
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

export async function FeaturedProducts({ data }: { data: { heading?: string; title?: string; description?: string } }) {
  let products = await prisma.product.findMany({
    where: { status: "published", featured: true },
    orderBy: { order: "asc" }
  }).catch(() => []);

  if (products.length === 0) {
    products = await prisma.product.findMany({
      where: { status: "published" },
      take: 3,
      orderBy: { order: "asc" }
    }).catch(() => []);
  }

  return (
    <Section className="relative overflow-hidden bg-white">
      <SectionHeader
        title={data.title ?? "Technology Solutions Designed for Modern Organizations"}
        subtitle={data.description}
        eyebrow={data.heading ?? "PRODUCTS"}
        eyebrowIcon="boxes"
      />
      
      <RevealGroup className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {products.map((p) => {
          const features = parseJson<string[]>(p.features, []);
          return (
            <RevealItem key={p.id}>
              <Card className="flex h-full flex-col justify-between group hover:border-[#18B8AD]/40">
                <div>
                  <IconBadge icon={<Icon name={p.icon} className="h-6 w-6 text-[#18B8AD]" />} />
                  <h3 className="mt-5 text-lg font-bold tracking-tight text-[#071820] font-display">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#68787D]">{p.shortDescription}</p>
                  {features.length > 0 && (
                    <ul className="mt-5 flex flex-col gap-2 border-t border-[#DCE6E7] pt-4">
                      {features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-xs text-[#071820] font-medium">
                          <Icon name="check-circle" className="h-4 w-4 text-[#18B8AD] shrink-0 mt-0.5" /> 
                          <span className="leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <Link href={`/products/${p.slug}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#18B8AD] hover:gap-2.5 transition-all">
                    Explore Product <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Card>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <div className="mt-12 text-center">
        <Button href="/products" variant="secondary" icon="arrow-right" iconRight>
          View All Products
        </Button>
      </div>
    </Section>
  );
}

export async function FeaturedLearning({ data }: { data: { heading?: string; title?: string; description?: string } }) {
  let courses = await prisma.course.findMany({
    where: { status: "published", featured: true },
    orderBy: { order: "asc" },
    include: { category: true }
  }).catch(() => []);

  if (courses.length === 0) {
    courses = await prisma.course.findMany({
      where: { status: "published" },
      take: 3,
      orderBy: { order: "asc" },
      include: { category: true }
    }).catch(() => []);
  }

  return (
    <Section className="bg-[#F7F9F8] relative overflow-hidden">
      <div className="absolute inset-0 mesh-grid opacity-10 pointer-events-none" />
      <SectionHeader
        title={data.title ?? "Empowering Professionals Through Industry-Focused Learning"}
        subtitle={data.description}
        eyebrow={data.heading ?? "PROFESSIONAL LEARNING"}
        eyebrowIcon="graduation-cap"
      />

      <RevealGroup className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {courses.map((c) => (
          <RevealItem key={c.id}>
            <Link href={`/training/${c.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col justify-between group-hover:border-[#18B8AD]/40" hover>
                <div>
                  <div className="mb-5 flex aspect-[16/9] items-center justify-center rounded-2xl bg-[#EEF4F3] border border-[#DCE6E7] text-[#18B8AD] shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 mesh-grid" />
                    <Icon name={c.category?.icon ?? "graduation-cap"} className="h-10 w-10 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center gap-3">
                    {c.category && <span className="text-[10px] font-bold tracking-wider uppercase text-[#18B8AD]">{c.category.name}</span>}
                    {c.level && <span className="text-xs font-semibold text-[#68787D]">{c.level}</span>}
                  </div>
                  <h3 className="mt-3.5 text-lg font-bold leading-snug text-[#071820] transition-colors group-hover:text-[#18B8AD] font-display">{c.title}</h3>
                  <p className="mt-2.5 line-clamp-2 text-sm text-[#68787D] leading-relaxed">{c.shortDescription}</p>
                </div>
                <div className="mt-5 border-t border-[#DCE6E7] pt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#68787D] font-medium">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-[#18B8AD]" /> {c.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5 text-[#18B8AD]" /> {c.modulesCount} modules</span>
                  {c.certificate && <span className="flex items-center gap-1"><Award className="h-3.5 w-3.5 text-[#18B8AD]" /> Certificate</span>}
                </div>
              </Card>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-12 text-center">
        <Button href="/learn" variant="secondary" icon="arrow-right" iconRight>
          Explore All Programs
        </Button>
      </div>
    </Section>
  );
}
