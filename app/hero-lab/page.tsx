import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CONTACT_FORM_URL } from "@/app/lib/data";
import { reels } from "@/app/components/homepage/media";
import { MorphBlob } from "@/app/components/homepage/MorphBlob";

export const metadata: Metadata = {
  title: "Hero Lab — luki.zip",
  description: "8 wariantów hero na soft backgrounds.",
  robots: { index: false, follow: false },
};

const MEADOW = "/hero-lab/meadow.png";
const BLOOM = "/hero-lab/bloom.png";
const GLASS = "/hero-lab/glass.png";
const GRID = "/hero-lab/grid-field.png";
const MOUNTAIN = "/hero-lab/mountain.png";
const HILLS = "/hero-lab/hills.png";

// glow pod ciemnym tekstem na jasnym zdjęciu (legibility)
const GLOW = { textShadow: "0 2px 26px rgba(255,255,255,0.65), 0 1px 3px rgba(255,255,255,0.8)" };

function Badge({ n, name }: { n: number; name: string }) {
  return (
    <div className="absolute left-4 top-4 z-30 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3.5 py-1.5 text-[12px] font-semibold shadow-sm backdrop-blur">
      <span className="text-[var(--accent)]">Wariant {n}</span>
      <span className="text-[var(--text-secondary)]">{name}</span>
    </div>
  );
}

