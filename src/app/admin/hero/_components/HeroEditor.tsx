"use client";

import { useState } from "react";

type HeroData = {
  eyebrow: string;
  heading: string;
  tagline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

const FIELD_CONFIG = [
  {
    key: "eyebrow" as keyof HeroData,
    label: "Eyebrow / Kicker",
    hint: "Small uppercase text above the heading",
    multiline: false,
  },
  {
    key: "heading" as keyof HeroData,
    label: "Main Heading",
    hint: "The large bold headline",
    multiline: false,
  },
  {
    key: "tagline" as keyof HeroData,
    label: "Italic Tagline",
    hint: "Italic teal text below the heading",
    multiline: false,
  },
  {
    key: "body" as keyof HeroData,
    label: "Body Text",
    hint: "Short paragraph below the tagline",
    multiline: true,
  },
  {
    key: "ctaLabel" as keyof HeroData,
    label: "Button Label",
    hint: "Text on the CTA button",
    multiline: false,
  },
  {
    key: "ctaHref" as keyof HeroData,
    label: "Button URL",
    hint: "Where the button links to (e.g. /solutions/corporate)",
    multiline: false,
  },
];

export default function HeroEditor({ initialData }: { initialData: HeroData }) {
  const [data, setData] = useState<HeroData>(initialData);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  function update(key: keyof HeroData, value: string) {
    setData(prev => ({ ...prev, [key]: value }));
    setStatus("idle");
  }

  async function save() {
    setSaving(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/admin/hero", {
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

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
      {/* ── Left: Form ── */}
      <div style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", boxShadow: "0 2px 16px rgba(7,24,32,0.07)", border: "1.5px solid #edf2f4" }}>
        <h2 style={{ margin: "0 0 24px", fontSize: 16, fontWeight: 800, color: "#071820" }}>
          Edit Fields
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {FIELD_CONFIG.map(({ key, label, hint, multiline }) => (
            <div key={key}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#56666b", letterSpacing: "0.12em", marginBottom: 6 }}>
                {label.toUpperCase()}
              </label>
              {hint && (
                <p style={{ margin: "0 0 6px", fontSize: 11, color: "#8a979b" }}>{hint}</p>
              )}
              {multiline ? (
                <textarea
                  value={data[key]}
                  onChange={e => update(key, e.target.value)}
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1.5px solid #dce6e7",
                    borderRadius: 10,
                    fontSize: 13,
                    outline: "none",
                    resize: "vertical",
                    fontFamily: "inherit",
                    color: "#071820",
                    background: "#f8fafb",
                    boxSizing: "border-box",
                    lineHeight: 1.6,
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => (e.target.style.borderColor = "#18b8ad")}
                  onBlur={e => (e.target.style.borderColor = "#dce6e7")}
                />
              ) : (
                <input
                  type="text"
                  value={data[key]}
                  onChange={e => update(key, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1.5px solid #dce6e7",
                    borderRadius: 10,
                    fontSize: 13,
                    outline: "none",
                    color: "#071820",
                    background: "#f8fafb",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => (e.target.style.borderColor = "#18b8ad")}
                  onBlur={e => (e.target.style.borderColor = "#dce6e7")}
                />
              )}
            </div>
          ))}
        </div>

        {/* Save button */}
        <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 14 }}>
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
            {saving ? "Saving…" : "Save Changes →"}
          </button>

          {status === "saved" && (
            <span style={{ color: "#18b8ad", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
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

      {/* ── Right: Live Preview ── */}
      <div style={{ position: "sticky", top: 24 }}>
        <div style={{ marginBottom: 12, fontSize: 11, fontWeight: 800, color: "#8a979b", letterSpacing: "0.12em" }}>
          LIVE PREVIEW
        </div>
        <div style={{
          background: "#f8fafb",
          borderRadius: 20,
          border: "1.5px solid #dce6e7",
          padding: "36px 32px",
          boxShadow: "0 2px 12px rgba(7,24,32,0.05)",
        }}>
          {/* Eyebrow */}
          <div style={{
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: "0.22em",
            color: "#18b8ad",
            textTransform: "uppercase",
            marginBottom: 16,
          }}>
            {data.eyebrow || "—"}
          </div>

          {/* Heading */}
          <h2 style={{
            margin: "0 0 4px",
            fontSize: 32,
            fontWeight: 800,
            color: "#071820",
            lineHeight: 1.1,
            fontFamily: "Georgia, serif",
          }}>
            {data.heading || "—"}
          </h2>

          {/* Tagline */}
          <div style={{
            fontSize: 28,
            fontStyle: "italic",
            color: "#18b8ad",
            fontFamily: "Georgia, serif",
            fontWeight: 500,
            marginBottom: 18,
            lineHeight: 1.2,
          }}>
            {data.tagline || "—"}
          </div>

          {/* Body */}
          <p style={{
            margin: "0 0 24px",
            fontSize: 13,
            color: "#56666b",
            lineHeight: 1.7,
            maxWidth: 380,
          }}>
            {data.body || "—"}
          </p>

          {/* CTA */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#071820",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 100,
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.02em",
          }}>
            {data.ctaLabel || "Button"} →
          </div>

          <div style={{ marginTop: 16, fontSize: 11, color: "#8a979b" }}>
            Links to: <code style={{ background: "#edf2f4", padding: "2px 6px", borderRadius: 4 }}>{data.ctaHref}</code>
          </div>
        </div>

        {/* Note */}
        <div style={{
          marginTop: 16,
          padding: "14px 18px",
          background: "rgba(24,184,173,0.08)",
          borderRadius: 12,
          border: "1px solid rgba(24,184,173,0.2)",
          fontSize: 12,
          color: "#0d7a74",
          lineHeight: 1.6,
        }}>
          💡 This preview shows your text content. The 3D visualization on the right of the hero is a fixed background image.
        </div>
      </div>
    </div>
  );
}
