import { Reveal } from "@/app/components/oferta/Reveal";
import { Organism } from "./Organism";

export function Mechanism() {
  return (
    <section className="container-wide py-20 sm:py-28">
      <Reveal>
        <div className="max-w-[62ch]">
          {/* NAZWA mechanizmu (make-or-break wg Dana Koe) */}
          <p className="t-small font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
            Żywy System
          </p>
          <h2 className="t-h2 mt-5 max-w-[20ch]">
            Inne drugie mózgi przechowują. Twój produkuje.
          </h2>
          <p className="t-body-large mt-6 text-[var(--text-secondary)]">
            Żywy System to pętla, nie folder. Wciąga twoją wiedzę: notatki,
            transkrypcje, wyceny, rzeczy, które się sprzedały. Produkuje z niej
            teksty, decyzje i oceny. Drugi agent sprawdza każdy output pod TWÓJ
            standard i poprawia, zanim go zobaczysz. System zapamiętuje poprawki,
            więc następnym razem jest bliżej ciebie. Dlatego żyje: z każdym
            tygodniem myśli bardziej jak ty, nie bardziej jak internet.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-14 sm:mt-16">
          <Organism />
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mx-auto mt-14 max-w-[760px] text-balance text-center text-[22px] font-semibold leading-snug tracking-[-0.01em] text-[var(--text)] sm:mt-16 sm:text-[26px]">
          To nie generator treści. To twój sposób myślenia, zakodowany w system.
        </p>
      </Reveal>
    </section>
  );
}
