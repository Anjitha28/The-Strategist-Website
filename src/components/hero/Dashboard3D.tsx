"use client";

import React from "react";
import { motion, MotionValue, useTransform, useReducedMotion } from "framer-motion";
import { BarChart3, TrendingUp, ArrowUpRight, ArrowDownRight, Users, Activity } from "lucide-react";

interface Dashboard3DProps {
  scrollProgress: MotionValue<number>;
  beatsData?: {
    income: string;
    spending: string;
    gauge: string;
    userLabel: string;
  };
}

export function Dashboard3D({ scrollProgress, beatsData }: Dashboard3DProps) {
  const isReduced = useReducedMotion();

  // Fallback defaults if DB settings aren't loaded yet
  const data = beatsData || {
    income: "$598,000",
    spending: "$270,000",
    gauge: "75%",
    userLabel: "Active Users"
  };

  // 3D transforms mapped to scroll progress (0 to 1)
  const rotateX = useTransform(scrollProgress, [0, 1], isReduced ? [0, 0] : [35, 55]);
  const rotateZ = useTransform(scrollProgress, [0, 1], isReduced ? [0, 0] : [-15, -35]);
  const translateY = useTransform(scrollProgress, [0, 1], isReduced ? [0, 0] : [0, 80]);
  const scale = useTransform(scrollProgress, [0, 1], [0.95, 1.05]);

  // Card opacity / scale / slide-in mappings on scroll beats
  // Income card: reveals at 0.15 -> 0.35
  const incomeOpacity = useTransform(scrollProgress, [0.1, 0.25], [0, 1]);
  const incomeScale = useTransform(scrollProgress, [0.1, 0.25], [0.8, 1]);
  const incomeX = useTransform(scrollProgress, [0.1, 0.25], [-50, 0]);

  // Spending card: reveals at 0.35 -> 0.55
  const spendingOpacity = useTransform(scrollProgress, [0.3, 0.45], [0, 1]);
  const spendingScale = useTransform(scrollProgress, [0.3, 0.45], [0.8, 1]);
  const spendingX = useTransform(scrollProgress, [0.3, 0.45], [50, 0]);

  // Gauge card: reveals at 0.55 -> 0.75
  const gaugeOpacity = useTransform(scrollProgress, [0.5, 0.65], [0, 1]);
  const gaugeScale = useTransform(scrollProgress, [0.5, 0.65], [0.8, 1]);
  const gaugeY = useTransform(scrollProgress, [0.5, 0.65], [50, 0]);

  // User chip: reveals at 0.75 -> 0.95
  const userOpacity = useTransform(scrollProgress, [0.7, 0.85], [0, 1]);
  const userScale = useTransform(scrollProgress, [0.7, 0.85], [0.8, 1]);
  const userY = useTransform(scrollProgress, [0.7, 0.85], [-30, 0]);

  // Bar chart growth mapped from 0 to 0.3
  const barProgress = useTransform(scrollProgress, [0, 0.35], [0, 1]);

  const bars = [42, 68, 55, 82, 60, 90, 72];

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none perspective-[1200px]">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute inset-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_40%,rgba(58,123,255,0.2),transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Isometric 3D Container wrapper */}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          y: translateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="relative w-[90%] max-w-[420px] aspect-[4/3] flex items-center justify-center transition-all duration-300"
      >
        {/* BASE DASHBOARD CARD */}
        <div 
          style={{ transform: "translateZ(0px)" }}
          className="glass w-full rounded-3xl p-5 border border-white/10 shadow-[var(--shadow-float)] relative overflow-hidden bg-slate-900/40 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md shadow-blue-500/10">
                <BarChart3 className="h-4 w-4" />
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white tracking-wide">Revenue Overview</span>
                <span className="text-[10px] text-slate-450 font-medium">Live analytics portal</span>
              </div>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
              <TrendingUp className="h-3 w-3" /> +18.4%
            </span>
          </div>

          {/* Bar Chart Container */}
          <div className="flex h-32 items-end justify-between gap-2.5 px-2 mt-6">
            {bars.map((maxHeight, i) => {
              // Map the height grow based on scroll
              return (
                <div key={i} className="flex-1 h-full flex items-end">
                  <motion.div
                    style={{
                      height: useTransform(barProgress, (p) => `${p * maxHeight}%`),
                    }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 via-blue-500 to-purple-500 shadow-[0_4px_12px_rgba(58,123,255,0.15)]"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* 1. DETAIL CARD: INCOME ($598k) */}
        <motion.div
          style={{
            opacity: incomeOpacity,
            scale: incomeScale,
            x: incomeX,
            transform: "translateZ(40px)",
            transformStyle: "preserve-3d",
          }}
          className="glass absolute -left-12 top-[-10px] w-44 rounded-2xl p-4 shadow-[var(--shadow-card)] border border-white/10 bg-slate-900/60 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-450">Income</span>
            <span className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <h4 className="text-xl font-extrabold text-white leading-none mt-1">{data.income}</h4>
          <span className="text-[9px] text-slate-450 block mt-1 font-semibold">Monthly inbound cashflow</span>
        </motion.div>

        {/* 2. DETAIL CARD: SPENDING ($270k) */}
        <motion.div
          style={{
            opacity: spendingOpacity,
            scale: spendingScale,
            x: spendingX,
            transform: "translateZ(70px)",
            transformStyle: "preserve-3d",
          }}
          className="glass absolute -right-12 bottom-6 w-44 rounded-2xl p-4 shadow-[var(--shadow-card)] border border-white/10 bg-slate-900/60 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-450">Spending</span>
            <span className="p-1 rounded-lg bg-rose-500/10 text-rose-450">
              <ArrowDownRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <h4 className="text-xl font-extrabold text-white leading-none mt-1">{data.spending}</h4>
          <span className="text-[9px] text-slate-450 block mt-1 font-semibold">Operational expenditure</span>
        </motion.div>

        {/* 3. DETAIL CARD: GAUGE (75%) */}
        <motion.div
          style={{
            opacity: gaugeOpacity,
            scale: gaugeScale,
            y: gaugeY,
            transform: "translateZ(100px)",
            transformStyle: "preserve-3d",
          }}
          className="glass absolute top-[-60px] right-[-10px] w-40 rounded-2xl p-4 shadow-[var(--shadow-card)] border border-white/10 bg-slate-900/60 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <Activity className="w-3.5 h-3.5" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-450">Capacity</span>
          </div>
          <div className="flex items-end gap-2">
            <h4 className="text-2xl font-extrabold text-white leading-none">{data.gauge}</h4>
            <span className="text-[9px] text-emerald-450 font-bold mb-0.5">Optimal</span>
          </div>
          {/* Simple animated gauge bar */}
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <motion.div 
              style={{
                width: useTransform(gaugeOpacity, (o) => `${o * 75}%`),
              }}
              className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full" 
            />
          </div>
        </motion.div>

        {/* 4. DETAIL CHIP: USER LABEL */}
        <motion.div
          style={{
            opacity: userOpacity,
            scale: userScale,
            y: userY,
            transform: "translateZ(120px)",
            transformStyle: "preserve-3d",
          }}
          className="glass absolute left-12 bottom-[-20px] rounded-full pl-2.5 pr-4 py-1.5 shadow-[var(--shadow-card)] border border-white/10 bg-slate-900/80 backdrop-blur-xl flex items-center gap-2"
        >
          <div className="relative flex h-5 w-5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-gradient-to-br from-blue-500 to-indigo-600 text-[10px] font-bold text-white items-center justify-center">
              <Users className="w-3 h-3 text-white" />
            </span>
          </div>
          <span className="text-xs font-bold text-white tracking-wide">{data.userLabel}</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
