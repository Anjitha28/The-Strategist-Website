import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowLeft, Clock, Award, BookOpen, Keyboard } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { LeadForm, type FormFieldDef } from "@/components/site/LeadForm";
import { SITE_CONFIG } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return SITE_CONFIG.training.courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = SITE_CONFIG.training.courses.find((c) => c.slug === slug);
  if (!course) return {};
  return {
    title: `${course.title} | Learning Program`,
    description: course.overview,
    alternates: { canonical: `/training/${course.slug}` },
    openGraph: { title: course.title, description: course.overview },
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = SITE_CONFIG.training.courses.find((c) => c.slug === slug);

  if (!course) notFound();

  const objectives = course.learningObjectives;
  const curriculum = course.modules;

  const enquiryFields: FormFieldDef[] = [
    { name: "name", label: "Full Name", required: true },
    { name: "email", label: "Work Email", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel", required: true },
    { name: "organization", label: "Organization / Institution", required: true },
    { name: "program", label: "Program of Interest", required: true, defaultValue: course.title },
    { name: "message", label: "Please share any specific goals or requirements", type: "textarea", full: true, required: true },
  ];

  return (
    <>
      <Breadcrumbs items={[{ name: "Training", url: "/training" }, { name: course.title, url: `/training/${course.slug}` }]} />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--border-color)]/30">
        <div className="aurora absolute inset-0 -z-10 opacity-60" />
        <div className="container-page py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal className="flex flex-col gap-6">
              <span className="w-fit rounded-full bg-[#00b894]/10 border border-[#00b894]/20 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#00a88a]">
                COURSE OUTLINE
              </span>
              <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl text-[var(--fg)] font-display">
                {course.title}
              </h1>
              <p className="text-lg leading-relaxed text-[var(--muted)]">{course.overview}</p>
              
              {/* Meta details */}
              <div className="grid grid-cols-2 gap-4 border-t border-[var(--border-color)]/50 pt-6 mt-2 max-w-md">
                <div className="flex items-center gap-2.5 text-sm text-[var(--fg)] font-medium">
                  <Clock className="h-5 w-5 text-[#00b894] shrink-0" />
                  <div>
                    <p className="text-xs text-[var(--muted)]">Duration</p>
                    <p className="text-[var(--fg)] font-bold">{course.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[var(--fg)] font-medium">
                  <BookOpen className="h-5 w-5 text-[#00b894] shrink-0" />
                  <div>
                    <p className="text-xs text-[var(--muted)]">Curriculum</p>
                    <p className="text-[var(--fg)] font-bold">{curriculum.length} Modules</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[var(--fg)] font-medium">
                  <Award className="h-5 w-5 text-[#00b894] shrink-0" />
                  <div>
                    <p className="text-xs text-[var(--muted)]">Certification</p>
                    <p className="text-[var(--fg)] font-bold">{course.certification ? "Included" : "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[var(--fg)] font-medium">
                  <Keyboard className="h-5 w-5 text-[#00b894] shrink-0" />
                  <div>
                    <p className="text-xs text-[var(--muted)]">Prerequisites</p>
                    <p className="text-[var(--fg)] font-bold truncate max-w-[160px]">{course.prerequisites}</p>
                  </div>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.15} className="flex justify-center">
              <div className="w-full max-w-sm h-64 sm:h-80 rounded-[32px] bg-gradient-to-tr from-[#0a4034] to-[#00b894] shadow-md flex items-center justify-center text-white">
                <BookOpen className="h-24 w-24 text-white/95" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Main Details and Sidebar split */}
      <Section className="bg-[var(--surface)]">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Main Info */}
          <div className="flex flex-col gap-10">
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[var(--fg)]">Who This Course Is For</h2>
              <p className="text-base leading-relaxed text-[var(--muted)] mt-3">
                {course.whoItIsFor}
              </p>
            </div>

            {/* Learning Outcomes */}
            {objectives.length > 0 && (
              <div className="border-t border-[var(--border-color)]/50 pt-8">
                <h3 className="text-xl font-bold tracking-tight text-[var(--fg)] font-display">What You&apos;ll Learn</h3>
                <RevealGroup className="mt-4 grid gap-4 sm:grid-cols-2" stagger={0.05}>
                  {objectives.map((obj, i) => (
                    <RevealItem key={i}>
                      <div className="flex items-start gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--surface-2)]/40 px-5 py-4 shadow-sm h-full">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00b894]" />
                        <span className="text-sm font-semibold text-[var(--fg)] leading-snug">{obj}</span>
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            )}

            {/* Tools Covered & Practical Projects */}
            <div className="grid gap-6 sm:grid-cols-2 border-t border-[var(--border-color)]/50 pt-8">
              <div>
                <h3 className="text-lg font-bold text-[var(--fg)] font-display">Tools Covered</h3>
                <div className="flex flex-wrap gap-2 mt-4">
                  {course.toolsCovered.map((tool) => (
                    <span key={tool} className="inline-block rounded-full bg-[var(--surface-2)] border border-[var(--border-color)] px-4 py-1.5 text-xs font-semibold text-[var(--fg)]">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--fg)] font-display">Practical Projects</h3>
                <ul className="mt-4 space-y-3">
                  {course.projects.map((proj, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--muted)] leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00b894]" />
                      <span>{proj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Curriculum */}
            {curriculum.length > 0 && (
              <div className="border-t border-[var(--border-color)]/50 pt-8">
                <h3 className="text-xl font-bold tracking-tight text-[var(--fg)] mb-6 font-display">Program Curriculum</h3>
                <div className="flex flex-col gap-4">
                  {curriculum.map((module, i) => (
                    <Card key={i} className="p-6 border border-[var(--border-color)]/60 bg-[var(--surface-2)]/20">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-xs font-bold text-[#00b894] uppercase tracking-wide">Module {i + 1}</span>
                          <h4 className="text-base font-bold text-[var(--fg)] mt-1 font-display">{module.title}</h4>
                        </div>
                        <span className="rounded-full bg-[var(--surface)] border border-[var(--border-color)] px-3 py-1 text-xs font-semibold text-[var(--muted)]">
                          {module.topics.length} topics
                        </span>
                      </div>
                      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 border-t border-[var(--border-color)]/50 pt-4">
                        {module.topics.map((topic, j) => (
                          <li key={j} className="flex items-center gap-2 text-xs text-[var(--muted)] font-semibold">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00b894]/60" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* FAQs */}
            {course.faqs.length > 0 && (
              <div className="border-t border-[var(--border-color)]/50 pt-8">
                <h3 className="text-xl font-bold tracking-tight text-[var(--fg)] mb-6 font-display">Frequently Asked Questions</h3>
                <div className="flex flex-col gap-4">
                  {course.faqs.map((faq, i) => (
                    <div key={i} className="border-b border-[var(--border-color)]/30 pb-4 last:border-0">
                      <h4 className="text-sm font-bold text-[var(--fg)] leading-relaxed">{faq.q}</h4>
                      <p className="text-xs text-[var(--muted)] leading-relaxed mt-1.5">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Enquiry Sidebar */}
          <div>
            <div className="sticky top-24 rounded-3xl border border-[var(--border-color)] bg-[var(--surface-2)]/40 p-6 sm:p-8 shadow-sm">
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
      <Section padded={false} className="py-12 text-center border-t border-[var(--border-color)]/40 bg-[var(--surface-2)]/10">
        <Button href="/training" variant="secondary" size="md">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to all programs
        </Button>
      </Section>
    </>
  );
}
