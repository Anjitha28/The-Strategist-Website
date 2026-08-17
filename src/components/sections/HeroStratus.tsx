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

  // Emphasize "We help you scale." with a teal accent and serif typography
  const renderTitle = (titleStr: string) => {
    const target = "We help you scale.";
    const index = titleStr.toLowerCase().indexOf(target.toLowerCase());
    if (index !== -1) {
      const head = titleStr.slice(0, index);
      const matchedText = titleStr.slice(index, index + target.length);
      const tail = titleStr.slice(index + target.length);
      return (
        <>
          {head}
          <span className="text-[#18B8AD] italic font-serif block mt-2">
            {matchedText}
          </span>
          {tail}
        </>
      );
    }
    const words = titleStr.split(" ");
    if (words.length < 3) return <span className="text-[#071820] font-semibold">{titleStr}</span>;
    const head = words.slice(0, -2).join(" ");
    const tail = words.slice(-2).join(" ");
    return (
      <>
        {head}{" "}
        <span className="text-[#18B8AD] italic font-serif">
          {tail}
        </span>
      </>
    );
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-32">
      {/* Background organic shape 1 (top-left) */}
      <div className="absolute top-0 left-0 w-[40%] aspect-square -translate-x-[20%] -translate-y-[20%] pointer-events-none opacity-40 bg-[radial-gradient(circle_at_20%_20%,rgba(24,184,173,0.05)_0%,rgba(124,227,218,0.05)_40%,transparent_75%)] blur-3xl -z-10" />

      {/* Background organic shape 2 (bottom-right) */}
      <div className="absolute bottom-0 right-0 w-[50%] aspect-square translate-x-[20%] translate-y-[20%] pointer-events-none opacity-30 bg-[radial-gradient(circle_at_80%_80%,rgba(24,184,173,0.04)_0%,rgba(238,244,243,0.5)_45%,transparent_75%)] blur-3xl -z-10" />

      {/* Top wavy SVG divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -z-10 pointer-events-none opacity-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[160%] h-[180px] text-[#EEF4F3] fill-current">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z" />
        </svg>
      </div>

      <div className="container-page flex flex-col items-center justify-center text-center relative z-10">
        {/* Centered Column: Text Content */}
        <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
          {data.badge && (
            <Reveal>
              <Badge className="bg-[#EEF4F3] text-[#18B8AD] border border-[#DCE6E7] uppercase tracking-wider px-3 py-1 font-semibold text-xs rounded-full">
                {data.badge}
              </Badge>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-[#071820] sm:text-5xl lg:text-[60px] font-display">
              {renderTitle(data.title ?? "")}
            </h1>
          </Reveal>
          {data.description && (
            <Reveal delay={0.12}>
              <p className="max-w-2xl text-base leading-relaxed text-[#68787D] sm:text-lg">
                {data.description}
              </p>
            </Reveal>
          )}
          <Reveal delay={0.18}>
            <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
              {data.primaryLabel && (
                <Button 
                  href={data.primaryHref ?? "/solutions"} 
                  size="lg" 
                  className="bg-[#071820] hover:bg-[#18B8AD] text-white font-semibold shadow-sm transition-colors duration-300"
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
                  className="bg-white border border-[#DCE6E7] text-[#071820] hover:bg-[#F7F9F8] font-semibold"
                >
                  {data.secondaryLabel}
                </Button>
              )}
            </div>
          </Reveal>

          {data.stats && data.stats.length > 0 && (
            <Reveal delay={0.24}>
              <dl className="mt-8 flex flex-wrap justify-center gap-x-12 gap-y-4 border-t border-[#DCE6E7] pt-8 w-full">
                {data.stats.map((s) => (
                  <div key={s.label} className="flex flex-col items-center">
                    <dt className="text-[#18B8AD] text-3xl font-bold sm:text-4xl">
                      {s.value}
                    </dt>
                    <dd className="text-xs font-semibold uppercase tracking-wider text-[#68787D] mt-1">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
