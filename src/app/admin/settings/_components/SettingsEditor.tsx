"use client";

import { useState } from "react";

type SettingsData = {
  siteName: string;
  tagline: string;
  logoUrl: string | null;
  companyDescription: string;
  businessEmail: string;
  phone: string;
  whatsapp: string;
  address: string;
  mapsUrl: string;
  linkedin: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  defaultKeywords: string;
};

export default function SettingsEditor({ initialData }: { initialData: SettingsData }) {
  const [data, setData] = useState<SettingsData>(initialData);
  const [activeTab, setActiveTab] = useState<"general" | "contact" | "social" | "seo">("general");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  function update(key: keyof SettingsData, value: string) {
    setData(prev => ({ ...prev, [key]: value }));
    setStatus("idle");
  }

  async function save() {
    setSaving(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  }

  const tabStyle = (tab: typeof activeTab) => ({
    padding: "10px 20px",
    background: activeTab === tab ? "#071820" : "transparent",
    color: activeTab === tab ? "#fff" : "#56666b",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 800,
    transition: "all 0.2s",
  });

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    border: "1.5px solid #dce6e7",
    borderRadius: 10,
    fontSize: 13,
    outline: "none",
    color: "#071820",
    background: "#f8fafb",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block",
    fontSize: 10,
    fontWeight: 850,
    color: "#56666b",
    letterSpacing: "0.12em",
    marginBottom: 6,
  };

  return (
    <div style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", boxShadow: "0 2px 16px rgba(7,24,32,0.07)", border: "1.5px solid #edf2f4", maxWidth: 750 }}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, borderBottom: "1.5px solid #edf2f4", paddingBottom: 16, marginBottom: 28 }}>
        <button onClick={() => setActiveTab("general")} style={tabStyle("general")}>General &amp; Branding</button>
        <button onClick={() => setActiveTab("contact")} style={tabStyle("contact")}>Contact Details</button>
        <button onClick={() => setActiveTab("social")} style={tabStyle("social")}>Social Links</button>
        <button onClick={() => setActiveTab("seo")} style={tabStyle("seo")}>SEO &amp; Meta</button>
      </div>

      {/* Form Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {activeTab === "general" && (
          <>
            <div>
              <label style={labelStyle}>SITE NAME</label>
              <input type="text" value={data.siteName} onChange={e => update("siteName", e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>TAGLINE</label>
              <input type="text" value={data.tagline} onChange={e => update("tagline", e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>LOGO URL</label>
              <input type="text" value={data.logoUrl || ""} onChange={e => update("logoUrl", e.target.value)} style={inputStyle} placeholder="/brand/strategist-logo.png" />
            </div>
            <div>
              <label style={labelStyle}>COMPANY DESCRIPTION</label>
              <textarea value={data.companyDescription} onChange={e => update("companyDescription", e.target.value)} rows={4} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
          </>
        )}

        {activeTab === "contact" && (
          <>
            <div>
              <label style={labelStyle}>BUSINESS EMAIL</label>
              <input type="email" value={data.businessEmail} onChange={e => update("businessEmail", e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>PHONE NUMBER</label>
              <input type="text" value={data.phone} onChange={e => update("phone", e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>WHATSAPP NUMBER</label>
              <input type="text" value={data.whatsapp} onChange={e => update("whatsapp", e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>ADDRESS</label>
              <textarea value={data.address} onChange={e => update("address", e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <div>
              <label style={labelStyle}>GOOGLE MAPS URL</label>
              <input type="text" value={data.mapsUrl} onChange={e => update("mapsUrl", e.target.value)} style={inputStyle} />
            </div>
          </>
        )}

        {activeTab === "social" && (
          <>
            <div>
              <label style={labelStyle}>LINKEDIN URL</label>
              <input type="text" value={data.linkedin} onChange={e => update("linkedin", e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>FACEBOOK URL</label>
              <input type="text" value={data.facebook} onChange={e => update("facebook", e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>TWITTER / X URL</label>
              <input type="text" value={data.twitter} onChange={e => update("twitter", e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>INSTAGRAM URL</label>
              <input type="text" value={data.instagram} onChange={e => update("instagram", e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>YOUTUBE URL</label>
              <input type="text" value={data.youtube} onChange={e => update("youtube", e.target.value)} style={inputStyle} />
            </div>
          </>
        )}

        {activeTab === "seo" && (
          <>
            <div>
              <label style={labelStyle}>DEFAULT SEO TITLE</label>
              <input type="text" value={data.defaultSeoTitle} onChange={e => update("defaultSeoTitle", e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>DEFAULT SEO DESCRIPTION</label>
              <textarea value={data.defaultSeoDescription} onChange={e => update("defaultSeoDescription", e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <div>
              <label style={labelStyle}>SEO KEYWORDS (COMMA SEPARATED)</label>
              <input type="text" value={data.defaultKeywords} onChange={e => update("defaultKeywords", e.target.value)} style={inputStyle} />
            </div>
          </>
        )}
      </div>

      {/* Save Button */}
      <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 14 }}>
        <button
          onClick={save}
          disabled={saving}
          style={{
            padding: "13px 28px",
            background: saving ? "#8a979b" : "#071820",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 800,
            cursor: saving ? "not-allowed" : "pointer",
            letterSpacing: "0.05em",
            transition: "background 0.2s",
          }}
        >
          {saving ? "Saving…" : "Save Settings →"}
        </button>

        {status === "saved" && (
          <span style={{ color: "#18b8ad", fontWeight: 700, fontSize: 13 }}>
            ✓ Saved successfully
          </span>
        )}
        {status === "error" && (
          <span style={{ color: "#e74c3c", fontWeight: 700, fontSize: 13 }}>
            ✗ Failed to save — please try again
          </span>
        )}
      </div>
    </div>
  );
}
