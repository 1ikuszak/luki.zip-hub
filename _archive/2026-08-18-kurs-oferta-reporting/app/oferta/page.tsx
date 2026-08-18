import type { Metadata } from "next";
import { Check, ArrowRight } from "lucide-react";
import { STARTER_FORM_URL } from "@/app/lib/data";
import { GradientBackdrop } from "@/app/components/GradientBackdrop";
import { MoreCTA } from "@/app/components/MoreCTA";
import { Counter } from "@/app/components/oferta/Counter";
import { Reveal } from "@/app/components/oferta/Reveal";

const pageTitle = "Oferta | luki.zip";
const pageDescription =
  "Zdobywaj klientów organicznym contentem. Kierunek marki plus 8 gotowych skryptów pod twój cel. W tydzień. Za 997 zł.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/oferta" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/oferta",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const STATS: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
}[] = [
  { to: 2, suffix: "M+", label: "wyświetleń wygenerowanych contentem" },
  { to: 8, suffix: "K", label: "subskrypcji YouTube w 3 miesiące" },
  { to: 500, label: "leadów z jednego materiału" },
];

const DELIVERABLES: { name: string; desc: string; value: string }[] = [
  {
    name: "Brand Teardown Call (60 min)",
    desc: "Rozkładam twoją markę. Pokazuję, gdzie tracisz uwagę i leady.",
    value: "600 zł",
  },
  {
    name: "Content Direction (1 strona)",
    desc: "Pozycjonowanie, narracja, 3 pillary. Twój filtr na każdy content.",
    value: "1500 zł",
  },
  {
    name: "8 gotowych skryptów na Instagram Reels",
    desc: "Hook, body, CTA. Każdy pod twój cel i styl. Wchodzisz, nagrywasz.",
    value: "2000 zł",
  },
  {
    name: "Bank 20 dodatkowych hooków",
    desc: "Na kolejne tygodnie. Nigdy nie siadasz przed pustą kartką.",
    value: "500 zł",
  },
  {
    name: "Walkthrough: jak nagrywać i publikować",
    desc: "Krok po kroku, żebyś ruszył sam.",
    value: "400 zł",
  },
];

// ASCII-graficzki nad nagłówkami sekcji (kolor akcentu, na bieli)
const MARK_DOWN = " .|.\n -+-\n  v";
const MARK_SPARK = ". * .\n* + *\n. * .";
const MARK_COMPASS = " .'.\n(-+-)\n '.'";

function Mark({ art }: { art: string }) {
  return (
    <pre
      aria-hidden="true"
      className="m-0 mb-2 select-none text-[var(--accent)]"
      style={{
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: "12px",
        lineHeight: "1.15",
        whiteSpace: "pre",
      }}
    >{art}</pre>
  );
}

