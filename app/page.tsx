import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { GradientBackdrop } from "./components/GradientBackdrop";
import { Hero } from "./components/homepage/Hero";
import { StatsBand } from "./components/homepage/StatsBand";
import { WorkStrip } from "./components/homepage/WorkStrip";
import { ForWho } from "./components/homepage/ForWho";
import { OfferTwoWays } from "./components/homepage/OfferTwoWays";
import { Testimonials } from "./components/homepage/Testimonials";
import { FinalCTA } from "./components/homepage/FinalCTA";
import { CourseWaitlist } from "./components/homepage/CourseWaitlist";
import { FAQ } from "./components/homepage/FAQ";

const pageTitle = "luki.zip — Łukasz Glica, kreatywne systemy AI z taste";
const pageDescription =
  "Wdrażam kreatywne systemy AI do twojego biznesu. Spersonalizowane systemy z zakodowaną esencją twojej marki, które robią on-brand content w skali agencji.";

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
  // PRODUKCJA: home niedokończony → redirect na artykuły.
  // DEV (localhost): renderuje pełny WIP homepage, żeby Luki mógł go budować.
  if (process.env.NODE_ENV === "production") {
    redirect("/artykuly");
  }

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
          </main>

          <FinalCTA />

          <div className={CARD}>
            <CourseWaitlist />
            <FAQ />
          </div>
        </div>
      </div>
    </div>
  );
}
