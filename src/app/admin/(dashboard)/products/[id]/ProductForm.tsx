"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { saveProduct, deleteProduct } from "@/app/admin/actions";
import { ArrowLeft, Save, Trash2, Plus, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface ProductData {
  id?: string;
  name: string;
  slug: string;
  icon: string;
  shortDescription: string;
  description: string;
  features: string[];
  gallery: string[];
  ctaLabel: string;
  featured: boolean;
  order: number;
  status: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

export function ProductForm({ initialData }: { initialData: ProductData | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [banner, setBanner] = useState<{ ok: boolean; msg: string } | null>(null);

  const [form, setForm] = useState<ProductData>(
    initialData || {
      name: "",
      slug: "",
      icon: "box",
      shortDescription: "",
      description: "",
      features: [],
      gallery: [],
      ctaLabel: "Request Demo",
      featured: false,
      order: 0,
      status: "published",
      seoTitle: "",
      seoDescription: "",
    }
  );

  const [newFeature, setNewFeature] = useState("");
  const [newImage, setNewImage] = useState("");

  const handleChange = (field: keyof ProductData, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    setForm({ ...form, features: [...form.features, newFeature.trim()] });
    setNewFeature("");
  };

  const handleRemoveFeature = (index: number) => {
    setForm({ ...form, features: form.features.filter((_, i) => i !== index) });
  };

  const handleAddImage = () => {
    if (!newImage.trim()) return;
    setForm({ ...form, gallery: [...form.gallery, newImage.trim()] });
    setNewImage("");
  };

  const handleRemoveImage = (index: number) => {
    setForm({ ...form, gallery: form.gallery.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setBanner(null);

    try {
      const res = await saveProduct(initialData?.id || null, {
        ...form,
        seoTitle: form.seoTitle || undefined,
        seoDescription: form.seoDescription || undefined,
      });

      if (res.success) {
        setBanner({ ok: true, msg: "Product saved successfully." });
        router.refresh();
        setTimeout(() => router.push("/admin/products"), 1000);
      }
    } catch (err: any) {
      setBanner({ ok: false, msg: err.message || "Failed to save product" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id || !confirm("Are you sure you want to delete this product?")) return;
    setDeleting(true);

    try {
      const res = await deleteProduct(initialData.id);
      if (res.success) {
        router.push("/admin/products");
        router.refresh();
      }
    } catch (err: any) {
      setBanner({ ok: false, msg: err.message || "Failed to delete product" });
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[800px] p-6 pb-24 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin/products" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-semibold transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>
        {initialData?.id && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
            Delete Product
          </button>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          {initialData ? `Edit Product: ${form.name}` : "Create New Product"}
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Configure product properties, CTA buttons, features checklist, gallery images, and SEO configuration.
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
        <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
            General Info
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Product Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => {
                  const val = e.target.value;
                  const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                  setForm({ ...form, name: val, slug: initialData ? form.slug : slug });
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Icon Name</label>
              <input
                type="text"
                required
                value={form.icon}
                onChange={(e) => handleChange("icon", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">CTA Button Label</label>
              <input
                type="text"
                required
                value={form.ctaLabel}
                onChange={(e) => handleChange("ctaLabel", e.target.value)}
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
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Status</label>
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Short Description</label>
            <input
              type="text"
              required
              value={form.shortDescription}
              onChange={(e) => handleChange("shortDescription", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Detailed Description</label>
            <textarea
              value={form.description}
              rows={4}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="font-bold text-sm block text-white">Featured Product</span>
              <span className="text-xs text-slate-500 mt-1 block">
                Showcase this technology on the homepage (Section 07).
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => handleChange("featured", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 rounded-full peer peer-focus:ring-1 peer-focus:ring-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-450 after:border-slate-350 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white" />
            </label>
          </div>
        </div>

        <div className="bg-slate-955 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
            Key Features
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add key feature..."
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddFeature();
                }
              }}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition"
            >
              <Plus className="h-4.5 w-4.5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {form.features.map((feat, index) => (
              <span key={index} className="inline-flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold text-white">
                {feat}
                <button type="button" onClick={() => handleRemoveFeature(index)} className="text-slate-500 hover:text-white transition-colors">
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-955 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
            Gallery Screenshots
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Image URL (e.g. /brand/dashboard.png)..."
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddImage();
                }
              }}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition"
            >
              <Plus className="h-4.5 w-4.5" />
            </button>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            {form.gallery.map((img, index) => (
              <div key={index} className="flex items-center justify-between bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-xs font-semibold text-white">
                <span className="truncate">{img}</span>
                <button type="button" onClick={() => handleRemoveImage(index)} className="text-slate-550 hover:text-white transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-955 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2">
            SEO Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Meta Title</label>
              <input
                type="text"
                value={form.seoTitle || ""}
                onChange={(e) => handleChange("seoTitle", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Meta Description</label>
              <input
                type="text"
                value={form.seoDescription || ""}
                onChange={(e) => handleChange("seoDescription", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Link href="/admin/products" className="px-5 py-3 border border-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 transition cursor-pointer">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 rounded-xl shadow-lg cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Save className="w-4 h-4" />}
            <span>Save Product</span>
          </button>
        </div>
      </form>
    </div>
  );
}
