import type { Metadata } from "next";
import { Hero } from "@/app/components/drugi-mozg/Hero";
import { PainPoints } from "@/app/components/drugi-mozg/PainPoints";
import { Mechanism } from "@/app/components/drugi-mozg/Mechanism";
import { KnowledgeReader } from "@/app/components/drugi-mozg/KnowledgeReader";
import { Transformation } from "@/app/components/drugi-mozg/Transformation";
import { NoCode } from "@/app/components/drugi-mozg/NoCode";
import { Proof } from "@/app/components/drugi-mozg/Proof";
import { BeforeAfter } from "@/app/components/drugi-mozg/BeforeAfter";
import { Benefits } from "@/app/components/drugi-mozg/Benefits";
import { Offer } from "@/app/components/drugi-mozg/Offer";
import { Filter } from "@/app/components/drugi-mozg/Filter";
import { FinalCTA } from "@/app/components/drugi-mozg/FinalCTA";
import { StickyBar } from "@/app/components/drugi-mozg/StickyBar";

const pageTitle = "Drugi Mózg | luki.zip";
const pageDescription =
  "Wszyscy uczą, jak odpalić Claude Code. Ten kurs uczy, jak dać mu twoją wiedzę, twój gust i twój sposób myślenia. W 5 wieczorów stawiasz drugi mózg, który pisze, decyduje i ocenia jak ty. Bez kodowania.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/drugi-mozg" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/drugi-mozg",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function DrugiMozgPage() {
  return (
    <>
      <Hero />
      <PainPoints />
      <Benefits />
      <Mechanism />
      <KnowledgeReader />
      <Transformation />
      <NoCode />
      <BeforeAfter />
      <Proof />
      <Filter />
      <Offer />
      <FinalCTA />
      <StickyBar />
    </>
  );
}
