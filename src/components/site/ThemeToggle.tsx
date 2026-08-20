"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = setTimeout(() => {
      setMounted(true);
      const current = document.documentElement.getAttribute("data-theme");
      setTheme(current === "nebula" ? "dark" : "light");
    }, 0);
    return () => clearTimeout(handle);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    
    let themeValue = "aurora";
    if (next === "dark") {
      themeValue = "nebula";
    } else {
      themeValue = localStorage.getItem("ts-preferred-light") || "aurora";
    }

    document.documentElement.setAttribute("data-theme", themeValue);
    try {
      localStorage.setItem("ts-theme", themeValue);
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`grid h-10 w-10 place-items-center rounded-full glass text-[var(--fg)] transition-transform hover:scale-105 ${className ?? ""}`}
    >
      {mounted && theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
    </button>
  );
}