function CallLink({ id }: { id: string }) {
  return (
    <a
      href={CONTACT_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-track="cta_contact"
      data-track-id={id}
      data-track-href={CONTACT_FORM_URL}
      className="group inline-flex h-[56px] items-center gap-2 rounded-full bg-[var(--accent)] px-8 text-[16px] font-semibold text-white shadow-[0_18px_44px_-18px_rgba(38,86,217,0.8)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
    >
      Umów rozmowę
      <ArrowRight size={18} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

const EY = "text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]";

export default function HeroLab() {
  const loop = [...reels, ...reels];

  return (
    <div className="bg-[var(--bg-page)]">
      <header className="container-wide pb-8 pt-14">
        <h1 className="text-[28px] font-semibold tracking-tight text-[var(--text)]">
          Hero Lab — 8 wariantów na soft backgrounds
        </h1>
        <p className="mt-2 max-w-[60ch] text-[15px] text-[var(--text-secondary)]">
          Każdy inny design, inny headline, inny subheadline. Powiedz numer, który
          wchodzi na stronę główną.
        </p>
      </header>

      {/* ANIMACJA: organiczny morph (kandydat do „jak działam") */}
      <section className="container-wide border-y border-[var(--border)] py-16">
        <div className={EY}>Animacja: organiczny morph (do jak-działam)</div>
        <p className="mt-3 max-w-[62ch] text-[15px] text-[var(--text-secondary)]">
          Szara, matematyczna membrana, która płynnie morfuje (worley + domain
          warp, OGL). Kandydat na wizual sekcji jak-działam. Reaguje na
          reduced-motion (statyczna klatka). Trzy warianty koloru:
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-[22px] border border-[var(--border)] bg-white p-4">
            <div className="aspect-square w-full">
              <MorphBlob className="h-full w-full" />
            </div>
            <p className="mt-3 text-center text-[13px] text-[var(--text-secondary)]">
              szary
            </p>
          </div>
          <div className="rounded-[22px] border border-[var(--border)] bg-white p-4">
            <div className="aspect-square w-full">
              <MorphBlob className="h-full w-full" color={[0.149, 0.337, 0.851]} />
            </div>
            <p className="mt-3 text-center text-[13px] text-[var(--text-secondary)]">
              akcent (niebieski)
            </p>
          </div>
          <div className="rounded-[22px] bg-[var(--text)] p-4">
            <div className="aspect-square w-full">
              <MorphBlob className="h-full w-full" color={[0.682, 1.0, 0.0]} />
            </div>
            <p className="mt-3 text-center text-[13px] text-white/70">
              chartreuse na ciemnym
            </p>
          </div>
        </div>
      </section>

      {/* 9. Luma split + X visual (NOWY, na górze) */}
      <section
        className="relative overflow-hidden border-y border-[var(--border)] bg-[var(--bg-page)]"
        style={{
          backgroundImage: "radial-gradient(rgba(8,12,40,0.07) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
        <Badge n={9} name="Luma split + X visual (NOWY)" />
        <div className="container-wide grid min-h-[90vh] items-center gap-10 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className={EY}>Na przecięciu AI i kreatywności</div>
            <h1 className="mt-5 max-w-[15ch] font-semibold text-[var(--text)]" style={{ fontSize: "clamp(2.6rem, 5.2vw, 5rem)", lineHeight: 0.97, letterSpacing: "-0.04em" }}>
              Twój taste, zakodowany w <span className="italic">system AI</span>,
              który tworzy za ciebie.
            </h1>
            <p className="mt-7 max-w-[44ch] text-[18px] text-[var(--text-secondary)] sm:text-[20px]">
              Buduję kreatywne systemy AI, które zamieniają jedną osobę albo jeden
              brand w całe studio. Bez slopu.
            </p>
            <div className="mt-9"><CallLink id="lab_9" /></div>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--bg-card)] shadow-[0_60px_140px_-60px_rgba(8,12,40,0.55)] sm:rounded-[34px]">
            <video
              src="/hero-lab/x-visual.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 1. Keynote negative-space (meadow) */}
      <section className="relative flex min-h-[88vh] items-start overflow-hidden">
        <Badge n={1} name="Keynote, przestrzeń" />
        <Image src={MEADOW} alt="" fill priority className="object-cover" />
        <div className="container-wide relative z-10 pt-28 sm:pt-32" style={GLOW}>
          <div className={EY}>Na przecięciu AI i kreatywności</div>
          <h1 className="mt-5 max-w-[15ch] font-semibold text-[var(--text)]" style={{ fontSize: "clamp(2.8rem, 6.4vw, 6rem)", lineHeight: 0.96, letterSpacing: "-0.04em" }}>
            Twój taste. Twój system AI.
          </h1>
          <p className="mt-6 max-w-[44ch] text-[18px] font-medium text-[var(--text)]/80 sm:text-[21px]">
            Zamieniam jedną osobę w całe studio kreatywne. Bez slopu, bez agencji.
          </p>
          <div className="mt-9"><CallLink id="lab_1" /></div>
        </div>
      </section>

      {/* 2. Centered bold (glass gradient) */}
      <section className="relative flex min-h-[86vh] items-center justify-center overflow-hidden">
        <Badge n={2} name="Bold wycentrowany" />
        <Image src={GLASS} alt="" fill className="object-cover" />
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,0.5), transparent 75%)" }} />
        <div className="container-default relative z-10 text-center" style={GLOW}>
          <h1 className="mx-auto max-w-[16ch] font-semibold text-[var(--text)]" style={{ fontSize: "clamp(2.8rem, 6.4vw, 6rem)", lineHeight: 0.97, letterSpacing: "-0.04em" }}>
            Nie kopiuj. Zakoduj siebie.
          </h1>
          <p className="mx-auto mt-7 max-w-[50ch] text-[18px] font-medium text-[var(--text)]/85 sm:text-[21px]">
            Buduję AI, które tworzy w twoim stylu, nie generycznym. Twoja wizja
            prowadzi.
          </p>
          <div className="mt-9 flex justify-center"><CallLink id="lab_2" /></div>
        </div>
      </section>

      {/* 3. Frosted card (bloom) */}
      <section className="relative flex min-h-[86vh] items-end overflow-hidden">
        <Badge n={3} name="Frosted card" />
        <Image src={BLOOM} alt="" fill className="object-cover" />
        <div className="container-wide relative z-10 pb-16 sm:pb-20">
          <div className="max-w-[540px] rounded-[28px] border border-white/60 bg-white/75 p-8 backdrop-blur-2xl sm:p-12" style={{ boxShadow: "0 50px 120px -60px rgba(8,12,40,0.4), inset 0 1px 0 rgba(255,255,255,0.7)" }}>
            <h1 className="font-semibold text-[var(--text)]" style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", lineHeight: 1.0, letterSpacing: "-0.035em" }}>
              Jedna osoba. Całe studio.
            </h1>
            <p className="mt-5 text-[17px] text-[var(--text-secondary)]">
              System AI z twoim taste bierze powtarzalną robotę. Ty trzymasz
              kierunek.
            </p>
            <div className="mt-8"><CallLink id="lab_3" /></div>
          </div>
        </div>
      </section>

      {/* 4. Split editorial (grid-field) */}
      <section className="relative grid min-h-[82vh] grid-cols-1 lg:grid-cols-12">
        <Badge n={4} name="Split editorial" />
        <div className="flex items-center bg-[var(--bg-card)] px-7 py-20 sm:px-14 lg:col-span-6 lg:px-16">
          <div>
            <div className={EY}>Brand bez slopu</div>
            <h1 className="mt-5 max-w-[14ch] font-semibold text-[var(--text)]" style={{ fontSize: "clamp(2.4rem, 4.4vw, 4.4rem)", lineHeight: 0.98, letterSpacing: "-0.038em" }}>
              Marki, które nie wyglądają jak AI.
            </h1>
            <p className="mt-6 max-w-[42ch] text-[18px] text-[var(--text-secondary)]">
              Brand, content i video na jednym systemie zakodowanym twoim taste.
            </p>
            <div className="mt-9"><CallLink id="lab_4" /></div>
          </div>
        </div>
        <div className="relative min-h-[44vh] lg:col-span-6 lg:min-h-full">
          <Image src={GRID} alt="" fill className="object-cover" />
        </div>
      </section>

      {/* 5. Type + reel marquee na soft bg (hills) */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <Badge n={5} name="Typ + pasek prac" />
        <Image src={HILLS} alt="" fill className="object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/70" />
        <div className="container-wide relative z-10" style={GLOW}>
          <div className={EY}>Brand, content i video na jednym systemie</div>
          <h1 className="mt-5 max-w-[20ch] font-semibold text-[var(--text)]" style={{ fontSize: "clamp(2.3rem, 5vw, 4.6rem)", lineHeight: 0.98, letterSpacing: "-0.038em" }}>
            Twój taste, zakodowany w system AI, który tworzy za ciebie.
          </h1>
          <p className="mt-6 max-w-[50ch] text-[18px] font-medium text-[var(--text)]/80">
            Wdrażam u ciebie albo robię z tobą. Premium, selektywnie.
          </p>
          <div className="mt-8"><CallLink id="lab_5" /></div>
        </div>
        <div className="container-wide relative z-10 mt-12">
          <div className="relative overflow-hidden rounded-[18px]">
            <div className="marquee-track flex w-max gap-4">
              {loop.map((reel, i) => (
                <div key={`${reel.src}-${i}`} className="relative aspect-[9/16] h-[260px] shrink-0 overflow-hidden rounded-[14px] border border-white/60 bg-[var(--bg-card)] shadow-[0_30px_60px_-30px_rgba(8,12,40,0.4)]">
                  <Image src={reel.src} alt={reel.alt} fill sizes="146px" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Gold editorial (mountain halftone) */}
      <section className="relative flex min-h-[86vh] items-start overflow-hidden">
        <Badge n={6} name="Gold editorial" />
        <Image src={MOUNTAIN} alt="" fill className="object-cover" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/70 to-transparent" />
        <div className="container-wide relative z-10 pt-28 sm:pt-32" style={GLOW}>
          <h1 className="max-w-[16ch] font-semibold text-[var(--text)]" style={{ fontSize: "clamp(2.6rem, 5.8vw, 5.4rem)", lineHeight: 0.97, letterSpacing: "-0.04em" }}>
            W świecie kopii idziesz w siebie.
          </h1>
          <p className="mt-6 max-w-[46ch] text-[18px] font-medium text-[var(--text)]/80 sm:text-[21px]">
            Kreatywne systemy AI, które robią dojebaną robotę w twoim brandzie.
          </p>
          <div className="mt-9"><CallLink id="lab_6" /></div>
        </div>
      </section>

      {/* 7. Minimal one-liner (glass alt) */}
      <section className="relative flex min-h-[82vh] items-center overflow-hidden">
        <Badge n={7} name="Minimal one-liner" />
        <Image src={GLASS} alt="" fill className="object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-white/25" />
        <div className="container-wide relative z-10" style={GLOW}>
          <div className={EY}>luki.zip</div>
          <h1 className="mt-6 max-w-[12ch] font-semibold text-[var(--text)]" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.92, letterSpacing: "-0.045em" }}>
            Zbuduj swój drugi mózg.
          </h1>
          <p className="mt-7 max-w-[44ch] text-[18px] font-medium text-[var(--text)]/80 sm:text-[21px]">
            Zakoduj swój taste w AI i pracuj jak całe studio.
          </p>
          <div className="mt-9"><CallLink id="lab_7" /></div>
        </div>
      </section>

      {/* 8. Magazine bottom-fade (meadow alt) */}
      <section className="relative flex min-h-[88vh] items-end overflow-hidden">
        <Badge n={8} name="Magazine bottom-fade" />
        <Image src={MEADOW} alt="" fill className="object-cover" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white via-white/80 to-transparent" />
        <div className="container-wide relative z-10 pb-20">
          <h1 className="max-w-[18ch] font-semibold text-[var(--text)]" style={{ fontSize: "clamp(2.6rem, 5.8vw, 5.4rem)", lineHeight: 0.97, letterSpacing: "-0.04em" }}>
            Nie potrzebujesz lepszego AI. Potrzebujesz swojego.
          </h1>
          <p className="mt-6 max-w-[50ch] text-[18px] text-[var(--text-secondary)] sm:text-[20px]">
            Każdy ma ten sam model. Wygrywa ten, kto zakoduje w niego własny taste.
          </p>
          <div className="mt-9"><CallLink id="lab_8" /></div>
        </div>
      </section>

      <div className="container-wide py-16 text-center text-[14px] text-[var(--text-secondary)]">
        Koniec. Powiedz numer wariantu (możesz miksować: layout X, headline z Y).
      </div>
    </div>
  );
}
