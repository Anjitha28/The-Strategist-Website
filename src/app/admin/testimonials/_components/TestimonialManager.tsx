"use client";

import { useState } from "react";

type Testimonial = {
  id: string;
  name: string;
  company: string | null;
  designation: string | null;
  quote: string;
  rating: number;
  order: number;
  visible: boolean;
};

export default function TestimonialManager({ initialData }: { initialData: Testimonial[] }) {
  const [list, setList] = useState<Testimonial[]>(initialData);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [saving, setSaving] = useState(false);

  async function reload() {
    try {
      const res = await fetch("/api/admin/testimonials");
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
      const res = await fetch("/api/admin/testimonials", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });

      if (res.ok) {
        setEditing(null);
        await reload();
      } else {
        alert("Failed to save testimonial.");
      }
    } catch {
      alert("Error saving testimonial.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, {
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
        <div style={{ display: "flex", justifyContent: "between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#071820" }}>
            Testimonials ({list.length})
          </h2>
          <button
            onClick={() => setEditing({ name: "", company: "", designation: "", quote: "", rating: 5, order: 0, visible: true })}
            style={{
              padding: "8px 16px",
              background: "#18b8ad",
              color: "#071820",
              border: "none",
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 850,
              cursor: "pointer",
            }}
          >
            + Add Testimonial
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {list.map((item) => (
            <div
              key={item.id}
              style={{
                padding: 20,
                borderRadius: 14,
                border: "1.5px solid #edf2f4",
                background: item.visible ? "#fff" : "#fafbfc",
                opacity: item.visible ? 1 : 0.6,
                position: "relative",
              }}
            >
              <div style={{ display: "flex", gap: 4, color: "#18b8ad", fontSize: 14, marginBottom: 8 }}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p style={{ margin: "0 0 12px", fontSize: 13, color: "#46575c", fontStyle: "italic", lineHeight: 1.5 }}>
                &ldquo;{item.quote}&rdquo;
              </p>
              <div style={{ display: "flex", justifyContent: "between", alignItems: "end" }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#071820" }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: "#8a979b", marginTop: 2 }}>
                    {item.designation}{item.company ? `, ${item.company}` : ""}
                  </div>
                </div>
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
        </div>
      </div>

      {/* Editor Panel */}
      {editing ? (
        <div style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", boxShadow: "0 2px 16px rgba(7,24,32,0.07)", border: "1.5px solid #edf2f4", position: "sticky", top: 24 }}>
          <h2 style={{ margin: "0 0 24px", fontSize: 16, fontWeight: 800, color: "#071820" }}>
            {editing.id ? "Edit Testimonial" : "New Testimonial"}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={labelStyle}>NAME</label>
              <input
                type="text"
                value={editing.name || ""}
                onChange={e => setEditing(prev => ({ ...prev!, name: e.target.value }))}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>DESIGNATION</label>
              <input
                type="text"
                value={editing.designation || ""}
                onChange={e => setEditing(prev => ({ ...prev!, designation: e.target.value }))}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>COMPANY</label>
              <input
                type="text"
                value={editing.company || ""}
                onChange={e => setEditing(prev => ({ ...prev!, company: e.target.value }))}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>QUOTE</label>
              <textarea
                value={editing.quote || ""}
                onChange={e => setEditing(prev => ({ ...prev!, quote: e.target.value }))}
                rows={4}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={labelStyle}>RATING (1-5)</label>
                <select
                  value={editing.rating || 5}
                  onChange={e => setEditing(prev => ({ ...prev!, rating: Number(e.target.value) }))}
                  style={inputStyle}
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>ORDER</label>
                <input
                  type="number"
                  value={editing.order ?? 0}
                  onChange={e => setEditing(prev => ({ ...prev!, order: Number(e.target.value) }))}
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
              <input
                type="checkbox"
                id="visible"
                checked={editing.visible !== false}
                onChange={e => setEditing(prev => ({ ...prev!, visible: e.target.checked }))}
                style={{ width: 16, height: 16, cursor: "pointer" }}
              />
              <label htmlFor="visible" style={{ fontSize: 12, fontWeight: 700, color: "#071820", cursor: "pointer" }}>
                Visible on Homepage
              </label>
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
              {saving ? "Saving…" : "Save Testimonial"}
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
          Select a testimonial to edit or click "+ Add Testimonial" to create a new one.
        </div>
      )}
    </div>
  );
}
