"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { savePageSectionData } from "@/app/admin/actions";
import { ArrowLeft, Save, Loader2, CheckCircle2, AlertCircle, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

interface SectionProps {
  pageId: string;
  section: {
    id: string;
    key: string;
    type: string;
    title: string;
    data: string; // JSON string
  };
}

export function SectionEditForm({ pageId, section }: SectionProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [banner, setBanner] = useState<{ ok: boolean; msg: string } | null>(null);

  const initialPayload = JSON.parse(section.data || "{}");
  const [payload, setPayload] = useState<Record<string, any>>(initialPayload);
  const [cmsTitle, setCmsTitle] = useState(section.title);

  // Field change handler
  const handleFieldChange = (key: string, value: any) => {
    setPayload({ ...payload, [key]: value });
  };

  // Stats array helpers
  const handleStatChange = (index: number, field: "value" | "label", val: string) => {
    const statsList = [...(payload.stats || [])];
    statsList[index] = { ...statsList[index], [field]: val };
    setPayload({ ...payload, stats: statsList });
  };

  const handleAddStat = () => {
    const statsList = [...(payload.stats || []), { value: "0", label: "Label" }];
    setPayload({ ...payload, stats: statsList });
  };

  const handleRemoveStat = (index: number) => {
    setPayload({ ...payload, stats: (payload.stats || []).filter((_: any, i: number) => i !== index) });
  };

  // String array helpers (bullets / paragraphs)
  const handleArrayItemChange = (key: string, index: number, value: string) => {
    const list = [...(payload[key] || [])];
    list[index] = value;
    setPayload({ ...payload, [key]: list });
  };

  const handleAddArrayItem = (key: string) => {
    const list = [...(payload[key] || []), "New Item"];
    setPayload({ ...payload, [key]: list });
  };

  const handleRemoveArrayItem = (key: string, index: number) => {
    setPayload({ ...payload, [key]: (payload[key] || []).filter((_: any, i: number) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setBanner(null);

    try {
      const res = await savePageSectionData(section.id, {
        title: cmsTitle,
        payload,
      });

      if (res.success) {
        setBanner({ ok: true, msg: "Section content saved successfully." });
        router.refresh();
        setTimeout(() => router.push(`/admin/pages/${pageId}`), 1000);
      }
    } catch (err: any) {
      setBanner({ ok: false, msg: err.message || "Failed to save section content" });
    } finally {
      setSaving(false);
    }
  };

  // Determine which fields to display
  const payloadKeys = Object.keys(payload);

  return (
    <div className="mx-auto max-w-[800px] p-6 pb-24 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <Link href={`/admin/pages/${pageId}`} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-semibold transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Page Layout
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-900">Edit Section Content: {section.title}</h2>
        <p className="text-sm text-slate-500 mt-1">
          Modifying properties for section key <span className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">{section.key}</span> (Type: <span className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">{section.type}</span>).
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title configuration */}
        <div className="bg-slate-955 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
            Section Administration
          </h3>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">CMS Admin Label</label>
            <input
              type="text"
              required
              value={cmsTitle}
              onChange={(e) => setCmsTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Dynamic fields */}
        <div className="bg-slate-955 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
            Section Parameters
          </h3>

          {payloadKeys.length === 0 && (
            <p className="text-xs text-slate-500 italic">No parameters exist for this section type. Clicking save will confirm configuration.</p>
          )}

          {payloadKeys.map((key) => {
            const val = payload[key];

            // Render array of stats
            if (key === "stats" && Array.isArray(val)) {
              return (
                <div key={key} className="space-y-4 border-t border-slate-800/80 pt-4 first:border-none first:pt-0">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-450 uppercase">{key}</label>
                    <button
                      type="button"
                      onClick={handleAddStat}
                      className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add Stat Card
                    </button>
                  </div>
                  <div className="grid gap-3">
                    {val.map((stat: any, i: number) => (
                      <div key={i} className="flex gap-2 items-center bg-slate-900 border border-slate-800 p-3 rounded-xl">
                        <input
                          type="text"
                          value={stat.value || ""}
                          placeholder="Value (e.g. 10+)"
                          onChange={(e) => handleStatChange(i, "value", e.target.value)}
                          className="w-24 bg-slate-950 border border-slate-850 rounded-xl px-3 py-1.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={stat.label || ""}
                          placeholder="Label"
                          onChange={(e) => handleStatChange(i, "label", e.target.value)}
                          className="flex-1 bg-slate-950 border border-slate-850 rounded-xl px-3 py-1.5 text-xs text-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveStat(i)}
                          className="text-rose-500 hover:text-rose-450 p-1.5"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            // Render bullets or paragraphs arrays
            if ((key === "bullets" || key === "paragraphs") && Array.isArray(val)) {
              return (
                <div key={key} className="space-y-4 border-t border-slate-800/80 pt-4 first:border-none first:pt-0">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-450 uppercase">{key}</label>
                    <button
                      type="button"
                      onClick={() => handleAddArrayItem(key)}
                      className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add Item
                    </button>
                  </div>
                  <div className="grid gap-2">
                    {val.map((item: string, i: number) => (
                      <div key={i} className="flex gap-2 items-center">
                        <textarea
                          rows={2}
                          value={item}
                          onChange={(e) => handleArrayItemChange(key, i, e.target.value)}
                          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem(key, i)}
                          className="text-rose-500 hover:text-rose-450 p-1.5"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            // Render standard inputs based on data type
            if (typeof val === "boolean") {
              return (
                <div key={key} className="flex items-center justify-between pt-2 border-t border-slate-800/60 first:border-none">
                  <div>
                    <span className="font-bold text-sm block text-white capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={val}
                      onChange={(e) => handleFieldChange(key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 rounded-full peer peer-focus:ring-1 peer-focus:ring-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-450 after:border-slate-350 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white" />
                  </label>
                </div>
              );
            }

            if (typeof val === "object" && val !== null) {
              // Hide complex objects that are resolved dynamically (e.g. nested lists)
              return null;
            }

            // Render text inputs or textareas for strings/numbers
            const isLongText = key === "description" || key === "subtitle" || key.toLowerCase().includes("text");
            return (
              <div key={key} className="space-y-2 border-t border-slate-800/60 pt-4 first:border-none first:pt-0">
                <label className="block text-xs font-bold text-slate-400 uppercase capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
                {isLongText ? (
                  <textarea
                    rows={4}
                    value={val}
                    onChange={(e) => handleFieldChange(key, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <input
                    type={typeof val === "number" ? "number" : "text"}
                    value={val}
                    onChange={(e) => handleFieldChange(key, typeof val === "number" ? (parseInt(e.target.value) || 0) : e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Link href={`/admin/pages/${pageId}`} className="px-5 py-3 border border-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 transition cursor-pointer">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 rounded-xl shadow-lg cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Save className="w-4 h-4" />}
            <span>Save Section Data</span>
          </button>
        </div>
      </form>
    </div>
  );
}
