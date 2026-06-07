import type { Metadata } from "next";

import { PortfolioGrid } from "@/app/components/portfolio/PortfolioGrid";
import { GradientBackdrop } from "@/app/components/GradientBackdrop";
import { MoreCTA } from "@/app/components/MoreCTA";

const pageTitle = "Portfolio | luki.zip";
const pageDescription = "Wybrane projekty — strony, brandingi, reele.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function PortfolioPage() {
  return (
    <div className="relative">
      {/* to samo tło gradientowe (dither) co na /oferta i /artykuly — pod CTA i footerem */}
      <GradientBackdrop />

      <main className="relative z-10">
        {/* grid na białym tle — biała sekcja zasłania gradient */}
        <section className="bg-white px-2 sm:px-3 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <header className="px-1 sm:px-2 max-w-[640px]">
            <h1 className="t-h1">Projekty</h1>
          </header>

          <div className="mt-12 sm:mt-16">
            <PortfolioGrid />
          </div>
        </section>

        {/* zamykający CTA z gwiazdką — przezroczysty, gradient prześwituje */}
        <MoreCTA />
      </main>
    </div>
  );
}
