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
      // Kurs Drugi Mózg + powiązane (jeszcze nie live)
      { source: "/drugi-mozg", destination: "/", permanent: false },
      { source: "/drugi-mozg/:path*", destination: "/", permanent: false },
      { source: "/drugi-mozg-old", destination: "/", permanent: false },
      // Osobna strona case studies — nieużywana (case studies żyją na homepage).
      // Detale /case-studies/{slug} zostają live (linkowane z homepage).
      { source: "/case-studies", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
