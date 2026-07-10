import type { Metadata } from "next";
import Link from "next/link";
import { Check, Mail, ArrowRight } from "lucide-react";

// Strona po płatności — nie indeksujemy.
export const metadata: Metadata = {
  title: "Dziękuję — Drugi Mózg",
  robots: { index: false, follow: false },
};

const NEXT_STEPS = [
  "Sprawdź maila (czasem ląduje w spamie albo w zakładce Oferty).",
  "Kliknij link dostępowy — otwiera komplet kursu, wszystkie 5 dni od razu.",
  "Po kliknięciu ta przeglądarka pamięta cię przez pół roku. Nowe urządzenie albo link wygasł? Na stronie kursu podajesz maila i dostajesz świeży.",
];

export default function DziekujePage() {
  return (
    <main className="container-narrow py-20 sm:py-28 enter">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-white">
        <Check size={26} strokeWidth={3} />
      </div>

      <h1 className="t-h1 mt-7">Jest. Drugi Mózg jest twój.</h1>
      <p className="t-body-large mt-5 text-[var(--text-secondary)]">
        Płatność przeszła. Dostęp do kursu wysyłam na maila, którym płaciłeś,
        zwykle w minutę. Dożywotni, więc nigdzie ci nie ucieknie.
      </p>

      {/* Co teraz — jeden jasny następny krok */}
      <section className="mt-10 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-7 sm:p-9 shadow-[0_40px_120px_-60px_rgba(8,12,40,0.45)]">
        <div className="flex items-center gap-3">
          <Mail size={20} strokeWidth={2.5} className="text-[var(--accent)]" />
          <h2 className="t-h3">Co teraz</h2>
        </div>
        <ul className="mt-5 space-y-3">
          {NEXT_STEPS.map((step) => (
            <li key={step} className="flex gap-3">
              <Check size={18} strokeWidth={2.5} className="mt-1 shrink-0 text-[var(--accent)]" />
              <span className="t-body text-[var(--text)]">{step}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Redukcja buyer's remorse — przypomnienie risk reversal */}
      <section className="mt-8 border-t border-[var(--border)] pt-6">
        <p className="t-body text-[var(--text-secondary)]">
          Dobra decyzja. Wejdź w Dzień 1 i postaw fundament. Jeśli po Dniu 2 nie
          widzisz, że twoje AI zaczyna pisać z twojej wiedzy zamiast ze średniej
          internetu, piszesz jedno zdanie i oddaję 297 zł. Bez pytań. Ryzyko jest
          moje, nie twoje.
        </p>
      </section>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Link
          href="/drugi-mozg"
          className="inline-flex h-[52px] items-center gap-2 rounded-full border border-[var(--border)] bg-white px-7 text-[16px] font-semibold text-[var(--text)] transition-colors hover:border-[var(--text)]"
        >
          Wróć na stronę
          <ArrowRight size={18} strokeWidth={2.5} />
        </Link>
        <Link
          href="/drugi-mozg/kurs"
          className="t-small font-semibold text-[var(--accent)] hover:underline"
        >
          Mail nie doszedł w 10 minut? Wyślij ponownie
        </Link>
      </div>
    </main>
  );
}
