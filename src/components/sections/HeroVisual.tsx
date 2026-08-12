"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BarChart3, TrendingUp, Brain, Activity } from "lucide-react";

export function HeroVisual() {
  const reduce = useReducedMotion();
  const float = (delay: number): any =>
    reduce
      ? {}
      : { animate: { y: [0, -14, 0] }, transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay } };

  const bars = [42, 68, 55, 82, 60, 90, 72];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      {/* Glow */}
      <div className="absolute inset-8 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_40%,rgba(49,130,246,0.25),transparent_70%)] blur-2xl" />

      {/* Main dashboard card */}
      <motion.div
        {...float(0)}
        className="glass absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-3xl p-5 shadow-[var(--shadow-float)]"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--color-primary-500),var(--color-secondary-500))] text-white">
              <BarChart3 className="h-4 w-4" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[var(--fg)]">Revenue Overview</span>
              <span className="text-[10px] text-[var(--muted)]">Live · updated now</span>
            </div>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-success-500/12 px-2 py-0.5 text-[10px] font-semibold text-success-600">
            <TrendingUp className="h-3 w-3" /> +18.4%
          </span>
        </div>

        <div className="flex h-28 items-end justify-between gap-1.5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={reduce ? false : { height: 0 }}
              animate={reduce ? {} : { height: `${h}%` }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="w-full rounded-t-md bg-[linear-gradient(to_top,var(--color-primary-500),var(--color-secondary-400))]"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating AI insight card */}
      <motion.div
        {...float(1.2)}
        className="glass absolute -right-2 top-6 w-44 rounded-2xl p-3.5 shadow-[var(--shadow-card)]"
      >
        <div className="mb-1.5 flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-secondary-500/15 text-secondary-600">
            <Brain className="h-3.5 w-3.5" />
          </span>
          <span className="text-[11px] font-semibold text-[var(--fg)]">AI Insight</span>
        </div>
        <p className="text-[10px] leading-snug text-[var(--muted)]">Q4 growth driven by automation efficiency gains.</p>
      </motion.div>

      {/* Floating KPI card */}
      <motion.div
        {...float(0.6)}
        className="glass absolute -left-3 bottom-10 w-40 rounded-2xl p-3.5 shadow-[var(--shadow-card)]"
      >
        <div className="mb-1 flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent-500/15 text-accent-600">
            <Activity className="h-3.5 w-3.5" />
          </span>
          <span className="text-[11px] font-semibold text-[var(--fg)]">Reports Automated</span>
        </div>
        <p className="text-gradient text-2xl font-extrabold">1,240+</p>
      </motion.div>
    </div>
  );
}
