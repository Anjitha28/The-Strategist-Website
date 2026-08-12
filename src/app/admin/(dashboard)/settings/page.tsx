"use client";

import React, { useEffect, useState } from "react";
import { Settings as SettingsIcon, AlertCircle, CheckCircle2, Loader2, Save } from "lucide-react";

interface Settings {
  siteName: string;
  tagline: string;
  supportEmail: string;
  businessEmail: string;
  salesEmail: string;
  phone: string;
  whatsapp: string;
  address: string;
  theme: "aurora" | "nebula" | "stratus";
  maintenanceMode: boolean;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [banner, setBanner] = useState<{ ok: boolean; msg: string } | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        if (!res.ok) {
          if (res.status === 401) {
            window.location.href = "/admin/login";
            return;
          }
          throw new Error("Failed to load settings");
        }
        const data = await res.json();
        setSettings(data.settings);
      } catch (e: any) {
        setError(e.message || "Failed to load settings");
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (field: keyof Settings, value: any) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setBanner(null);
    setError("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Save failed");
      }
      setBanner({ ok: true, msg: "Settings saved successfully." });
      
      // Update HTML attribute immediately so the theme updates in the admin panel too
      document.documentElement.setAttribute("data-theme", settings.theme);
      try {
        localStorage.setItem("ts-theme", settings.theme);
        if (settings.theme !== "nebula") {
          localStorage.setItem("ts-preferred-light", settings.theme);
        }
      } catch (e) {}
    } catch (e: any) {
      setBanner({ ok: false, msg: e.message || "Save failed" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
        <p className="text-sm text-slate-400">Loading site settings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-2xl mx-auto mt-10">
        <div className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-2xl text-center">
          <AlertCircle className="w-12 h-12 text-rose-450 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Error Loading Settings</h3>
          <p className="text-slate-400 text-sm mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm hover:bg-slate-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[800px] p-6 pb-24 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <SettingsIcon className="h-6 w-6 text-blue-500" />
            Site & Themes
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Configure site identity, emails, phone numbers, and toggle the website design theme.
          </p>
        </div>
      </div>

      {banner && (
        <div
          className={`mb-6 flex items-center gap-3 rounded-xl border p-4 text-sm font-semibold transition-all ${
            banner.ok
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
              : "border-rose-500/20 bg-rose-500/10 text-rose-400"
          }`}
        >
          {banner.ok ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
          <span>{banner.msg}</span>
        </div>
      )}

      {settings && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Section */}
          <div className="bg-slate-955 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
              Identity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  required
                  value={settings.siteName}
                  onChange={(e) => handleChange("siteName", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  required
                  value={settings.tagline}
                  onChange={(e) => handleChange("tagline", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Theme Section */}
          <div className="bg-slate-955 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
              Website Theme Selection
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Aurora Theme */}
              <label className={`border rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all ${
                settings.theme === "aurora"
                  ? "border-blue-500 bg-blue-500/5 text-white"
                  : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-750"
              }`}>
                <input
                  type="radio"
                  name="theme"
                  value="aurora"
                  checked={settings.theme === "aurora"}
                  onChange={() => handleChange("theme", "aurora")}
                  className="sr-only"
                />
                <div>
                  <span className="font-bold text-sm block">Aurora (Pastel Light)</span>
                  <span className="text-xs text-slate-500 mt-1 block">
                    Soft, pastel design with blue/magenta/teal accents and glassmorphic cards.
                  </span>
                </div>
                <div className="flex gap-1.5 mt-4">
                  <div className="w-4 h-4 rounded-full bg-[#3182f6]" />
                  <div className="w-4 h-4 rounded-full bg-[#7146f6]" />
                  <div className="w-4 h-4 rounded-full bg-[#06b0d2]" />
                </div>
              </label>

              {/* Nebula Theme */}
              <label className={`border rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all ${
                settings.theme === "nebula"
                  ? "border-purple-500 bg-purple-500/5 text-white"
                  : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-750"
              }`}>
                <input
                  type="radio"
                  name="theme"
                  value="nebula"
                  checked={settings.theme === "nebula"}
                  onChange={() => handleChange("theme", "nebula")}
                  className="sr-only"
                />
                <div>
                  <span className="font-bold text-sm block">Nebula (Infographic Dark)</span>
                  <span className="text-xs text-slate-500 mt-1 block">
                    Premium, dark infographic theme with rich blue/purple background and orange highlights.
                  </span>
                </div>
                <div className="flex gap-1.5 mt-4">
                  <div className="w-4 h-4 rounded-full bg-[#0b0f18]" />
                  <div className="w-4 h-4 rounded-full bg-[#59a5ff]" />
                  <div className="w-4 h-4 rounded-full bg-orange-500" />
                </div>
              </label>

              {/* Stratus Theme */}
              <label className={`border rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all ${
                settings.theme === "stratus"
                  ? "border-emerald-500 bg-emerald-500/5 text-white"
                  : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-750"
              }`}>
                <input
                  type="radio"
                  name="theme"
                  value="stratus"
                  checked={settings.theme === "stratus"}
                  onChange={() => handleChange("theme", "stratus")}
                  className="sr-only"
                />
                <div>
                  <span className="font-bold text-sm block">Stratus (Vector Light)</span>
                  <span className="text-xs text-slate-500 mt-1 block">
                    Premium vector illustration design with curved gradient accents and modern static layout.
                  </span>
                </div>
                <div className="flex gap-1.5 mt-4">
                  <div className="w-4 h-4 rounded-full bg-[#f8fafc] border border-slate-700" />
                  <div className="w-4 h-4 rounded-full bg-[#2563eb]" />
                  <div className="w-4 h-4 rounded-full bg-[#a855f7]" />
                </div>
              </label>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-slate-955 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
              Contact & Support Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                  Support Email
                </label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => handleChange("supportEmail", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                  Sales Email
                </label>
                <input
                  type="email"
                  value={settings.salesEmail}
                  onChange={(e) => handleChange("salesEmail", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                  General Phone
                </label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                  WhatsApp Contact
                </label>
                <input
                  type="text"
                  value={settings.whatsapp}
                  onChange={(e) => handleChange("whatsapp", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                Business Address
              </label>
              <textarea
                value={settings.address}
                rows={2}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Maintenance Section */}
          <div className="bg-slate-955 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
              Maintenance Control
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-sm block text-white">Maintenance Mode</span>
                <span className="text-xs text-slate-500 mt-1 block">
                  Temporarily display a friendly maintenance page to all public visitors.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleChange("maintenanceMode", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 rounded-full peer peer-focus:ring-1 peer-focus:ring-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white" />
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 rounded-xl shadow-lg cursor-pointer"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Save className="w-4 h-4" />}
              <span>{saving ? "Saving Changes..." : "Save Settings & Theme"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
