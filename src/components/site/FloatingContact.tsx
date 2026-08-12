"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, X, Plus } from "lucide-react";

export function FloatingContact({ whatsapp, phone }: { whatsapp?: string; phone?: string }) {
  const [open, setOpen] = useState(false);
  if (!whatsapp && !phone) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-[var(--shadow-float)]"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 rounded-full bg-primary-600 px-4 py-3 text-sm font-medium text-white shadow-[var(--shadow-float)]"
              >
                <Phone className="h-4 w-4" /> Call Us
              </a>
            )}
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-full bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--fg)] shadow-[var(--shadow-float)] border border-[var(--border-color)]"
            >
              <MessageCircle className="h-4 w-4" /> Enquiry
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close contact options" : "Open contact options"}
        className="grid h-14 w-14 place-items-center rounded-full bg-[linear-gradient(135deg,var(--color-primary-600),var(--color-secondary-600))] text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </button>
    </div>
  );
}
