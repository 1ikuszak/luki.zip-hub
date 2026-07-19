import type { Metadata } from "next";
import { GradientBackdrop } from "./components/GradientBackdrop";
import { Hero } from "./components/homepage/Hero";
import { StatsBand } from "./components/homepage/StatsBand";
import { WorkStrip } from "./components/homepage/WorkStrip";
import { ForWho } from "./components/homepage/ForWho";
import { OfferTwoWays } from "./components/homepage/OfferTwoWays";
import { Process } from "./components/homepage/Process";
import { Testimonials } from "./components/homepage/Testimonials";
// import { FeaturedArticles } from "./components/homepage/FeaturedArticles"; // ukryte 2026-07-19, odkomentuj by wrocic
import { FinalCTA } from "./components/homepage/FinalCTA";
import { CourseWaitlist } from "./components/homepage/CourseWaitlist";
import { Newsletter } from "./components/homepage/Newsletter";

const pageTitle = "Łukasz Glica - AI, które zna twój biznes, nie tylko prompt";
const pageDescription =
  "95% wdrożeń AI nie zwraca złotówki, bo AI zna prompt, nie twój biznes. Buduję systemy pod twoją markę: treść, procesy i wiedza w jednym mózgu operacyjnym.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

// Biała karta floatująca na shaderze (bez overflow-hidden -> sticky działa).
const CARD =
  "rounded-[20px] border border-white/55 bg-[var(--bg-card)] shadow-[0_50px_140px_-70px_rgba(8,12,40,0.6)] sm:rounded-[28px]";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Brand shader — na całą stronę, treść trzymana ramką z paddingu */}
      <GradientBackdrop />

      <div className="relative z-10 p-2 sm:p-3">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-2 sm:gap-3">
          <main className={CARD}>
            <Hero />
            <StatsBand />
            <WorkStrip />
            <Process />
            <Testimonials />
            <ForWho />
            <OfferTwoWays />
            {/* <FeaturedArticles /> - ukryte 2026-07-19 (Hormozi: jedna strona, jeden cel, bez exitow przy CTA). Odkomentuj by wrocic. */}
          </main>

          <FinalCTA />

          <div className={CARD}>
            {/* <CourseWaitlist /> */}
            <Newsletter />
          </div>
        </div>
      </div>
    </div>
  );
}
