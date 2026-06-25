import { Reveal } from "@/app/components/oferta/Reveal";
import { CtaButton } from "./CtaButton";

export function FinalCTA() {
  return (
    <section className="container-wide py-20 sm:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-[var(--accent)] px-8 py-16 text-center sm:px-12 sm:py-20">
          <h2 className="mx-auto max-w-[18ch] text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[44px]">
            Budujesz raz. Reszta dzieje się sama.
          </h2>
          <p className="mx-auto mt-5 max-w-[60ch] text-[17px] leading-[1.6] text-white/85 sm:text-[18px]">
            Stawiasz vault w 5 dni. Potem agent łapie wiedzę, ogarnia porządki i
            produkuje z niej posty i briefy. Ty już nie gonisz własnych notatek.
            Twoja wiedza pracuje, a ty tylko kurujesz i decydujesz. Dzień 100 to
            asset, którego nie ma twoja konkurencja, bo nie ma twojego vaulta.
          </p>
          <div className="mt-9 flex justify-center">
            <CtaButton variant="onAccent" />
          </div>
          <p className="mt-5 text-[14px] text-white/75">
            Dożywotni dostęp. Zwrot, jeśli po Dniu 2 nie masz działającego
            vaulta.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
