/**
 * Hero trust-strip — statyczny, wyśrodkowany rząd logo marek pod CTA
 * (zastąpił pełzający marquee 2026-07-06: przy 3 markach marquee = zły
 * pattern, "wolno się rusza" + brzydko). Znaki unifikowane do jednego tonu
 * ink (brightness(0)) niezależnie od koloru źródłowego -> jeden spójny styl.
 * Statyczne (bez hovera/animacji), opacity 80 = ciemny, solidny ton.
 *
 * Assety: public/logos/brands/{slug}.svg. Komponent serwerowy (2026-08-19):
 * fallback onError wymagal hydracji calego hero, a pliki i tak sa w repo.
 * Podmiana/dodanie marki = wrzucenie pliku + wpis w BRANDS.
 */
type Brand = { src: string; alt: string; w: number; h: number; className?: string };

const BRANDS: Brand[] = [
  { src: "/logos/brands/4f.svg", alt: "4F", w: 96, h: 32 },
  { src: "/logos/brands/jbb.svg", alt: "JBB", w: 96, h: 32 },
  { src: "/logos/brands/glitchy.svg", alt: "Glitchy", w: 120, h: 32 },
];

function Logo({ brand }: { brand: Brand }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={brand.src}
      alt={brand.alt}
      width={brand.w}
      height={brand.h}
      decoding="async"
      draggable={false}
      className={`h-7 w-auto shrink-0 select-none object-contain opacity-80 [filter:brightness(0)] sm:h-8 ${
        brand.className ?? ""
      }`}
    />
  );
}

export function BrandStrip() {
  return (
    <div className="container-default flex w-full flex-col items-center gap-5 pb-8 sm:gap-6 sm:pb-10">
      <span className="text-[14px] text-[var(--text-secondary)]">Zaufali mi</span>

      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-16">
        {BRANDS.map((b) => (
          <Logo key={b.alt} brand={b} />
        ))}
      </div>
    </div>
  );
}
