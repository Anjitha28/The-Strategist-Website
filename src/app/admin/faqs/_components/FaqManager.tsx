"use client";

import { useState } from "react";

type Faq = {
  id: string;
  question: string;
  answer: string;
  group: string;
  order: number;
  visible: boolean;
};

const GROUPS = [
  { value: "home", label: "Homepage" },
  { value: "about", label: "About Page" },
  { value: "corporate", label: "Corporate Solutions" },
  { value: "educational", label: "Educational Solutions" },
  { value: "general", label: "General Support" },
];

export default function FaqManager({ initialData }: { initialData: Faq[] }) {
  const [list, setList] = useState<Faq[]>(initialData);
  const [activeGroup, setActiveGroup] = useState<string>("home");
  const [editing, setEditing] = useState<Partial<Faq> | null>(null);
  const [saving, setSaving] = useState(false);

  async function reload() {
    try {
      const res = await fetch("/api/admin/faqs");
      if (res.ok) {
        const data = await res.json();
        setList(data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    try {
      const isNew = !editing.id;
      const res = await fetch("/api/admin/faqs", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });

      if (res.ok) {
        setEditing(null);
        await reload();
      } else {
        alert("Failed to save FAQ.");
      }
    } catch {
      alert("Error saving FAQ.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      const res = await fetch(`/api/admin/faqs?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await reload();
      } else {
        alert("Failed to delete.");
      }
    } catch {
      alert("Error deleting.");
    }
  }

  const filtered = list.filter(item => item.group === activeGroup);

  const tabStyle = (groupValue: string) => ({
    padding: "8px 16px",
    background: activeGroup === groupValue ? "#071820" : "transparent",
    color: activeGroup === groupValue ? "#fff" : "#56666b",
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
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 32, alignItems: "start" }}>
      {/* List */}
      <div style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", boxShadow: "0 2px 16px rgba(7,24,32,0.07)", border: "1.5px solid #edf2f4" }}>
        {/* Tabs / Filter */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", borderBottom: "1.5px solid #edf2f4", paddingBottom: 16, marginBottom: 20 }}>
          {GROUPS.map((g) => (
            <button key={g.value} onClick={() => setActiveGroup(g.value)} style={tabStyle(g.value)}>
              {g.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#071820" }}>
            FAQs in this Category ({filtered.length})
          </h2>
          <button
            onClick={() => setEditing({ question: "", answer: "", group: activeGroup, order: 0, visible: true })}
            style={{
              padding: "8px 14px",
              background: "#18b8ad",
              color: "#071820",
              border: "none",
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 850,
              cursor: "pointer",
            }}
          >
            + Add FAQ
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((item) => (
            <div
              key={item.id}
              style={{
                padding: 18,
                borderRadius: 12,
                border: "1.5px solid #edf2f4",
                background: item.visible ? "#fff" : "#fafbfc",
                opacity: item.visible ? 1 : 0.65,
              }}
            >
              <h3 style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 800, color: "#071820" }}>
                {item.question}
              </h3>
              <p style={{ margin: "0 0 12px", fontSize: 12, color: "#56666b", lineHeight: 1.5 }}>
                {item.answer}
              </p>
              <div style={{ display: "flex", justifyContent: "between", alignItems: "center" }}>
                <span style={{ fontSize: 10, color: "#8a979b", fontWeight: 700 }}>
                  Order: {item.order}
                </span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => setEditing(item)}
                    style={{ background: "none", border: "none", color: "#18b8ad", fontSize: 11, fontWeight: 800, cursor: "pointer" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    style={{ background: "none", border: "none", color: "#e74c3c", fontSize: 11, fontWeight: 800, cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ padding: "40px 20px", textAlign: "center", color: "#8a979b", fontSize: 13, border: "1.5px dashed #edf2f4", borderRadius: 12 }}>
              No FAQs in this category yet. Click "+ Add FAQ" above to create one.
            </div>
          )}
        </div>
      </div>

      {/* Editor Panel */}
      {editing ? (
        <div style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", boxShadow: "0 2px 16px rgba(7,24,32,0.07)", border: "1.5px solid #edf2f4", position: "sticky", top: 24 }}>
          <h2 style={{ margin: "0 0 24px", fontSize: 16, fontWeight: 800, color: "#071820" }}>
            {editing.id ? "Edit FAQ" : "New FAQ"}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={labelStyle}>PAGE / GROUP</label>
              <select
                value={editing.group || "home"}
                onChange={e => setEditing(prev => ({ ...prev!, group: e.target.value }))}
                style={inputStyle}
              >
                {GROUPS.map(g => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>QUESTION</label>
              <input
                type="text"
                value={editing.question || ""}
                onChange={e => setEditing(prev => ({ ...prev!, question: e.target.value }))}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>ANSWER</label>
              <textarea
                value={editing.answer || ""}
                onChange={e => setEditing(prev => ({ ...prev!, answer: e.target.value }))}
                rows={5}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={labelStyle}>ORDER</label>
                <input
                  type="number"
                  value={editing.order ?? 0}
                  onChange={e => setEditing(prev => ({ ...prev!, order: Number(e.target.value) }))}
                  style={inputStyle}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 22 }}>
                <input
                  type="checkbox"
                  id="visible"
                  checked={editing.visible !== false}
                  onChange={e => setEditing(prev => ({ ...prev!, visible: e.target.checked }))}
                  style={{ width: 16, height: 16, cursor: "pointer" }}
                />
                <label htmlFor="visible" style={{ fontSize: 12, fontWeight: 700, color: "#071820", cursor: "pointer" }}>
                  Visible
                </label>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
            <button
              onClick={save}
              disabled={saving}
              style={{
                flex: 1,
                padding: "12px",
                background: "#071820",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {saving ? "Saving…" : "Save FAQ"}
            </button>
            <button
              onClick={() => setEditing(null)}
              style={{
                padding: "12px 18px",
                background: "#f0f2f5",
                color: "#56666b",
                border: "none",
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div style={{ background: "#f8fafb", border: "1.5px dashed #dce6e7", borderRadius: 20, padding: "40px 20px", textAlign: "center", color: "#8a979b", fontSize: 13 }}>
          Select an FAQ to edit or click "+ Add FAQ" to create a new one.
        </div>
      )}
    </div>
  );
}
