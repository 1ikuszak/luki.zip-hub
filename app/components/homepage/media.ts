// Kuratorowane media na homepage (overhaul). Realne assety z public/portfolio.
// Edytujesz kolejność/wybór tutaj. Pełny manifest: app/lib/portfolio.ts.

export type Still = { src: string; w: number; h: number; alt: string };
export type Reel = { src: string; w: number; h: number; alt: string };

// Kinowe stille 16:9 / kwadrat — hero + showcase feature.
export const heroStill: Still = {
  src: "/portfolio/img/localhost-3001-high-res-1-copy-2.webp",
  w: 2880,
  h: 1620,
  alt: "Projekt brandowy: strona zaprojektowana end to end",
};

export const heroPortrait: Reel = {
  src: "/portfolio/poster/skolim-jbb-full-1.webp",
  w: 1080,
  h: 1920,
  alt: "Launch reel JBB / Skolim, rekord kanału 300K",
};

// Portretowy kino-still — sticky visual w sekcji Mechanism.
export const mechanismStill: Still = {
  src: "/portfolio/img/magnific-ai-image.webp",
  w: 1792,
  h: 2400,
  alt: "Kinowy still z systemu produkcyjnego AI",
};

export const showcaseStills: Still[] = [
  {
    src: "/portfolio/img/cinematic-wide-environmental-shot-of-a-futuristic-academy-wel-355a19e7-a268-4bf8-b568-78f467a4bf8f-0.webp",
    w: 2880,
    h: 1614,
    alt: "Kinowy still: środowisko, kierunek artystyczny AI",
  },
  {
    src: "/portfolio/img/high-contrast-black-and-white-still.webp",
    w: 2752,
    h: 1536,
    alt: "Kontrastowy czarno-biały still",
  },
];

// Pionowe reele 9:16 — marquee dowodu taste.
export const reels: Reel[] = [
  { src: "/portfolio/poster/skolim-jbb-full-1.webp", w: 1080, h: 1920, alt: "JBB Skolim launch reel" },
  { src: "/portfolio/poster/ayla-branding-os.webp", w: 1080, h: 1920, alt: "Ayla branding OS reel" },
  { src: "/portfolio/poster/gta-angle.webp", w: 1080, h: 1920, alt: "GTA-style reel" },
  { src: "/portfolio/poster/wojtek-elevator-talks-reel.webp", w: 1080, h: 1920, alt: "Wojtek Elevator Talks reel" },
  { src: "/portfolio/poster/petite-pants-test-reel.webp", w: 1280, h: 2276, alt: "PetitePants reel" },
];

export type Stat = { to: number; suffix?: string; label: string };

export const stats: Stat[] = [
  { to: 300, suffix: "K", label: "rekord jednego filmu (JBB)" },
  { to: 2, suffix: "M+", label: "wyświetleń, swoich i klientów" },
  { to: 8, suffix: "K", label: "subskrypcji YouTube" },
  { to: 500, label: "leadów z jednego materiału" },
];
