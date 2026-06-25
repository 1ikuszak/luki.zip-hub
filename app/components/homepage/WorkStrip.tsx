import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/app/components/oferta/Reveal";

/**
 * Wybrane case studies — kompozycja w duchu Saraev "Some of our work":
 * karta-obraz (brand-gradient) z zaokrąglonymi rogami + okrągły przycisk ↗
 * w lewym dolnym rogu, tytuł + jednolinijkowy efekt pod kartą. 3 w jednym rzędzie.
 */
type Project = {
  slug: string;
  name: string;
  result: string;
  stat: string;
  statLabel: string;
};

const PROJECTS: Project[] = [
  {
    slug: "jbb-skolim",
    name: "JBB / Skolim",
    result: "Launch Skolima zbudowany hybrydowo z AI.",
    stat: "300K",
    statLabel: "rekord kanału",
  },
  {
    slug: "matrix-crew",
    name: "Matrix Crew",
    result: "System AI zamiast etatu social media managera.",
    stat: "+40%",
    statLabel: "więcej aplikacji",
  },
  {
    slug: "jg-marine",
    name: "JG Marine",
    result: "Custom CRM i automatyzacja fakturowni.",
    stat: "~1200h",
    statLabel: "odzyskane rocznie",
  },
];

const TILES = [
  "radial-gradient(120% 80% at 22% 12%, #5278e0, transparent 55%), radial-gradient(120% 90% at 82% 92%, #1a3aa8, transparent 55%), #131d44",
  "radial-gradient(130% 100% at 50% 0%, #4a6fe0, transparent 60%), #0f1838",
  "radial-gradient(120% 80% at 16% 90%, #5e84e8, transparent 55%), radial-gradient(110% 90% at 92% 10%, #182a6b, transparent 55%), #121c46",
];

export function WorkStrip() {
  return (
    <section className="relative overflow-hidden border-t border-[var(--border)] py-20 sm:py-28">
      {/* miękki glow pod sekcją */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-8 h-[420px] w-[760px] max-w-[92vw] -translate-x-1/2 rounded-full opacity-50 blur-[130px]"
        style={{ background: "radial-gradient(closest-side, rgba(38,86,217,0.16), transparent)" }}
      />

      <div className="container-wide relative">
        <Reveal>
          <h2
            className="max-w-[18ch] font-semibold text-[var(--text)]"
            style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)", lineHeight: 1.02, letterSpacing: "-0.03em" }}
          >
            Wdrożenia, które bronią się same.
          </h2>
          <p className="mt-5 max-w-[52ch] t-body-large text-[var(--text-secondary)]">
            Realne efekty z realnych projektów. Każdy zbudowany, wdrożony i
            prowadzony przeze mnie. Kliknij, żeby zobaczyć cały case.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-5 lg:gap-7">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.07}>
              <Link
                href={`/case-studies/${p.slug}`}
                data-track="case_study_card"
                data-track-id={`case_home_${p.slug}`}
                data-track-href={`/case-studies/${p.slug}`}
                className="group block"
              >
                {/* karta-obraz (brand gradient) + okrągły ↗ w lewym dolnym rogu */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-[var(--border)]">
                  <div
                    className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    style={{ background: TILES[i % TILES.length] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/25" />

                  {/* hero-liczba: biznesowy eye-catch, prawy górny róg, do prawej */}
                  <div className="absolute right-5 top-5 text-right">
                    <div
                      className="font-semibold leading-[0.95] tracking-[-0.03em] text-white"
                      style={{ fontSize: "clamp(34px, 4.6vw, 46px)", fontVariantNumeric: "tabular-nums" }}
                    >
                      {p.stat}
                    </div>
                    <div className="mt-1.5 text-[12px] font-medium uppercase tracking-[0.12em] text-white/75">
                      {p.statLabel}
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-sm transition-colors duration-200 group-hover:bg-white group-hover:text-[var(--text)]">
                    <ArrowUpRight size={18} strokeWidth={2} />
                  </div>
                </div>

                {/* tytuł + efekt pod kartą */}
                <div className="mt-4">
                  <h3 className="text-[19px] font-semibold leading-tight text-[var(--text)]">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-[14px] leading-snug text-[var(--text-secondary)]">
                    {p.result}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
