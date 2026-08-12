"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type QA = { id: string; question: string; answer: string };

export function Accordion({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "overflow-hidden rounded-2xl border transition-colors",
              isOpen
                ? "border-primary-200 bg-[var(--surface)] shadow-[var(--shadow-card)] dark:border-primary-800"
                : "border-[var(--border-color)] bg-[var(--surface)]",
            )}
          >
            <button
              onClick={() => setOpen(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
            >
              <span className="text-base font-semibold sm:text-lg">{item.question}</span>
              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300",
                  isOpen ? "rotate-45 bg-primary-600 text-white" : "bg-[var(--surface-2)] text-[var(--muted)]",
                )}
              >
                <Plus className="h-4 w-4" strokeWidth={2.25} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-5 pb-6 text-[var(--muted)] leading-relaxed sm:px-6">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
