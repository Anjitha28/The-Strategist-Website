"use client";
 
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Cpu,
  Laptop,
  Users,
  Sparkles,
  Play,
  CheckSquare,
  FileText,
  Clock,
  Compass,
  ArrowUpRight,
  LogIn,
  User,
  Code,
  Target,
  AlertCircle,
  Database,
  Settings,
  BarChart3,
  Gauge,
  FileSpreadsheet,
  TrendingUp
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";
import { CTASection } from "@/components/ui/CTASection";
import { FALLBACK_TRAINING_HUB } from "@/lib/constants";

// Map CMS icon-name strings → lucide components (for admin-editable journey/tools).
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  AlertCircle, Database, Settings, BarChart3, Gauge, FileSpreadsheet, TrendingUp,
  CheckSquare, Clock, Target, GraduationCap, Play, Sparkles, BookOpen, Cpu, Laptop, Users, FileText, Code, Compass,
};
const iconOf = (name?: string) => ICONS[name || ""] || Sparkles;
 
interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image_url: string;
  type: "self_serve" | "inquiry";
}
 
interface TrainingHubClientProps {
  categories: Category[];
  hub: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    intro: string;
    cta: {
      title: string;
      description: string;
      primaryCtaText: string;
      primaryCtaHref: string;
      secondaryCtaText: string;
      secondaryCtaHref: string;
    };
    journey?: {
      eyebrow?: string;
      heading?: string;
      subtext?: string;
      stages?: { step: string; name: string; desc: string; icon: string }[];
    };
    tools?: {
      eyebrow?: string;
      heading?: string;
      subtext?: string;
      items?: { label: string; desc: string; icon: string }[];
    };
  };
}
 
// Icon map matching slugs
const CATEGORY_ICONS: Record<string, any> = {
  "online-courses": Laptop,
  corporate: Cpu,
  "one-to-one": Users,
  internships: Target,
  colleges: GraduationCap,
};

// ────────────────────────────────────────────────────────
// Premium Visual Learning Pathway Card
// ────────────────────────────────────────────────────────
interface PathwayCardProps {
  category: Category;
  className?: string;
  icon: any;
  trackNum: string;
  isWide?: boolean;
}

