"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { savePageSeo, savePageSectionData, updateSectionsOrder } from "@/app/admin/actions";
import { ArrowLeft, Save, Loader2, CheckCircle2, AlertCircle, Edit, Eye, EyeOff, MoveUp, MoveDown } from "lucide-react";
import Link from "next/link";

interface PageData {
  id: string;
  title: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

interface SectionData {
  id: string;
  key: string;
  type: string;
  title: string;
  order: number;
  visible: boolean;
}

export function PageDetailsForm({
  page,
  sections: initialSections,
}: {
  page: PageData;
  sections: SectionData[];
}) {
  const router = useRouter();
  const [savingSeo, setSavingSeo] = useState(false);
  const [sections, setSections] = useState<SectionData[]>(initialSections);
  const [banner, setBanner] = useState<{ ok: boolean; msg: string } | null>(null);

  const [seo, setSeo] = useState({
    title: page.title,
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    seoKeywords: page.seoKeywords,
  });

  const handleSeoChange = (field: keyof typeof seo, value: string) => {
    setSeo({ ...seo, [field]: value });
  };

  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSeo(true);
    setBanner(null);

    try {
      const res = await savePageSeo(page.id, seo);
      if (res.success) {
        setBanner({ ok: true, msg: "SEO metadata saved successfully." });
        router.refresh();
      }
    } catch (err: any) {
      setBanner({ ok: false, msg: err.message || "Failed to save SEO metadata" });
    } finally {
      setSavingSeo(false);
    }
  };

  const handleToggleVisibility = async (sec: SectionData) => {
    setBanner(null);
    try {
      // Create empty payload update just to toggle visibility
      const res = await savePageSectionData(sec.id, {
        visible: !sec.visible,
        payload: {}, // Server action preserves data when empty payload passed
      });

      if (res.success) {
        setSections(
          sections.map((s) => (s.id === sec.id ? { ...s, visible: !s.visible } : s))
        );
        router.refresh();
      }
    } catch (err: any) {
      setBanner({ ok: false, msg: err.message || "Failed to toggle section visibility" });
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= sections.length) return;

    const list = [...sections];
    const temp = list[index];
    list[index] = list[nextIndex];
    list[nextIndex] = temp;

    const updated = list.map((item, idx) => ({ ...item, order: idx }));
    setSections(updated);

    try {
      const res = await updateSectionsOrder(
        updated.map((item) => ({ id: item.id, order: item.order }))
      );
      if (res.success) {
        router.refresh();
      }
    } catch (err: any) {
      setBanner({ ok: false, msg: err.message || "Failed to reorder sections" });
    }
  };

  return (
    <div className="mx-auto max-w-[800px] p-6 pb-24 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/admin/pages" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-semibold transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Pages
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-900">Manage Page: {page.title}</h2>
        <p className="text-sm text-slate-500 mt-1">
          Configure search metadata, toggle sections, reorder layouts, and edit content parameters.
        </p>
      </div>

      {banner && (
        <div
          className={`flex items-center gap-3 rounded-xl border p-4 text-sm font-semibold transition-all ${
            banner.ok
              ? "border-emerald-250 bg-emerald-50 text-emerald-800"
              : "border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          {banner.ok ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
          <span>{banner.msg}</span>
        </div>
      )}

      {/* SEO Form */}
      <form onSubmit={handleSaveSeo} className="bg-slate-955 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
          SEO & Page Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Page Title</label>
            <input
              type="text"
              required
              value={seo.title}
              onChange={(e) => handleSeoChange("title", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Meta Title</label>
            <input
              type="text"
              value={seo.seoTitle}
              onChange={(e) => handleSeoChange("seoTitle", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Meta Description</label>
            <input
              type="text"
              value={seo.seoDescription}
              onChange={(e) => handleSeoChange("seoDescription", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Keywords (comma-separated)</label>
            <input
              type="text"
              value={seo.seoKeywords}
              onChange={(e) => handleSeoChange("seoKeywords", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={savingSeo}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 rounded-xl shadow-md cursor-pointer disabled:opacity-50"
          >
            {savingSeo ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save SEO Settings</span>
          </button>
        </div>
      </form>

      {/* Sections Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Page Layout & Sections</h3>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
            {sections.length} sections total
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Key</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Section Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">CMS Title</th>
                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">Visibility</th>
                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">Reorder</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Content</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sections.map((sec, idx) => (
                <tr key={sec.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">{sec.key}</td>
                  <td className="px-6 py-4">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                      {sec.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">{sec.title}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleVisibility(sec)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold cursor-pointer ${
                        sec.visible
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {sec.visible ? (
                        <>
                          <Eye className="h-3.5 w-3.5" /> Visible
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3.5 w-3.5" /> Hidden
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMove(idx, "up")}
                        disabled={idx === 0}
                        className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                      >
                        <MoveUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMove(idx, "down")}
                        disabled={idx === sections.length - 1}
                        className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                      >
                        <MoveDown className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/pages/${page.id}/sections/${sec.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 hover:text-primary-700 hover:gap-1.5 transition-all"
                    >
                      <Edit className="h-3.5 w-3.5" /> Edit Content
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
