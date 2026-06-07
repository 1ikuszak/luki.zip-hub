import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  BadgeCheck,
  Instagram,
  Youtube,
  Linkedin,
  Globe,
  ArrowUpRight,
} from "lucide-react";

import { GradientBackdrop } from "@/app/components/GradientBackdrop";
import { CONTACT_FORM_URL } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "About me — Łukasz Glica (luki.zip)",
  description:
    "I work at the intersection of content, AI, and storytelling. Now I help others build their brand through content and design.",
  alternates: { canonical: "/about" },
};

const socials = [
  { label: "luki.zip", icon: Globe, href: "/", external: false },
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

const paragraphs = [
  "I grew my own YouTube to 8K in three months, and I’ve generated over 2M views so far.",
  "Now I help others build their brand through content and design.",
  "Before this, I ran my own design studio.",
  "I’m documenting the whole journey as I go.",
];

const shadow = { textShadow: "0 1px 20px rgba(5,8,30,0.45)" };

export default function AboutPage() {
  return (
    <div className="relative">
      {/* gradientowe tło (dither) na całą stronę — jak na /oferta, /artykuly, /portfolio */}
      <GradientBackdrop />

      <main className="relative z-10 container-narrow flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 text-center">
        {/* Zdjęcie */}
        <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-white/30 bg-white/10 shrink-0">
          <Image
            src="/links/avatar.jpg"
            alt="Łukasz Glica"
            fill
            sizes="176px"
            className="object-cover"
            priority
          />
        </div>

        {/* Imię + checkmark (identyfikacja) */}
        <div className="mt-5 flex items-center justify-center gap-1.5">
          <span
            className="text-[21px] sm:text-[23px] font-semibold tracking-tight text-white"
            style={shadow}
          >
            Łukasz Glica
          </span>
          <BadgeCheck
            size={22}
            fill="#fff"
            strokeWidth={2}
            className="text-[var(--accent)] shrink-0"
            aria-label="Verified"
          />
        </div>

        {/* Główny nagłówek — tagline */}
        <h1
          className="mt-5 max-w-[18ch] text-[32px] sm:text-[46px] font-semibold tracking-tight leading-[1.08] text-white text-balance"
          style={shadow}
        >
          I build brands with taste. In the age of AI.
        </h1>

        <p className="mt-4 text-[15px] text-white/75" style={shadow}>
          Fractional Creative Director · Content · Design · Storytelling
        </p>

        {/* Social icons */}
        <ul className="mt-6 flex items-center justify-center gap-3">
          {socials.map(({ label, icon: Icon, href, external }) => {
            const className =
              "w-10 h-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white transition-colors hover:bg-white hover:text-[var(--accent)]";
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

        {/* Copy */}
        <div
          className="mx-auto mt-10 max-w-[560px] space-y-4 text-[18px] leading-relaxed text-white/90 text-pretty"
          style={shadow}
        >
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <span className="text-[18px] text-white/90" style={shadow}>
            Want to make something?
          </span>
          <a
            href={CONTACT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-track="cta_about"
            data-track-id="cta_about_talk"
            data-track-href={CONTACT_FORM_URL}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[16px] font-semibold text-[var(--accent)] transition-colors hover:bg-white/90"
          >
            Let’s talk
            <ArrowUpRight size={18} strokeWidth={2} />
          </a>
        </div>
      </main>
    </div>
  );
}
