import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/app/components/oferta/Reveal";

/**
 * Wybrane realizacje. Każda karta na brand-gradiencie (bez okładek zdjęciowych),
 * ASCII ikonka + tytuł na scrimie. Wariacja gradientu per karta dla rytmu.
 */
type Project = { name: string; result: string };

const PROJECTS: Project[] = [
  { name: "JBB / Skolim", result: "300K wyświetleń. Rekord kanału." },
  { name: "Filip AI Coach", result: "Brand film dla AI Interview Analyzer." },
  { name: "Matrix", result: "System AI dla zespołu." },
  { name: "JG Marine", result: "Strona i system marki." },
];

const TILES = [
  "radial-gradient(120% 80% at 22% 12%, #5278e0, transparent 55%), radial-gradient(120% 90% at 82% 92%, #1a3aa8, transparent 55%), #131d44",
  "radial-gradient(120% 90% at 82% 14%, #6b8cf0, transparent 55%), radial-gradient(120% 80% at 14% 88%, #20307a, transparent 55%), #101840",
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
          <p className="mt-5 max-w-[48ch] t-body-large text-[var(--text-secondary)]">
            Systemy i marki, które zbudowałem dla founderów i firm.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={(i % 4) * 0.06}>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[20px] border border-[var(--border)]">
                <div
                  className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                  style={{ background: TILES[i % TILES.length] }}
                />

                {/* scrim pod tytułem */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-[18px] font-semibold leading-tight text-white">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-[13px] leading-snug text-white/75">
                    {p.result}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.05}>
          <div className="mt-12">
            <Link
              href="/portfolio"
              data-track="cta_home"
              data-track-id="cta_home_work_all"
              data-track-href="/portfolio"
              className="group inline-flex h-[52px] items-center gap-2 rounded-full border border-[var(--border)] bg-white px-7 text-[15px] font-semibold text-[var(--text)] transition-colors hover:border-[var(--text)]"
            >
              Zobacz wszystkie realizacje
              <ArrowRight
                size={17}
                strokeWidth={2.5}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
