"use client";

import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { TrackedLink } from "@/app/components/TrackedLink";

type Props = {
  href: string;
  tool: string;
  ctaId: string;
  children: ReactNode;
};

export function AffiliateLink({ href, tool, ctaId, children }: Props) {
  return (
    <TrackedLink
      ctaId={ctaId}
      href={href}
      target="_blank"
      rel="noopener sponsored"
      data-tool={tool}
      className="inline-flex items-center gap-1 font-semibold text-[var(--accent)] underline underline-offset-4 hover:no-underline"
    >
      {children}
      <ExternalLink size={13} className="shrink-0" />
    </TrackedLink>
  );
}
