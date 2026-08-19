import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Crossfade route changes via native View Transitions API
  experimental: {
    viewTransition: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 90],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // 2026-08-18: nagłówki bezpieczeństwa (po false positive Kaspersky/Nord).
  // CSP: własne skrypty + GTM/GA4 + Meta Pixel + fonty Fontshare + Vercel Live.
  async headers() {
    // 'unsafe-eval' TYLKO w dev: React/Turbopack uzywaja eval() do debugowania,
    // produkcja go nie potrzebuje i nie dostaje.
    const dev = process.env.NODE_ENV === "development";
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://vercel.live`,
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "img-src 'self' data: blob: https:",
      "media-src 'self' https:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://region1.google-analytics.com https://www.facebook.com https://api.beehiiv.com https://vercel.live wss://ws-us3.pusher.com",
      "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://cal.com https://app.cal.com https://vercel.live",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self' https://cal.com",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
  async redirects() {
    // Zablokowane publicznie (WIP / nieużywane). permanent:false = łatwo cofnąć.
    return [
      // Osobna strona case studies — nieużywana (case studies żyją na homepage).
      // Detale /case-studies/{slug} zostają live (linkowane z homepage).
      { source: "/case-studies", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
