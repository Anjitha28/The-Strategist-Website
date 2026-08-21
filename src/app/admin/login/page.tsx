"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Invalid credentials");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #071820 0%, #0d2d3e 60%, #18b8ad22 100%)",
    }}>
      <div style={{
        width: "100%",
        maxWidth: 400,
        background: "rgba(255,255,255,0.97)",
        borderRadius: 20,
        padding: "40px 36px",
        boxShadow: "0 32px 80px rgba(7,24,32,0.28)",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/strategist-logo.png" alt="The Strategist" style={{ height: 36, objectFit: "contain" }} />
          <p style={{ marginTop: 10, fontSize: 12, color: "#8a979b", letterSpacing: "0.15em", fontWeight: 700 }}>
            ADMIN PANEL
          </p>
        </div>

        <h1 style={{ margin: "0 0 24px", fontSize: 22, fontWeight: 800, color: "#071820", textAlign: "center" }}>
          Sign In
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#56666b", marginBottom: 6 }}>
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="admin@example.com"
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1.5px solid #dce6e7",
                borderRadius: 10,
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
                background: "#f8fafb",
                color: "#071820",
                transition: "border-color 0.2s",
              }}
              onFocus={e => (e.target.style.borderColor = "#18b8ad")}
              onBlur={e => (e.target.style.borderColor = "#dce6e7")}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#56666b", marginBottom: 6 }}>
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1.5px solid #dce6e7",
                borderRadius: 10,
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
                background: "#f8fafb",
                color: "#071820",
                transition: "border-color 0.2s",
              }}
              onFocus={e => (e.target.style.borderColor = "#18b8ad")}
              onBlur={e => (e.target.style.borderColor = "#dce6e7")}
            />
          </div>

          {error && (
            <div style={{
              background: "#fff0f0",
              border: "1px solid #ffcccc",
              borderRadius: 8,
              padding: "10px 14px",
              marginBottom: 16,
              fontSize: 13,
              color: "#c0392b",
              fontWeight: 600,
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: loading ? "#8a979b" : "#071820",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 800,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
              letterSpacing: "0.05em",
            }}
          >
            {loading ? "Signing in…" : "Sign In →"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 24, fontSize: 12, color: "#8a979b" }}>
          <a href="/" style={{ color: "#18b8ad", fontWeight: 600, textDecoration: "none" }}>
            ← Back to website
          </a>
        </p>
      </div>
    </div>
  );
}
