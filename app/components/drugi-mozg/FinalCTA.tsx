import { Reveal } from "@/app/components/oferta/Reveal";
import { CtaButton } from "./CtaButton";

/** Izolinie (math motif, nie gradient): koncentryczne kontury jak mapa
 *  topograficzna, biała kreska low-opacity na akcencie. Statyczne = bezpieczne
 *  dla reduced-motion, czytelne, nie błyszczy. */
function Isolines() {
  const rings = Array.from({ length: 11 }, (_, i) => 60 + i * 46);
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
    >
      <g
        fill="none"
        stroke="white"
        strokeOpacity={0.1}
        strokeWidth={1.2}
      >
        {rings.map((r, i) => (
          <ellipse key={i} cx={500} cy={120} rx={r * 1.5} ry={r} />
        ))}
      </g>
    </svg>
  );
}

export function FinalCTA() {
  return (
    <section className="container-wide pb-24 sm:pb-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-[var(--accent)] px-8 py-16 text-center sm:px-12 sm:py-20">
          <Isolines />
          <h2 className="relative mx-auto max-w-[22ch] text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[42px]">
            Za 5 dni masz AI, które myśli jak ty. Dziś zaczyna od zera za każdym
            razem.
          </h2>
          <p className="relative mx-auto mt-6 max-w-[46ch] text-[17px] leading-[1.6] text-white/85">
            Skalowalny system, który zna ciebie. Koniec gubienia rzeczy w czacie
            i tłumaczenia tego samego kontekstu od nowa.
          </p>
          <div className="relative mt-9 flex justify-center">
            <CtaButton variant="onAccent" label="Postaw swój Drugi Mózg" />
          </div>
          <p className="relative mt-6 text-[13px] text-white/70">
            Bez countdownów, bez sztucznej presji. Kupujesz, kiedy jesteś gotowy.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
