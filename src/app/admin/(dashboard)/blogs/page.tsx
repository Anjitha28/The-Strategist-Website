import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { Plus, FileText } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog Posts | Admin" };

const STATUS_STYLE: Record<string, string> = {
  published: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  draft: "bg-amber-50 text-amber-700 border border-amber-200",
  archived: "bg-slate-100 text-slate-500 border border-slate-200",
};

export default async function AdminBlogsPage() {
  await requireUser();
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true, author: true },
  }).catch(() => []);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
          <p className="text-sm text-slate-500">{posts.length} total posts</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Title</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Author</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Published</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Views</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">No blog posts found.</td>
                </tr>
              ) : posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 shrink-0 text-slate-400" />
                      <span className="font-medium text-slate-900 line-clamp-1">{post.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{post.category?.name ?? "—"}</td>
                  <td className="px-6 py-4 text-slate-500">{post.author?.name ?? "—"}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLE[post.status] ?? ""}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">{post.publishedAt ? formatDate(post.publishedAt) : "—"}</td>
                  <td className="px-6 py-4 text-slate-500">{post.views}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/blog/${post.slug}`} target="_blank" className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100">View</Link>
                      <Link href={`/admin/blogs/${post.id}`} className="rounded-lg border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100">Edit</Link>
                    </div>
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
