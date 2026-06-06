import Link from "next/link";
import type { Metadata } from "next";
import {
  BadgeCheck,
  Instagram,
  Youtube,
  Linkedin,
  Globe,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Linki — Łukasz Glica (luki.zip)",
  description:
    "Video, Content, Design & Creative Direction. Wszystko w jednym miejscu — oferta, portfolio, poradniki AI.",
};

type Social = {
  label: string;
  icon: typeof Instagram;
  href: string;
  external: boolean;
};

const socials: Social[] = [
  {
    label: "luki.zip",
    icon: Globe,
    href: "/",
    external: false,
  },
  {
    label: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/luki.zip",
    external: true,
  },
  {
    label: "YouTube",
    icon: Youtube,
    href: "https://www.youtube.com/@luki_zip",
    external: true,
  },
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/lukaszglica",
    external: true,
  },
];

type CtaLink = {
  title: string;
  sub: string;
  href: string;
  trackId: string;
  variant?: "primary" | "default";
  badge?: string;
};

const ctaLinks: CtaLink[] = [
  {
    title: "Pracujmy razem",
    sub: "Brand · Launch video · Creative direction · od 7 000 zł",
    href: "/oferta",
    trackId: "cta_links_oferta",
    variant: "primary",
  },
  {
    title: "Zobacz case studies",
    sub: "Realizacje dla klientów — Lumen, Nordic Bank, Oat Haus",
    href: "/case-studies",
    trackId: "cta_links_case_studies",
  },
  {
    title: "Darmowe poradniki AI",
    sub: "11 konkretnych playbooków — Meta AI, Claude Code, Kling. Bez teoretyzowania.",
    href: "/artykuly",
    trackId: "cta_links_artykuly",
    badge: "DARMOWE",
  },
  {
    title: "Newsletter na maila",
    sub: "Co tydzień jeden konkretny insight o brandzie w erze AI",
    href: "/brain",
    trackId: "cta_links_brain",
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      {/* Cover banner — full-width (edge-to-edge) (TODO: podmień na <Image src="/links/banner.jpg" />) */}
      <div className="w-full aspect-[16/5] sm:aspect-[16/4] md:aspect-[16/3] bg-gradient-to-br from-[var(--accent)] via-[var(--accent-light)] to-[var(--chartreuse)]" />

      <main className="container-narrow pb-10 sm:pb-14">
        <div className="flex flex-col items-center text-center">
          {/* Avatar (TODO: podmień na <Image src="/links/avatar.jpg" />) */}
          <div className="-mt-14 sm:-mt-16 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] border-4 border-[var(--bg-page)] flex items-center justify-center shrink-0">
            <span className="text-white font-semibold text-[32px] sm:text-[36px] tracking-wider">
              LZ
            </span>
          </div>

          {/* Imię + checkmark */}
          <div className="mt-4 flex items-center justify-center gap-1.5">
            <h1 className="text-[28px] sm:text-[32px] font-semibold tracking-tight text-[var(--text)]">
              Łukasz Glica
            </h1>
            <BadgeCheck
              size={24}
              fill="var(--accent)"
              strokeWidth={2}
              className="text-white shrink-0"
              aria-label="Verified"
            />
          </div>

          {/* Tagline */}
          <p className="mt-1.5 text-[15px] text-[var(--text-secondary)]">
            Video · Content · Design · Creative Direction
          </p>

          {/* Mini-bio */}
          <p className="mt-2 text-[15px] text-[var(--text)] max-w-[420px]">
            Robię marki, które wyglądają cool.
          </p>

          {/* Social icons row */}
          <ul className="mt-5 flex items-center justify-center gap-3">
            {socials.map(({ label, icon: Icon, href, external }) => {
              const className =
                "w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--bg-card)] flex items-center justify-center text-[var(--text)]";
              return (
                <li key={label}>
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={className}
                    >
                      <Icon size={18} strokeWidth={1.75} />
                    </a>
                  ) : (
                    <Link href={href} aria-label={label} className={className}>
                      <Icon size={18} strokeWidth={1.75} />
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Email */}
          <a
            href="mailto:lukasz.glica07@gmail.com"
            className="mt-4 text-[15px] text-[var(--text-secondary)] underline underline-offset-4"
          >
            lukasz.glica07@gmail.com
          </a>
        </div>

        {/* CTA stack */}
        <ul className="mt-10 sm:mt-12 flex flex-col gap-3">
          {ctaLinks.map((cta) => {
            const isPrimary = cta.variant === "primary";
            const baseClass = "relative block w-full rounded-2xl p-5 sm:p-6";
            const primaryClass =
              "bg-[var(--accent)] text-white border border-[var(--accent)]";
            const defaultClass =
              "bg-[var(--bg-card)] text-[var(--text)] border border-[var(--border)]";

            const titleClass = isPrimary
              ? "text-[19px] sm:text-[20px] font-semibold leading-tight"
              : "text-[17px] font-semibold text-[var(--text)] leading-tight";
            const subClass = isPrimary
              ? "mt-1 text-[14px] text-white/85 leading-snug"
              : "mt-1 text-[14px] text-[var(--text-secondary)] leading-snug";
            const arrowClass = isPrimary
              ? "shrink-0 text-white"
              : "shrink-0 text-[var(--text-secondary)]";

            return (
              <li key={cta.trackId}>
                <Link
                  href={cta.href}
                  data-track="cta_links"
                  data-track-id={cta.trackId}
                  data-track-href={cta.href}
                  className={`${baseClass} ${isPrimary ? primaryClass : defaultClass}`}
                >
                  {cta.badge && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-semibold tracking-[0.12em] uppercase text-[var(--accent)] bg-[var(--accent)]/10 rounded-full px-2 py-1">
                      <Sparkles size={11} strokeWidth={2.25} />
                      {cta.badge}
                    </span>
                  )}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className={titleClass}>{cta.title}</div>
                      <div className={subClass}>{cta.sub}</div>
                    </div>
                    <ArrowUpRight
                      size={isPrimary ? 22 : 20}
                      strokeWidth={1.75}
                      className={arrowClass}
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 text-center text-[12px] text-[var(--text-secondary)]">
          © 2026 Łukasz Glica · luki.zip
        </p>
      </main>
    </div>
  );
}
