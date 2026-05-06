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
      className="group block bg-white border border-[var(--border)] rounded-xl p-6 transition-colors duration-150 hover:border-[var(--text)]"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--accent)]">
          {post.tag}
        </span>
        {post.date && (
          <>
            <span className="text-[11px] text-[var(--text-secondary)]">·</span>
            <span className="text-[11px] text-[var(--text-secondary)]">
              {formatDate(post.date)}
            </span>
          </>
        )}
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-[18px] sm:text-[20px] font-semibold text-[var(--text)] leading-snug">
            {post.title}
          </h3>
          <p className="mt-2 text-[14px] sm:text-[15px] text-[var(--text-secondary)] leading-relaxed line-clamp-2">
            {post.description}
          </p>
        </div>
        <ArrowRight
          className="text-[var(--accent)] mt-1 shrink-0"
          size={16}
        />
      </div>
    </Link>
  );
}
