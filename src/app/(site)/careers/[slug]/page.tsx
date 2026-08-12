import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CheckCircle2, MapPin, Briefcase, Clock, DollarSign } from "lucide-react";
import { LeadForm, type FormFieldDef } from "@/components/site/LeadForm";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const jobs = await prisma.jobOpening.findMany({ where: { status: "open" }, select: { slug: true } });
    return jobs.map((j) => ({ slug: j.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await prisma.jobOpening.findUnique({ where: { slug }, include: { department: true } });
  if (!job) return {};
  return {
    title: `${job.title} | Careers at The Strategist`,
    description: job.description.slice(0, 160),
    alternates: { canonical: `/careers/${job.slug}` },
    openGraph: { title: job.title, description: job.description.slice(0, 160) },
  };
}

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = await prisma.jobOpening.findUnique({
    where: { slug },
    include: { department: true },
  });
  if (!job || job.status !== "open") notFound();

  const responsibilities: string[] = JSON.parse(job.responsibilities || "[]");
  const qualifications: string[] = JSON.parse(job.qualifications || "[]");
  const skills: string[] = JSON.parse(job.skills || "[]");

  const applyFields: FormFieldDef[] = [
    { name: "name", label: "Full Name", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "position", label: "Position Applying For", required: true },
    { name: "experience", label: "Years of Experience" },
    { name: "currentLocation", label: "Current Location" },
    { name: "portfolio", label: "Portfolio / LinkedIn URL", full: true },
    { name: "coverLetter", label: "Cover Letter / Why do you want to join us?", type: "textarea", full: true },
  ];

  return (
    <>
      <Breadcrumbs items={[{ name: "Careers", url: "/careers" }, { name: job.title, url: `/careers/${job.slug}` }]} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border-color)]">
        <div className="aurora absolute inset-0 -z-10 opacity-60" />
        <div className="container-page py-14 sm:py-16">
          <Reveal className="mx-auto max-w-3xl flex flex-col gap-5">
            {job.department && (
              <span className="w-fit rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
                {job.department.name}
              </span>
            )}
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">{job.title}</h1>
            <div className="flex flex-wrap gap-5 text-sm text-[var(--muted)]">
              {job.location && <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>}
              <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.employmentType}</span>
              {job.experience && <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {job.experience}</span>}
              {job.salary && <span className="flex items-center gap-1.5"><DollarSign className="h-4 w-4" /> {job.salary}</span>}
            </div>
            <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg">{job.description}</p>
            <Button href="#apply" icon="send" size="lg">Apply for this Role</Button>
          </Reveal>
        </div>
      </section>

      <div className="container-page py-12">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_360px]">

          {/* Main content */}
          <div className="flex flex-col gap-10">
            {responsibilities.length > 0 && (
              <Reveal>
                <div>
                  <h2 className="mb-5 text-2xl font-bold">Key Responsibilities</h2>
                  <ul className="flex flex-col gap-3">
                    {responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--fg)]">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {qualifications.length > 0 && (
              <Reveal>
                <div>
                  <h2 className="mb-5 text-2xl font-bold">Qualifications & Requirements</h2>
                  <ul className="flex flex-col gap-3">
                    {qualifications.map((q, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--fg)]">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {skills.length > 0 && (
              <Reveal>
                <div>
                  <h2 className="mb-5 text-2xl font-bold">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s) => (
                      <span key={s} className="rounded-full bg-[var(--surface-2)] border border-[var(--border-color)] px-3 py-1.5 text-sm font-medium text-[var(--fg)]">{s}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <Reveal>
              <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">Job Summary</h3>
                <dl className="flex flex-col gap-3 text-sm">
                  {job.department && (
                    <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                      <dt className="text-[var(--muted)]">Department</dt>
                      <dd className="font-medium">{job.department.name}</dd>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                    <dt className="text-[var(--muted)]">Type</dt>
                    <dd className="font-medium">{job.employmentType}</dd>
                  </div>
                  {job.location && (
                    <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                      <dt className="text-[var(--muted)]">Location</dt>
                      <dd className="font-medium">{job.location}</dd>
                    </div>
                  )}
                  {job.experience && (
                    <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                      <dt className="text-[var(--muted)]">Experience</dt>
                      <dd className="font-medium">{job.experience}</dd>
                    </div>
                  )}
                  {job.salary && (
                    <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                      <dt className="text-[var(--muted)]">Salary</dt>
                      <dd className="font-medium">{job.salary}</dd>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <dt className="text-[var(--muted)]">Posted</dt>
                    <dd className="font-medium">{formatDate(job.postedAt)}</dd>
                  </div>
                </dl>
                <Button href="#apply" className="mt-6 w-full" icon="send">Apply Now</Button>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>

      {/* Application form */}
      <Section id="apply" className="bg-[var(--surface-2)]">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <div className="mb-8 text-center">
              <span className="mb-2 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">Apply</span>
              <h2 className="mt-2 text-3xl font-extrabold">Submit Your Application</h2>
              <p className="mt-3 text-[var(--muted)]">Complete the form below and our recruitment team will review your profile.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm">
              <LeadForm
                formType="career"
                fields={applyFields.map((f) => f.name === "position" ? { ...f, defaultValue: job.title } : f)}
                submitLabel="Submit Application"
                successTitle="Application received"
                successMessage="Thank you for applying. Our recruitment team will review your profile and reach out if there's a great match."
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section padded={false} className="py-12 text-center">
        <Button href="/careers" variant="secondary" icon="arrow-left">View all open positions</Button>
      </Section>
    </>
  );
}
