"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackCTA } from "@/app/lib/analytics";
import { rememberArticleSource } from "@/app/lib/source-tracking";

type Medium = "article" | "homepage";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  ctaId: string;
  href: string;
  trackKind?: string;
  articleSlug?: string;
  medium?: Medium;
  children: ReactNode;
};

const SLUG_REGEX = /^[a-z0-9-]{1,80}$/;

function withFromParam(href: string, slug: string): string {
  if (!href.startsWith("/brain")) return href;
  if (href.includes("from=")) return href;
  const sep = href.includes("?") ? "&" : "?";
  return `${href}${sep}from=${slug}`;
}

export function TrackedLink({
  ctaId,
  href,
  trackKind = "cta",
  articleSlug,
  medium,
  children,
  onClick,
  ...rest
}: Props) {
  const validSlug = articleSlug && SLUG_REGEX.test(articleSlug) ? articleSlug : undefined;
  const finalHref = validSlug ? withFromParam(href, validSlug) : href;

  return (
    <a
      {...rest}
      href={finalHref}
      data-track={trackKind}
      data-track-id={ctaId}
      data-track-href={finalHref}
      onClick={(e) => {
        if (validSlug) {
          rememberArticleSource(validSlug, medium ?? "article");
        }
        trackCTA(ctaId, finalHref, validSlug ? { article_slug: validSlug, medium } : undefined);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
