"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { socialLinks } from "@/app/lib/data";

const NAV_LINKS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Artykuły", href: "/artykuly" },
  { label: "O mnie", href: "/about" },
  { label: "Newsletter", href: "/brain" },
];

// strony z gradientowym tłem → footer biały + przezroczysty, na gradiencie
const GRADIENT_ROUTES = ["/", "/oferta", "/artykuly", "/portfolio", "/about"];

export function Footer() {
  const pathname = usePathname();
  const onGradient = pathname ? GRADIENT_ROUTES.includes(pathname) : false;

  const cls = {
    footer: onGradient
      ? "relative z-10 border-white/15 bg-transparent"
      : "border-[var(--border)] bg-[var(--bg-page)]",
    title: onGradient ? "text-white" : "text-[var(--text)]",
    muted: onGradient ? "text-white/65" : "text-[var(--text-secondary)]",
    link: onGradient
      ? "text-white/85 hover:text-white"
      : "text-[var(--text)] hover:text-[var(--accent)]",
    emailLink: onGradient
      ? "text-white hover:text-white/70"
      : "text-[var(--text)] hover:text-[var(--accent)]",
    rule: onGradient ? "border-white/15" : "border-[var(--border)]",
  };

  return (
    <footer
      className={`mt-24 border-t ${cls.footer}`}
      style={
        onGradient
          ? { textShadow: "0 1px 14px rgba(5,8,30,0.45)" }
          : undefined
      }
    >
      <div className="container-wide py-16 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12">
          <div className="flex flex-col gap-3">
            <div className={`text-[17px] font-semibold ${cls.title}`}>
              luki.zip
            </div>
            <p className={`text-[15px] max-w-[28ch] ${cls.muted}`}>
              I build brands with taste. In the age of AI.
            </p>
            <a
              href="mailto:lukasz.glica07@gmail.com"
              className={`text-[15px] ${cls.emailLink} transition-colors mt-1 w-fit underline underline-offset-4`}
            >
              lukasz.glica07@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <div
              className={`text-[11px] uppercase tracking-[0.12em] font-semibold ${cls.muted}`}
            >
              Nawigacja
            </div>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-[15px] ${cls.link} transition-colors`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <div
              className={`text-[11px] uppercase tracking-[0.12em] font-semibold ${cls.muted}`}
            >
              Social
            </div>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[15px] ${cls.link} transition-colors`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`mt-12 pt-6 border-t ${cls.rule}`}>
          <p className={`text-[13px] ${cls.muted}`}>
            © 2026 Łukasz Glica. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
