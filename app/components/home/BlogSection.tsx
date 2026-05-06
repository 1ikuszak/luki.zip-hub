import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPosts } from "@/lib/posts";
import { ArticleCard } from "@/app/components/ArticleCard";
import { SectionHeading } from "./SectionHeading";

export function BlogSection() {
  const posts = getPosts().slice(0, 3);

  return (
    <section className="container-wide py-16 sm:py-24">
      <div className="flex items-end justify-between gap-4 mb-10 sm:mb-12">
        <SectionHeading eyebrow="Pisanie" title="Z bloga" />
        <Link
          href="/artykuly"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] underline underline-offset-4 hover:no-underline shrink-0 pb-2"
        >
          Wszystkie artykuły
          <ArrowRight size={14} strokeWidth={2.25} />
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="t-body text-[var(--text-secondary)]">
          Brak artykułów. Dodaj plik MD w <code>content/posts/</code>.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <Link
        href="/artykuly"
        className="sm:hidden mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] underline underline-offset-4"
      >
        Wszystkie artykuły
        <ArrowRight size={14} strokeWidth={2.25} />
      </Link>
    </section>
  );
}
