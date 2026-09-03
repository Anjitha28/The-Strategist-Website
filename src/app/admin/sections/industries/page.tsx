"use client";

import { useState, useEffect } from "react";
import AdminShell from "../../_components/AdminShell";
import {
  Building2,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
} from "lucide-react";

const DEFAULT_INDUSTRIES_SECTION = {
  eyebrow: "Industries",
  heading: "Solutions Built For Every Industry",
  description:
    "Tailored analytics frameworks and automated systems engineered to solve industry-specific operations and workflows.",
  industries: [
    { name: "Education", desc: "K-12 & Higher Ed Analytics", icon: "🎓" },
    { name: "Healthcare", desc: "Clinical & Operations Intelligence", icon: "🏥" },
    { name: "Manufacturing", desc: "Supply Chain & IoT Tracking", icon: "⚙️" },
    { name: "Retail & E-Com", desc: "Omnichannel & Customer Analytics", icon: "🛍️" },
    { name: "Financial Services", desc: "Banking, Risk & Portfolio Analytics", icon: "💳" },
    { name: "Startups & Scaleups", desc: "Seed to Series Growth Metrics", icon: "🚀" },
    { name: "SMEs & Mid-Market", desc: "Operational Efficiency & Modernization", icon: "📈" },
    { name: "Large Enterprises", desc: "Scalable Enterprise Automation", icon: "🏢" },
  ],
};

export default function IndustriesSectionEditor() {
  const [formData, setFormData] = useState(DEFAULT_INDUSTRIES_SECTION);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSection() {
      try {
        const res = await fetch("/api/admin/sections?key=industries&page=home");
        const json = await res.json();
        if (json.ok && json.section?.data) {
          setFormData({ ...DEFAULT_INDUSTRIES_SECTION, ...json.section.data });
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
          key: "industries",
          title: "Industries Section",
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

  function handleAddIndustry() {
    setFormData({
      ...formData,
      industries: [
        ...formData.industries,
        {
          name: "New Industry",
          desc: "Industry-specific operational analytics & workflows.",
          icon: "🌐",
        },
      ],
    });
  }

  function handleDeleteIndustry(index: number) {
    if (formData.industries.length <= 1) {
      alert("At least one industry card must remain in this section.");
      return;
    }
    if (confirm("Delete this industry card?")) {
      const updated = formData.industries.filter((_, i) => i !== index);
      setFormData({ ...formData, industries: updated });
    }
  }

  function handleMoveIndustry(index: number, direction: "up" | "down") {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= formData.industries.length) return;

    const updated = [...formData.industries];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setFormData({ ...formData, industries: updated });
  }

  function handleUpdateIndustry(index: number, field: string, value: string) {
    const updated = [...formData.industries];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, industries: updated });
  }

  function handleReset() {
    if (confirm("Reset Industries to default content?")) {
      setFormData(DEFAULT_INDUSTRIES_SECTION);
    }
  }

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center p-20 text-[#56666b]">
          <Loader2 className="h-6 w-6 animate-spin text-[#18b8ad] mr-2" />
          <span>Loading Industries editor...</span>
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
              <Building2 className="h-4 w-4" />
              <span>Section & Cards Editor (Group 3)</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#071820] tracking-tight">
              Solutions Built For Every Industry
            </h1>
            <p className="text-xs text-[#56666b] mt-0.5">
              Manage the 8 industry operational cards rendered on the homepage.
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
              href="/#industries"
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

        {/* Form Container */}
        <form onSubmit={handleSave} className="space-y-8">
          {/* Main Section Header Fields */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#dce6ee] shadow-xs space-y-5">
            <h2 className="text-base font-extrabold text-[#071820] border-b border-[#dce6ee] pb-3">
              Section Header & Eyebrow
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                  Eyebrow Label
                </label>
                <input
                  type="text"
                  value={formData.eyebrow}
                  onChange={(e) => setFormData({ ...formData, eyebrow: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-xs font-bold text-[#071820] focus:bg-white focus:border-[#18b8ad] focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                  Main Section Heading
                </label>
                <input
                  type="text"
                  value={formData.heading}
                  onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-sm font-extrabold text-[#071820] focus:bg-white focus:border-[#18b8ad] focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#071820] uppercase tracking-wider mb-2">
                Section Description Text
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-xs text-[#071820] leading-relaxed focus:bg-white focus:border-[#18b8ad] focus:outline-none transition-all resize-y"
                required
              />
            </div>
          </div>

          {/* Industry Cards Manager */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-extrabold text-[#071820] tracking-tight">
                  Industry Cards ({formData.industries.length} Total)
                </h2>
                <p className="text-xs text-[#56666b] mt-0.5">
                  Cards render on the live site using unified #F1F6FA backgrounds.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddIndustry}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#18b8ad] text-[#071820] text-xs font-extrabold hover:bg-[#159f95] hover:text-white transition-all shadow-xs cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Industry</span>
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {formData.industries.map((ind, idx) => (
                <div
                  key={idx}
                  className="bg-[#F1F6FA] p-6 rounded-2xl border border-[#dce6ee] shadow-xs flex flex-col justify-between space-y-4 relative group"
                >
                  <div className="flex items-center justify-between border-b border-[#dce6ee] pb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#18b8ad]">
                      Item {String(idx + 1).padStart(2, "0")}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveIndustry(idx, "up")}
                        disabled={idx === 0}
                        className="p-1 rounded bg-white text-[#56666b] hover:text-[#071820] disabled:opacity-30 cursor-pointer shadow-2xs"
                        title="Move Up"
                      >
                        <ArrowUp className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveIndustry(idx, "down")}
                        disabled={idx === formData.industries.length - 1}
                        className="p-1 rounded bg-white text-[#56666b] hover:text-[#071820] disabled:opacity-30 cursor-pointer shadow-2xs"
                        title="Move Down"
                      >
                        <ArrowDown className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteIndustry(idx)}
                        className="p-1 rounded bg-white text-red-500 hover:text-red-700 cursor-pointer shadow-2xs ml-1"
                        title="Delete Industry"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-4 gap-2">
                      <div className="col-span-1">
                        <label className="block text-[10px] font-extrabold text-[#071820] uppercase tracking-wider mb-1">
                          Icon
                        </label>
                        <input
                          type="text"
                          value={ind.icon}
                          onChange={(e) => handleUpdateIndustry(idx, "icon", e.target.value)}
                          className="w-full px-2 py-2 bg-white border border-[#dce6ee] rounded-lg text-base text-center text-[#071820] focus:border-[#18b8ad] focus:outline-none"
                          required
                        />
                      </div>
                      <div className="col-span-3">
                        <label className="block text-[10px] font-extrabold text-[#071820] uppercase tracking-wider mb-1">
                          Industry Name
                        </label>
                        <input
                          type="text"
                          value={ind.name}
                          onChange={(e) => handleUpdateIndustry(idx, "name", e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-[#dce6ee] rounded-lg text-xs font-bold text-[#071820] focus:border-[#18b8ad] focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-[#071820] uppercase tracking-wider mb-1">
                        Operational Subtitle
                      </label>
                      <textarea
                        rows={3}
                        value={ind.desc}
                        onChange={(e) => handleUpdateIndustry(idx, "desc", e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#dce6ee] rounded-lg text-xs text-[#56666b] leading-relaxed focus:border-[#18b8ad] focus:outline-none resize-none"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
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
