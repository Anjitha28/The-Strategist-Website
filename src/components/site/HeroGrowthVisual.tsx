"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation, type Variants } from "framer-motion";

type Stage = {
  id: string;
  label: string;
  sub: string;
  color: string;
  bg: string;
};

const STAGES: Stage[] = [
  {
    id: "01",
    label: "Small Business",
    sub: "Manual · Reactive · Limited Visibility",
    color: "#94a3b8",
    bg: "rgba(148,163,184,0.10)",
  },
  {
    id: "02",
    label: "Automate & Integrate",
    sub: "Streamlined · Connected · Real-time Insights",
    color: "#00b894",
    bg: "rgba(0,184,148,0.10)",
  },
  {
    id: "03",
    label: "Better Decisions",
    sub: "Data-driven · Predictive · Actionable",
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.10)",
  },
  {
    id: "04",
    label: "Sustainable Growth",
    sub: "Scalable · Efficient · Future-ready",
    color: "#0f172a",
    bg: "rgba(15,23,42,0.08)",
  },
];

// SVG path (cubic bezier — bottom-left to top-right)
const PATH = "M 30 340 C 120 320, 180 260, 240 210 C 300 160, 360 120, 430 80";
// Node positions along the path (t=0..1)
const NODES = [
  { cx: 30,  cy: 340 },
  { cx: 190, cy: 235 },
  { cx: 325, cy: 135 },
  { cx: 430, cy:  80 },
];

export function HeroGrowthVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.6, delay: 0.3 },
    },
  };

  const nodeVariants = (delay: number): Variants => ({
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 20, delay },
    },
  });

  const stageVariants = (delay: number): Variants => ({
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, delay },
    },
  });

  return (
    <div ref={ref} className="relative w-full h-full select-none">
      {/* Ambient glow blobs */}
      <div className="absolute top-4 right-8 w-56 h-56 glow-teal -z-10 pointer-events-none" />
      <div className="absolute bottom-8 left-4 w-44 h-44 glow-cyan -z-10 pointer-events-none" />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 hero-dots opacity-50 -z-10" />

      {/* --- SVG Growth Line --- */}
      <svg
        viewBox="0 0 460 360"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
        overflow="visible"
      >
        {/* Soft shadow path beneath the main line */}
        <motion.path
          d={PATH}
          fill="none"
          stroke="rgba(0,184,148,0.15)"
          strokeWidth={12}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial="hidden"
          animate={controls}
          variants={pathVariants}
          style={{ filter: "blur(6px)" }}
        />

        {/* Main growth line */}
        <motion.path
          d={PATH}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1200}
          initial="hidden"
          animate={controls}
          variants={pathVariants}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#00b894" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Nodes along the path */}
        {NODES.map((n, i) => (
          <motion.g
            key={i}
            initial="hidden"
            animate={controls}
            variants={nodeVariants(0.5 + i * 0.35)}
          >
            {/* Outer pulse ring */}
            <motion.circle
              cx={n.cx}
              cy={n.cy}
              r={14}
              fill="none"
              stroke={STAGES[i].color}
              strokeWidth={1.5}
              opacity={0.5}
              animate={{ r: [14, 24], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
            {/* Inner filled node */}
            <circle
              cx={n.cx}
              cy={n.cy}
              r={7}
              fill={STAGES[i].color}
              filter={`drop-shadow(0 0 4px ${STAGES[i].color}88)`}
            />
            <circle cx={n.cx} cy={n.cy} r={3} fill="#fff" />
          </motion.g>
        ))}
      </svg>

      {/* --- Transformation Stage Cards --- */}
      <div className="absolute inset-0 flex flex-col justify-between py-2 pl-[52%] pr-2 pointer-events-none">
        {STAGES.map((s, i) => (
          <motion.div
            key={s.id}
            initial="hidden"
            animate={controls}
            variants={stageVariants(0.6 + i * 0.3)}
            className="flex items-start gap-2.5 rounded-xl p-2.5 border border-white/80 shadow-sm backdrop-blur-sm"
            style={{ background: s.bg, borderColor: `${s.color}22` }}
          >
            <span
              className="shrink-0 mt-0.5 text-[10px] font-black leading-none rounded-md px-1.5 py-1"
              style={{ background: `${s.color}18`, color: s.color }}
            >
              {s.id}
            </span>
            <div>
              <p className="text-[11px] font-bold text-[#0f172a] leading-tight">{s.label}</p>
              <p className="text-[9.5px] text-[#64748b] mt-0.5 leading-tight">{s.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- Analytics mini-dashboard card overlay --- */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute bottom-3 left-2 w-40 rounded-xl border border-white/70 bg-white/85 backdrop-blur-md shadow-lg p-3"
      >
        <p className="text-[9px] font-semibold uppercase tracking-widest text-[#64748b] mb-2">
          Analytics Engine
        </p>
        {[
          { label: "Efficiency", val: "94%", w: "94%" },
          { label: "Automation", val: "87%", w: "87%" },
          { label: "Insights", val: "76%", w: "76%" },
        ].map((m) => (
          <div key={m.label} className="mb-1.5">
            <div className="flex justify-between text-[9px] text-[#0f172a] font-semibold">
              <span>{m.label}</span>
              <span className="text-[#00b894]">{m.val}</span>
            </div>
            <div className="h-1 w-full rounded-full bg-slate-100 overflow-hidden mt-0.5">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg,#00b894,#06b6d4)", width: m.w }}
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.6 }}
              />
            </div>
          </div>
        ))}
        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[8px] font-semibold text-[#64748b]">STATUS</span>
          <span className="flex items-center gap-1 text-[8px] font-bold text-[#00b894]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00b894] animate-pulse" />
            LIVE
          </span>
        </div>
      </motion.div>
    </div>
  );
}