export default function OfertaPage() {
  return (
    <div className="relative min-h-screen bg-[var(--bg-page)]">
      {/* FIXED efekt — tło gradientowe */}
      <GradientBackdrop />

      {/* padding dookoła — efekt jako równa ramka ze wszystkich stron */}
      <div className="relative z-10 p-3 sm:p-6 lg:p-8">
        {/* ZAOKRĄGLONA BIAŁA KARTA — floatuje na efekcie */}
        <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-[22px] border border-[var(--border)] shadow-[0_30px_80px_-50px_rgba(8,12,40,0.4)] sm:rounded-[30px]">
          {/* BIAŁY blok górny */}
          <div className="bg-[var(--bg-card)]">
            {/* odstęp u góry */}
            <div className="h-12 sm:h-16" />

          {/* ─── HERO ─────────────────────────────────────────── */}
          <section className="flex min-h-[68vh] flex-col items-center justify-center gap-8 px-6 py-20 text-center sm:px-10">
            <h1 className="max-w-[16ch] text-balance text-[44px] font-semibold leading-[1.0] tracking-[-0.03em] text-[var(--text)] sm:text-[64px] lg:text-[78px]">
              Miesiąc contentu, który{" "}
              <span className="text-[var(--accent)]">faktycznie sprzedaje.</span>
            </h1>

            <p className="max-w-[46ch] text-[17px] leading-relaxed text-[var(--text-secondary)] sm:text-[20px]">
              Strategia marki plus 8 gotowych skryptów pod twój cel. W tydzień.
              <span className="mt-1 block font-semibold text-[var(--text)]">
                Za 997 zł.
              </span>
            </p>

            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <a
                href={STARTER_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-track="cta_oferta_main"
                data-track-id="cta_oferta_hero"
                data-track-href={STARTER_FORM_URL}
                className="btn-glossy group inline-flex h-[56px] items-center gap-2 rounded-full px-8 text-[16px] font-semibold text-white"
              >
                Chcę Starter
                <ArrowRight
                  size={18}
                  strokeWidth={2.5}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
            </div>

            {/* statystyki */}
            <div className="mt-6 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-0">
              {STATS.map((s, i) => (
                <div key={s.label} className="flex items-center">
                  {i > 0 && (
                    <span className="mx-8 hidden h-10 w-px bg-[var(--border)] sm:block" />
                  )}
                  <div className="flex flex-col items-center sm:items-start">
                    <Counter
                      to={s.to}
                      suffix={s.suffix}
                      prefix={s.prefix}
                      decimals={s.decimals}
                      className="text-[30px] font-semibold leading-none text-[var(--text)] sm:text-[34px]"
                    />
                    <span className="mt-1.5 text-[12px] leading-snug text-[var(--text-secondary)]">
                      {s.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── TREŚĆ ────────────────────────────────────────── */}
          <div className="container-narrow flex flex-col gap-20 border-t border-[var(--border)] py-24 sm:gap-28 sm:py-28">
            {/* Problem */}
            <Reveal>
              <section className="flex flex-col gap-4">
                <Mark art={MARK_DOWN} />
                <h2 className="text-balance text-[26px] font-semibold leading-[1.18] tracking-[-0.02em] sm:text-[32px]">
                  Wrzucasz rolki i nie ma rezultatu.
                </h2>
                <p className="t-body max-w-[52ch] text-[var(--text-secondary)]">
                  Setki poświęconych godzin, a wciąż zero zapytań i zero
                  sprzedaży. Bez systemu i pozycjonowania tylko tracisz czas.
                </p>
              </section>
            </Reveal>

            {/* Dowiedz się, co naprawdę przynosi klientów */}
            <Reveal>
              <section className="flex flex-col gap-4">
                <Mark art={MARK_SPARK} />
                <h2 className="text-balance text-[26px] font-semibold leading-[1.18] tracking-[-0.02em] sm:text-[32px]">
                  Dowiedz się, co naprawdę przynosi ci klientów.
                </h2>
                <p className="t-body max-w-[52ch] text-[var(--text-secondary)]">
                  Zrobiłem ponad{" "}
                  <span className="font-semibold text-[var(--text)]">
                    2 miliony wyświetleń
                  </span>
                  . Swoich i klientów.
                </p>
                <p className="t-body max-w-[52ch] text-[var(--text-secondary)]">
                  Ale z wyświetleń nie zapłacisz pensji. Z klientów tak.
                </p>
                <p className="t-body max-w-[52ch] text-[var(--text-secondary)]">
                  Pokażę ci, które rolki pozyskują klientów. I jak wdrożyć to u
                  ciebie.
                </p>
              </section>
            </Reveal>

            {/* Co dostajesz */}
            <Reveal>
              <section className="flex flex-col gap-8">
                <Mark art={MARK_COMPASS} />
                <h2 className="text-balance text-[26px] font-semibold leading-[1.18] tracking-[-0.02em] sm:text-[32px]">
                  Dostajesz kierunek, który zamienia uwagę w klientów.
                </h2>

                <ul className="flex flex-col">
                  {DELIVERABLES.map((d, i) => (
                    <li
                      key={d.name}
                      className={`flex items-start gap-4 py-5 ${
                        i > 0 ? "border-t border-[var(--border)]" : ""
                      }`}
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10">
                        <Check
                          size={15}
                          strokeWidth={2.75}
                          className="text-[var(--accent)]"
                        />
                      </span>
                      <div className="flex grow flex-col gap-1">
                        <span className="text-[16px] font-semibold leading-snug text-[var(--text)]">
                          {d.name}
                        </span>
                        <p className="text-[14px] leading-snug text-[var(--text-secondary)]">
                          {d.desc}
                        </p>
                      </div>
                      <span
                        className="mt-1 shrink-0 whitespace-nowrap text-[13px] text-[var(--text-secondary)]"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        warte {d.value}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Cena — klikalna karta */}
                <a
                  href={STARTER_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="cta_oferta_main"
                  data-track-id="cta_oferta_price"
                  data-track-href={STARTER_FORM_URL}
                  className="group relative block overflow-hidden rounded-[24px] bg-[var(--accent)] p-8 text-white shadow-[0_30px_70px_-24px_rgba(38,86,217,0.65)] transition-transform hover:-translate-y-1 sm:p-10"
                >
                  {/* poświata */}
                  <div
                    className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(56,189,248,0.9), transparent 70%)",
                    }}
                  />
                  <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70">
                        Starter
                      </span>
                      <span className="text-[14px] text-white/65 line-through">
                        Łączna wartość ~5000 zł
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-[15px] text-white/80">Płacisz</span>
                        <span
                          className="text-[52px] font-semibold leading-none sm:text-[60px]"
                          style={{ fontVariantNumeric: "tabular-nums" }}
                        >
                          997 zł
                        </span>
                      </div>
                    </div>
                    <span className="btn-glossy-light inline-flex h-[56px] shrink-0 items-center justify-center gap-2 rounded-full px-8 text-[16px] font-semibold text-[var(--accent)]">
                      Chcę Starter
                      <ArrowRight
                        size={18}
                        strokeWidth={2.5}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </a>
              </section>
            </Reveal>

          </div>
          </div>

          {/* DZIURA w białym — prześwituje fixed gradient (biały tekst) */}
          <Reveal>
            <section className="flex flex-col items-center gap-4 px-6 py-24 text-center sm:px-10">
              <h2
                className="text-balance text-[26px] font-semibold leading-[1.18] tracking-[-0.02em] text-white sm:text-[32px]"
                style={{ textShadow: "0 1px 24px rgba(5,8,30,0.45)" }}
              >
                Każdy miesiąc bez systemu to stracone nagrania.
              </h2>
              <p
                className="t-body max-w-[52ch] text-white/85"
                style={{ textShadow: "0 1px 18px rgba(5,8,30,0.4)" }}
              >
                Sam szukałbyś tego, co działa, pół roku. Zgadując, testując,
                gadając do ściany. Ja skracam to do jednej sesji.
              </p>
              <p
                className="t-body max-w-[52ch] text-white/85"
                style={{ textShadow: "0 1px 18px rgba(5,8,30,0.4)" }}
              >
                Nie kupujesz skryptów. Kupujesz miesiące, których nie tracisz.
              </p>
              <div className="mt-2">
                <a
                  href={STARTER_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="cta_oferta_main"
                  data-track-id="cta_oferta_close"
                  data-track-href={STARTER_FORM_URL}
                  className="btn-glossy-light group inline-flex h-[56px] items-center gap-2 rounded-full px-8 text-[16px] font-semibold text-[var(--accent)]"
                >
                  Chcę Starter
                  <ArrowRight
                    size={18}
                    strokeWidth={2.5}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </section>
          </Reveal>

        </div>

        {/* Zamykający CTA — wspólny komponent */}
        <MoreCTA />
      </div>
    </div>
  );
}
