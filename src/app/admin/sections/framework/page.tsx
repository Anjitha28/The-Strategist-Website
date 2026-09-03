"use client";

import { useState, useEffect } from "react";
import AdminShell from "../../_components/AdminShell";
import {
  Workflow,
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

const DEFAULT_FRAMEWORK_SECTION = {
  eyebrow: "Our Approach",
  heading: "A Proven Framework For Digital Transformation",
  description:
    "How we partner with organizations to turn complex data into clear, lasting business decisions and operational efficiency.",
  stages: [
    {
      num: "01",
      title: "Discover",
      desc: "Identify key challenges, gather stakeholder requirements, and audit existing data assets to establish a clear digital roadmap.",
    },
    {
      num: "02",
      title: "Design",
      desc: "Co-create tailored analytics and automation blueprints aligned with your operational workflows and KPIs.",
    },
    {
      num: "03",
      title: "Build & Deploy",
      desc: "Develop and deploy high-performance dashboards, report automation pipelines, and platforms with precision.",
    },
    {
      num: "04",
      title: "Optimize & Enable",
      desc: "Provide continuous refinement, performance tuning, and hands-on team enablement for sustainable outcomes.",
    },
  ],
};

export default function FrameworkSectionEditor() {
  const [formData, setFormData] = useState(DEFAULT_FRAMEWORK_SECTION);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSection() {
      try {
        const res = await fetch("/api/admin/sections?key=framework&page=home");
        const json = await res.json();
        if (json.ok && json.section?.data) {
          setFormData({ ...DEFAULT_FRAMEWORK_SECTION, ...json.section.data });
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
          key: "framework",
          title: "Proven Framework Section",
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

  function handleAddStage() {
    const nextNum = String(formData.stages.length + 1).padStart(2, "0");
    setFormData({
      ...formData,
      stages: [
        ...formData.stages,
        {
          num: nextNum,
          title: "New Stage",
          desc: "Description of this transformation process stage.",
        },
      ],
    });
  }

  function handleDeleteStage(index: number) {
    if (formData.stages.length <= 1) {
      alert("At least one stage card must remain in this section.");
      return;
    }
    if (confirm("Delete this stage card?")) {
      const updated = formData.stages.filter((_, i) => i !== index);
      setFormData({ ...formData, stages: updated });
    }
  }

  function handleMoveStage(index: number, direction: "up" | "down") {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= formData.stages.length) return;

    const updated = [...formData.stages];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setFormData({ ...formData, stages: updated });
  }

  function handleUpdateStage(index: number, field: string, value: string) {
    const updated = [...formData.stages];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, stages: updated });
  }

  function handleReset() {
    if (confirm("Reset Proven Framework to default content?")) {
      setFormData(DEFAULT_FRAMEWORK_SECTION);
    }
  }

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center p-20 text-[#56666b]">
          <Loader2 className="h-6 w-6 animate-spin text-[#18b8ad] mr-2" />
          <span>Loading Framework editor...</span>
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
              <Workflow className="h-4 w-4" />
              <span>Section & Cards Editor (Group 2)</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#071820] tracking-tight">
              Proven Framework Section
            </h1>
            <p className="text-xs text-[#56666b] mt-0.5">
              Manage the 4 digital transformation methodology stage cards rendered on the homepage.
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
              href="/#approach"
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

          {/* Stages Manager */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-extrabold text-[#071820] tracking-tight">
                  Framework Stages ({formData.stages.length} Total)
                </h2>
                <p className="text-xs text-[#56666b] mt-0.5">
                  Stages render on the live site using unified #F1F6FA backgrounds.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddStage}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#18b8ad] text-[#071820] text-xs font-extrabold hover:bg-[#159f95] hover:text-white transition-all shadow-xs cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Stage</span>
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {formData.stages.map((stage, idx) => (
                <div
                  key={idx}
                  className="bg-[#F1F6FA] p-6 rounded-2xl border border-[#dce6ee] shadow-xs flex flex-col justify-between space-y-4 relative group"
                >
                  <div className="flex items-center justify-between border-b border-[#dce6ee] pb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#18b8ad]">
                      Stage {stage.num || String(idx + 1).padStart(2, "0")}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveStage(idx, "up")}
                        disabled={idx === 0}
                        className="p-1 rounded bg-white text-[#56666b] hover:text-[#071820] disabled:opacity-30 cursor-pointer shadow-2xs"
                        title="Move Left/Up"
                      >
                        <ArrowUp className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveStage(idx, "down")}
                        disabled={idx === formData.stages.length - 1}
                        className="p-1 rounded bg-white text-[#56666b] hover:text-[#071820] disabled:opacity-30 cursor-pointer shadow-2xs"
                        title="Move Right/Down"
                      >
                        <ArrowDown className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteStage(idx)}
                        className="p-1 rounded bg-white text-red-500 hover:text-red-700 cursor-pointer shadow-2xs ml-1"
                        title="Delete Stage"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-1">
                        <label className="block text-[10px] font-extrabold text-[#071820] uppercase tracking-wider mb-1">
                          No.
                        </label>
                        <input
                          type="text"
                          value={stage.num}
                          onChange={(e) => handleUpdateStage(idx, "num", e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-[#dce6ee] rounded-lg text-xs font-bold text-center text-[#071820] focus:border-[#18b8ad] focus:outline-none"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] font-extrabold text-[#071820] uppercase tracking-wider mb-1">
                          Stage Title
                        </label>
                        <input
                          type="text"
                          value={stage.title}
                          onChange={(e) => handleUpdateStage(idx, "title", e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-[#dce6ee] rounded-lg text-xs font-bold text-[#071820] focus:border-[#18b8ad] focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-[#071820] uppercase tracking-wider mb-1">
                        Description
                      </label>
                      <textarea
                        rows={4}
                        value={stage.desc}
                        onChange={(e) => handleUpdateStage(idx, "desc", e.target.value)}
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
