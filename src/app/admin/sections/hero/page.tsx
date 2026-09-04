"use client";

import { useState, useEffect } from "react";
import AdminShell from "../../_components/AdminShell";
import Image from "next/image";
import {
  Sparkles,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Eye,
} from "lucide-react";

const DEFAULT_HERO = {
  eyebrow: "ANALYTICS • AUTOMATION • TECHNOLOGY • TRANSFORMATION",
  heading: "Transform Data Into",
  tagline: "Business Growth.",
  body: "We partner with businesses and enterprises to build intelligent analytics platforms, automate reporting workflows, modernize operations, and enable data-driven decision making.",
  ctaLabel: "Schedule a Consultation",
  ctaHref: "/contact",
};

export default function HeroSectionEditor() {
  const [formData, setFormData] = useState(DEFAULT_HERO);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSection() {
      try {
        const res = await fetch("/api/admin/sections?key=hero&page=home");
        const json = await res.json();
        if (json.ok && json.section?.data) {
          setFormData({ ...DEFAULT_HERO, ...json.section.data });
        }
      } catch {
        // Use defaults
      } finally {
        setLoading(false);
      }
    }
    loadSection();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError("");

    try {
      const res = await fetch("/api/admin/sections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageSlug: "home",
          key: "hero",
          title: "Homepage Hero Section",
          data: formData,
        }),
      });

      const json = await res.json();
      if (json.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError(json.error || "Failed to save changes.");
      }
    } catch {
      setError("Network error — could not save section.");
    } finally {
      setSaving(false);
    }
  }

  function handleReset() {
    if (confirm("Reset Hero Section to default content?")) {
      setFormData(DEFAULT_HERO);
    }
  }

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center p-20 text-[#56666b]">
          <Loader2 className="h-6 w-6 animate-spin text-[#18b8ad] mr-2" />
          <span>Loading Hero editor...</span>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#dce6ee]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#18b8ad] mb-1">
              <Sparkles className="h-4 w-4" />
              <span>Section Editor</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#071820] tracking-tight">
              Hero Banner Section
            </h1>
            <p className="text-xs text-[#56666b] mt-0.5">
              Customize the main headline, tagline, supporting text, and CTA button displayed at the top of the homepage.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#dce6ee] bg-white text-xs font-bold text-[#56666b] hover:text-[#071820] hover:bg-[#F1F6FA] transition-all cursor-pointer shadow-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Defaults</span>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#dce6ee] bg-[#F1F6FA] text-xs font-bold text-[#071820] hover:border-[#18b8ad] hover:text-[#18b8ad] transition-all"
            >
              <Eye className="h-3.5 w-3.5 text-[#18b8ad]" />
              <span>Preview Live</span>
            </a>
          </div>
        </div>

        {/* Notifications */}
        {success && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Changes saved successfully. The public homepage is updated in real-time.</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Form and Preview Split */}
        <form onSubmit={handleSave} className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Form Fields */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#dce6ee] shadow-xs space-y-6">
            <h2 className="text-base font-extrabold text-[#071820] border-b border-[#dce6ee] pb-3">
              Hero Content Fields
            </h2>

            <div>
              <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                Top Eyebrow Label
              </label>
              <input
                type="text"
                value={formData.eyebrow}
                onChange={(e) => setFormData({ ...formData, eyebrow: e.target.value })}
                className="w-full px-4 py-3 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-xs font-bold text-[#071820] focus:bg-white focus:border-[#18b8ad] focus:outline-none transition-all"
                placeholder="ANALYTICS • AUTOMATION • TECHNOLOGY • TRANSFORMATION"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                  Main Headline (Prefix)
                </label>
                <input
                  type="text"
                  value={formData.heading}
                  onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-sm font-extrabold text-[#071820] focus:bg-white focus:border-[#18b8ad] focus:outline-none transition-all"
                  placeholder="Transform Data Into"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                  Highlighted Tagline (Teal)
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-sm font-extrabold text-[#18b8ad] focus:bg-white focus:border-[#18b8ad] focus:outline-none transition-all"
                  placeholder="Business Growth."
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                Hero Description Body Text
              </label>
              <textarea
                rows={4}
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                className="w-full px-4 py-3 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-xs sm:text-sm text-[#071820] leading-relaxed focus:bg-white focus:border-[#18b8ad] focus:outline-none transition-all resize-y"
                placeholder="Enter compelling description of The Strategist services..."
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={formData.ctaLabel}
                  onChange={(e) => setFormData({ ...formData, ctaLabel: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-xs font-bold text-[#071820] focus:bg-white focus:border-[#18b8ad] focus:outline-none transition-all"
                  placeholder="Schedule a Consultation"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                  CTA Button Link URL
                </label>
                <input
                  type="text"
                  value={formData.ctaHref}
                  onChange={(e) => setFormData({ ...formData, ctaHref: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-xs font-bold text-[#071820] focus:bg-white focus:border-[#18b8ad] focus:outline-none transition-all"
                  placeholder="/contact"
                  required
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#dce6ee] flex items-center justify-between">
              <span className="text-xs text-[#8a979b]">Click save to apply changes to the live site.</span>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#071820] text-white font-extrabold text-xs hover:bg-[#0d2f3a] focus:ring-2 focus:ring-[#18b8ad] transition-all shadow-sm disabled:opacity-60 cursor-pointer"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-[#18b8ad]" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 text-[#18b8ad]" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Live Card Preview */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white p-6 rounded-2xl border border-[#dce6ee] shadow-xs">
              <div className="flex items-center justify-between mb-4 border-b border-[#dce6ee] pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-[#071820]">
                  Live Component Preview
                </span>
                <span className="text-[10px] text-[#18b8ad] font-bold bg-[#e7f6f4] px-2.5 py-0.5 rounded-full border border-[#18b8ad]/20">
                  Real-time
                </span>
              </div>

              {/* Preview Box */}
              <div className="p-6 rounded-2xl bg-white border border-[#dce6ee] space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#159f95] block">
                  {formData.eyebrow || "EYEBROW LABEL"}
                </span>

                <h3 className="text-2xl font-extrabold text-[#071820] tracking-tight leading-tight">
                  {formData.heading || "Transform Data Into"}{" "}
                  <span className="text-[#18b8ad] block sm:inline">
                    {formData.tagline || "Business Growth."}
                  </span>
                </h3>

                <p className="text-xs text-[#56666b] leading-relaxed">
                  {formData.body || "Hero description preview..."}
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-extrabold bg-[#071820] text-white shadow-sm">
                    {formData.ctaLabel || "Schedule a Consultation"} →
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Asset Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#dce6ee] shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#071820] mb-3">
                Active Hero Visual Asset
              </h3>
              <div className="relative aspect-video w-full rounded-xl bg-[#071820] overflow-hidden border border-[#18b8ad]/20 flex items-center justify-center p-4">
                <div className="relative w-full h-full">
                  <Image
                    src="/brand/hero-visual-final.png"
                    alt="Hero Visual Asset"
                    fill
                    className="object-contain object-right"
                  />
                </div>
              </div>
              <p className="text-[11px] text-[#8a979b] mt-3">
                Hero background illustration is locked to the high-resolution brand asset (/brand/hero-visual-final.png).
              </p>
            </div>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
