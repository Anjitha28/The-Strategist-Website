import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, BarChart3, ShieldCheck, Target, ArrowLeft } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { LeadForm, type FormFieldDef } from "@/components/site/LeadForm";
import { SITE_CONFIG } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return SITE_CONFIG.products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = SITE_CONFIG.products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} | The Strategist`,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: product.name, description: product.description },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = SITE_CONFIG.products.find((p) => p.slug === slug);
  if (!product) notFound();

  const relatedProducts = SITE_CONFIG.products.filter((p) => p.slug !== slug);

  const demoFields: FormFieldDef[] = [
    { name: "name", label: "Full Name", required: true },
    { name: "email", label: "Work Email", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel", required: true },
    { name: "organization", label: "Organization / Company", required: true },
    { name: "product", label: "Product of Interest", required: true, defaultValue: product.name },
    { name: "message", label: "What are you looking to achieve?", type: "textarea", full: true, required: true },
  ];

  return (
    <>
      <Breadcrumbs items={[{ name: "Products", url: "/products" }, { name: product.name, url: `/products/${product.slug}` }]} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border-color)]/30">
        <div className="aurora absolute inset-0 -z-10 opacity-60" />
        <div className="container-page py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal className="flex flex-col gap-6">
              <span className="w-fit rounded-full bg-[#00b894]/10 border border-[#00b894]/20 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#00a88a]">
                {product.category}
              </span>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{product.name}</h1>
              <p className="text-lg leading-relaxed text-[var(--muted)]">{product.description}</p>
              <div className="flex flex-wrap gap-3">
                <Button href="#demo" size="lg" icon="arrow-right" iconRight>Request a Demo</Button>
                <Button href="/contact" variant="secondary" size="lg">Talk to an Expert</Button>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="flex justify-center">
              <div className="w-full max-w-sm h-72 sm:h-90 rounded-[32px] bg-gradient-to-tr from-[#0a4034] to-[#00b894] shadow-2xl p-8 flex items-center justify-center text-white relative">
                {product.slug === "grade-scope" && <BarChart3 className="h-28 w-28 text-white/90" />}
                {product.slug === "proctrix" && <ShieldCheck className="h-28 w-28 text-white/90" />}
                {product.slug === "beintrack" && <Target className="h-28 w-28 text-white/90" />}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features */}
      {product.features.length > 0 && (
        <Section className="bg-[var(--surface-2)]/40 border-b border-[var(--border-color)]/30">
          <SectionHeader
            title="Key Features"
            subtitle="Everything you need to drive better decisions and outcomes."
            eyebrow="Capabilities"
            eyebrowIcon="star"
          />
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((f, i) => (
              <RevealItem key={i}>
                <div className="flex items-start gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] px-5 py-4 shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00b894]" />
                  <span className="text-sm font-semibold text-[var(--fg)]">{f}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      {/* Demo request */}
      <Section id="demo" className="bg-[var(--surface)]">
        <div className="mx-auto max-w-2xl">
          <Reveal className="mb-8 text-center">
            <span className="mb-2 inline-block rounded-full bg-[#00b894]/10 border border-[#00b894]/20 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#00a88a]">
              GET STARTED
            </span>
            <h2 className="mt-2 text-3xl font-extrabold">Request a Product Demo</h2>
            <p className="mt-3 text-[var(--muted)]">Let us show you how {product.name} can be tailored to your specific needs.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--surface-2)]/40 p-6 sm:p-8 shadow-sm">
              <LeadForm
                formType="product-demo"
                fields={demoFields}
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
        <Section className="bg-[var(--surface-2)]/40 border-t border-[var(--border-color)]/30">
          <h2 className="mb-8 text-2xl font-extrabold text-[var(--fg)]">Other Products</h2>
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <RevealItem key={p.slug}>
                <Link href={`/products/${p.slug}`} className="group block h-full">
                  <Card className="flex h-full flex-col justify-between border border-[var(--border-color)]/60 bg-[var(--surface)]" hover>
                    <div className="flex flex-col gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#00b894]/10">
                        {p.slug === "grade-scope" && <BarChart3 className="h-6 w-6 text-[#00b894]" />}
                        {p.slug === "proctrix" && <ShieldCheck className="h-6 w-6 text-[#00b894]" />}
                        {p.slug === "beintrack" && <Target className="h-6 w-6 text-[#00b894]" />}
                      </div>
                      <h3 className="text-lg font-bold group-hover:text-[#00b894] transition-colors">{p.name}</h3>
                      <p className="text-sm text-[var(--muted)] line-clamp-2">{p.description}</p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#00b894]">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </span>
                  </Card>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      <Section padded={false} className="py-12 text-center border-t border-[var(--border-color)]/30 bg-[var(--surface)]">
        <Button href="/products" variant="secondary" size="md">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to all products
        </Button>
      </Section>
    </>
  );
}
