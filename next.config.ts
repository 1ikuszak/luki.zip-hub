import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Crossfade route changes via native View Transitions API
  experimental: {
    viewTransition: true,
  },
  // Pliki pakietu startowego (poza public/) muszą trafić do bundla funkcji
  // download route na Vercelu - inaczej fs.readFile ich nie znajdzie w runtime.
  outputFileTracingIncludes: {
    "/api/kurs/download": ["./content/kurs-downloads/**"],
  },
  images: {
    qualities: [75, 90],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    // Zablokowane publicznie (WIP / nieużywane). permanent:false = łatwo cofnąć.
    return [
      // Kurs Drugi Mózg + powiązane (jeszcze nie live)
      // PODGLĄD LOKALNY 2026-07-06: dwie linie /drugi-mozg zakomentowane,
      // żeby zobaczyć redesign V2 na localhost. PRZYWRÓĆ PRZED PUSHEM/LAUNCHEM.
      // { source: "/drugi-mozg", destination: "/", permanent: false },
      // { source: "/drugi-mozg/:path*", destination: "/", permanent: false },
      { source: "/drugi-mozg-old", destination: "/", permanent: false },
      // Osobna strona case studies — nieużywana (case studies żyją na homepage).
      // Detale /case-studies/{slug} zostają live (linkowane z homepage).
      { source: "/case-studies", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
