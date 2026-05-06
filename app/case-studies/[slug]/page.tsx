import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Hero } from "@/app/components/case-study/Hero";
import { StatsBar } from "@/app/components/case-study/StatsBar";
import { ProblemSection } from "@/app/components/case-study/ProblemSection";
import { StepsSection } from "@/app/components/case-study/StepsSection";
import { QuoteSection } from "@/app/components/case-study/QuoteSection";
import { CalendlyCTA } from "@/app/components/case-study/CalendlyCTA";
import { TrackPageView } from "@/app/components/TrackPageView";
import {
  getAllSlugs,
  getCaseStudyBySlug,
} from "@/app/lib/case-studies";

type RouteParams = { slug: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return {};

  const title = `${study.title} | luki.zip`;
  const url = `/case-studies/${study.slug}`;
  const images = study.heroImage ? [study.heroImage] : undefined;
  return {
    title,
    description: study.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: study.metaDescription,
      url,
      type: "article",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: study.metaDescription,
      images,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  return (
    <main className="min-h-screen bg-[var(--bg-page)]">
      <TrackPageView
        event="view_case_study"
        params={{ slug: study.slug, title: study.title }}
      />
      <Hero
        title={study.title}
        subtitle={study.subtitle}
        image={study.heroImage}
        imageAlt={study.heroImageAlt}
      />
      <StatsBar
        czas={study.stats.czas}
        budzet={study.stats.budzet}
        efekt={study.stats.efekt}
      />
      <ProblemSection text={study.problem} />
      <StepsSection steps={study.steps} />
      <QuoteSection
        text={study.quote.text}
        author={study.quote.author}
        role={study.quote.role}
      />
      <CalendlyCTA caseTitle={study.title} />
    </main>
  );
}
