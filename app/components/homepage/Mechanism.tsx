import Image from "next/image";
import { Reveal } from "@/app/components/oferta/Reveal";

/**
 * Body (Koe): transformacja + mechanizm. Kinowy 2-col: sticky portretowy still
 * + narracja z wielkim pull-quote. Kończy nazwaniem mechanizmu (Drugi Mózg).
 */
export function Mechanism() {
  return (
    <section className="container-wide border-t border-[var(--border)] py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        {/* sticky kino-still */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--bg-card)] shadow-[0_50px_120px_-60px_rgba(8,12,40,0.55)]">
                <Image
                  src="/links/avatar-v6.jpg"
                  alt="Łukasz Glica"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* narracja */}
        <div className="lg:col-span-7">
          <Reveal>
            <h2
              className="font-semibold text-[var(--text)]"
              style={{
                fontSize: "clamp(2.1rem, 4vw, 3.2rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
              }}
            >
              Jak to robię.
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8 space-y-5 t-body-large text-[var(--text-secondary)]">
              <p>
                Masz już pewnie kilka automatyzacji. Parę promptów w jednym
                narzędziu, flow w drugim, prompt wklejony w trzecim. Każde
                zrobione inaczej, żadne nie wie o drugim.
              </p>
              <p>
                Po kilku miesiącach to pęka. Zmienia się API, ktoś odchodzi i
                połowa pada naraz. Dlatego 95% wdrożeń AI nie zarabia ani
                złotówki. Model nigdy nie był problemem.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <p
              className="my-10 font-semibold text-[var(--text)]"
              style={{
                fontSize: "clamp(1.7rem, 3.4vw, 2.6rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
              }}
            >
              Nie potrzebujesz lepszego modelu AI. Potrzebujesz{" "}
              <span className="text-[var(--accent)]">spersonalizowanego</span>.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="space-y-5 t-body-large text-[var(--text-secondary)]">
              <p>
                Zaczynam od mapy. Rozpisuję, jak naprawdę działa twój proces, z
                wyjątkami, których nie ma w żadnym dokumencie. Te ruchy, które
                robisz odruchowo: powyżej dziesięciu tysięcy zawsze dzwonisz,
                najpierw sprawdzasz ten jeden arkusz. Bez nich AI ogarnia 70%
                przypadków i wykłada się na tych 30, które robią ci więcej roboty
                niż przedtem.
              </p>
              <p>
                Przy każdym kroku decyduję: kod czy AI. Model tylko tam, gdzie
                kod nie da rady. Dobre systemy są nudne, jakieś 85% zwykłego
                kodu, 15% AI. To dlatego działają i nie halucynują.
              </p>
              <p>
                Wszystko spina się w jednym miejscu, do którego spływa kontekst
                twojego biznesu: procesy, dane, twój taste. Każda kolejna
                automatyzacja czyta stąd, więc powstaje szybciej i taniej. Ty
                albo twój zespół zostajecie w pętli tam, gdzie potrzebna jest
                decyzja.
              </p>
              <p className="font-semibold text-[var(--text)]">
                Efekt: AI, które działa jak ty i realnie zarabia. Te 5%, które
                wygrywa, a nie zlepek narzędzi, który zdycha w pół roku.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
