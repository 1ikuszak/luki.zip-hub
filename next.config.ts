import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Crossfade route changes via native View Transitions API
  experimental: {
    viewTransition: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
