"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import type { NavItem, HeaderSettings } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { SearchOverlay } from "./SearchOverlay";

export function Header({ items, settings }: { items: NavItem[]; settings: HeaderSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMega(null);
  }, [pathname]);

  const isActive = (url: string) => (url === "/" ? pathname === "/" : pathname.startsWith(url));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500 w-full",
        scrolled ? "py-2.5" : "py-4 sm:py-5",
      )}
    >
      <div className="container-page">
        <div
          className={cn(
            "flex items-center justify-between gap-4 rounded-[22px] px-5 transition-all duration-500 border border-[var(--border-color)]/50 shadow-[0_8px_30px_rgb(0,0,0,0.01)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)]",
            scrolled ? "glass py-2.5" : "bg-[var(--surface)]/90 backdrop-blur-md py-3 sm:py-3.5",
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2 hover:scale-[1.02] transition-transform" aria-label={settings.siteName}>
            <Image
              src={settings.logoUrl}
              alt={settings.siteName}
              width={168}
              height={44}
              priority
              className="h-8 w-auto sm:h-9"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1.5 lg:flex" aria-label="Primary">
            {items.map((item) => {
              const hasMega = item.children.length > 0;
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => hasMega && setOpenMega(item.id)}
                  onMouseLeave={() => hasMega && setOpenMega(null)}
                >
                  <Link
                    href={item.url}
                    className={cn(
                      "group relative flex items-center gap-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300",
                      isActive(item.url) ? "text-[#18B8AD]" : "text-[#56666B] hover:text-[#18B8AD]",
                    )}
                  >
                    {item.label}
                    {hasMega && <ChevronDown className="h-3.5 w-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-350" />}
                    <span
                      className={cn(
                        "absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-[#18B8AD] transition-transform duration-300",
                        isActive(item.url) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>

                  <AnimatePresence>
                    {hasMega && openMega === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-1/2 top-full z-50 w-[580px] -translate-x-1/2 pt-3"
                      >
                        <div className="glass border border-[#DCE6E7] grid grid-cols-2 gap-2 rounded-[28px] p-4 shadow-2xl">
                          {item.children.map((child) => (
                            <Link
                              key={child.id}
                              href={child.url}
                              className="group flex items-start gap-3.5 rounded-2xl p-3.5 transition-all duration-300 hover:bg-[var(--surface-2)]/90 hover:scale-[1.02]"
                            >
                              <span className="mt-0.5 grid h-9.5 w-9.5 shrink-0 place-items-center rounded-xl bg-gradient-to-tr from-[#071820] to-[#18B8AD] text-white shadow-sm">
                                <Icon name={child.icon ?? "sparkles"} className="h-4.5 w-4.5" />
                              </span>
                              <span className="flex flex-col">
                                <span className="text-sm font-bold text-[#071820] group-hover:text-[#18B8AD] transition-colors">{child.label}</span>
                                {child.description && (
                                  <span className="mt-1 text-xs leading-snug text-[var(--muted)]">{child.description}</span>
                                )}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <SearchOverlay />
            <ThemeToggle className="hidden sm:grid" />
            <Button href="/contact" size="sm" className="hidden md:inline-flex font-bold bg-[#071820] text-white hover:bg-[#18B8AD] border-0 transition-colors duration-300">
              Let's Talk &rarr;
            </Button>
            <button
              className="grid h-10 w-10 place-items-center rounded-full glass text-[var(--fg)] lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-50 w-[86%] max-w-sm overflow-y-auto bg-[var(--surface)] p-6 shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display text-lg font-bold">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full bg-[var(--surface-2)]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {items.map((item) => (
                  <div key={item.id} className="border-b border-[var(--border-color)] py-1 last:border-0">
                    <Link
                      href={item.url}
                      className={cn(
                        "block rounded-xl px-3 py-3 text-base font-medium",
                        isActive(item.url) ? "text-primary-600" : "text-[var(--fg)]",
                      )}
                    >
                      {item.label}
                    </Link>
                     {item.children.length > 0 && (
                      <div className="ml-3 flex flex-col gap-0.5 pb-2">
                        {item.children.map((c) => (
                          <Link key={c.id} href={c.url} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--muted)]">
                            <Icon name={c.icon ?? "sparkles"} className="h-4 w-4 text-[#18B8AD]" />
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="mt-6 flex items-center gap-3">
                <Button href="/contact" className="flex-1 bg-[#071820] text-white hover:bg-[#18B8AD]">Let's Talk &rarr;</Button>
                <ThemeToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
