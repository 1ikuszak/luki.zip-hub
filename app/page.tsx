import type { Metadata } from "next";
import { GradientBackdrop } from "./components/GradientBackdrop";
import { Hero } from "./components/homepage/Hero";
import { StatsBand } from "./components/homepage/StatsBand";
import { WorkStrip } from "./components/homepage/WorkStrip";
import { ForWho } from "./components/homepage/ForWho";
import { OfferTwoWays } from "./components/homepage/OfferTwoWays";
import { Testimonials } from "./components/homepage/Testimonials";
import { FeaturedArticles } from "./components/homepage/FeaturedArticles";
import { FinalCTA } from "./components/homepage/FinalCTA";
import { CourseWaitlist } from "./components/homepage/CourseWaitlist";
import { Newsletter } from "./components/homepage/Newsletter";

const pageTitle = "Łukasz Glica - twój taste w systemie AI, nie generyczny slop";
const pageDescription =
  "Zakoduję taste twojej marki w system AI. Produkujesz content na poziomie studia, bez generycznego slopu. JBB: rekord kanału 300K, 10M+ views.";

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
            <ForWho />
            <OfferTwoWays />
            <Testimonials />
            <FeaturedArticles />
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
