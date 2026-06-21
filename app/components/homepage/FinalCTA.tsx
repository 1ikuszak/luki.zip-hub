import { ArrowRight } from "lucide-react";
import { Reveal } from "@/app/components/oferta/Reveal";
import { CONTACT_FORM_URL } from "@/app/lib/data";

/** Risk reversal (Koe 10) + CTA (11) na ciemnym bloku z poświatą akcentu. */
export function FinalCTA() {
  return (
    <section className="container-wide py-12 sm:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] bg-[var(--text)] px-7 py-16 text-white sm:px-14 sm:py-24">
          <div
            className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full opacity-[0.22] blur-3xl"
            style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
          />
          <div className="relative max-w-[680px]">
            <p className="text-[14px] leading-relaxed text-white/65">
              Pierwsza rozmowa nic nie kosztuje i do niczego nie zobowiązuje. Jak
              nie widzę, że mogę ci realnie pomóc, powiem ci to wprost. Nie
              sprzedaję na siłę i nie biorę projektów, których nie dowiozę na
              swoim poziomie.
            </p>
            <h2
              className="mt-8 font-semibold"
              style={{ fontSize: "clamp(2rem, 4.4vw, 3.4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              Masz dwie opcje.
            </h2>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-white/80 sm:text-[19px]">
              <p>
                Dalej walczyć z AI, które wypluwa to samo co u konkurencji, i
                tłumaczyć sobie, że wystarczy.
              </p>
              <p className="font-semibold text-white">
                Albo wdrożyć system, który tworzy w twoim taste, skaluje się
                razem z twoją firmą i oddaje ci czas na to, co naprawdę kochasz.
              </p>
            </div>
            <a
              href={CONTACT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-track="cta_contact"
              data-track-id="cta_home_final_call"
              data-track-href={CONTACT_FORM_URL}
              className="group mt-10 inline-flex h-[56px] items-center gap-2 rounded-full bg-white px-8 text-[16px] font-semibold text-[var(--text)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Umów rozmowę
              <ArrowRight size={18} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
