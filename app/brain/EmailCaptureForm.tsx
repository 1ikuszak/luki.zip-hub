"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { trackCTA } from "@/app/lib/analytics";
import { readSourceContext } from "@/app/lib/source-tracking";

export function EmailCaptureForm({
  ctaId = "brain_form_submit",
  bridgeLinks,
}: {
  ctaId?: string;
  bridgeLinks?: { title: string; href: string }[];
}) {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Po zapisie znika formularz razem z aktywnym elementem - focus wraca na
  // komunikat, zeby czytnik ekranu i klawiatura nie zgubily miejsca.
  useEffect(() => {
    if (success) successRef.current?.focus();
  }, [success]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    setError(null);

    const source = readSourceContext(searchParams);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          article_slug: source.article_slug,
          medium: source.medium,
          referring_site: source.referring_site,
        }),
        // Slabe LTE potrafilo zostawic przycisk w "Wysylam..." bez konca.
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) {
        setError(
          res.status === 400
            ? "Ten adres wygląda na niepoprawny. Sprawdź go i wyślij jeszcze raz."
            : "Zapis nie przeszedł. Spróbuj za chwilę.",
        );
        setSubmitting(false);
        return;
      }

      trackCTA(ctaId, undefined, {
        article_slug: source.article_slug,
        medium: source.medium,
      });
      setSuccess(true);
      setSubmitting(false);
    } catch (err) {
      setError(
        err instanceof DOMException && err.name === "TimeoutError"
          ? "Serwer nie odpowiada. Spróbuj jeszcze raz za chwilę."
          : "Brak połączenia. Sprawdź internet i spróbuj ponownie.",
      );
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="flex flex-col gap-4 outline-none"
      >
        <div className="inline-flex items-center gap-2 text-base font-semibold text-[var(--accent)]">
          <Check size={18} strokeWidth={2.25} />
          Jesteś w środku. &lt;3
        </div>
        <p className="max-w-[480px] text-[15px] leading-relaxed text-[var(--text-secondary)]">
          System jeszcze dopinam na ostatni guzik. Wpadnie na Twój mail lada
          moment, pamiętam o Tobie.
        </p>
        {bridgeLinks && bridgeLinks.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
              W międzyczasie zacznij tu
            </span>
            <ul className="flex flex-col gap-2">
              {bridgeLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-[15px] font-medium text-[var(--text)] transition-colors hover:text-[var(--accent)]"
                  >
                    <ArrowRight
                      size={15}
                      strokeWidth={2.25}
                      className="shrink-0 text-[var(--accent)] transition-transform group-hover:translate-x-0.5"
                    />
                    {l.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <form
        onSubmit={onSubmit}
        className="flex flex-col sm:flex-row gap-2.5"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Adres e-mail
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          enterKeyHint="go"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="twój@email.com"
          className="w-full sm:flex-1 h-[56px] sm:h-[52px] px-4 rounded-lg bg-white border border-[var(--border)] text-base text-[var(--text)] placeholder:text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] focus:border-[var(--accent)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="btn-glossy inline-flex w-full sm:w-auto h-[56px] sm:h-[52px] items-center justify-center gap-2 rounded-lg px-7 text-base font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Wysyłam..." : "Chcę system"}
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
