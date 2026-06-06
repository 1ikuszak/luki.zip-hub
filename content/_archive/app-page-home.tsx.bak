import type { Metadata } from "next";
import { HomeHero } from "./components/home/HomeHero";
import { CaseStudiesSection } from "./components/home/CaseStudiesSection";
import { AIExperimentsSection } from "./components/home/AIExperimentsSection";
import { AboutSection } from "./components/home/AboutSection";
import { ThesisSection } from "./components/home/ThesisSection";
import { ServicesSection } from "./components/home/ServicesSection";

const pageTitle = "luki.zip — Łukasz Glica, brand design dla AI startupów";
const pageDescription =
  "Brand design, launch video i creative direction dla AI tech startupów. Warszawa, PL/EU/USA.";

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

export default function Home() {
  return (
    <main>
      <HomeHero />
      <CaseStudiesSection />
      <AIExperimentsSection />
      <AboutSection />
      <ThesisSection />
      <ServicesSection />
    </main>
  );
}
