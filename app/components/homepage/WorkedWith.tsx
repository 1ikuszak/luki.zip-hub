import { Reveal } from "@/app/components/oferta/Reveal";

/**
 * "Worked with" — czysty, animowany logo-wall marek, z którymi pracowałem.
 * Zastąpił WorkStrip (case-study karty) 2026-07-06. Zamysł: mega clean pas
 * z markami, seamless marquee (.marquee-track, pauza na hover, reduced-motion
 * = statyczny). Wordmarki monochrome (grayscale ink) -> pełny kontrast na hover,
 * spójne z istniejącym wzorcem SocialProof.
 *
 * REALNE LOGO: gdy pojawią się wektory (public/logos/brands/*.svg) podmień
 * <span> w BrandMark na <img ... className="h-8 w-auto sm:h-10" />. Reszta
 * (marquee, spacing, grayscale) zostaje bez zmian.
 */
type Brand = {
  label: string;
  /** drobne zróżnicowanie typografii, żeby pas nie był monotonny */
  className?: string;
};

const BRANDS: Brand[] = [
  { label: "JBB", className: "font-bold tracking-[-0.04em]" },
  { label: "4F", className: "font-extrabold tracking-[-0.03em]" },
  { label: "glitchy", className: "font-semibold lowercase tracking-[-0.02em]" },
];

function BrandMark({ brand }: { brand: Brand }) {
  return (
    <span
      className={`shrink-0 select-none text-[34px] leading-none text-[var(--text)] opacity-55 transition-opacity duration-200 hover:opacity-100 sm:text-[46px] ${
        brand.className ?? ""
      }`}
    >
      {brand.label}
    </span>
  );
}

export function WorkedWith() {
  // dwie kopie -> seamless loop (marquee-track przesuwa o -50%)
  const loop = [...BRANDS, ...BRANDS];

  return (
    <section className="relative overflow-hidden border-t border-[var(--border)] py-16 sm:py-24">
      <div className="container-wide">
        <Reveal>
          <h2
            className="max-w-[16ch] font-semibold text-[var(--text)]"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            Marki, które mi zaufały.
          </h2>
        </Reveal>
      </div>

      {/* full-bleed marquee z miękkim edge-fade po bokach */}
      <div className="relative mt-10 sm:mt-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--bg-card)] to-transparent sm:w-28"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--bg-card)] to-transparent sm:w-28"
        />

        <div className="marquee-track flex w-max items-center gap-16 sm:gap-24">
          {loop.map((b, i) => (
            <BrandMark key={`${b.label}-${i}`} brand={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
