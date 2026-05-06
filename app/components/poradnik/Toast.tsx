"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";

type ToastState = {
  id: number;
  message: string;
  tone: "success" | "error";
};

export function Toast() {
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as
        | { message?: string; tone?: "success" | "error" }
        | undefined;
      setToast({
        id: Date.now(),
        message: detail?.message ?? "Skopiowano",
        tone: detail?.tone ?? "success",
      });
    };
    window.addEventListener("luki:toast", handler);
    return () => window.removeEventListener("luki:toast", handler);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const isError = toast?.tone === "error";

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2"
          role="status"
          aria-live="polite"
        >
          <div
            className={`flex items-center gap-2.5 rounded-full border px-4 py-2.5 shadow-lg backdrop-blur-md ${
              isError
                ? "border-red-200 bg-red-50/95 text-red-900"
                : "border-black/10 bg-[#141115]/95 text-white"
            }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full ${
                isError ? "bg-red-500 text-white" : "bg-[var(--chartreuse)] text-[#141115]"
              }`}
            >
              {isError ? (
                <AlertCircle size={12} strokeWidth={2.5} />
              ) : (
                <Check size={12} strokeWidth={3} />
              )}
            </span>
            <span className="text-[13px] font-medium tracking-tight">
              {toast.message}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
