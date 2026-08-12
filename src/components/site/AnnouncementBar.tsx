"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export function AnnouncementBar({ text, url, label }: { text: string; url?: string; label?: string }) {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    try {
      setHidden(sessionStorage.getItem("ts-announce-dismissed") === "1");
    } catch {
      setHidden(false);
    }
  }, []);

  if (hidden) return null;

  return (
    <div className="relative z-40 bg-[linear-gradient(120deg,var(--color-primary-700),var(--color-secondary-700))] text-white">
      <div className="container-page flex items-center justify-center gap-3 py-2 text-center text-sm">
        <p className="font-medium">
          {text}{" "}
          {url && label && (
            <Link href={url} className="underline underline-offset-2 hover:opacity-90">
              {label} →
            </Link>
          )}
        </p>
        <button
          onClick={() => {
            setHidden(true);
            try {
              sessionStorage.setItem("ts-announce-dismissed", "1");
            } catch {
              /* ignore */
            }
          }}
          aria-label="Dismiss announcement"
          className="absolute right-4 grid h-6 w-6 place-items-center rounded-full hover:bg-white/20"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
