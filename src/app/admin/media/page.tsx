import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AdminShell from "../_components/AdminShell";
import Image from "next/image";
import { Image as ImageIcon, ShieldCheck, CheckCircle2, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

const MEDIA_ASSETS = [
  {
    name: "Hero Visual Artwork",
    path: "/brand/hero-visual-final.png",
    usage: "Homepage Hero section background",
    resolution: "High Resolution Transparent PNG",
    status: "Active on Live Website",
    aspect: "Wide (16:9)",
  },
  {
    name: "The Strategist Primary Logo",
    path: "/brand/strategist-logo.png",
    usage: "Global Navigation Bar, Footer & Admin Header",
    resolution: "Vector / High-res Transparent PNG",
    status: "Active on Live Website",
    aspect: "Standard Brandmark",
  },
  {
    name: "Hero Reference Canvas",
    path: "/brand/hero-reference-highres.png",
    usage: "High-contrast visual asset reference",
    resolution: "Original Source Master",
    status: "Archived & Protected",
    aspect: "Master Asset",
  },
];

export default async function AdminMediaPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  return (
    <AdminShell userName={user.email}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#dce6ee]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#18b8ad] mb-1">
              <ImageIcon className="h-4 w-4" />
              <span>Asset Library</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#071820] tracking-tight">
              Media & Brand Assets
            </h1>
            <p className="text-xs text-[#56666b] mt-0.5">
              Review and manage high-resolution brand visuals and artwork used across The Strategist website.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MEDIA_ASSETS.map((asset) => (
            <div
              key={asset.path}
              className="bg-white p-6 rounded-2xl border border-[#dce6ee] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="relative aspect-video w-full rounded-xl bg-[#071820] overflow-hidden border border-[#18b8ad]/20 flex items-center justify-center p-4 mb-4">
                  <div className="relative w-full h-full">
                    <Image
                      src={asset.path}
                      alt={asset.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-extrabold text-[#071820]">{asset.name}</h3>
                  <span className="text-[10px] font-bold text-[#18b8ad] bg-[#e7f6f4] px-2 py-0.5 rounded-md">
                    {asset.aspect}
                  </span>
                </div>

                <p className="text-xs text-[#56666b] leading-relaxed">{asset.usage}</p>

                <div className="mt-3 pt-3 border-t border-[#dce6ee] text-[11px] text-[#8a979b] space-y-1">
                  <div>
                    <span className="font-semibold text-[#071820]">Path:</span>{" "}
                    <code className="bg-[#F1F6FA] px-1.5 py-0.5 rounded text-[10px] text-[#071820]">
                      {asset.path}
                    </code>
                  </div>
                  <div>
                    <span className="font-semibold text-[#071820]">Format:</span> {asset.resolution}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#dce6ee] flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{asset.status}</span>
                </span>
                <a
                  href={asset.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#18b8ad] hover:text-[#159f95] font-bold flex items-center gap-1"
                >
                  <span>View Full</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
