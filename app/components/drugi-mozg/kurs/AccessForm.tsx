"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";

type FormState = "idle" | "sending" | "sent" | "error" | "throttled";

/**
 * Formularz "wyślij mi link do kursu". POST /api/kurs/login — serwer sprawdza
 * zakup w EasyCart i wysyła 30-minutowy magic link. Odpowiedź sukcesu jest
 * celowo generyczna (nie zdradzamy, czy email kupił), więc UI po wysłaniu
 * zawsze mówi to samo.
 */
export function AccessForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/kurs/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setState("sent");
      else if (res.status === 429) setState("throttled");
      else setState("error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="mx-auto flex max-w-[420px] items-start gap-3 rounded-2xl border border-[var(--border)] bg-white p-5 text-left">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white">
          <Check size={16} strokeWidth={3} />
        </span>
        <p className="t-small text-[var(--text-secondary)]">
          <span className="font-semibold text-[var(--text)]">Sprawdź skrzynkę.</span>{" "}
          Jeśli ten mail kupił kurs, świeży link już do niego leci (ważny 30
          minut). Zajrzyj też do spamu i zakładki Oferty.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-[420px]">
      <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-white p-1.5 pl-4 shadow-[0_20px_50px_-30px_rgba(8,12,40,0.35)] focus-within:border-[var(--accent)]">
        <Mail size={17} strokeWidth={2} className="shrink-0 text-[var(--text-secondary)]" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Mail, którym płaciłeś"
          autoComplete="email"
          className="h-10 w-full min-w-0 bg-transparent text-[15px] text-[var(--text)] outline-none placeholder:text-[var(--text-secondary)]"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="btn-glossy inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-5 text-[14px] font-semibold text-white disabled:opacity-70"
        >
          {state === "sending" ? (
            <Loader2 size={15} strokeWidth={2.5} className="animate-spin" />
          ) : (
            <>
              Wyślij link
              <ArrowRight size={15} strokeWidth={2.5} />
            </>
          )}
        </button>
      </div>
      {state === "error" && (
        <p className="t-small mt-3 text-[var(--text-secondary)]">
          Coś nie zagrało po naszej stronie. Spróbuj za chwilę albo napisz do
          mnie - wysyłam dostęp od ręki.
        </p>
      )}
      {state === "throttled" && (
        <p className="t-small mt-3 text-[var(--text-secondary)]">
          Za dużo prób na raz. Odczekaj kwadrans i spróbuj ponownie.
        </p>
      )}
    </form>
  );
}
