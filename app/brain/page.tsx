import type { Metadata } from "next";
import { EmailCaptureForm } from "./EmailCaptureForm";

const pageTitle = "Newsletter | luki.zip";
const pageDescription =
  "Poradniki o brand designie i launchach na maila. Bez spamu, jeden mail tygodniowo.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/brain" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/brain",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const FAQ = [
  {
    q: "Co konkretnie dostanę?",
    a: "Jeden mail w tygodniu. Konkretny insight, case study albo szablon. Maks 5 minut czytania.",
  },
  {
    q: "Czy mogę się wypisać?",
    a: "Tak, jednym kliknięciem w stopce każdego maila.",
  },
];

export default function BrainPage() {
  return (
    <>
      <section className="container-wide pt-16 sm:pt-24 pb-12 sm:pb-20">
        <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[var(--accent)]">
          Newsletter
        </div>
        <h1 className="t-h1 mt-5 max-w-[800px]">Poradniki na maila</h1>
        <p className="t-body-large mt-6 text-[var(--text-secondary)] max-w-[640px]">
          Co tydzień jeden konkretny insight o budowaniu brandu w erze AI.
          Krótko, bez spamu.
        </p>

        <div className="mt-10 max-w-[560px]">
          <EmailCaptureForm ctaId="cta_brain_hero_submit" />
          <p className="mt-3 t-small text-[var(--text-secondary)]">
            Po zapisie dostaniesz email z potwierdzeniem.
          </p>
        </div>
      </section>

      <section className="container-narrow py-16 sm:py-24">
        <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[var(--accent)]">
          FAQ
        </div>
        <h2 className="t-h2 mt-3">Najczęstsze pytania</h2>
        <div className="mt-8 bg-white rounded-xl border border-[var(--border)] divide-y divide-[var(--border)]">
          {FAQ.map((item) => (
            <details key={item.q} className="group p-6 cursor-pointer">
              <summary className="flex items-center justify-between gap-4">
                <span className="text-[16px] font-semibold text-[var(--text)]">
                  {item.q}
                </span>
                <span className="text-[var(--text-secondary)] transition-transform duration-150 group-open:rotate-45 text-2xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-4 t-body text-[var(--text-secondary)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
