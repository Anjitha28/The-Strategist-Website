"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-success-500/10 px-4 py-3 text-sm font-medium text-success-600">
        <Check className="h-4 w-4" /> You&apos;re subscribed. Thank you!
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2.5">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
        aria-label="Full name"
        className="w-full rounded-xl border border-[var(--border-color)]/70 bg-[var(--surface-2)] px-4 py-2.5 text-sm text-[var(--fg)] placeholder:text-[var(--muted)]/70 transition-all duration-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20"
      />
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          aria-label="Email address"
          className="w-full rounded-xl border border-[var(--border-color)]/70 bg-[var(--surface-2)] px-4 py-2.5 text-sm text-[var(--fg)] placeholder:text-[var(--muted)]/70 transition-all duration-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          aria-label="Subscribe"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-60 shadow-md shadow-blue-500/10"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {state === "error" && <p className="text-xs text-error-500">Something went wrong. Please try again.</p>}
    </form>
  );
}
