import type { Metadata } from "next";
import { Hero } from "@/app/components/drugi-mozg-old/Hero";
import { Problem } from "@/app/components/drugi-mozg-old/Problem";
import { PainPoints } from "@/app/components/drugi-mozg-old/PainPoints";
import { Mechanism } from "@/app/components/drugi-mozg-old/Mechanism";
import { Lessons } from "@/app/components/drugi-mozg-old/Lessons";
import { Proof } from "@/app/components/drugi-mozg-old/Proof";
import { Offer } from "@/app/components/drugi-mozg-old/Offer";
import { Guarantee } from "@/app/components/drugi-mozg-old/Guarantee";
import { FinalCTA } from "@/app/components/drugi-mozg-old/FinalCTA";

const pageTitle = "Drugi Mózg OS (stara wersja) | luki.zip";
const pageDescription =
  "Zbuduj drugi mózg z AI, który sam się utrzymuje. 5-dniowy sprint, bez kodowania. Agent łapie wiedzę, utrzymuje system i produkuje z niego posty i briefy.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/drugi-mozg-old" },
  robots: { index: false, follow: false },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/drugi-mozg-old",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function DrugiMozgOldPage() {
  return (
    <>
      <Hero />
      <Problem />
      <PainPoints />
      <Mechanism />
      <Lessons />
      <Proof />
      <Offer />
      <Guarantee />
      <FinalCTA />
    </>
  );
}
