import { Section, SectionHeader } from "@/components/ui/Section";
import { Card, IconBadge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

type CardData = { title: string; description?: string; icon?: string; features?: string[] };
type Step = { step: number; title: string; description?: string };
type Industry = { name: string; description?: string; icon?: string };

export function Intro({ data }: { data: { heading?: string; paragraphs?: string[] } }) {
  return (
    <Section className="relative overflow-hidden">
      <div className="absolute top-[20%] left-[-10%] w-[350px] aspect-square rounded-full bg-blue-500/8 blur-3xl pointer-events-none -z-10" />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16 items-center">
        <Reveal>
          <div className="relative pl-6 border-l-4 border-gradient">
            <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-[40px] leading-tight text-[var(--fg)]">
              {data.heading}
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-6">
          {(data.paragraphs ?? []).map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              {p}
            </p>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

export function CardsSection({ data }: { data: { heading?: string; subtitle?: string; items?: CardData[] } }) {
  return (
    <Section className="relative">
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] aspect-square rounded-full bg-purple-500/5 blur-3xl pointer-events-none -z-10" />
      <SectionHeader title={data.heading ?? ""} subtitle={data.subtitle} eyebrow="Capabilities" eyebrowIcon="layers" />
      <RevealGroup className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {(data.items ?? []).map((item) => (
          <RevealItem key={item.title}>
            <Card className="h-full group hover:border-primary-500/40 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary-500/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div>
                <IconBadge icon={<Icon name={item.icon} className="h-6 w-6" />} className="group-hover:scale-110 transition-transform" />
                <h3 className="mt-6 text-xl font-bold tracking-tight text-[var(--fg)] group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>
                {item.description && <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.description}</p>}
              </div>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

export function FeaturesSection({ data }: { data: { heading?: string; subtitle?: string; items?: CardData[] } }) {
  return (
    <Section className="bg-[var(--surface-2)] relative overflow-hidden">
      <div className="absolute inset-0 mesh-grid opacity-30 pointer-events-none" />
      <SectionHeader title={data.heading ?? ""} subtitle={data.subtitle} eyebrow="Why Us" eyebrowIcon="badge-check" />
      <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
        {(data.items ?? []).map((item) => (
          <RevealItem key={item.title}>
            <div className="group flex h-full gap-5 rounded-3xl border border-[var(--border-color)]/80 bg-[var(--surface)] p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] hover:border-primary-500/40">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-gradient-to-tr group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white dark:bg-slate-900 dark:text-blue-400 dark:border dark:border-slate-800">
                <Icon name={item.icon} className="h-5.5 w-5.5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-[var(--fg)] group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>
                {item.description && <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.description}</p>}
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

export async function ProcessSection({ data }: { data: { heading?: string; subtitle?: string; items?: Step[] } }) {
  const dbItems = await prisma.strategistApproachStage.findMany({
    where: { visible: true },
    orderBy: { step: "asc" }
  }).catch(() => []);

  const items = dbItems.length > 0
    ? dbItems.map((d) => ({ step: d.step, title: d.title, description: d.description ?? undefined }))
    : (data.items ?? []);

  return (
    <Section className="relative overflow-hidden bg-white">
      <SectionHeader title={data.heading ?? ""} subtitle={data.subtitle} eyebrow="How We Work" eyebrowIcon="workflow" />
      <div className="relative mt-20">
        {/* Desktop connection lines */}
        <div className="absolute left-[10%] right-[10%] top-7 hidden h-0.5 bg-gradient-to-r from-[#18B8AD]/10 via-[#18B8AD]/30 to-[#18B8AD]/10 lg:block -z-10" />
        <RevealGroup
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5"
          stagger={0.12}
        >
          {items.map((s) => (
            <RevealItem key={s.step} className="group">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF4F3] border border-[#DCE6E7] text-lg font-bold text-[#18B8AD] shadow-sm group-hover:scale-110 group-hover:bg-[#18B8AD] group-hover:text-white group-hover:border-transparent transition-all duration-350">
                  {String(s.step).padStart(2, "0")}
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-[#071820] group-hover:text-[#18B8AD] transition-colors">
                  {s.title}
                </h3>
                {s.description && <p className="mt-2.5 text-sm leading-relaxed text-[#68787D]">{s.description}</p>}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}

export async function IndustriesSection({ data }: { data: { heading?: string; subtitle?: string; items?: Industry[] } }) {
  const dbItems = await prisma.strategistIndustry.findMany({
    where: { visible: true },
    orderBy: { order: "asc" }
  }).catch(() => []);

  const items = dbItems.length > 0
    ? dbItems.map((d) => ({ name: d.name, description: d.description ?? undefined, icon: d.icon ?? undefined }))
    : (data.items ?? []);

  return (
    <Section className="bg-[#F7F9F8] relative overflow-hidden">
      <div className="absolute top-[10%] right-[10%] w-[350px] aspect-square rounded-full bg-[#18B8AD]/5 blur-3xl pointer-events-none -z-10" />
      <SectionHeader title={data.heading ?? ""} subtitle={data.subtitle} eyebrow="Industries" eyebrowIcon="building" />
      <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
        {items.map((ind) => (
          <RevealItem key={ind.name}>
            <div className="group flex h-full flex-col justify-between rounded-2xl border border-[#DCE6E7] bg-white p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-md hover:border-[#18B8AD]/40 transition-all duration-300">
              <div>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#EEF4F3] border border-[#DCE6E7] text-[#18B8AD] shadow-sm group-hover:scale-110 transition-transform">
                  <Icon name={ind.icon} className="h-5 w-5" />
                </span>
                <h3 className="text-base font-bold text-[#071820] mt-4 group-hover:text-[#18B8AD] transition-colors">
                  {ind.name}
                </h3>
                {ind.description && <p className="text-xs leading-relaxed text-[#68787D] mt-2">{ind.description}</p>}
              </div>
              <div className="mt-4 flex items-center text-[10px] font-bold text-[#18B8AD] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

export function ServicesSection({ data }: { data: { heading?: string; subtitle?: string; items?: CardData[] } }) {
  return (
    <Section id="services">
      <SectionHeader title={data.heading ?? ""} subtitle={data.subtitle} eyebrow="Services" eyebrowIcon="boxes" />
      <RevealGroup className="mt-16 grid gap-8 lg:grid-cols-2">
        {(data.items ?? []).map((s) => (
          <RevealItem key={s.title}>
            <Card className="h-full flex flex-col justify-between group hover:border-primary-500/40" hover={false}>
              <div>
                <div className="flex items-center gap-4">
                  <IconBadge icon={<Icon name={s.icon} className="h-6 w-6" />} className="group-hover:rotate-6 transition-transform" />
                  <h3 className="text-xl font-bold tracking-tight text-[var(--fg)]">{s.title}</h3>
                </div>
                {s.description && <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{s.description}</p>}
              </div>
              {s.features && s.features.length > 0 && (
                <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 border-t border-[var(--border-color)]/60 pt-5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--fg)]">
                      <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-blue-500 mt-0.5" /> 
                      <span className="leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

export function ChallengesSection({ data }: { data: { heading?: string; subtitle?: string; items?: string[] } }) {
  return (
    <Section className="relative overflow-hidden">
      <div className="absolute top-[20%] left-[-10%] w-[300px] aspect-square rounded-full bg-rose-500/5 blur-3xl pointer-events-none -z-10" />
      <SectionHeader title={data.heading ?? ""} subtitle={data.subtitle} eyebrow="Challenges" eyebrowIcon="target" />
      <RevealGroup className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-2" stagger={0.05}>
        {(data.items ?? []).map((c) => (
          <RevealItem key={c}>
            <div className="flex items-center gap-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] px-6 py-4.5 hover-lift shadow-sm">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-rose-500/8 text-rose-500 dark:bg-rose-950/20 dark:text-rose-400">
                <Icon name="zap" className="h-4.5 w-4.5" />
              </span>
              <span className="text-sm font-semibold text-[var(--fg)]">{c}</span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

export function VisionMission({ data }: { data: { vision?: string; mission?: string } }) {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="stratus relative h-full overflow-hidden rounded-[32px] border border-[var(--border-color)] p-8 sm:p-10 shadow-lg hover-lift">
            <Badge icon="compass" className="bg-blue-50/80 text-blue-700 border border-blue-100">Our Vision</Badge>
            <p className="mt-6 text-xl font-bold leading-relaxed text-[var(--fg)] sm:text-2xl">{data.vision}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative h-full overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 p-8 text-white sm:p-10 shadow-xl hover-lift">
            <div className="absolute inset-0 opacity-20 mesh-grid" />
            <span className="relative z-10 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide border border-white/10">
              <Icon name="target" className="h-3.5 w-3.5 text-blue-200" /> Our Mission
            </span>
            <p className="relative z-10 mt-6 text-xl font-bold leading-relaxed sm:text-2xl">{data.mission}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function PromoSection({ data }: { data: { heading?: string; description?: string; bullets?: string[]; ctaLabel?: string; ctaHref?: string } }) {
  return (
    <Section>
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border border-[var(--border-color)] bg-[var(--surface)] p-8 shadow-xl sm:p-12 md:p-16 hover:border-primary-500/30 transition-colors duration-500">
          <div className="stratus absolute inset-0 -z-10 opacity-30" />
          <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr] relative">
            <div>
              <h2 className="text-3xl font-extrabold text-[var(--fg)] sm:text-4xl leading-tight">
                {data.heading}
              </h2>
              {data.description && <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">{data.description}</p>}
              {data.bullets && (
                <ul className="mt-6 grid gap-3 sm:grid-cols-2 border-t border-[var(--border-color)]/60 pt-6">
                  {data.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-[var(--fg)] font-medium">
                      <CheckCircle2 className="h-4.5 w-4.5 text-blue-500 shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex lg:justify-end">
              {data.ctaLabel && (
                <Button 
                  href={data.ctaHref ?? "/contact"} 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/25"
                  icon="arrow-right" 
                  iconRight
                >
                  {data.ctaLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function CtaSection({ data }: { data: { heading?: string; description?: string; primaryLabel?: string; primaryHref?: string; secondaryLabel?: string; secondaryHref?: string } }) {
  return (
    <Section className="bg-white">
      <Reveal>
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#DDF7F4] to-[#A7E9E3] px-6 py-16 text-center text-[#071820] sm:px-12 sm:py-20 shadow-sm border border-[#DCE6E7]">
          <div className="absolute inset-0 -z-0 opacity-10 mesh-grid" />
          <div className="absolute -top-[30%] -left-[20%] w-[50%] aspect-square rounded-full bg-white/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-[30%] -right-[20%] w-[50%] aspect-square rounded-full bg-white/15 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-[46px] leading-[1.1] tracking-tight text-[#071820] font-display">{data.heading}</h2>
            {data.description && <p className="text-base leading-relaxed text-[#68787D] sm:text-lg">{data.description}</p>}
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {data.primaryLabel && (
                <Button href={data.primaryHref ?? "/contact"} size="lg" variant="primary" icon="arrow-right" iconRight className="font-bold bg-[#071820] text-white hover:bg-[#18B8AD]">
                  {data.primaryLabel}
                </Button>
              )}
              {data.secondaryLabel && (
                <Button href={data.secondaryHref ?? "/contact"} size="lg" variant="secondary" className="bg-transparent border border-[#071820]/30 text-[#071820] hover:bg-white/40 font-bold">
                  {data.secondaryLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function LegalSection({ data }: { data: { blocks?: { heading: string; body: string }[] } }) {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <RevealGroup className="flex flex-col gap-10" stagger={0.06}>
          {(data.blocks ?? []).map((b) => (
            <RevealItem key={b.heading} className="border-b border-[var(--border-color)]/60 pb-8 last:border-none last:pb-0">
              <h2 className="text-xl font-bold text-[var(--fg)] tracking-tight">{b.heading}</h2>
              <p className="mt-3.5 leading-relaxed text-[var(--muted)] text-sm sm:text-base">{b.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}

export async function WhatWeDoSection({ data }: { data: { heading?: string; title?: string; subtitle?: string } }) {
  const services = await prisma.service.findMany({
    where: { status: "published", featured: true },
    orderBy: { order: "asc" }
  }).catch(() => []);

  return (
    <Section className="bg-[#071820] text-white relative overflow-hidden py-20">
      <div className="absolute top-0 right-0 w-[400px] aspect-square rounded-full bg-[#18B8AD]/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[350px] aspect-square rounded-full bg-[#7CE3DA]/5 blur-3xl pointer-events-none -z-10" />
      
      <div className="max-w-3xl mb-16">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#18B8AD]/10 border border-[#18B8AD]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#18B8AD] mb-4">
            <Icon name="layers" className="w-3.5 h-3.5" />
            {data.heading ?? "WHAT WE DO"}
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white font-display">
            {data.title ?? "Solutions that create measurable impact"}
          </h2>
          {data.subtitle && (
            <p className="mt-4 text-base sm:text-lg text-[#9DB1B6] leading-relaxed">
              {data.subtitle}
            </p>
          )}
        </Reveal>
      </div>

      <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((item) => {
          const features: string[] = JSON.parse(item.features || "[]");
          return (
            <RevealItem key={item.id}>
              <div className="group h-full flex flex-col justify-between rounded-3xl border border-[rgba(124,227,218,0.15)] bg-[#0D252C] hover:bg-[#0D252C]/90 p-6.5 transition-all duration-300 hover:border-[#18B8AD]/50 hover:shadow-[0_0_15px_rgba(24,184,173,0.08)]">
                <div>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#18B8AD]/10 border border-[#18B8AD]/20 text-[#18B8AD] group-hover:scale-110 transition-transform">
                    <Icon name={item.icon ?? "layers"} className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg font-bold text-white mt-6 group-hover:text-[#18B8AD] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#9DB1B6] mt-3 line-clamp-3">
                    {item.shortDescription}
                  </p>
                </div>
                {features.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-[rgba(124,227,218,0.1)]">
                    <ul className="space-y-2">
                      {features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-[#9DB1B6]">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#18B8AD]" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}

export function PositioningSection({ data }: { data: { heading?: string; title?: string; description?: string; darkPanelTitle?: string; darkPanelText?: string; lightPanelTitle?: string; lightPanelText?: string } }) {
  return (
    <Section className="relative overflow-hidden bg-white">
      <div className="absolute top-[30%] left-[-5%] w-[350px] aspect-square rounded-full bg-[#18B8AD]/5 blur-3xl pointer-events-none -z-10" />
      
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16 items-start mb-16">
        <Reveal>
          <div className="relative pl-6 border-l-4 border-[#18B8AD]">
            <span className="text-xs font-bold text-[#18B8AD] uppercase tracking-widest block mb-2">{data.heading ?? "WHO WE ARE"}</span>
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-[40px] leading-tight text-[#071820] font-display">
              {data.title}
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base leading-relaxed text-[#68787D] sm:text-lg">
            {data.description}
          </p>
        </Reveal>
      </div>

      <RevealGroup className="grid gap-8 md:grid-cols-2">
        <RevealItem>
          <div className="group h-full rounded-[32px] bg-[#071820] border border-[rgba(124,227,218,0.15)] p-8 sm:p-10 shadow-2xl relative overflow-hidden hover-lift transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#18B8AD]/5 to-transparent rounded-bl-3xl pointer-events-none" />
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#18B8AD]/10 border border-[#18B8AD]/20 text-[#18B8AD] mb-6">
              <Icon name="activity" className="h-6 w-6" />
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {data.darkPanelTitle ?? "From better reports to better decisions."}
            </h3>
            <p className="mt-4 text-[#9DB1B6] text-sm leading-relaxed">
              {data.darkPanelText}
            </p>
          </div>
        </RevealItem>

        <RevealItem>
          <div className="group h-full rounded-[32px] bg-[#F7F9F8] border border-[#DCE6E7] p-8 sm:p-10 shadow-sm relative overflow-hidden hover-lift transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#18B8AD]/5 to-transparent rounded-bl-3xl pointer-events-none" />
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#EEF4F3] border border-[#DCE6E7] text-[#18B8AD] mb-6">
              <Icon name="trending-up" className="h-6 w-6" />
            </span>
            <h3 className="text-2xl font-bold text-[#071820] tracking-tight font-display">
              {data.lightPanelTitle ?? "Designed for sustainable growth."}
            </h3>
            <p className="mt-4 text-[#68787D] text-sm leading-relaxed">
              {data.lightPanelText}
            </p>
          </div>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
