"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { saveIndustry, deleteIndustry } from "@/app/admin/actions";
import { ArrowLeft, Save, Trash2, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface IndustryData {
  id?: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  order: number;
  visible: boolean;
}

export function IndustryForm({ initialData }: { initialData: IndustryData | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [banner, setBanner] = useState<{ ok: boolean; msg: string } | null>(null);

  const [form, setForm] = useState<IndustryData>(
    initialData || {
      name: "",
      slug: "",
      icon: "building",
      description: "",
      order: 0,
      visible: true,
    }
  );

  const handleChange = (field: keyof IndustryData, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setBanner(null);

    try {
      const res = await saveIndustry(initialData?.id || null, form);
      if (res.success) {
        setBanner({ ok: true, msg: "Industry saved successfully." });
        router.refresh();
        setTimeout(() => router.push("/admin/industries"), 1000);
      }
    } catch (err: any) {
      setBanner({ ok: false, msg: err.message || "Failed to save industry" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id || !confirm("Are you sure you want to delete this industry?")) return;
    setDeleting(true);

    try {
      const res = await deleteIndustry(initialData.id);
      if (res.success) {
        router.push("/admin/industries");
        router.refresh();
      }
    } catch (err: any) {
      setBanner({ ok: false, msg: err.message || "Failed to delete industry" });
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[800px] p-6 pb-24 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin/industries" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-semibold transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Industries
        </Link>
        {initialData?.id && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
            Delete Industry
          </button>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          {initialData ? `Edit Industry: ${form.name}` : "Create New Industry"}
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Add target sectors, descriptive summaries, icons, and visibility toggles.
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
        <div className="bg-slate-955 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
            Industry Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Industry Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => {
                  const val = e.target.value;
                  const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                  setForm({ ...form, name: val, slug: initialData ? form.slug : slug });
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Icon Name</label>
              <input
                type="text"
                required
                value={form.icon}
                onChange={(e) => handleChange("icon", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
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
            <div className="flex items-end pb-3">
              <label className="flex items-center gap-2 text-sm text-slate-350 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.visible}
                  onChange={(e) => handleChange("visible", e.target.checked)}
                  className="rounded border-slate-800 bg-slate-900 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span>Visible on Website</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Summary / Description</label>
            <textarea
              value={form.description}
              rows={4}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Link href="/admin/industries" className="px-5 py-3 border border-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 transition cursor-pointer">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 rounded-xl shadow-lg cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Save className="w-4 h-4" />}
            <span>Save Industry</span>
          </button>
        </div>
      </form>
    </div>
  );
}
