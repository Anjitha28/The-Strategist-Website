"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { saveTeamMember, deleteTeamMember } from "@/app/admin/actions";
import { ArrowLeft, Save, Trash2, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface TeamData {
  id?: string;
  name: string;
  position: string;
  photoUrl: string;
  bio: string;
  social: Record<string, string>;
  order: number;
  visible: boolean;
}

export function TeamForm({ initialData }: { initialData: TeamData | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [banner, setBanner] = useState<{ ok: boolean; msg: string } | null>(null);

  const [form, setForm] = useState<TeamData>(
    initialData || {
      name: "",
      position: "",
      photoUrl: "",
      bio: "",
      social: { linkedin: "", twitter: "", github: "" },
      order: 0,
      visible: true,
    }
  );

  const handleChange = (field: keyof TeamData, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSocialChange = (key: string, value: string) => {
    setForm({
      ...form,
      social: { ...form.social, [key]: value },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setBanner(null);

    try {
      const res = await saveTeamMember(initialData?.id || null, form);
      if (res.success) {
        setBanner({ ok: true, msg: "Team member saved successfully." });
        router.refresh();
        setTimeout(() => router.push("/admin/team"), 1000);
      }
    } catch (err: any) {
      setBanner({ ok: false, msg: err.message || "Failed to save team member" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id || !confirm("Are you sure you want to delete this team member?")) return;
    setDeleting(true);

    try {
      const res = await deleteTeamMember(initialData.id);
      if (res.success) {
        router.push("/admin/team");
        router.refresh();
      }
    } catch (err: any) {
      setBanner({ ok: false, msg: err.message || "Failed to delete team member" });
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[800px] p-6 pb-24 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin/team" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-semibold transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Team Members
        </Link>
        {initialData?.id && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
            Delete Member
          </button>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          {initialData ? `Edit Member: ${form.name}` : "Create New Team Member"}
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Add team profiles, designations, photos, bios, and social links.
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
            General Info
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Member Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Designation / Position</label>
              <input
                type="text"
                value={form.position}
                onChange={(e) => handleChange("position", e.target.value)}
                placeholder="e.g. Lead Consultant"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Photo URL</label>
              <input
                type="text"
                value={form.photoUrl}
                onChange={(e) => handleChange("photoUrl", e.target.value)}
                placeholder="e.g. /images/team/john.jpg"
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
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="font-bold text-sm block text-white">Visible on Website</span>
              <span className="text-xs text-slate-500 mt-1 block">
                Toggle display status in team listing sections.
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.visible}
                onChange={(e) => handleChange("visible", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 rounded-full peer peer-focus:ring-1 peer-focus:ring-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-450 after:border-slate-350 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white" />
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Short Biography</label>
            <textarea
              value={form.bio}
              rows={4}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-slate-955 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
            Social Profiles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">LinkedIn URL</label>
              <input
                type="text"
                value={form.social.linkedin || ""}
                onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Twitter URL</label>
              <input
                type="text"
                value={form.social.twitter || ""}
                onChange={(e) => handleSocialChange("twitter", e.target.value)}
                placeholder="https://twitter.com/username"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">GitHub URL</label>
              <input
                type="text"
                value={form.social.github || ""}
                onChange={(e) => handleSocialChange("github", e.target.value)}
                placeholder="https://github.com/username"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Link href="/admin/team" className="px-5 py-3 border border-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 transition cursor-pointer">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 rounded-xl shadow-lg cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Save className="w-4 h-4" />}
            <span>Save Team Member</span>
          </button>
        </div>
      </form>
    </div>
  );
}
