"use client";

import { useState } from "react";

/**
 * Hero trust-strip — statyczny, wyśrodkowany rząd logo marek pod CTA
 * (zastąpił pełzający marquee 2026-07-06: przy 3 markach marquee = zły
 * pattern, "wolno się rusza" + brzydko). Znaki unifikowane do jednego tonu
 * ink (brightness(0)) niezależnie od koloru źródłowego -> jeden spójny styl.
 * Statyczne (bez hovera/animacji), opacity 80 = ciemny, solidny ton.
 *
 * Assety: public/logos/brands/{slug}.svg. Brakujący plik CHOWA SIĘ SAM
 * (onError), więc podmiana/dodanie marki = wrzucenie pliku, zero zmian w kodzie.
 */
type Brand = { src: string; alt: string; className?: string };

const BRANDS: Brand[] = [
  { src: "/logos/brands/4f.svg", alt: "4F" },
  { src: "/logos/brands/jbb.svg", alt: "JBB" },
  { src: "/logos/brands/glitchy.svg", alt: "Glitchy" },
];

function Logo({ brand }: { brand: Brand }) {
  const [broken, setBroken] = useState(false);
  if (broken) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={brand.src}
      alt={brand.alt}
      onError={() => setBroken(true)}
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
