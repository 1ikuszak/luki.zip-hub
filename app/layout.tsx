import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/**
 * Satoshi self-hosted (mobile perf 2026-08-19): @import z api.fontshare.com
 * robil lancuch HTML -> CSS -> CSS fontshare -> woff2 (2 dodatkowe RTT do
 * pierwszego tekstu). Zmienny plik 300-900 (42 KB) zastepuje dwa statyczne.
 */
const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  weight: "300 900",
  style: "normal",
  display: "swap",
  preload: true,
  variable: "--font-satoshi",
  fallback: ["Satoshi-fallback", "Arial", "sans-serif"],
});
import { Analytics } from "./components/Analytics";
import { ClickTracking } from "./components/ClickTracking";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ChromeGate } from "./components/ChromeGate";

import { SITE_URL } from "@/app/lib/site";

const siteUrl = SITE_URL;
const title = "luki.zip — brand design & launch video";
const description =
  "Robię marki, które wyglądają cool. Brand design, launch video, system.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "luki.zip",
    "AI video",
    "creative direction",
    "video production",
    "YouTube",
    "TikTok",
    "Łukasz Glica",
  ],
  authors: [{ name: "luki.zip" }],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: title,
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={satoshi.variable}>
      <body className="antialiased">
        <ChromeGate>
          <Navbar />
        </ChromeGate>
        <main>{children}</main>
        <ChromeGate>
          <Footer />
        </ChromeGate>
        <ClickTracking />
        <Analytics />
      </body>
    </html>
  );
}
