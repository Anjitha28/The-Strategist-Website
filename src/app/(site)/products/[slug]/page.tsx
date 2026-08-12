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
import { CheckCircle2, ArrowRight, Star } from "lucide-react";
import { LeadForm, type FormFieldDef } from "@/components/site/LeadForm";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({ where: { status: "published" }, select: { slug: true } });
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return {};
  return {
    title: product.seoTitle ?? `${product.name} | The Strategist`,
    description: product.seoDescription ?? product.shortDescription,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: product.name, description: product.shortDescription },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!product || product.status !== "published") notFound();

  const features: string[] = JSON.parse(product.features || "[]");
  const gallery: string[] = JSON.parse(product.gallery || "[]");

  const relatedProducts = await prisma.product.findMany({
    where: { status: "published", id: { not: product.id }, categoryId: product.categoryId ?? undefined },
    take: 3,
    orderBy: { order: "asc" },
  });

  const demoFields: FormFieldDef[] = [
    { name: "name", label: "Full Name", required: true },
    { name: "email", label: "Work Email", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "organization", label: "Organization / Company" },
    { name: "product", label: "Product of Interest", required: true },
    { name: "message", label: "What are you looking to achieve?", type: "textarea", full: true },
  ];

  return (
    <>
      <Breadcrumbs items={[{ name: "Products", url: "/products" }, { name: product.name, url: `/products/${product.slug}` }]} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border-color)]">
        <div className="aurora absolute inset-0 -z-10 opacity-60" />
        <div className="container-page py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="flex flex-col gap-6">
                {product.category && (
                  <span className="w-fit rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
                    {product.category.name}
                  </span>
                )}
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{product.name}</h1>
                <p className="text-lg leading-relaxed text-[var(--muted)]">{product.shortDescription}</p>
                <div className="flex flex-wrap gap-3">
                  <Button href="#demo" icon="calendar" size="lg">Request a Demo</Button>
                  <Button href="/contact" variant="secondary" size="lg">Talk to an Expert</Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex h-72 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,var(--color-primary-500),var(--color-secondary-500))] shadow-2xl lg:h-96">
                <Icon name={product.icon ?? "box"} className="h-28 w-28 text-white/90" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Description */}
      {product.description && (
        <Section>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="prose prose-lg max-w-none text-[var(--fg)]">
                {product.description.split("\n").filter(Boolean).map((p, i) => (
                  <p key={i} className="leading-relaxed text-[var(--muted)]">{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </Section>
      )}

      {/* Features */}
      {features.length > 0 && (
        <Section className="bg-[var(--surface-2)]">
          <SectionHeader title="Key Features" subtitle="Everything you need to drive better decisions and outcomes." eyebrow="Capabilities" eyebrowIcon="star" />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <RevealItem key={i}>
                <div className="flex items-start gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] px-5 py-4 shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                  <span className="text-sm font-medium text-[var(--fg)]">{f}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      {/* Gallery placeholder */}
      {gallery.length > 0 && (
        <Section>
          <SectionHeader title="Screenshots & Gallery" eyebrow="Preview" eyebrowIcon="image" />
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((src, i) => (
              <RevealItem key={i}>
                <div className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--surface-2)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${product.name} screenshot ${i + 1}`} className="w-full object-cover" />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      {/* Demo request */}
      <Section id="demo" className="bg-[var(--surface-2)]">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <div className="mb-8 text-center">
              <span className="mb-2 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">Get Started</span>
              <h2 className="mt-2 text-3xl font-extrabold">Request a Product Demo</h2>
              <p className="mt-3 text-[var(--muted)]">Let us show you how {product.name} can be tailored to your specific needs.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm">
              <LeadForm
                formType="product-demo"
                fields={demoFields.map((f) => f.name === "product" ? { ...f, defaultValue: product.name } : f)}
                submitLabel="Request Demo"
                successTitle="Demo request received"
                successMessage="Our product team will reach out within 1 business day to schedule your personalized demonstration."
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Section>
          <h2 className="mb-8 text-2xl font-bold">Related Products</h2>
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <RevealItem key={p.id}>
                <Link href={`/products/${p.slug}`} className="group block h-full">
                  <Card className="flex h-full flex-col gap-4" hover>
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--color-primary-500),var(--color-secondary-500))]">
                      <Icon name={p.icon ?? "box"} className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-primary-600 transition-colors">{p.name}</h3>
                    <p className="flex-1 text-sm text-[var(--muted)] line-clamp-2">{p.shortDescription}</p>
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
        <Button href="/products" variant="secondary" icon="arrow-left">Back to all products</Button>
      </Section>
    </>
  );
}
