"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
  id?: string;
};

/** Scroll-triggered fade-up reveal. */
export function Reveal({ children, delay = 0, y = 24, className, as = "div", id }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const MotionTag = motion[as];

  if (!mounted) {
    const Tag = as;
    return <Tag className={className} id={id} suppressHydrationWarning>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      id={id}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      suppressHydrationWarning
    >
      {children}
    </MotionTag>
  );
}

/** Stagger container for a grid of Reveal children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={className} suppressHydrationWarning>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
      suppressHydrationWarning
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, y = 24 }: { children: ReactNode; className?: string; y?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={className} suppressHydrationWarning>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      }}
      suppressHydrationWarning
    >
      {children}
    </motion.div>
  );
}
