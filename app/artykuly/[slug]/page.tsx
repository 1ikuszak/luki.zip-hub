import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  formatDate,
  getPostBySlug,
  getPostSlugs,
} from "@/lib/posts";
import { BrandBrainOSCTA } from "@/app/components/poradnik/BrandBrainOSCTA";
import { CopyCodeButtons } from "@/app/components/poradnik/CopyCodeButtons";
import { DFirstCTA } from "@/app/components/poradnik/DFirstCTA";
import { PoradnikHero } from "@/app/components/poradnik/PoradnikHero";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Artykuł nie znaleziony" };

  const title = `${post.title} | luki.zip`;
  const url = `/artykuly/${post.slug}`;
  return {
    title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: ["luki.zip"],
      tags: [post.tag],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const isPoradnik = post.tag === "poradnik";
  const hasHero = !!post.heroImages?.length;

  return (
    <>
      {hasHero && (
        <PoradnikHero images={post.heroImages!} lead={post.heroLead} />
      )}
      <main
        className={`container-narrow pb-16 sm:pb-24 ${hasHero ? "pt-8 sm:pt-12" : "pt-12 sm:pt-16"}`}
      >
      <div className="flex flex-col gap-8">
        <Link
          href="/artykuly"
          className="inline-flex items-center gap-1.5 t-small text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
        >
          <ArrowLeft size={14} />
          Wszystkie artykuły
        </Link>

        <header>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--accent)]">
              {post.tag}
            </span>
            {post.date && (
              <>
                <span className="text-[11px] text-[var(--text-secondary)]">·</span>
                <time className="text-[11px] text-[var(--text-secondary)]" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
              </>
            )}
          </div>
          <h1 className="t-h1">{post.title}</h1>
        </header>

        {isPoradnik && post.problem && (
          <div className="border-l-2 border-[var(--text)] pl-4 -my-2 space-y-2">
            <p className="text-[15px] leading-relaxed">
              <strong>Problem:</strong> {post.problem}
            </p>
            {post.dlaKogo && (
              <p className="text-[15px] leading-relaxed">
                <strong>Dla kogo:</strong> {post.dlaKogo}
              </p>
            )}
          </div>
        )}

        <article
          className="markdown"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
        <CopyCodeButtons />

        {post.affiliateDFirst && (
          <DFirstCTA ctaId={`affiliate_dfirst_${post.slug}`} />
        )}

        {isPoradnik ? (
          <BrandBrainOSCTA articleSlug={post.slug} />
        ) : (
          <aside className="mt-4 bg-white border border-[var(--border)] rounded-xl p-6 sm:p-8">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-[var(--text-secondary)]">
              Następny krok
            </p>
            <h2 className="mt-3 text-[20px] sm:text-[22px] font-semibold text-[var(--text)] leading-snug">
              Chcesz indywidualny feedback do swojego kanału?
            </h2>
            <p className="mt-3 text-[15px] text-[var(--text-secondary)] leading-relaxed">
              Cotygodniowa praca 1:1, konkretne fixy zamiast generyk.
            </p>
            <Link
              href="/oferta"
              className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--accent)] underline underline-offset-4 hover:no-underline"
            >
              Sprawdź ofertę
              <ArrowRight size={14} />
            </Link>
          </aside>
        )}

        <footer className="mt-2">
          <Link
            href="/artykuly"
            className="inline-flex items-center gap-1.5 t-small text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            <ArrowLeft size={14} />
            Wszystkie artykuły
          </Link>
        </footer>
      </div>
      </main>
    </>
  );
}
