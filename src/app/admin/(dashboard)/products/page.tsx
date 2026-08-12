import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Products | Admin" };

export default async function AdminProductsPage() {
  await requireUser();
  const products = await prisma.product.findMany({
    orderBy: { order: "asc" },
    include: { category: true },
  }).catch(() => []);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-sm text-slate-500">{products.length} software products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Product
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-400 shadow-sm">
            No products yet. Add your first product.
          </div>
        ) : products.map((product) => {
          const features: string[] = JSON.parse(product.features || "[]");
          return (
            <div key={product.id} className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--color-primary-500,#3B82F6),var(--color-secondary-500,#8B5CF6))] text-white shadow-sm">
                  <Icon name={product.icon ?? "box"} className="h-6 w-6" />
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${product.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                  {product.status}
                </span>
              </div>
              {product.category && (
                <span className="text-xs font-medium text-slate-400">{product.category.name}</span>
              )}
              <h3 className="font-bold text-slate-900 leading-snug">{product.name}</h3>
              <p className="text-xs text-slate-500 line-clamp-2">{product.shortDescription}</p>
              {features.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {features.slice(0, 3).map((f) => (
                    <span key={f} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">{f}</span>
                  ))}
                  {features.length > 3 && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">+{features.length - 3} more</span>}
                </div>
              )}
              <div className="flex items-center gap-2 mt-auto pt-2 border-t border-slate-100">
                <Link href={`/products/${product.slug}`} target="_blank" className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100">View</Link>
                <Link href={`/admin/products/${product.id}`} className="rounded-lg border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100">Edit</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
