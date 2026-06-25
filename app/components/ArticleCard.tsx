"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { trackCTA } from "@/app/lib/analytics";

export function ArticleCard({ post }: { post: PostMeta }) {
  const href = `/artykuly/${post.slug}`;
  const ctaId = `article_${post.slug}`;
  return (
    <Link
      href={href}
      onClick={() => trackCTA(ctaId, href)}
      data-track="article_card"
      data-track-id={ctaId}
      data-track-href={href}
      className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-white p-6 transition-colors duration-150 hover:border-[var(--accent)] sm:p-7"
    >
      <div className="flex items-center gap-2 text-[11px]">
        <span className="font-semibold uppercase tracking-[0.1em] text-[var(--accent)]">
          {post.tag}
        </span>
        {post.date && (
          <>
            <span className="text-[var(--text-secondary)]">·</span>
            <span className="text-[var(--text-secondary)]">{formatDate(post.date)}</span>
          </>
        )}
      </div>

      <h3 className="mt-4 line-clamp-2 text-[19px] font-semibold leading-snug tracking-[-0.01em] text-[var(--text)] sm:text-[21px]">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-[var(--text-secondary)] sm:text-[15px]">
        {post.description}
      </p>

      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-semibold text-[var(--accent)]">
        Czytaj
        <ArrowRight
          size={15}
          strokeWidth={2.25}
          className="transition-transform duration-150 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
