import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CheckCircle2, ArrowLeft, Clock, Award, BookOpen, User, Languages } from "lucide-react";
import { LeadForm, type FormFieldDef } from "@/components/site/LeadForm";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const courses = await prisma.course.findMany({ where: { status: "published" }, select: { slug: true } });
    return courses.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) return {};
  return {
    title: course.seoTitle ?? `${course.title} | Learning Program`,
    description: course.seoDescription ?? course.shortDescription,
    alternates: { canonical: `/training/${course.slug}` },
    openGraph: { title: course.title, description: course.shortDescription },
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!course || course.status !== "published") notFound();

  // Helper to safely parse JSON strings
  const parseJson = <T,>(val: string, fallback: T): T => {
    try {
      return val ? JSON.parse(val) : fallback;
    } catch {
      return fallback;
    }
  };

  const objectives = parseJson<string[]>(course.objectives, []);
  const audience = parseJson<string[]>(course.audience, []);
  const prerequisites = parseJson<string[]>(course.prerequisites, []);
  const curriculum = parseJson<{ title: string; lessons?: string[] }[]>(course.curriculum, []);

  const enquiryFields: FormFieldDef[] = [
    { name: "name", label: "Full Name", required: true },
    { name: "email", label: "Work Email", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "organization", label: "Organization / Institution" },
    { name: "program", label: "Program of Interest", required: true, defaultValue: course.title },
    { name: "message", label: "Please share any specific goals or requirements", type: "textarea", full: true },
  ];

  return (
    <>
      <Breadcrumbs items={[{ name: "Learn", url: "/learn" }, { name: course.title, url: `/training/${course.slug}` }]} />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--border-color)]">
        <div className="aurora absolute inset-0 -z-10 opacity-60" />
        <div className="container-page py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal>
              <div className="flex flex-col gap-6">
                {course.category && (
                  <span className="w-fit rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
                    {course.category.name}
                  </span>
                )}
                <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl">{course.title}</h1>
                <p className="text-lg leading-relaxed text-[var(--muted)]">{course.shortDescription}</p>
                
                {/* Meta details */}
                <div className="grid grid-cols-2 gap-4 border-t border-[var(--border-color)]/60 pt-6 mt-2 max-w-md">
                  <div className="flex items-center gap-2.5 text-sm text-[var(--fg)] font-medium">
                    <Clock className="h-5 w-5 text-primary-600 shrink-0" />
                    <div>
                      <p className="text-xs text-[var(--muted)]">Duration</p>
                      <p className="text-slate-900 font-semibold">{course.duration || "Self-Paced"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-[var(--fg)] font-medium">
                    <BookOpen className="h-5 w-5 text-primary-600 shrink-0" />
                    <div>
                      <p className="text-xs text-[var(--muted)]">Curriculum</p>
                      <p className="text-slate-900 font-semibold">{course.modulesCount || curriculum.length} Modules</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-[var(--fg)] font-medium">
                    <Award className="h-5 w-5 text-primary-600 shrink-0" />
                    <div>
                      <p className="text-xs text-[var(--muted)]">Certification</p>
                      <p className="text-slate-900 font-semibold">{course.certificate ? "Certificate Included" : "Certificate Optional"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-[var(--fg)] font-medium">
                    <Languages className="h-5 w-5 text-primary-600 shrink-0" />
                    <div>
                      <p className="text-xs text-[var(--muted)]">Language</p>
                      <p className="text-slate-900 font-semibold">{course.language || "English"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex aspect-[16/10] items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 shadow-2xl text-white">
                <Icon name={course.category?.icon ?? "graduation-cap"} className="h-28 w-28 text-white/95" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Main Details and Sidebar split */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Main Info */}
          <div className="flex flex-col gap-10">
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[var(--fg)]">Program Overview</h2>
              <div className="prose prose-lg max-w-none text-[var(--fg)] mt-4">
                {course.description.split("\n").filter(Boolean).map((p, i) => (
                  <p key={i} className="leading-relaxed text-[var(--muted)] mb-4">{p}</p>
                ))}
              </div>
            </div>

            {/* Learning Outcomes */}
            {objectives.length > 0 && (
              <div className="border-t border-[var(--border-color)]/60 pt-8">
                <h3 className="text-xl font-bold tracking-tight text-[var(--fg)]">What You'll Learn</h3>
                <RevealGroup className="mt-4 grid gap-4 sm:grid-cols-2" stagger={0.05}>
                  {objectives.map((obj, i) => (
                    <RevealItem key={i}>
                      <div className="flex items-start gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] px-5 py-4 shadow-sm h-full">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                        <span className="text-sm font-medium text-[var(--fg)] leading-snug">{obj}</span>
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            )}

            {/* Target Audience & Prerequisites */}
            {(audience.length > 0 || prerequisites.length > 0) && (
              <div className="grid gap-6 sm:grid-cols-2 border-t border-[var(--border-color)]/60 pt-8">
                {audience.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-[var(--fg)]">Who This Is For</h3>
                    <ul className="mt-4 space-y-3">
                      {audience.map((aud, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary-600" />
                          <span>{aud}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {prerequisites.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-[var(--fg)]">Prerequisites</h3>
                    <ul className="mt-4 space-y-3">
                      {prerequisites.map((pre, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                          <span>{pre}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Curriculum */}
            {curriculum.length > 0 && (
              <div className="border-t border-[var(--border-color)]/60 pt-8">
                <h3 className="text-xl font-bold tracking-tight text-[var(--fg)] mb-6">Program Curriculum</h3>
                <div className="flex flex-col gap-4">
                  {curriculum.map((module, i) => (
                    <Card key={i} className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-xs font-bold text-primary-600 uppercase tracking-wide">Module {i + 1}</span>
                          <h4 className="text-lg font-bold text-[var(--fg)] mt-1">{module.title}</h4>
                        </div>
                        {module.lessons && (
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                            {module.lessons.length} topics
                          </span>
                        )}
                      </div>
                      {module.lessons && module.lessons.length > 0 && (
                        <ul className="mt-4 grid gap-2 sm:grid-cols-2 border-t border-[var(--border-color)]/50 pt-4">
                          {module.lessons.map((lesson, j) => (
                            <li key={j} className="flex items-center gap-2.5 text-xs text-[var(--muted)]">
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                              <span>{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Enquiry Sidebar */}
          <div>
            <div className="sticky top-24 rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-6 sm:p-8 shadow-xl">
              <h3 className="text-xl font-bold text-[var(--fg)]">Enquire About Program</h3>
              <p className="mt-2 text-xs text-[var(--muted)] leading-relaxed mb-6">
                Register interest or request details for your team. Our training advisor will contact you within 1 business day.
              </p>
              
              <LeadForm
                formType="consultation"
                fields={enquiryFields}
                submitLabel="Send Enquiry"
                successTitle="Enquiry Received"
                successMessage="Thank you for your interest! We will get in touch with you shortly to discuss program options, schedules, and custom packages."
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Back CTA */}
      <Section padded={false} className="py-12 text-center border-t border-[var(--border-color)]/40">
        <Button href="/learn" variant="secondary" icon="arrow-left">
          Back to all programs
        </Button>
      </Section>
    </>
  );
}
