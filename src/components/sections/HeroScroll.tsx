"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, MotionValue } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Dashboard3D } from "../hero/Dashboard3D";
import { ChevronDown } from "lucide-react";

function MobileDashboardWrapper({ data }: { data: any }) {
  const dummyScroll = useMotionValue(0);
  return <Dashboard3D scrollProgress={dummyScroll} beatsData={data} />;
}

type HeroData = {
  badge?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  stats?: { value: string; label: string }[];
  beats?: {
    captions: string[];
    cards: {
      income: string;
      spending: string;
      gauge: string;
      userLabel: string;
    };
  };
};

export function HeroScroll({ data }: { data: HeroData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true);

  // Check window width for responsive layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform values for the Hero section text (fading out and sliding up)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroPointerEvents = useTransform(scrollYProgress, [0, 0.18], ["auto", "none"]);

  // Beats data captions
  const captions = data.beats?.captions || [
    "Gain deep operational insights with integrated Business Intelligence dashboards.",
    "Accelerate workflows through intelligent AI processes and automated reporting pipelines.",
    "Empower your workforce with custom training to sustain the analytics systems we build."
  ];

  // Transform values for captions
  const caption1Opacity = useTransform(scrollYProgress, [0.15, 0.28, 0.42], [0, 1, 0]);
  const caption1Y = useTransform(scrollYProgress, [0.15, 0.28, 0.42], [30, 0, -30]);

  const caption2Opacity = useTransform(scrollYProgress, [0.42, 0.55, 0.68], [0, 1, 0]);
  const caption2Y = useTransform(scrollYProgress, [0.42, 0.55, 0.68], [30, 0, -30]);

  const caption3Opacity = useTransform(scrollYProgress, [0.68, 0.82, 0.95], [0, 1, 1]);
  const caption3Y = useTransform(scrollYProgress, [0.68, 0.82, 0.95], [30, 0, 0]);

  // Scroll down indicator opacity (fades out immediately)
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [0.8, 0]);

  // Emphasize the last two words of the headline
  const renderTitle = (titleStr: string) => {
    const words = titleStr.split(" ");
    if (words.length < 3) return <span className="text-gradient">{titleStr}</span>;
    const head = words.slice(0, -2).join(" ");
    const tail = words.slice(-2).join(" ");
    return (
      <>
        {head} <span className="text-gradient">{tail}</span>
      </>
    );
  };

  // MOBILE FALLBACK LAYOUT (Static / No Pinned Scroll)
  if (isMobile || isReduced) {
    return (
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="aurora absolute inset-0 -z-10 opacity-70" />
        <div className="mesh-grid absolute inset-0 -z-10 opacity-60" />
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="flex flex-col items-start gap-6">
            {data.badge && (
              <Reveal>
                <Badge>{data.badge}</Badge>
              </Reveal>
            )}
            <Reveal delay={0.05}>
              <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {renderTitle(data.title ?? "")}
              </h1>
            </Reveal>
            {data.description && (
              <Reveal delay={0.12}>
                <p className="max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">{data.description}</p>
              </Reveal>
            )}
            <Reveal delay={0.18}>
              <div className="flex flex-wrap items-center gap-3">
                {data.primaryLabel && (
                  <Button href={data.primaryHref ?? "/contact"} size="lg" icon="arrow-right" iconRight>
                    {data.primaryLabel}
                  </Button>
                )}
                {data.secondaryLabel && (
                  <Button href={data.secondaryHref ?? "/contact"} size="lg" variant="secondary">
                    {data.secondaryLabel}
                  </Button>
                )}
              </div>
            </Reveal>

            {data.stats && data.stats.length > 0 && (
              <Reveal delay={0.24}>
                <dl className="mt-4 flex flex-wrap gap-x-10 gap-y-4">
                  {data.stats.map((s) => (
                    <div key={s.label} className="flex flex-col">
                      <dt className="text-gradient text-3xl font-extrabold sm:text-4xl">{s.value}</dt>
                      <dd className="text-sm text-[var(--muted)]">{s.label}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}
          </div>
          <div className="relative aspect-square w-full max-w-lg mx-auto">
            {/* Render a static snapshot of the 3D dashboard for mobile/reduced motion */}
            <MobileDashboardWrapper data={data.beats?.cards} />
          </div>
        </div>
      </section>
    );
  }

  // CINEMATIC 3D SCROLL-DRIVEN DESKTOP LAYOUT
  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "320vh" }}>
      {/* Background grids */}
      <div className="aurora absolute inset-0 -z-10 opacity-70 pointer-events-none" />
      <div className="mesh-grid absolute inset-0 -z-10 opacity-60 pointer-events-none" />

      {/* Sticky screen container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center">
        <div className="container-page grid w-full items-center gap-12 lg:grid-cols-[1.05fr_1fr] relative h-full">
          
          {/* LEFT SIDE: Text Column */}
          <div className="relative h-[60%] flex items-center">
            
            {/* Beat 0: Main Hero Text */}
            <motion.div
              style={{
                opacity: heroOpacity,
                y: heroY,
                pointerEvents: heroPointerEvents,
              }}
              className="absolute inset-0 flex flex-col justify-center items-start gap-6"
            >
              {data.badge && <Badge>{data.badge}</Badge>}
              <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl text-white">
                {renderTitle(data.title ?? "")}
              </h1>
              {data.description && (
                <p className="max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">{data.description}</p>
              )}
              <div className="flex flex-wrap items-center gap-3">
                {data.primaryLabel && (
                  <Button href={data.primaryHref ?? "/contact"} size="lg" icon="arrow-right" iconRight>
                    {data.primaryLabel}
                  </Button>
                )}
                {data.secondaryLabel && (
                  <Button href={data.secondaryHref ?? "/contact"} size="lg" variant="secondary">
                    {data.secondaryLabel}
                  </Button>
                )}
              </div>
              
              {data.stats && data.stats.length > 0 && (
                <dl className="mt-4 flex flex-wrap gap-x-10 gap-y-4">
                  {data.stats.map((s) => (
                    <div key={s.label} className="flex flex-col">
                      <dt className="text-gradient text-3xl font-extrabold sm:text-4xl">{s.value}</dt>
                      <dd className="text-sm text-[var(--muted)]">{s.label}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </motion.div>

            {/* Beat 1: Caption 1 */}
            <motion.div
              style={{
                opacity: caption1Opacity,
                y: caption1Y,
              }}
              className="absolute inset-0 flex flex-col justify-center items-start pr-8 pointer-events-none"
            >
              <span className="text-xs font-mono font-bold text-blue-500 uppercase tracking-widest mb-3">01 · Business Intelligence</span>
              <p className="text-3xl font-bold font-display text-white leading-snug">
                {captions[0]}
              </p>
            </motion.div>

            {/* Beat 2: Caption 2 */}
            <motion.div
              style={{
                opacity: caption2Opacity,
                y: caption2Y,
              }}
              className="absolute inset-0 flex flex-col justify-center items-start pr-8 pointer-events-none"
            >
              <span className="text-xs font-mono font-bold text-purple-500 uppercase tracking-widest mb-3">02 · Automation & AI</span>
              <p className="text-3xl font-bold font-display text-white leading-snug">
                {captions[1]}
              </p>
            </motion.div>

            {/* Beat 3: Caption 3 */}
            <motion.div
              style={{
                opacity: caption3Opacity,
                y: caption3Y,
              }}
              className="absolute inset-0 flex flex-col justify-center items-start pr-8 pointer-events-none"
            >
              <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-widest mb-3">03 · Enablement & Training</span>
              <p className="text-3xl font-bold font-display text-white leading-snug">
                {captions[2]}
              </p>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Pinned 3D Visual */}
          <div className="relative w-full h-[80%] flex items-center justify-center">
            <Dashboard3D 
              scrollProgress={scrollYProgress} 
              beatsData={data.beats?.cards} 
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
        >
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 font-mono">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
