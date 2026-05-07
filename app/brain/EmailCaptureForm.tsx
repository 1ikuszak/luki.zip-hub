"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { trackCTA } from "@/app/lib/analytics";

export function EmailCaptureForm({
  ctaId = "brain_form_submit",
}: {
  ctaId?: string;
}) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        setError("Coś nie zagrało. Spróbuj za chwilę.");
        setSubmitting(false);
        return;
      }

      trackCTA(ctaId);
      setSuccess(true);
      setSubmitting(false);
    } catch {
      setError("Brak połączenia. Sprawdź internet i spróbuj ponownie.");
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div
        role="status"
        className="inline-flex items-center gap-2 h-[52px] px-5 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] text-base font-semibold"
      >
        <Check size={18} strokeWidth={2.25} />
        Jesteś w środku &lt;3
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <form
        onSubmit={onSubmit}
        className="flex flex-col sm:flex-row gap-2 sm:gap-2"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="twój@email.com"
          className="flex-1 h-[52px] px-4 rounded-lg bg-white border border-[var(--border)] text-base text-[var(--text)] placeholder:text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)]"
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-[52px] items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-7 text-base font-semibold text-white hover:bg-[var(--accent-light)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Wysyłam..." : "Zapisz się"}
          {!submitting && <ArrowRight size={16} strokeWidth={2.25} />}
        </button>
      </form>
      {error && (
        <p className="text-[14px] text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
