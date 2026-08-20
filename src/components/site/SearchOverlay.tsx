"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

type Result = { title: string; url: string; type: string; excerpt?: string };

const POPULAR = ["Power BI", "Business Intelligence", "Report Automation", "Careers", "Corporate Solutions"];

export function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    if (!q.trim()) {
      const handle = setTimeout(() => {
        setResults([]);
      }, 0);
      return () => clearTimeout(handle);
    }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setResults(data.results ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="grid h-10 w-10 place-items-center rounded-full glass text-[var(--fg)] transition-transform hover:scale-105"
      >
        <Search className="h-4.5 w-4.5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 p-4 pt-[12vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="w-full max-w-xl overflow-hidden rounded-3xl bg-[var(--surface)] shadow-2xl"
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-[var(--border-color)] px-5 py-4">
                <Search className="h-5 w-5 text-[var(--muted)]" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search pages, products, courses, articles…"
                  className="flex-1 bg-transparent text-base text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none"
                />
                <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full bg-[var(--surface-2)]">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[50vh] overflow-y-auto p-2">
                {!q.trim() && (
                  <div className="p-3">
                    <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Popular searches</p>
                    <div className="flex flex-wrap gap-2 px-2">
                      {POPULAR.map((p) => (
                        <button
                          key={p}
                          onClick={() => setQ(p)}
                          className="rounded-full bg-[var(--surface-2)] px-3 py-1.5 text-sm text-[var(--fg)] transition-colors hover:bg-primary-50 hover:text-primary-700"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {loading && <p className="p-4 text-sm text-[var(--muted)]">Searching…</p>}

                {!loading && q.trim() && results.length === 0 && (
                  <p className="p-4 text-sm text-[var(--muted)]">No results for “{q}”.</p>
                )}

                {results.map((r, i) => (
                  <Link
                    key={i}
                    href={r.url}
                    onClick={() => setOpen(false)}
                    className="flex flex-col gap-0.5 rounded-2xl px-4 py-3 transition-colors hover:bg-[var(--surface-2)]"
                  >
                    <span className="flex items-center gap-2">
                      <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary-700 dark:bg-primary-950/50 dark:text-primary-200">
                        {r.type}
                      </span>
                      <span className="text-sm font-semibold text-[var(--fg)]">{r.title}</span>
                    </span>
                    {r.excerpt && <span className="line-clamp-1 text-xs text-[var(--muted)]">{r.excerpt}</span>}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
