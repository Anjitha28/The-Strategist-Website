"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { saveCourse, deleteCourse } from "@/app/admin/actions";
import { ArrowLeft, Save, Trash2, Plus, X, Loader2, CheckCircle2, AlertCircle, Eye } from "lucide-react";
import Link from "next/link";

interface CurriculumModule {
  title: string;
  lessons: string[];
}

interface CourseData {
  id?: string;
  title: string;
  slug: string;
  level: string;
  duration: string;
  language: string;
  instructor: string;
  modulesCount: number;
  shortDescription: string;
  description: string;
  objectives: string[];
  audience: string[];
  prerequisites: string[];
  curriculum: CurriculumModule[];
  certificate: boolean;
  featured: boolean;
  order: number;
  status: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

export function CourseForm({ initialData }: { initialData: CourseData | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [banner, setBanner] = useState<{ ok: boolean; msg: string } | null>(null);

  const [form, setForm] = useState<CourseData>(
    initialData || {
      title: "",
      slug: "",
      level: "Beginner",
      duration: "",
      language: "English",
      instructor: "",
      modulesCount: 0,
      shortDescription: "",
      description: "",
      objectives: [],
      audience: [],
      prerequisites: [],
      curriculum: [],
      certificate: true,
      featured: false,
      order: 0,
      status: "published",
      seoTitle: "",
      seoDescription: "",
    }
  );

  const [newObj, setNewObj] = useState("");
  const [newAud, setNewAud] = useState("");
  const [newPre, setNewPre] = useState("");

  // Curriculum Editor state helpers
  const [newModTitle, setNewModTitle] = useState("");
  const [newLessonText, setNewLessonText] = useState<Record<number, string>>({});

  const handleChange = (field: keyof CourseData, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleAddObjective = () => {
    if (!newObj.trim()) return;
    setForm({ ...form, objectives: [...form.objectives, newObj.trim()] });
    setNewObj("");
  };

  const handleRemoveObjective = (index: number) => {
    setForm({ ...form, objectives: form.objectives.filter((_, i) => i !== index) });
  };

  const handleAddAudience = () => {
    if (!newAud.trim()) return;
    setForm({ ...form, audience: [...form.audience, newAud.trim()] });
    setNewAud("");
  };

  const handleRemoveAudience = (index: number) => {
    setForm({ ...form, audience: form.audience.filter((_, i) => i !== index) });
  };

  const handleAddPre = () => {
    if (!newPre.trim()) return;
    setForm({ ...form, prerequisites: [...form.prerequisites, newPre.trim()] });
    setNewPre("");
  };

  const handleRemovePre = (index: number) => {
    setForm({ ...form, prerequisites: form.prerequisites.filter((_, i) => i !== index) });
  };

  // Curriculum handlers
  const handleAddModule = () => {
    if (!newModTitle.trim()) return;
    const updatedCurriculum = [...form.curriculum, { title: newModTitle.trim(), lessons: [] }];
    setForm({
      ...form,
      curriculum: updatedCurriculum,
      modulesCount: updatedCurriculum.length,
    });
    setNewModTitle("");
  };

  const handleRemoveModule = (modIndex: number) => {
    const updatedCurriculum = form.curriculum.filter((_, i) => i !== modIndex);
    setForm({
      ...form,
      curriculum: updatedCurriculum,
      modulesCount: updatedCurriculum.length,
    });
  };

  const handleAddLesson = (modIndex: number) => {
    const text = newLessonText[modIndex];
    if (!text || !text.trim()) return;

    const updatedCurriculum = form.curriculum.map((mod, i) => {
      if (i !== modIndex) return mod;
      return { ...mod, lessons: [...(mod.lessons || []), text.trim()] };
    });

    setForm({ ...form, curriculum: updatedCurriculum });
    setNewLessonText({ ...newLessonText, [modIndex]: "" });
  };

  const handleRemoveLesson = (modIndex: number, lessonIndex: number) => {
    const updatedCurriculum = form.curriculum.map((mod, i) => {
      if (i !== modIndex) return mod;
      return { ...mod, lessons: mod.lessons.filter((_, j) => j !== lessonIndex) };
    });

    setForm({ ...form, curriculum: updatedCurriculum });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setBanner(null);

    try {
      const res = await saveCourse(initialData?.id || null, {
        ...form,
        seoTitle: form.seoTitle || undefined,
        seoDescription: form.seoDescription || undefined,
      });

      if (res.success) {
        setBanner({ ok: true, msg: "Learning program saved successfully." });
        router.refresh();
        setTimeout(() => router.push("/admin/courses"), 1000);
      }
    } catch (err: any) {
      setBanner({ ok: false, msg: err.message || "Failed to save learning program" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id || !confirm("Are you sure you want to delete this learning program?")) return;
    setDeleting(true);

    try {
      const res = await deleteCourse(initialData.id);
      if (res.success) {
        router.push("/admin/courses");
        router.refresh();
      }
    } catch (err: any) {
      setBanner({ ok: false, msg: err.message || "Failed to delete learning program" });
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[800px] p-6 pb-24 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin/courses" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-semibold transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Learning Programs
        </Link>
        {initialData?.id && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
            Delete Program
          </button>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          {initialData ? `Edit Program: ${form.title}` : "Create New Learning Program"}
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Define curriculum, outcomes, details, and SEO parameters.
        </p>
      </div>

      {banner && (
        <div
          className={`mb-6 flex items-center gap-3 rounded-xl border p-4 text-sm font-semibold transition-all ${
            banner.ok
              ? "border-emerald-250 bg-emerald-50 text-emerald-800"
              : "border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          {banner.ok ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
          <span>{banner.msg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core fields */}
        <div className="bg-slate-955 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
            General Info
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Program Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => {
                  const val = e.target.value;
                  const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                  setForm({ ...form, title: val, slug: initialData ? form.slug : slug });
                }}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Slug</label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Level</label>
              <select
                value={form.level}
                onChange={(e) => handleChange("level", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Duration</label>
              <input
                type="text"
                required
                value={form.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                placeholder="e.g. 4 Weeks, 12 Hours"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Language</label>
              <input
                type="text"
                required
                value={form.language}
                onChange={(e) => handleChange("language", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Instructor / Team</label>
              <input
                type="text"
                value={form.instructor}
                onChange={(e) => handleChange("instructor", e.target.value)}
                placeholder="Optional"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Display Order</label>
              <input
                type="number"
                required
                value={form.order}
                onChange={(e) => handleChange("order", parseInt(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Status</label>
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="flex items-end pb-3">
              <label className="flex items-center gap-2 text-sm text-slate-350 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.certificate}
                  onChange={(e) => handleChange("certificate", e.target.checked)}
                  className="rounded border-slate-800 bg-slate-900 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span>Provide Certificate</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Short Description</label>
            <input
              type="text"
              required
              value={form.shortDescription}
              onChange={(e) => handleChange("shortDescription", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Detailed Description</label>
            <textarea
              value={form.description}
              rows={4}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="font-bold text-sm block text-white">Featured Program</span>
              <span className="text-xs text-slate-500 mt-1 block">
                Showcase this course as a featured learning program on the homepage (Section 08).
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => handleChange("featured", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 rounded-full peer peer-focus:ring-1 peer-focus:ring-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-450 after:border-slate-350 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white" />
            </label>
          </div>
        </div>

        {/* Outcomes & Info */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Objectives */}
          <div className="bg-slate-955 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
              What You'll Learn
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Outcome / Objective..."
                value={newObj}
                onChange={(e) => setNewObj(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddObjective(); } }}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <button type="button" onClick={handleAddObjective} className="px-3 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col gap-2 pt-2 max-h-[200px] overflow-y-auto">
              {form.objectives.map((obj, i) => (
                <div key={i} className="flex items-start justify-between bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-white">
                  <span className="leading-snug">{obj}</span>
                  <button type="button" onClick={() => handleRemoveObjective(i)} className="text-slate-550 hover:text-white transition-colors ml-2 shrink-0">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Audience & Prerequisites */}
          <div className="bg-slate-955 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
              Target Audience
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Audience member..."
                value={newAud}
                onChange={(e) => setNewAud(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddAudience(); } }}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <button type="button" onClick={handleAddAudience} className="px-3 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col gap-2 pt-2 max-h-[100px] overflow-y-auto">
              {form.audience.map((aud, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-white">
                  <span>{aud}</span>
                  <button type="button" onClick={() => handleRemoveAudience(i)} className="text-slate-550 hover:text-white transition-colors shrink-0">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-t border-slate-800 pt-4 pb-2">
              Prerequisites
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Prerequisite..."
                value={newPre}
                onChange={(e) => setNewPre(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddPre(); } }}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <button type="button" onClick={handleAddPre} className="px-3 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col gap-2 pt-2 max-h-[100px] overflow-y-auto">
              {form.prerequisites.map((pre, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-white">
                  <span>{pre}</span>
                  <button type="button" onClick={() => handleRemovePre(i)} className="text-slate-550 hover:text-white transition-colors shrink-0">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Curriculum Module Editor */}
        <div className="bg-slate-955 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
            Curriculum Editor
          </h3>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="New Module Title..."
              value={newModTitle}
              onChange={(e) => setNewModTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddModule();
                }
              }}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleAddModule}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Add Module
            </button>
          </div>

          <div className="space-y-4 pt-4">
            {form.curriculum.map((mod, modIndex) => (
              <div key={modIndex} className="bg-slate-900 border border-slate-800 rounded-2xl p-4.5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-blue-400">Module {modIndex + 1}: {mod.title}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveModule(modIndex)}
                    className="text-rose-500 hover:text-rose-450 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add lesson topic to this module..."
                    value={newLessonText[modIndex] || ""}
                    onChange={(e) => setNewLessonText({ ...newLessonText, [modIndex]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddLesson(modIndex);
                      }
                    }}
                    className="flex-1 bg-slate-950 border border-slate-850 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddLesson(modIndex)}
                    className="px-3 py-1.5 bg-slate-800 text-white hover:bg-slate-750 text-xs font-bold rounded-xl"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(mod.lessons || []).map((lesson, lessonIndex) => (
                    <span key={lessonIndex} className="inline-flex items-center gap-1 bg-slate-950 border border-slate-850 px-2.5 py-1 rounded-lg text-[10px] text-slate-300">
                      {lesson}
                      <button type="button" onClick={() => handleRemoveLesson(modIndex, lessonIndex)} className="text-slate-550 hover:text-white transition-colors">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {form.curriculum.length === 0 && (
              <p className="text-xs text-slate-550 italic text-center py-4">No modules added to this program's curriculum yet.</p>
            )}
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-slate-955 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
            SEO Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Meta Title</label>
              <input
                type="text"
                value={form.seoTitle || ""}
                onChange={(e) => handleChange("seoTitle", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Meta Description</label>
              <input
                type="text"
                value={form.seoDescription || ""}
                onChange={(e) => handleChange("seoDescription", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Link href="/admin/courses" className="px-5 py-3 border border-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 transition cursor-pointer">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 rounded-xl shadow-lg cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Save className="w-4 h-4" />}
            <span>Save Program</span>
          </button>
        </div>
      </form>
    </div>
  );
}
