"use client";

import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export function FloatingContact() {
  const whatsapp = SITE_CONFIG.brand.whatsapp;

  return (
    <div className="fixed bottom-5 right-5 z-45">
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 duration-300"
      >
        <MessageCircle className="h-5 w-5 fill-current" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </a>
    </div>
  );
}
