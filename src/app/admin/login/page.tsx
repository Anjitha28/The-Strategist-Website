"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Invalid credentials. Please check your username and password.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Unable to connect to the server. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#071820] relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#18b8ad]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#18b8ad]/5 blur-[100px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top Navbar Header */}
      <header className="w-full px-6 py-5 flex items-center justify-between border-b border-white/10 relative z-10">
        <a href="/" className="flex items-center gap-3 transition-opacity hover:opacity-85">
          <div className="relative h-8 w-36">
            <Image
              src="/brand/strategist-logo.png"
              alt="The Strategist"
              fill
              className="object-contain object-left brightness-0 invert"
              priority
            />
          </div>
        </a>
        <div className="flex items-center gap-2 text-xs font-bold text-[#8a979b] bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
          <ShieldCheck className="h-4 w-4 text-[#18b8ad]" />
          <span>Secure Admin Portal</span>
        </div>
      </header>

      {/* Center Login Card */}
      <main className="w-full flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#e7f6f4] text-[#18b8ad] mb-4 border border-[#18b8ad]/20 shadow-xs">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071820] tracking-tight">
              Admin Login
            </h1>
            <p className="text-sm text-[#56666b] mt-1.5">
              Sign in to manage The Strategist website content
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-xs font-semibold animate-in fade-in">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                User ID / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8a979b]">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@thestrategist.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-sm text-[#071820] placeholder-[#8a979b] focus:outline-none focus:border-[#18b8ad] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8a979b]">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-sm text-[#071820] placeholder-[#8a979b] focus:outline-none focus:border-[#18b8ad] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8a979b] hover:text-[#071820] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#071820] text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-[#0d2f3a] focus:ring-2 focus:ring-[#18b8ad] focus:outline-none transition-all shadow-md disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-[#18b8ad]" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight className="h-4 w-4 text-[#18b8ad]" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#dce6ee] flex items-center justify-between text-xs text-[#8a979b]">
            <a href="/" className="hover:text-[#18b8ad] transition-colors font-medium">
              ← Return to public website
            </a>
            <span className="font-semibold text-[#18b8ad]">The Strategist v1.0</span>
          </div>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="w-full py-4 text-center text-xs text-white/40 border-t border-white/5 relative z-10">
        &copy; {new Date().getFullYear()} The Strategist. Protected administrative area.
      </footer>
    </div>
  );
}
