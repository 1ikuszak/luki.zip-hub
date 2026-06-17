import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { DitherFlow } from "@/app/components/oferta/DitherFlow";
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
    href: "https://www.linkedin.com/in/lukasz-glica-4b3889267/",
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
      {/* Cover banner — shader (liquid dither) */}
      <div className="w-full h-32 overflow-hidden bg-[var(--accent)] sm:h-40 md:h-44">
        <DitherFlow className="h-full w-full" />
      </div>

      <main className="container-narrow pb-10 sm:pb-14">
        <div className="flex flex-col items-center text-center">
          {/* Avatar (TODO: podmień na <Image src="/links/avatar.jpg" />) */}
          <div className="relative -mt-20 sm:-mt-24 w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-[var(--bg-page)] bg-[var(--bg-card)] shrink-0">
            <Image
              src="/links/avatar.jpg"
              alt="Łukasz Glica"
              fill
              sizes="192px"
              className="object-cover"
              priority
            />
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
          <p className="mt-2 text-[15px] text-[var(--text)] max-w-[440px]">
            Buduję marki, które wyglądają cool w dobie AI
          </p>

          {/* Discipline row */}
          <p className="mt-1.5 text-[14px] text-[var(--text-secondary)]">
            Video · Content · Design · Creative Direction
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
