"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackCTA } from "@/app/lib/analytics";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  ctaId: string;
  href: string;
  trackKind?: string;
  children: ReactNode;
};

export function TrackedLink({
  ctaId,
  href,
  trackKind = "cta",
  children,
  onClick,
  ...rest
}: Props) {
  return (
    <a
      {...rest}
      href={href}
      data-track={trackKind}
      data-track-id={ctaId}
      data-track-href={href}
      onClick={(e) => {
        trackCTA(ctaId, href);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
