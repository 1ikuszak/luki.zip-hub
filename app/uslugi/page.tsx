import type { Metadata } from "next";
import { GradientBackdrop } from "../components/GradientBackdrop";
import { VerticalsGrid } from "../components/uslugi/VerticalsGrid";
import { FinalCTA } from "../components/homepage/FinalCTA";
import { Reveal } from "../components/oferta/Reveal";
import { Breadcrumb } from "../components/Breadcrumb";

const pageTitle = "Usługi - systemy AI dla firm, które chcą skalować | Łukasz Glica";
const pageDescription =
  "AI w każdej branży, gdzie ma to sens. Drugi mózg operacyjny, systemy contentu, automatyzacja procesów i kreacja AI - zbudowane pod twój biznes.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/uslugi" },
  openGraph: { title: pageTitle, description: pageDescription, url: "/uslugi", type: "website" },
};

const CARD =
  "rounded-[20px] border border-white/55 bg-[var(--bg-card)] shadow-[0_50px_140px_-70px_rgba(8,12,40,0.6)] sm:rounded-[28px]";

const STATS = [
  { value: "300K", label: "rekord kanału klienta (JBB)" },
  { value: "500", label: "leadów z jednego materiału" },
  { value: "~1200h", label: "odzyskane rocznie u klienta" },
  { value: "10M+", label: "wygenerowanych wyświetleń" },
];

export default function Uslugi() {
  return (
    <div className="relative min-h-screen">
      <GradientBackdrop />

      <div className="relative z-10 p-2 sm:p-3">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-2 sm:gap-3">
          <main className={CARD}>
            <div className="container-wide pt-10 sm:pt-12">
              <Breadcrumb items={[{ label: "Usługi" }]} />
            </div>

            {/* Intro + staty */}
            <section className="container-wide py-12 sm:py-16">
              <Reveal>
                <h2
                  className="max-w-[18ch] font-semibold text-[var(--text)]"
                  style={{ fontSize: "clamp(2rem, 4.2vw, 3.2rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
                >
                  AI w każdej branży, gdzie ma to sens.
                </h2>
              </Reveal>

              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-[var(--border)] pt-10 lg:grid-cols-4">
                {STATS.map((s, i) => (
                  <Reveal key={s.label} delay={0.05 * i}>
                    <div>
                      <span
                        className="block font-semibold tracking-tight text-[var(--text)]"
                        style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", lineHeight: 1 }}
                      >
                        {s.value}
                      </span>
                      <span className="mt-3 block text-[14px] leading-snug text-[var(--text-secondary)]">{s.label}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Gdzie wdrazam AI (17 kafelkow) */}
            <VerticalsGrid />
          </main>

          <FinalCTA />
        </div>
      </div>
    </div>
  );
}
