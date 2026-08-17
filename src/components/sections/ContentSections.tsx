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
    <Section className="relative overflow-hidden">
      <SectionHeader title={data.heading ?? ""} subtitle={data.subtitle} eyebrow="How We Work" eyebrowIcon="workflow" />
      <div className="relative mt-20">
        {/* Desktop connection lines */}
        <div className="absolute left-[10%] right-[10%] top-7 hidden h-0.5 bg-gradient-to-r from-blue-500/10 via-blue-500/40 to-blue-500/10 lg:block -z-10" />
        <RevealGroup
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5"
          stagger={0.12}
        >
          {items.map((s) => (
            <RevealItem key={s.step} className="group">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-600 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                  {String(s.step).padStart(2, "0")}
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-[var(--fg)] group-hover:text-primary-600 transition-colors">
                  {s.title}
                </h3>
                {s.description && <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted)]">{s.description}</p>}
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
    <Section className="bg-[var(--surface-2)] relative overflow-hidden">
      <div className="absolute top-[10%] right-[-10%] w-[350px] aspect-square rounded-full bg-cyan-500/5 blur-3xl pointer-events-none -z-10" />
      <SectionHeader title={data.heading ?? ""} subtitle={data.subtitle} eyebrow="Industries" eyebrowIcon="building" />
      <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
        {items.map((ind) => (
          <RevealItem key={ind.name}>
            <div className="group flex h-full flex-col justify-between rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-md hover:border-primary-500/40 transition-all duration-300">
              <div>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-md shadow-cyan-500/10 group-hover:scale-110 transition-transform">
                  <Icon name={ind.icon} className="h-5 w-5" />
                </span>
                <h3 className="text-base font-bold text-[var(--fg)] mt-4 group-hover:text-primary-600 transition-colors">
                  {ind.name}
                </h3>
                {ind.description && <p className="text-xs leading-relaxed text-[var(--muted)] mt-2">{ind.description}</p>}
              </div>
              <div className="mt-4 flex items-center text-[10px] font-bold text-primary-600 tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
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
    <Section>
      <Reveal>
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-blue-800 via-indigo-900 to-slate-950 px-6 py-16 text-center text-white sm:px-12 sm:py-20 shadow-2xl">
          <div className="absolute inset-0 -z-0 opacity-20 mesh-grid" />
          <div className="absolute -top-[30%] -left-[20%] w-[50%] aspect-square rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-[30%] -right-[20%] w-[50%] aspect-square rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-[46px] leading-[1.1] tracking-tight">{data.heading}</h2>
            {data.description && <p className="text-base leading-relaxed text-slate-200/90 sm:text-lg">{data.description}</p>}
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {data.primaryLabel && (
                <Button href={data.primaryHref ?? "/contact"} size="lg" variant="white" icon="arrow-right" iconRight className="font-bold">
                  {data.primaryLabel}
                </Button>
              )}
              {data.secondaryLabel && (
                <Button href={data.secondaryHref ?? "/contact"} size="lg" variant="glass" className="text-white border border-white/20 font-bold hover:bg-white/10">
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
    <Section className="bg-slate-950 text-white relative overflow-hidden py-20">
      <div className="absolute top-0 right-0 w-[400px] aspect-square rounded-full bg-teal-500/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[350px] aspect-square rounded-full bg-blue-500/5 blur-3xl pointer-events-none -z-10" />
      
      <div className="max-w-3xl mb-16">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-400 mb-4">
            <Icon name="layers" className="w-3.5 h-3.5" />
            {data.heading ?? "WHAT WE DO"}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            {data.title ?? "Solutions that create measurable impact"}
          </h2>
          {data.subtitle && (
            <p className="mt-4 text-base sm:text-lg text-slate-450 leading-relaxed">
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
              <div className="group h-full flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/70 p-6.5 transition-all duration-300 hover:border-teal-500/30">
                <div>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 group-hover:scale-110 transition-transform">
                    <Icon name={item.icon ?? "layers"} className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg font-bold text-white mt-6 group-hover:text-teal-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-450 mt-3 line-clamp-3">
                    {item.shortDescription}
                  </p>
                </div>
                {features.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-slate-800/80">
                    <ul className="space-y-2">
                      {features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-teal-500" />
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
    <Section className="relative overflow-hidden">
      <div className="absolute top-[30%] left-[-5%] w-[350px] aspect-square rounded-full bg-blue-500/5 blur-3xl pointer-events-none -z-10" />
      
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16 items-start mb-16">
        <Reveal>
          <div className="relative pl-6 border-l-4 border-primary-500">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">{data.heading ?? "WHO WE ARE"}</span>
            <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-[40px] leading-tight text-[var(--fg)]">
              {data.title}
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            {data.description}
          </p>
        </Reveal>
      </div>

      <RevealGroup className="grid gap-8 md:grid-cols-2">
        <RevealItem>
          <div className="group h-full rounded-[32px] bg-slate-950 border border-slate-900 p-8 sm:p-10 shadow-2xl relative overflow-hidden hover-lift transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-500/5 to-transparent rounded-bl-3xl pointer-events-none" />
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 mb-6">
              <Icon name="activity" className="h-6 w-6" />
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {data.darkPanelTitle ?? "From better reports to better decisions."}
            </h3>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              {data.darkPanelText}
            </p>
          </div>
        </RevealItem>

        <RevealItem>
          <div className="group h-full rounded-[32px] bg-slate-50 border border-slate-200/80 p-8 sm:p-10 shadow-sm relative overflow-hidden hover-lift transition-all duration-300 dark:bg-slate-900/20 dark:border-slate-800">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-3xl pointer-events-none" />
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100/50 mb-6 dark:bg-slate-800 dark:text-blue-400 dark:border-slate-700">
              <Icon name="trending-up" className="h-6 w-6" />
            </span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight dark:text-white">
              {data.lightPanelTitle ?? "Designed for sustainable growth."}
            </h3>
            <p className="mt-4 text-slate-600 text-sm leading-relaxed dark:text-slate-400">
              {data.lightPanelText}
            </p>
          </div>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
