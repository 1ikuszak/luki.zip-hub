import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getAllCaseStudies } from "@/app/lib/case-studies";

const pageTitle = "Case studies | luki.zip";
const pageDescription = "Wybrane projekty — proces, decyzje i efekty.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/case-studies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default async function CaseStudiesIndexPage() {
  const studies = await getAllCaseStudies();

  return (
    <main className="container-wide py-16 sm:py-24">
      <header className="max-w-[640px]">
        <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--accent)] font-semibold">
          Case studies
        </div>
        <h1 className="t-h1 mt-3">Wybrane projekty</h1>
        <p className="t-body-large mt-4 text-[var(--text-secondary)]">
          Realne problemy, decyzje produktowe i efekty.
        </p>
      </header>

      {studies.length === 0 ? (
        <p className="mt-16 t-body text-[var(--text-secondary)]">
          Brak case studies. Dodaj plik JSON w{" "}
          <code>content/case-studies/</code>.
        </p>
      ) : (
        <ul className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {studies.map((study) => (
            <li key={study.slug}>
              <Link
                href={`/case-studies/${study.slug}`}
                data-track="case_study_card"
                data-track-id={`case_${study.slug}`}
                data-track-href={`/case-studies/${study.slug}`}
                className="group block overflow-hidden rounded-xl border border-[var(--border)] bg-white transition-colors duration-150 hover:border-[var(--accent)]"
              >
                <div className="relative aspect-[16/9] w-full bg-white">
                  <Image
                    src={study.heroImage}
                    alt={study.heroImageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <h2 className="text-[22px] sm:text-[24px] font-semibold text-[var(--text)] leading-snug">
                    {study.title}
                  </h2>
                  <p className="mt-3 text-[15px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {study.subtitle}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-[14px] font-semibold text-[var(--accent)] underline underline-offset-4">
                    Zobacz case
                    <ArrowRight size={16} strokeWidth={2.25} />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
