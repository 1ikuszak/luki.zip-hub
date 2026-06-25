"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

/**
 * E-mail z kopiowaniem do schowka. Klik = kopiuje + feedback "E-mail skopiowany".
 */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // schowek niedostępny — cicho, e-mail i tak widoczny
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "E-mail skopiowany" : `Skopiuj e-mail ${email}`}
      className="mt-4 inline-flex h-10 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-4 text-[14px] text-[var(--text)] transition-colors hover:border-[var(--accent)]"
    >
      <span>{copied ? "E-mail skopiowany" : email}</span>
      {copied ? (
        <Check size={15} strokeWidth={2.5} className="shrink-0 text-[var(--accent)]" />
      ) : (
        <Copy size={15} strokeWidth={2} className="shrink-0 text-[var(--text-secondary)]" />
      )}
    </button>
  );
}
