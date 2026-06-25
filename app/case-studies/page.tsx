import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getAllCaseStudies } from "@/app/lib/case-studies";
import { Breadcrumb } from "@/app/components/Breadcrumb";

const pageTitle = "Case studies | luki.zip";
const pageDescription = "Wybrane projekty - proces, decyzje i efekty.";

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
      <Breadcrumb items={[{ label: "Case studies" }]} />
      <header className="mt-8 max-w-[640px]">
        <h1 className="t-h1 enter">Wybrane projekty</h1>
        <p
          className="t-body-large mt-4 text-[var(--text-secondary)] enter"
          style={{ animationDelay: "70ms" }}
        >
          Realne problemy, decyzje produktowe i efekty.
        </p>
      </header>

      {studies.length === 0 ? (
        <p className="mt-16 t-body text-[var(--text-secondary)]">
          Brak case studies. Dodaj plik JSON w{" "}
          <code>content/case-studies/</code>.
        </p>
      ) : (
        <ul className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-2">
          {studies.map((study) => (
            <li key={study.slug} className="reveal">
              <Link
                href={`/case-studies/${study.slug}`}
                data-track="case_study_card"
                data-track-id={`case_${study.slug}`}
                data-track-href={`/case-studies/${study.slug}`}
                className="group flex h-full flex-col justify-between gap-8 rounded-xl border border-[var(--border)] bg-white p-7 transition-colors duration-150 hover:border-[var(--accent)] sm:p-8"
              >
                <div>
                  <h2 className="text-[22px] font-semibold leading-snug tracking-[-0.01em] text-[var(--text)] sm:text-[25px]">
                    {study.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                    {study.subtitle}
                  </p>
                </div>
                <div className="flex items-end justify-between gap-4 border-t border-[var(--border)] pt-5">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                      Efekt
                    </div>
                    <div className="mt-1 text-[16px] font-semibold leading-snug text-[var(--text)]">
                      {study.stats.efekt}
                    </div>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[14px] font-semibold text-[var(--accent)]">
                    Zobacz case
                    <ArrowRight
                      size={16}
                      strokeWidth={2.25}
                      className="transition-transform duration-150 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
