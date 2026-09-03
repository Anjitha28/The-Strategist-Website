"use client";

import { useState, useEffect } from "react";
import AdminShell from "../../_components/AdminShell";
import {
  Columns,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
} from "lucide-react";

const DEFAULT_SPLIT_SECTION = {
  products: {
    eyebrow: "Technology Products",
    title: "Proprietary Technology Platforms",
    desc: "Purpose-built platforms — GradeScope, Proctrix, BeInTrack — designed to solve practical reporting, assessment, and institutional operations.",
    linkText: "Explore Products",
    linkHref: "/products",
    items: [
      { name: "GradeScope", desc: "Academic reporting" },
      { name: "Proctrix", desc: "Exam assessment" },
      { name: "BeInTrack", desc: "Process analytics" },
    ],
  },
  education: {
    eyebrow: "Education & Enablement",
    title: "Educational Solutions",
    desc: "We bridge the gap between academic learning and industry requirements through practical analytics curriculum, certifications, and institutional platforms.",
    linkText: "View Educational Solutions",
    linkHref: "/solutions/educational",
    tags: ["Academic Analytics", "Curriculum Dev", "Assessment Tools", "Industry Programs"],
  },
};

export default function SplitPanelsSectionEditor() {
  const [formData, setFormData] = useState(DEFAULT_SPLIT_SECTION);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSection() {
      try {
        const res = await fetch("/api/admin/sections?key=split-panels&page=home");
        const json = await res.json();
        if (json.ok && json.section?.data) {
          setFormData({ ...DEFAULT_SPLIT_SECTION, ...json.section.data });
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
          key: "split-panels",
          title: "Technology & Education Split Panels",
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
    if (confirm("Reset Split Panels to default content?")) {
      setFormData(DEFAULT_SPLIT_SECTION);
    }
  }

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center p-20 text-[#56666b]">
          <Loader2 className="h-6 w-6 animate-spin text-[#18b8ad] mr-2" />
          <span>Loading Split Panels editor...</span>
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
              <Columns className="h-4 w-4" />
              <span>Section Editor</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#071820] tracking-tight">
              Technology & Education Split Panels
            </h1>
            <p className="text-xs text-[#56666b] mt-0.5">
              Manage the two dual-column feature cards on the homepage (Proprietary Platforms and Educational Solutions).
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

        <form onSubmit={handleSave} className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Panel 1: Technology Products */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#dce6ee] shadow-xs space-y-5">
              <h2 className="text-base font-extrabold text-[#071820] border-b border-[#dce6ee] pb-3">
                Panel 1: Technology Products
              </h2>

              <div>
                <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                  Eyebrow Label
                </label>
                <input
                  type="text"
                  value={formData.products.eyebrow}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      products: { ...formData.products, eyebrow: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-xs font-bold text-[#071820] focus:bg-white focus:border-[#18b8ad] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                  Panel Title
                </label>
                <input
                  type="text"
                  value={formData.products.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      products: { ...formData.products, title: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-sm font-extrabold text-[#071820] focus:bg-white focus:border-[#18b8ad] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.products.desc}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      products: { ...formData.products, desc: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-xs text-[#071820] leading-relaxed focus:bg-white focus:border-[#18b8ad] focus:outline-none resize-none"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.products.linkText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        products: { ...formData.products, linkText: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-xs font-bold text-[#071820] focus:bg-white focus:border-[#18b8ad] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                    Button Link
                  </label>
                  <input
                    type="text"
                    value={formData.products.linkHref}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        products: { ...formData.products, linkHref: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-xs font-bold text-[#071820] focus:bg-white focus:border-[#18b8ad] focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Panel 2: Educational Solutions */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#dce6ee] shadow-xs space-y-5">
              <h2 className="text-base font-extrabold text-[#071820] border-b border-[#dce6ee] pb-3">
                Panel 2: Educational Solutions
              </h2>

              <div>
                <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                  Eyebrow Label
                </label>
                <input
                  type="text"
                  value={formData.education.eyebrow}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      education: { ...formData.education, eyebrow: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-xs font-bold text-[#071820] focus:bg-white focus:border-[#18b8ad] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                  Panel Title
                </label>
                <input
                  type="text"
                  value={formData.education.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      education: { ...formData.education, title: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-sm font-extrabold text-[#071820] focus:bg-white focus:border-[#18b8ad] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.education.desc}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      education: { ...formData.education, desc: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-xs text-[#071820] leading-relaxed focus:bg-white focus:border-[#18b8ad] focus:outline-none resize-none"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.education.linkText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        education: { ...formData.education, linkText: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-xs font-bold text-[#071820] focus:bg-white focus:border-[#18b8ad] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                    Button Link
                  </label>
                  <input
                    type="text"
                    value={formData.education.linkHref}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        education: { ...formData.education, linkHref: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-xs font-bold text-[#071820] focus:bg-white focus:border-[#18b8ad] focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Save Bar */}
          <div className="p-4 bg-white rounded-2xl border border-[#dce6ee] shadow-sm flex items-center justify-between sticky bottom-4 z-20">
            <span className="text-xs text-[#8a979b] font-medium">
              Save your updates to refresh the live public homepage.
            </span>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#071820] text-white font-extrabold text-xs hover:bg-[#0d2f3a] focus:ring-2 focus:ring-[#18b8ad] transition-all shadow-sm disabled:opacity-60 cursor-pointer"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-[#18b8ad]" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 text-[#18b8ad]" />
                  <span>Save All Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
