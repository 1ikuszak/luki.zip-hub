import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Komponent serwerowy (2026-08-19): klikniecie lapie jeden delegowany listener
 * z ClickTracking, wiec link nie wymusza juz hydracji swojego drzewa.
 * Kontekst zrodla jedzie w data-track-slug / data-track-medium.
 */

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
      data-track-slug={validSlug}
      data-track-medium={validSlug ? medium ?? "article" : undefined}
    >
      {children}
    </a>
  );
}
