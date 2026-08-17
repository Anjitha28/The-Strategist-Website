"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { saveTestimonial, deleteTestimonial } from "@/app/admin/actions";
import { ArrowLeft, Save, Trash2, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface TestimonialData {
  id?: string;
  name: string;
  company: string;
  designation: string;
  photoUrl: string;
  quote: string;
  rating: number;
  order: number;
  visible: boolean;
}

export function TestimonialForm({ initialData }: { initialData: TestimonialData | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [banner, setBanner] = useState<{ ok: boolean; msg: string } | null>(null);

  const [form, setForm] = useState<TestimonialData>(
    initialData || {
      name: "",
      company: "",
      designation: "",
      photoUrl: "",
      quote: "",
      rating: 5,
      order: 0,
      visible: true,
    }
  );

  const handleChange = (field: keyof TestimonialData, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setBanner(null);

    try {
      const res = await saveTestimonial(initialData?.id || null, form);
      if (res.success) {
        setBanner({ ok: true, msg: "Testimonial saved successfully." });
        router.refresh();
        setTimeout(() => router.push("/admin/testimonials"), 1000);
      }
    } catch (err: any) {
      setBanner({ ok: false, msg: err.message || "Failed to save testimonial" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id || !confirm("Are you sure you want to delete this testimonial?")) return;
    setDeleting(true);

    try {
      const res = await deleteTestimonial(initialData.id);
      if (res.success) {
        router.push("/admin/testimonials");
        router.refresh();
      }
    } catch (err: any) {
      setBanner({ ok: false, msg: err.message || "Failed to delete testimonial" });
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[800px] p-6 pb-24 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin/testimonials" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-semibold transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Testimonials
        </Link>
        {initialData?.id && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
            Delete Testimonial
          </button>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          {initialData ? `Edit Testimonial from: ${form.name}` : "Create New Testimonial"}
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Add client reviews, ratings, corporate details, and display preferences.
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
            Client Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Client Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Designation</label>
              <input
                type="text"
                value={form.designation}
                onChange={(e) => handleChange("designation", e.target.value)}
                placeholder="e.g. Director of Operations"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Company / Organization</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => handleChange("company", e.target.value)}
                placeholder="e.g. TechCorp"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Photo URL</label>
              <input
                type="text"
                value={form.photoUrl}
                onChange={(e) => handleChange("photoUrl", e.target.value)}
                placeholder="e.g. /images/avatars/client.jpg"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Rating (Stars)</label>
              <select
                value={form.rating}
                onChange={(e) => handleChange("rating", parseInt(e.target.value) || 5)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
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
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Client Quote</label>
            <textarea
              value={form.quote}
              rows={4}
              required
              onChange={(e) => handleChange("quote", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Link href="/admin/testimonials" className="px-5 py-3 border border-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 transition cursor-pointer">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 rounded-xl shadow-lg cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Save className="w-4 h-4" />}
            <span>Save Testimonial</span>
          </button>
        </div>
      </form>
    </div>
  );
}
