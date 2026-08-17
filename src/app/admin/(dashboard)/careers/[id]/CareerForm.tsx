"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { saveJobOpening, deleteJobOpening } from "@/app/admin/actions";
import { ArrowLeft, Save, Trash2, Plus, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface CareerData {
  id?: string;
  title: string;
  slug: string;
  employmentType: string;
  experience: string;
  location: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  skills: string[];
  salary: string;
  status: string;
  applyUrl: string;
}

export function CareerForm({ initialData }: { initialData: CareerData | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [banner, setBanner] = useState<{ ok: boolean; msg: string } | null>(null);

  const [form, setForm] = useState<CareerData>(
    initialData || {
      title: "",
      slug: "",
      employmentType: "Full-time",
      experience: "",
      location: "Remote",
      description: "",
      responsibilities: [],
      qualifications: [],
      skills: [],
      salary: "",
      status: "open",
      applyUrl: "",
    }
  );

  const [newResp, setNewResp] = useState("");
  const [newQual, setNewQual] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const handleChange = (field: keyof CareerData, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleAddResp = () => {
    if (!newResp.trim()) return;
    setForm({ ...form, responsibilities: [...form.responsibilities, newResp.trim()] });
    setNewResp("");
  };

  const handleRemoveResp = (index: number) => {
    setForm({ ...form, responsibilities: form.responsibilities.filter((_, i) => i !== index) });
  };

  const handleAddQual = () => {
    if (!newQual.trim()) return;
    setForm({ ...form, qualifications: [...form.qualifications, newQual.trim()] });
    setNewQual("");
  };

  const handleRemoveQual = (index: number) => {
    setForm({ ...form, qualifications: form.qualifications.filter((_, i) => i !== index) });
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    setForm({ ...form, skills: [...form.skills, newSkill.trim()] });
    setNewSkill("");
  };

  const handleRemoveSkill = (index: number) => {
    setForm({ ...form, skills: form.skills.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setBanner(null);

    try {
      const res = await saveJobOpening(initialData?.id || null, form);
      if (res.success) {
        setBanner({ ok: true, msg: "Job opening saved successfully." });
        router.refresh();
        setTimeout(() => router.push("/admin/careers"), 1000);
      }
    } catch (err: any) {
      setBanner({ ok: false, msg: err.message || "Failed to save job opening" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id || !confirm("Are you sure you want to delete this job opening?")) return;
    setDeleting(true);

    try {
      const res = await deleteJobOpening(initialData.id);
      if (res.success) {
        router.push("/admin/careers");
        router.refresh();
      }
    } catch (err: any) {
      setBanner({ ok: false, msg: err.message || "Failed to delete job opening" });
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[800px] p-6 pb-24 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin/careers" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-semibold transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Careers
        </Link>
        {initialData?.id && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
            Delete Position
          </button>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          {initialData ? `Edit Job: ${form.title}` : "Create New Job Opening"}
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Post and manage career openings, locations, qualifications, and status.
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
            Job Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Job Title</label>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Employment Type</label>
              <select
                value={form.employmentType}
                onChange={(e) => handleChange("employmentType", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Experience Level</label>
              <input
                type="text"
                value={form.experience}
                onChange={(e) => handleChange("experience", e.target.value)}
                placeholder="e.g. 2-3 years, Senior"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="e.g. Remote, Mumbai Office"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Salary Details</label>
              <input
                type="text"
                value={form.salary}
                onChange={(e) => handleChange("salary", e.target.value)}
                placeholder="e.g. Competitive, 8-12 LPA"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">External Apply URL</label>
              <input
                type="text"
                value={form.applyUrl}
                onChange={(e) => handleChange("applyUrl", e.target.value)}
                placeholder="Optional external link"
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
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Job Description</label>
            <textarea
              value={form.description}
              rows={4}
              required
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Responsibilities */}
        <div className="bg-slate-955 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
            Responsibilities
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add responsibility..."
              value={newResp}
              onChange={(e) => setNewResp(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddResp();
                }
              }}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <button type="button" onClick={handleAddResp} className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition">
              <Plus className="h-4.5 w-4.5" />
            </button>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            {form.responsibilities.map((resp, index) => (
              <div key={index} className="flex items-center justify-between bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white">
                <span>{resp}</span>
                <button type="button" onClick={() => handleRemoveResp(index)} className="text-slate-550 hover:text-white transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Qualifications */}
        <div className="bg-slate-955 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
            Qualifications
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add qualification..."
              value={newQual}
              onChange={(e) => setNewQual(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddQual();
                }
              }}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <button type="button" onClick={handleAddQual} className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition">
              <Plus className="h-4.5 w-4.5" />
            </button>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            {form.qualifications.map((qual, index) => (
              <div key={index} className="flex items-center justify-between bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white">
                <span>{qual}</span>
                <button type="button" onClick={() => handleRemoveQual(index)} className="text-slate-550 hover:text-white transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-slate-955 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
            Skills Required
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <button type="button" onClick={handleAddSkill} className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition">
              <Plus className="h-4.5 w-4.5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {form.skills.map((skill, index) => (
              <span key={index} className="inline-flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold text-white">
                {skill}
                <button type="button" onClick={() => handleRemoveSkill(index)} className="text-slate-500 hover:text-white transition-colors">
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Link href="/admin/careers" className="px-5 py-3 border border-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 transition cursor-pointer">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 rounded-xl shadow-lg cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Save className="w-4 h-4" />}
            <span>Save Job Opening</span>
          </button>
        </div>
      </form>
    </div>
  );
}
