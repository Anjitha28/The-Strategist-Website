"use client";

import { Linkedin, Facebook, Twitter, MessageCircle, Link2, Check } from "lucide-react";
import { useState } from "react";

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : "";
  const enc = encodeURIComponent;

  const links = [
    { icon: Linkedin, label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { icon: Facebook, label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { icon: Twitter, label: "X", href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}` },
    { icon: MessageCircle, label: "WhatsApp", href: `https://wa.me/?text=${enc(`${title} ${url}`)}` },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm text-[var(--muted)]">Share</span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${l.label}`}
          className="grid h-9 w-9 place-items-center rounded-full bg-[var(--surface-2)] text-[var(--muted)] transition-colors hover:bg-primary-600 hover:text-white"
        >
          <l.icon className="h-4 w-4" />
        </a>
      ))}
      <button
        onClick={copy}
        aria-label="Copy link"
        className="grid h-9 w-9 place-items-center rounded-full bg-[var(--surface-2)] text-[var(--muted)] transition-colors hover:bg-primary-600 hover:text-white"
      >
        {copied ? <Check className="h-4 w-4 text-success-500" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
