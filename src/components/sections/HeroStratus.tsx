"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type HeroData = {
  badge?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  stats?: { value: string; label: string }[];
};

export function HeroStratus({ data }: { data: HeroData }) {
  const reduce = useReducedMotion();
  const float = (delay: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -12, 0] },
          transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const, delay },
        };

  // Emphasize the last two words of the title with a gradient/brand color
  const renderTitle = (titleStr: string) => {
    const words = titleStr.split(" ");
    if (words.length < 3) return <span className="text-blue-750 font-extrabold">{titleStr}</span>;
    const head = words.slice(0, -2).join(" ");
    const tail = words.slice(-2).join(" ");
    return (
      <>
        {head}{" "}
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-extrabold">
          {tail}
        </span>
      </>
    );
  };

  return (
    <section className="relative overflow-hidden stratus py-16 sm:py-20 lg:py-28">
      {/* Background organic shape 1 (top-left) */}
      <div className="absolute top-0 left-0 w-[40%] aspect-square -translate-x-[20%] -translate-y-[20%] pointer-events-none opacity-40 bg-[radial-gradient(circle_at_20%_20%,#3b82f6_0%,#a855f7_40%,transparent_75%)] blur-3xl -z-10" />

      {/* Background organic shape 2 (bottom-right) */}
      <div className="absolute bottom-0 right-0 w-[50%] aspect-square translate-x-[20%] translate-y-[20%] pointer-events-none opacity-30 bg-[radial-gradient(circle_at_80%_80%,#60a5fa_0%,#e879f9_45%,transparent_75%)] blur-3xl -z-10" />

      {/* Top wavy SVG divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -z-10 pointer-events-none opacity-30">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[160%] h-[180px] text-blue-100/40 fill-current">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z" />
        </svg>
      </div>

      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] relative">
        {/* Left Column: Text Content */}
        <div className="flex flex-col items-start gap-6 lg:pr-4">
          {data.badge && (
            <Reveal>
              <Badge className="bg-blue-50 text-blue-700 border border-blue-200/50 uppercase tracking-wider px-3 py-1 font-semibold text-xs rounded-full">
                {data.badge}
              </Badge>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[54px]">
              {renderTitle(data.title ?? "")}
            </h1>
          </Reveal>
          {data.description && (
            <Reveal delay={0.12}>
              <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                {data.description}
              </p>
            </Reveal>
          )}
          <Reveal delay={0.18}>
            <div className="flex flex-wrap items-center gap-3">
              {data.primaryLabel && (
                <Button 
                  href={data.primaryHref ?? "/solutions"} 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-blue-500/20"
                  icon="arrow-right" 
                  iconRight
                >
                  {data.primaryLabel}
                </Button>
              )}
              {data.secondaryLabel && (
                <Button 
                  href={data.secondaryHref ?? "/contact"} 
                  size="lg" 
                  variant="secondary"
                  className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-semibold"
                >
                  {data.secondaryLabel}
                </Button>
              )}
            </div>
          </Reveal>

          {data.stats && data.stats.length > 0 && (
            <Reveal delay={0.24}>
              <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-t border-slate-200/60 pt-6 w-full">
                {data.stats.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <dt className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-3xl font-extrabold sm:text-4xl">
                      {s.value}
                    </dt>
                    <dd className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>

        {/* Right Column: Premium Vector Illustration Container */}
        <div className="relative flex justify-center items-center">
          <motion.div 
            {...float(0)}
            className="relative w-full max-w-lg aspect-square"
          >
            {/* Visual background blob curves */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-[3rem] -z-10 blur-xl opacity-80" />
            
            {/* Organic foliage background elements */}
            <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.2),transparent_70%)] rounded-full -z-10" />
            <div className="absolute -bottom-4 -right-4 w-36 h-36 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.15),transparent_70%)] rounded-full -z-10" />

            <div className="w-full h-full relative p-4 flex items-center justify-center">
              {/* Premium image container */}
              <div className="relative w-[92%] h-[92%] rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-white/40 backdrop-blur-md hover-lift transition-transform">
                <Image
                  src="/brand/data-analytics.png"
                  alt="Data Analytics Workspace"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                  className="object-cover"
                />
              </div>

              {/* Decorative floating badge 1 */}
              <motion.div
                {...float(1.5)}
                className="absolute top-[12%] -left-[4%] bg-white/90 backdrop-blur-md border border-slate-100/80 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2"
              >
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800">Operational Insights</span>
              </motion.div>

              {/* Decorative floating badge 2 */}
              <motion.div
                {...float(2.8)}
                className="absolute bottom-[20%] -right-[6%] bg-white/90 backdrop-blur-md border border-slate-100/80 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2"
              >
                <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500" />
                <span className="text-xs font-bold text-slate-800">100% Automated</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
