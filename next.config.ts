import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Crossfade route changes via native View Transitions API
  experimental: {
    viewTransition: true,
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
      // 2026-08-18: kurs Drugi Mózg, stara /oferta i /reporting zarchiwizowane
      // (kod w _archive/2026-08-18-kurs-oferta-reporting/). Stare linki nie 404-ują.
      { source: "/drugi-mozg", destination: "/", permanent: false },
      { source: "/drugi-mozg/:path*", destination: "/", permanent: false },
      { source: "/drugi-mozg-old", destination: "/", permanent: false },
      { source: "/oferta", destination: "/uslugi", permanent: false },
      { source: "/reporting", destination: "/", permanent: false },
      // Osobna strona case studies — nieużywana (case studies żyją na homepage).
      // Detale /case-studies/{slug} zostają live (linkowane z homepage).
      { source: "/case-studies", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
