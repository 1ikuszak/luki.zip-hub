import { ArrowRight } from "lucide-react";
import { Reveal } from "@/app/components/oferta/Reveal";
import { CONTACT_FORM_URL } from "@/app/lib/data";
import { OptionGraph } from "./OptionGraph";

/**
 * Closer "Masz dwie opcje" — rozwidlenie drog, copy 1:1. Ciemne tlo = max kontrast.
 * Wizualizacja kontrastu (canvas, OptionGraph): LEWA "tak jak teraz" = martwe,
 * rozsypane, niepolaczone punkty (szum bez systemu = czego sie boja). PRAWA
 * "z systemem" = zywy graf, wezly lacza sie wokol rdzenia i plyna do srodka (dream
 * outcome = system pracuje). Czerpie z BrainGraph / ZywyVault. reduced-motion = static.
 */
export function FinalCTA() {
  return (
    <section className="container-wide py-12 sm:py-20">
      <div className="relative overflow-hidden rounded-[28px] bg-[var(--text)] px-7 py-16 text-white sm:px-14 sm:py-24">
        {/* Poświata akcentu — top-right, halouje Opcję B */}
        <div
          className="pointer-events-none absolute -right-28 -top-32 h-[26rem] w-[26rem] rounded-full opacity-[0.22] blur-3xl"
          style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-[940px]">
          <Reveal>
            <h2
              className="text-center font-semibold"
              style={{ fontSize: "clamp(2rem, 4.4vw, 3.4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              Masz dwie opcje.
            </h2>
          </Reveal>

          {/* Rozwidlenie: A (martwa) — albo — B (zywa) */}
          <div className="mt-10 grid grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-3">
            {/* ── A: TAK JAK TERAZ (martwa) ── */}
            <Reveal delay={0.05} className="flex">
              <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="relative h-[150px] border-b border-white/10">
                  <OptionGraph alive={false} />
                </div>
                <div className="p-6 sm:p-7">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/40">
                    Tak jak teraz
                  </span>
                  <p className="mt-3 text-[16px] leading-relaxed text-white/55 sm:text-[17px]">
                    Dalej walczyć z AI, które wypluwa to samo co u konkurencji, i
                    tłumaczyć sobie, że wystarczy.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="flex items-center justify-center">
              <span className="select-none text-[14px] italic text-white/45">albo</span>
            </Reveal>

            {/* ── B: Z SYSTEMEM (zywa) ── */}
            <Reveal delay={0.18} className="flex">
              <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[var(--accent)] shadow-[0_30px_70px_-30px_rgba(38,86,217,0.85)]">
                <div className="relative h-[150px] border-b border-white/15">
                  <OptionGraph alive />
                </div>
                <div className="p-6 sm:p-7">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/75">
                    Z systemem
                  </span>
                  <p className="mt-3 text-[16px] font-semibold leading-relaxed text-white sm:text-[17px]">
                    Wdrożyć system, który tworzy w twoim taste, skaluje się razem z
                    twoją firmą i oddaje ci czas na to, co naprawdę kochasz.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.22}>
            <div className="mt-12 flex justify-center">
              <a
                href={CONTACT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-track="cta_contact"
                data-track-id="cta_home_final_call"
                data-track-href={CONTACT_FORM_URL}
                className="btn-glossy-light group inline-flex h-[58px] items-center gap-3 rounded-full pl-8 pr-2.5 text-[17px] font-semibold text-[var(--text)]"
              >
                Umów rozmowę
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent)] text-white transition-transform group-hover:translate-x-0.5">
                  <ArrowRight size={20} strokeWidth={2.25} />
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
