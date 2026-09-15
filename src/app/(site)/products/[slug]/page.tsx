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

function findProduct(slug: string) {
  const normalizedSlug = slug === "proctrix" ? "protrix" : slug;
  return SITE_CONFIG.products.find((p) => p.slug === normalizedSlug) || SITE_CONFIG.products.find((p) => p.slug === slug);
}

export async function generateStaticParams() {
  const slugs = new Set([...SITE_CONFIG.products.map((p) => p.slug), "protrix", "proctrix"]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
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
  const product = findProduct(slug);
  if (!product) notFound();

  const relatedProducts = SITE_CONFIG.products.filter((p) => p.slug !== product.slug);

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

      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-white border-b border-[#dce6e7]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-20 pointer-events-none" />

        <div className="container-page relative z-10">
          <Link
            href="/products"
            className="inline-flex items-center text-xs font-bold text-[#56666b] hover:text-[#18b8ad] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Products</span>
          </Link>

          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-7 flex flex-col gap-5">
              <span className="w-fit rounded-full bg-[#e7f6f4] border border-[#18b8ad]/30 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#159f95]">
                {product.category}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#071820] leading-[1.08] tracking-tight font-sans">
                {product.name}
              </h1>
              {product.tagline && (
                <p className="text-xl font-bold text-[#18b8ad]">
                  {product.tagline}
                </p>
              )}
              <p className="text-lg leading-relaxed text-[#56666b] max-w-2xl font-medium">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#demo"
                  className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-sm px-7 py-3.5 text-sm"
                >
                  Request Demo <ArrowRight className="h-4 w-4 text-[#18b8ad]" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[#dce6ee] bg-[#F1F6FA] px-7 py-3.5 text-sm font-bold text-[#071820] hover:border-[#18b8ad] hover:text-[#18b8ad] transition-all"
                >
                  Talk to an Expert
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md h-72 sm:h-80 rounded-3xl bg-gradient-to-br from-[#071820] to-[#0f3a35] shadow-xl p-8 flex flex-col items-center justify-center text-white relative border border-[#18b8ad]/30 overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 glow-teal opacity-30 pointer-events-none" />
                <div className="grid place-items-center mb-4 relative z-10">
                  {product.slug === "grade-scope" && <BarChart3 className="h-24 w-24 text-[#18b8ad]" />}
                  {(product.slug === "protrix" || product.slug === "proctrix") && <ShieldCheck className="h-24 w-24 text-[#18b8ad]" />}
                  {product.slug === "beintrack" && <Target className="h-24 w-24 text-[#18b8ad]" />}
                </div>
                <div className="text-xl font-black text-white relative z-10">{product.name}</div>
                <span className="text-xs text-[#a1b4b9] uppercase tracking-wider font-semibold mt-1 relative z-10">Enterprise Edition</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Main Details & Capabilities Section */}
      <Section className="bg-[#F1F6FA] py-24 border-b border-[#dce6e7]">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left 7 Cols: Platform Capabilities */}
            <div className="lg:col-span-7 space-y-10">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad] block mb-3">
                  Capabilities
                </span>
                <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#071820] tracking-tight mb-6">
                  Platform Capabilities
                </h2>
                <div className="grid gap-4">
                  {product.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-2xl border border-[#dce6ee] bg-white p-5 shadow-xs hover:shadow-md hover:border-[#18b8ad]/40 transition-all duration-300"
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#18b8ad] mt-0.5" />
                      <span className="text-base font-bold text-[#071820]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Sidebar Demo Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="relative overflow-hidden bg-white rounded-3xl border border-[#dce6ee] p-8 sm:p-10 shadow-md border-l-4 border-l-[#18b8ad]">
                <div className="w-12 h-12 rounded-2xl bg-[#e7f6f4] border border-[#18b8ad]/30 grid place-items-center text-[#18b8ad] mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                
                <h3 className="text-2xl font-bold text-[#071820] font-sans mb-3">
                  Request a Product Demonstration
                </h3>
                <p className="text-sm text-[#56666b] leading-relaxed mb-6 font-medium">
                  Connect with our product specialists to schedule an interactive video walkthrough of {product.name} and see how it fits your organization.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Custom setup configured for your institutional course structure",
                    "Integration audits and administrative sandbox environment",
                    "Free consultation for college and enterprise leadership"
                  ].map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs text-[#56666b] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#18b8ad] shrink-0 mt-1.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#demo"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#071820] text-white py-4 px-6 text-sm font-bold shadow-md hover:bg-[#0d2f3a] transition-all"
                >
                  <span>Schedule Demo Below</span>
                  <ArrowRight className="w-4 h-4 text-[#18b8ad]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Demo request form section */}
      <Section id="demo" className="bg-white py-24 border-b border-[#dce6e7]">
        <div className="container-page max-w-3xl mx-auto">
          <Reveal className="mb-10 text-center">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad] block mb-3">
              GET STARTED
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#071820] tracking-tight">
              Request a Product Demo
            </h2>
            <p className="mt-3 text-base text-[#56666b]">
              Let us show you how {product.name} can be tailored to your specific organizational needs.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-[#dce6ee] bg-[#F1F6FA] p-8 sm:p-10 shadow-xs">
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
        <Section className="bg-[#F1F6FA] py-20 border-b border-[#dce6e7]">
          <div className="container-page">
            <h2 className="mb-10 text-2xl sm:text-3xl font-extrabold text-[#071820] font-sans text-center sm:text-left">
              Other Products
            </h2>
            <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {relatedProducts.map((p) => (
                <RevealItem key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="group block h-full">
                    <div className="flex h-full flex-col justify-between p-7 rounded-2xl border border-[#dce6ee] bg-white shadow-xs hover:shadow-md hover:border-[#18b8ad]/40 transition-all duration-300">
                      <div>
                        <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#e7f6f4] text-[#18b8ad] mb-4">
                          {p.slug === "grade-scope" && <BarChart3 className="h-6 w-6" />}
                          {(p.slug === "protrix" || p.slug === "proctrix") && <ShieldCheck className="h-6 w-6" />}
                          {p.slug === "beintrack" && <Target className="h-6 w-6" />}
                        </div>
                        <h3 className="text-xl font-bold text-[#071820] group-hover:text-[#18b8ad] transition-colors">{p.name}</h3>
                        <p className="text-sm text-[#56666b] mt-2 line-clamp-2 leading-relaxed">{p.description}</p>
                      </div>
                      <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#18b8ad] group-hover:gap-2.5 transition-all">
                        Request Demo &amp; Details <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Section>
      )}

      <Section padded={false} className="py-12 text-center bg-white">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-full border border-[#dce6ee] bg-[#F1F6FA] px-6 py-3 text-xs font-bold text-[#071820] hover:border-[#18b8ad] hover:text-[#18b8ad] transition-all"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to all products
        </Link>
      </Section>
    </>
  );
}
