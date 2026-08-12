import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { LeadForm, type FormFieldDef } from "@/components/site/LeadForm";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const services = await prisma.service.findMany({ where: { status: "published" }, select: { slug: true } });
    return services.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) return {};
  return {
    title: service.seoTitle ?? `${service.name} | The Strategist`,
    description: service.seoDescription ?? service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.name, description: service.shortDescription },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!service || service.status !== "published") notFound();

  const features: string[] = JSON.parse(service.features || "[]");

  const relatedServices = await prisma.service.findMany({
    where: { status: "published", id: { not: service.id }, categoryId: service.categoryId ?? undefined },
    take: 3,
    orderBy: { order: "asc" },
  });

  const inquiryFields: FormFieldDef[] = [
    { name: "name", label: "Full Name", required: true },
    { name: "email", label: "Work Email", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "organization", label: "Organization / Company" },
    { name: "service", label: "Service of Interest", required: true },
    { name: "message", label: "Tell us about your project or requirements", type: "textarea", full: true },
  ];

  return (
    <>
      <Breadcrumbs items={[
        { name: "Solutions", url: "/solutions/corporate" },
        { name: service.name, url: `/services/${service.slug}` }
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border-color)]">
        <div className="aurora absolute inset-0 -z-10 opacity-60" />
        <div className="container-page py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="flex flex-col gap-6">
                {service.category && (
                  <span className="w-fit rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
                    {service.category.name}
                  </span>
                )}
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{service.name}</h1>
                <p className="text-lg leading-relaxed text-[var(--muted)]">{service.shortDescription}</p>
                <div className="flex flex-wrap gap-3">
                  <Button href="#enquire" icon="mail" size="lg">Get in Touch</Button>
                  <Button href="/solutions/corporate" variant="secondary" size="lg">All Services</Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex h-72 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,var(--color-primary-500),var(--color-secondary-500))] shadow-2xl lg:h-96">
                <Icon name={service.icon ?? "layers"} className="h-28 w-28 text-white/90" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Description */}
      {service.description && (
        <Section>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="flex flex-col gap-5">
                {service.description.split("\n").filter(Boolean).map((p, i) => (
                  <p key={i} className="text-lg leading-relaxed text-[var(--muted)]">{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </Section>
      )}

      {/* Features */}
      {features.length > 0 && (
        <Section className="bg-[var(--surface-2)]">
          <SectionHeader title="What We Deliver" subtitle="Proven capabilities that produce measurable business outcomes." eyebrow="Deliverables" eyebrowIcon="check-circle" />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <RevealItem key={i}>
                <div className="flex items-start gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] px-5 py-4 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                  <span className="text-sm font-medium text-[var(--fg)]">{f}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      {/* Why The Strategist */}
      <Section>
        <div className="mx-auto max-w-5xl">
          <SectionHeader title="Why The Strategist?" eyebrow="Our Approach" eyebrowIcon="star" />
          <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "target", title: "Strategy-First", desc: "Every engagement starts with understanding your goals before proposing a solution." },
              { icon: "zap", title: "Speed to Value", desc: "Iterative delivery means you see measurable outcomes faster." },
              { icon: "shield", title: "Data Security", desc: "Enterprise-grade security and compliance built into every engagement." },
              { icon: "users", title: "Expert Team", desc: "Cross-functional experts in analytics, technology, and business strategy." },
            ].map((item) => (
              <RevealItem key={item.title}>
                <div className="flex flex-col items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-50 text-primary-700">
                    <Icon name={item.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">{item.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Enquiry Form */}
      <Section id="enquire" className="bg-[var(--surface-2)]">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <div className="mb-8 text-center">
              <span className="mb-2 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">Get Started</span>
              <h2 className="mt-2 text-3xl font-extrabold">Enquire About This Service</h2>
              <p className="mt-3 text-[var(--muted)]">Tell us what you need — our team will respond within 1 business day.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm">
              <LeadForm
                formType="contact"
                fields={inquiryFields.map((f) => f.name === "service" ? { ...f, defaultValue: service.name } : f)}
                submitLabel="Send Enquiry"
                successTitle="Enquiry received"
                successMessage="Our team will review your requirements and get back to you within 1 business day."
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <Section>
          <h2 className="mb-8 text-2xl font-bold">Related Services</h2>
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((s) => (
              <RevealItem key={s.id}>
                <Link href={`/services/${s.slug}`} className="group block h-full">
                  <Card className="flex h-full flex-col gap-4" hover>
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--color-primary-500),var(--color-secondary-500))]">
                      <Icon name={s.icon ?? "layers"} className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-primary-600 transition-colors">{s.name}</h3>
                    <p className="flex-1 text-sm text-[var(--muted)] line-clamp-2">{s.shortDescription}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </span>
                  </Card>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      <Section padded={false} className="py-12 text-center">
        <Button href="/solutions/corporate" variant="secondary" icon="arrow-left">Back to all services</Button>
      </Section>
    </>
  );
}
