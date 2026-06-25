import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { DitherFlow } from "@/app/components/oferta/DitherFlow";
import { CONTACT_FORM_URL } from "@/app/lib/data";
import { getPosts } from "@/lib/posts";
import { CopyEmail } from "./CopyEmail";
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
  title: "Linki - Łukasz Glica (luki.zip)",
  description:
    "Buduję brandy z taste i wdrażam do nich AI. Poradniki AI, case studies, newsletter, wszystko w jednym miejscu.",
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
  external?: boolean;
};

// ctaLinks budowane w komponencie (liczba poradników renderowana dynamicznie)

export default function LinksPage() {
  const poradnikiCount = getPosts().length;

  const ctaLinks: CtaLink[] = [
    {
      title: "Darmowe poradniki AI",
      sub: `${poradnikiCount} playbooków krok po kroku: Meta AI, Claude Code, Kling. Zero teorii, same konkrety.`,
      href: "/artykuly",
      trackId: "cta_links_artykuly",
      variant: "primary",
      badge: "DARMOWE",
    },
    {
      title: "Zobacz co buduję",
      sub: "Rekord kanału 300 tysięcy wyświetleń, +40% wzrostu aplikacji, 1200 godzin odzyskane rocznie. Realne wdrożenia klientów.",
      href: "/",
      trackId: "cta_links_realizacje",
    },
    {
      title: "Kim jestem",
      sub: "Droga po 10 nieudanych biznesach i roku w Japonii od zera. Dziś działam na przecięciu AI i świata kreatywnego. Moja historia.",
      href: "/about",
      trackId: "cta_links_about",
    },
    {
      title: "Pracuj ze mną",
      sub: "Wdrażam systemy AI z taste do twojego biznesu. Napisz, a odezwę się do ciebie.",
      href: CONTACT_FORM_URL,
      trackId: "cta_links_wspolpraca",
      external: true,
    },
    {
      title: "Newsletter na maila",
      sub: "Co tydzień jeden konkret o budowaniu biznesów i marek w erze AI. Krótko, bez spamu.",
      href: "/brain",
      trackId: "cta_links_brain",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      {/* Cover banner — shader (liquid dither) */}
      <div className="w-full h-32 overflow-hidden bg-[var(--accent)] sm:h-40 md:h-44">
        <DitherFlow className="h-full w-full" />
      </div>

      <main className="container-narrow pb-10 sm:pb-14">
        <div className="flex flex-col items-center text-center">
          {/* Avatar — okrągłe, ta sama foto co About (object-top, bez zoomu na twarz) */}
          <div className="relative -mt-20 sm:-mt-24 w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-[var(--bg-page)] bg-[var(--bg-card)] shrink-0">
            <Image
              src="/links/avatar-v6.jpg"
              alt="Łukasz Glica"
              fill
              sizes="192px"
              className="object-cover object-top"
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
            Buduję brandy z taste i wdrażam do nich AI.
          </p>

          {/* Discipline row */}
          <p className="mt-1.5 text-[14px] text-[var(--text-secondary)]">
            AI · Content · Creative Direction
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

          {/* Email — kopiowanie do schowka */}
          <CopyEmail email="lukasz.glica07@gmail.com" />
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

            const inner = (
              <>
                {cta.badge && (
                  <span
                    className={`absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-semibold tracking-[0.12em] uppercase rounded-full px-2 py-1 ${isPrimary ? "bg-white/20 text-white" : "bg-[var(--accent)]/10 text-[var(--accent)]"}`}
                  >
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
              </>
            );
            const linkClass = `${baseClass} ${isPrimary ? primaryClass : defaultClass}`;

            return (
              <li key={cta.trackId}>
                {cta.external ? (
                  <a
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="cta_links"
                    data-track-id={cta.trackId}
                    data-track-href={cta.href}
                    className={linkClass}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link
                    href={cta.href}
                    data-track="cta_links"
                    data-track-id={cta.trackId}
                    data-track-href={cta.href}
                    className={linkClass}
                  >
                    {inner}
                  </Link>
                )}
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
