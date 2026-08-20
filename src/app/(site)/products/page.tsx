"use client";

import Link from "next/link";

import { BarChart3, ShieldCheck, Target, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SITE_CONFIG } from "@/config/site";

const PROD_ICONS: Record<string, React.ReactNode> = {
  "grade-scope": <BarChart3 className="h-12 w-12 text-[#18b8ad]" />,
  proctrix: <ShieldCheck className="h-12 w-12 text-[#18b8ad]" />,
  beintrack: <Target className="h-12 w-12 text-[#18b8ad]" />,
};

const PROD_COLORS: Record<string, string> = {
  "grade-scope": "from-[#071820] to-[#0f3a35]",
  proctrix: "from-[#071820] to-[#122e3c]",
  beintrack: "from-[#071820] to-[#251838]",
};

export default function ProductsPage() {
  const products = SITE_CONFIG.products;

  return (
    <>
      <Breadcrumbs items={[{ name: "Products", url: "/products" }]} />

      {/* Hero Banner — Exact Selected Brand Theme */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-[#071820]">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-25 pointer-events-none" />

        <div className="container-page relative z-10 text-center">
          <Reveal className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#18b8ad]/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              Proprietary Software Solutions
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl text-white leading-[1.05] tracking-tight font-medium">
              Technology Products<br />
              <span className="italic text-[#18b8ad]">Built for Real Problems</span>
            </h1>
            <p className="text-base leading-relaxed text-[#a1b4b9] max-w-xl">
              Purpose-built platforms designed to solve practical reporting, assessment, and institutional management challenges across education and enterprise.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Products — alternating layout on warm paper background */}
      <Section className="bg-[#f7f9f8] py-24">
        <div className="container-page flex flex-col gap-24 sm:gap-32">
          {products.map((prod, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <Reveal key={prod.slug} className="w-full">
                <div className="grid gap-12 lg:gap-20 lg:grid-cols-12 lg:items-center">

                  {/* Visual Card */}
                  <div className={`lg:col-span-5 ${isEven ? "lg:order-1" : "lg:order-2"} flex justify-center`}>
                    <div
                      className={`relative w-full max-w-sm rounded-3xl bg-gradient-to-br ${PROD_COLORS[prod.slug] ?? "from-[#071820] to-[#112e35]"} shadow-xl p-8 aspect-[4/3] flex flex-col justify-between overflow-hidden`}
                      style={{ border: "1px solid rgba(124,227,218,0.15)" }}
                    >
                      {/* Background glows */}
                      <div className="absolute top-0 right-0 w-48 h-48 glow-teal opacity-30 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 glow-cyan opacity-20 pointer-events-none" />

                      {/* Top badge */}
                      <div className="flex items-start justify-between relative z-10">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#a1b4b9] rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                          {prod.category}
                        </span>
                        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#18b8ad]/15 border border-[#18b8ad]/30">
                          {PROD_ICONS[prod.slug]}
                        </div>
                      </div>

                      {/* Product name */}
                      <div className="relative z-10">
                        <div className="text-3xl font-black text-white font-display">{prod.name}</div>
                        <div className="mt-2 h-1 w-16 rounded-full bg-[#18b8ad]" />
                      </div>

                      {/* Grid lines decoration */}
                      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"} flex flex-col gap-6`}>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                      {prod.category}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#071820] font-medium leading-tight">
                      {prod.name}
                    </h2>
                    <p className="text-sm text-[#68787d] leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Feature bullets */}
                    <RevealGroup className="grid gap-3 sm:grid-cols-2 mt-1">
                      {prod.features.map((feat) => (
                        <RevealItem key={feat}>
                          <div className="flex items-start gap-2.5 text-xs text-[#46575c] font-bold">
                            <CheckCircle2 className="h-4 w-4 text-[#18b8ad] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        </RevealItem>
                      ))}
                    </RevealGroup>

                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      <Link
                        href={`/products/${prod.slug}`}
                        className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:opacity-90"
                        style={{
                          background: "#071820",
                          color: "#fff",
                          padding: "12px 20px",
                          fontSize: 11,
                          fontWeight: 850
                        }}
                      >
                        Request Demo & Details <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        href={`/contact?service=Products&product=${prod.name}#form`}
                        className="inline-flex items-center gap-2 rounded-full font-bold border transition-colors hover:bg-black/5"
                        style={{
                          borderColor: "#dce6e7",
                          color: "#071820",
                          padding: "12px 20px",
                          fontSize: 11,
                          fontWeight: 850
                        }}
                      >
                        Enquire About {prod.name}
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Products Final CTA — dark */}
      <section className="relative overflow-hidden bg-[#071820] py-24 text-center">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 glow-teal opacity-25" />
        <div className="container-page relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium leading-tight">
              Have a Reporting or<br />Management Challenge?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base text-[#a1b4b9] leading-relaxed">
              Our platforms are designed around practical organizational needs. Talk to us about your requirements.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <a
              href="/contact?service=Products"
              className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:opacity-90 shadow-md"
              style={{
                background: "#18b8ad",
                color: "#071820",
                padding: "13px 22px",
                fontSize: 11,
                fontWeight: 850
              }}
            >
              Request a Product Demo <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