function PathwayCard({ category, className = "", icon: Icon, trackNum, isWide = false }: PathwayCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Subtle 3D tilt
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: -normY * 6, y: normX * 6 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const isSelfServe = category.type === "self_serve" || category.slug === "online-courses" || category.slug === "internships";
  const categoryLabel = isSelfServe ? "Self-Serve" : "B2B / Program";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-[28px] overflow-hidden border transition-all duration-500 ease-out flex flex-col justify-end ${
        hovered
          ? "border-[#10B981]/50 shadow-[0_24px_60px_rgba(16,185,129,0.12)] -translate-y-1.5"
          : "border-white/10 bg-[#061813]/90 shadow-soft"
      } ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Background Image with smooth zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out pointer-events-none"
        style={{
          backgroundImage: `url(${category.image_url})`,
          transform: hovered ? "scale(1.06)" : "scale(1.0)",
        }}
      />

      {/* Cinematic dark mask with multi-stop gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#040e0b] via-[#040e0b]/85 via-45% to-[#040e0b]/25 pointer-events-none z-10" />

      {/* Mouse spotlight glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-15"
        style={{
          background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.12), transparent 75%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Border highlight glow */}
      <div
        className="absolute inset-0 rounded-[28px] border pointer-events-none z-25 transition-colors duration-500"
        style={{
          borderColor: hovered ? "rgba(16, 185, 129, 0.45)" : "rgba(255, 255, 255, 0.05)",
        }}
      />

      {/* Card Content wrapper */}
      <Link
        href={`/training/${category.slug}`}
        className={`relative z-20 h-full w-full p-7 sm:p-9 flex flex-col justify-between text-left ${
          isWide ? "min-h-[380px] lg:min-h-[380px]" : "min-h-[410px] sm:min-h-[440px]"
        }`}
      >
        {/* Top bar: Category Badge + Track Number & Icon */}
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="flex items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold font-mono tracking-wider uppercase transition-colors duration-300 ${
                isSelfServe
                  ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30"
                  : "bg-[#0D9488]/20 text-[#2dd4bf] border border-[#0D9488]/40"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isSelfServe ? "bg-[#10B981]" : "bg-[#2dd4bf]"
                } animate-pulse`}
              />
              {categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold tracking-widest text-zinc-400 group-hover:text-[#10B981]/80 transition-colors">
              TRACK // {trackNum}
            </span>
            <div className="w-9 h-9 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-[#10B981] group-hover:border-[#10B981]/40 group-hover:bg-[#10B981]/10 transition-all duration-300">
              <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>
        </div>

        {/* Bottom Content: Title, Description, and Explore Track Button */}
        <div className="mt-auto pt-10 space-y-3">
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-white group-hover:text-[#10B981] transition-colors duration-300 flex items-center gap-2.5 leading-tight">
            <span>{category.name}</span>
          </h3>

          <p className="text-sm sm:text-[15px] font-light text-zinc-300 group-hover:text-zinc-100 transition-colors duration-300 leading-relaxed max-w-xl">
            {category.description}
          </p>

          <div className="pt-3">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 group-hover:bg-[#10B981] group-hover:text-[#04120e] group-hover:border-[#10B981] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all duration-300">
              <span>Explore Track</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
 
// ────────────────────────────────────────────────────────
// Ecosystem Tool Card — matches reference design:
// dark bg, numbered badge top-right, icon left, text right
// ────────────────────────────────────────────────────────
function FloatingFeatureCard({ icon: Icon, label, desc, delay = 0, index = 0 }: any) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <Reveal delay={delay} variant="scale" className="h-full">
      <div className="relative bg-[#07221A] border border-[#10B981]/15 hover:border-[#10B981]/40 p-5 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(16,185,129,0.08)] text-left group h-full overflow-hidden">
        {/* Subtle hover glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#10B981]/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        {/* Number badge — top right */}
        <span className="absolute top-4 right-4 text-[11px] font-mono font-bold text-[#10B981]/50 group-hover:text-[#10B981]/80 transition-colors duration-300 select-none">{num}</span>
        {/* Icon */}
        <div className="w-11 h-11 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center shrink-0 group-hover:bg-[#10B981]/20 group-hover:scale-110 transition-all duration-300 mt-0.5">
          <Icon className="w-5 h-5 text-[#10B981]" />
        </div>
        {/* Text */}
        <div className="space-y-1 pr-6">
          <h4 className="text-white text-[15px] font-semibold font-display group-hover:text-[#10B981] transition-colors duration-300 leading-snug">{label}</h4>
          <p className="text-zinc-400 text-xs leading-relaxed font-light">{desc}</p>
        </div>
      </div>
    </Reveal>
  );
}
 
export function TrainingHubClient({ categories, hub }: TrainingHubClientProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [journeyProgress, setJourneyProgress] = useState(0);
 
  // Timeline viewport scroll progress tracking
  const journeySectionRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    const handleScroll = () => {
      if (!journeySectionRef.current) return;
      const rect = journeySectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress through the timeline container
      const start = rect.top - windowHeight * 0.2;
      const total = rect.height;
      const p = Math.min(1, Math.max(0, -start / total));
      setJourneyProgress(p);
    };
 
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();
 
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user || null);
    });
 
    return () => subscription.unsubscribe();
  }, []);
 
  // Map categories to designating Bento structure
  const oneToOne = categories.find((c) => c.slug === "one-to-one") || categories[0];
  const corporate = categories.find((c) => c.slug === "corporate") || categories[1];
  const colleges = categories.find((c) => c.slug === "colleges") || categories[2];
  const onlineCourses = categories.find((c) => c.slug === "online-courses") || categories[3];
  const internships = categories.find((c) => c.slug === "internships") || categories[4];
 
 
  return (
    <div className="w-full hero-emerald text-zinc-200 relative min-h-screen pt-28 overflow-hidden">
      {/* Custom keyframes for dashboard connections */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -40;
          }
        }
      `}} />

      {/* 1. HERO SECTION — editorial, professional, text-forward (no mock UI) */}
      <section className="relative flex items-center py-24 md:py-32 overflow-hidden border-b border-line">
        {/* Restrained ambient field: one soft aurora, a masked hairline grid */}
        <div className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[900px] h-[520px] bg-[#10B981]/[0.05] rounded-full blur-[170px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_35%,black,transparent)] pointer-events-none" />

        <Container className="relative z-10 w-full">
          <div className="max-w-4xl">
            {/* Calm eyebrow */}
            <div className="flex items-center gap-3 animate-[fade-up_1s_cubic-bezier(0.16,1,0.3,1)]">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#10B981]/70" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-[#10B981]">
                {hub.eyebrow}
              </span>
            </div>

            <h1 className="mt-7 font-display font-bold text-[13vw] sm:text-7xl lg:text-[92px] leading-[0.95] tracking-[-0.025em] text-white">
              <span className="block animate-[fade-up_1.1s_cubic-bezier(0.16,1,0.3,1)_80ms_both]">
                {hub.headingLead || "Training"}
              </span>
              <span className="block pb-1 text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-[#0D9488] to-[#34D399] animate-[fade-up_1.1s_cubic-bezier(0.16,1,0.3,1)_180ms_both]">
                {hub.headingAccent || "Programs"}
              </span>
            </h1>

            <p className="mt-7 text-slate font-light text-lg md:text-2xl leading-relaxed max-w-2xl animate-[fade-up_1.1s_cubic-bezier(0.16,1,0.3,1)_300ms_both]">
              {hub.intro}
            </p>

            {/* Dual CTA */}
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 animate-[fade-up_1.1s_cubic-bezier(0.16,1,0.3,1)_420ms_both]">
              <Button
                variant="accent"
                onClick={() => router.push("/training/online-courses")}
                className="py-3.5 px-8 text-[15px] flex items-center justify-center gap-2 rounded-full shadow-[0_8px_28px_rgba(16,185,129,0.28)] w-full sm:w-auto hover:scale-[1.03] active:scale-95 transition-transform duration-300 font-semibold group/explore"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 group-hover/explore:translate-x-0.5 transition-transform duration-300" />
              </Button>
              <button
                type="button"
                onClick={() => router.push(user ? "/account" : "/signin?redirect=/training")}
                className="py-3.5 px-7 text-[15px] flex items-center justify-center gap-2 rounded-full w-full sm:w-auto border border-line text-white/90 hover:text-white hover:border-brand/45 hover:bg-white/[0.03] transition-colors duration-300 font-semibold group/login"
              >
                {user ? <User className="w-4 h-4 text-brand" /> : <LogIn className="w-4 h-4 text-brand group-hover/login:rotate-12 transition-transform duration-300" />}
                <span>{user ? "Student Dashboard" : "Student Portal Login"}</span>
              </button>
            </div>

            {/* Curriculum strip — the real disciplines KVJ teaches (no fabricated data) */}
            <div className="mt-14 pt-8 border-t border-line animate-[fade-up_1.1s_cubic-bezier(0.16,1,0.3,1)_560ms_both]">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-zinc-500">
                Core disciplines
              </span>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {["Advanced Excel", "Power BI", "Data Analytics", "Dashboards", "Report Automation", "Business Intelligence"].map((d, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-line bg-white/[0.03] px-4 py-2 text-[13.5px] font-medium text-zinc-300 hover:border-brand/40 hover:text-white transition-colors duration-300"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
 
      {/* 2. PROGRAM SHOWCASE (LEARNING PATHWAYS) */}
      <section className="py-24 relative bg-[#07130E]/40 border-b border-line overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.035),transparent)] pointer-events-none" />
        
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#10B981]">Showcase</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mt-3 tracking-tight leading-tight">
              Learning Pathways
            </h2>
            <p className="text-zinc-400 font-light mt-4 text-base leading-relaxed">
              Explore custom-tailored tracks built for professionals, students, and companies.
            </p>
          </div>

          {/* Responsive Pathways Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
            {/* Card 01: Online Courses */}
            {onlineCourses && (
              <PathwayCard
                category={onlineCourses}
                icon={CATEGORY_ICONS["online-courses"]}
                trackNum="01"
              />
            )}

            {/* Card 02: Corporate */}
            {corporate && (
              <PathwayCard
                category={corporate}
                icon={CATEGORY_ICONS["corporate"]}
                trackNum="02"
              />
            )}

            {/* Card 03: One-to-One */}
            {oneToOne && (
              <PathwayCard
                category={oneToOne}
                icon={CATEGORY_ICONS["one-to-one"]}
                trackNum="03"
              />
            )}

            {/* Card 04: Internships */}
            {internships && (
              <PathwayCard
                category={internships}
                icon={CATEGORY_ICONS["internships"]}
                trackNum="04"
              />
            )}

            {/* Card 05: Colleges (Full-width spanning 2 cols on desktop) */}
            {colleges && (
              <PathwayCard
                category={colleges}
                icon={CATEGORY_ICONS["colleges"]}
                trackNum="05"
                className="md:col-span-2"
                isWide
              />
            )}
          </div>
        </Container>
      </section>
 
      {/* 3. LEARNING JOURNEY (SCROLL-ANIMATED STORYTELLING TIMELINE) */}
      <section ref={journeySectionRef} className="py-24 md:py-32 relative bg-base overflow-hidden border-b border-line">
        <div className="beam absolute top-[30%] left-[-4%] h-[30rem] w-[22rem] bg-[#10B981]/8 rounded-full blur-[100px] pointer-events-none" />
        
        <Container className="relative z-10 max-w-[960px]">
          <div className="max-w-2xl mb-20 text-left">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#10B981]">{hub?.journey?.eyebrow || "Curriculum Flow"}</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mt-3 leading-tight tracking-tight">
              {hub?.journey?.heading || "The Learning Journey"}
            </h2>
            <p className="text-zinc-400 font-light mt-3 text-sm md:text-base leading-relaxed">
              {hub?.journey?.subtext || "Our structured approach translates absolute beginners into industry-ready data specialists."}
            </p>
          </div>
 
          {/* Scroll-tracked interactive vertical timeline */}
          <div className="relative pl-0 text-left mt-16 max-w-xl mx-auto">
            {/* Base line track */}
            <div className="absolute left-[23px] sm:left-[27px] top-6 bottom-6 w-[2px] bg-slate-850/60" />
            {/* Growing indicator track tied to scroll progress */}
            <div 
              className="absolute left-[23px] sm:left-[27px] top-6 w-[2px] bg-gradient-to-b from-[#10B981] via-cyan-500 to-[#0D9488] transition-all duration-300 ease-out"
              style={{ height: `${Math.min(journeyProgress * 100, 94)}%` }}
            />
 
            <div className="space-y-12 md:space-y-16">
              {(((hub?.journey?.stages as { step: string; name: string; desc: string; icon: string }[]) || FALLBACK_TRAINING_HUB.journey.stages)).map((item, idx, arr) => {
                // Determine active state based on scroll progress percentage
                const nodeThreshold = (idx + 0.5) / (arr.length || 7);
                const active = journeyProgress >= nodeThreshold;
                const Icon = iconOf(item.icon);
                
                return (
                  <div key={idx} className="relative flex items-start pl-16 sm:pl-24 transition-all duration-500">
                    {/* Circle Node */}
                    <div 
                      className={`absolute left-0 top-0.5 flex h-12 w-12 sm:h-[56px] sm:w-[56px] items-center justify-center rounded-full border-2 transition-all duration-500 z-10 ${
                        active 
                          ? "border-[#10B981] bg-[#0B2A22]/95 text-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.35)] scale-100" 
                          : "border-slate-800 bg-[#07130E] text-slate-700 scale-90"
                      }`}
                    >
                      <div className={`absolute -inset-1.5 rounded-full border border-dashed transition-all duration-500 ${
                        active ? "border-[#10B981]/30 scale-100" : "border-transparent scale-90"
                      }`} />
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-500" />
                    </div>
 
                    <div className="flex flex-col justify-center select-none pt-1">
                      <span className={`text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] uppercase transition-colors duration-500 ${
                        active ? "text-[#10B981]" : "text-slate-600"
                      }`}>
                        Stage {item.step}
                      </span>
                      <h3 className={`text-base sm:text-xl font-bold font-display mt-0.5 transition-colors duration-500 ${
                        active ? "text-white" : "text-slate-500"
                      }`}>
                        {item.name}
                      </h3>
                      <p className={`mt-1.5 text-xs sm:text-sm font-light leading-relaxed max-w-md transition-colors duration-500 ${
                        active ? "text-zinc-400" : "text-slate-655"
                      }`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
 
      {/* 4. PLATFORM FEATURES SECTION */}
      <section className="py-24 relative bg-[#07130E]/40 border-b border-line overflow-hidden">
        <div className="absolute top-[10%] right-[-15%] w-[450px] h-[450px] bg-corporate/5 rounded-full blur-[120px] pointer-events-none" />
 
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#10B981]">{hub?.tools?.eyebrow || "Ecosystem"}</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mt-3 tracking-tight leading-tight">
              {hub?.tools?.heading || "Integrated Learning Tools"}
            </h2>
            <p className="text-zinc-400 font-light mt-4 text-base leading-relaxed">
              {hub?.tools?.subtext || "Every course is backed by a robust suite of digital learning tools."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {(((hub?.tools?.items as { label: string; desc: string; icon: string }[]) || FALLBACK_TRAINING_HUB.tools.items)).map((t, i) => (
              <FloatingFeatureCard
                key={i}
                icon={iconOf(t.icon)}
                label={t.label}
                desc={t.desc}
                delay={i * 60}
                index={i}
              />
            ))}
          </div>
        </Container>
      </section>
      {/* FOOTER CTA SECTION */}
      <section className="relative z-10">
        <CTASection
          title={hub.cta.title}
          description={hub.cta.description}
          primaryCtaText={hub.cta.primaryCtaText}
          primaryCtaHref={hub.cta.primaryCtaHref}
          secondaryCtaText={hub.cta.secondaryCtaText}
          secondaryCtaHref={hub.cta.secondaryCtaHref}
        />
      </section>
    </div>
  );
}
