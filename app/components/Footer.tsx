import Link from "next/link";
import { socialLinks } from "@/app/lib/data";

const NAV_LINKS = [
  { label: "Artykuły", href: "/artykuly" },
  { label: "Oferta", href: "/oferta" },
  { label: "Newsletter", href: "/brain" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[var(--bg-page)]">
      <div className="container-wide py-16 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12">
          <div className="flex flex-col gap-3">
            <div className="text-[17px] font-semibold text-[var(--text)]">
              luki.zip
            </div>
            <p className="text-[15px] text-[var(--text-secondary)] max-w-xs leading-relaxed">
              Brand design, launch video i system. Robię marki, które wyglądają cool.
            </p>
            <a
              href="mailto:lukasz.glica07@gmail.com"
              className="text-[15px] text-[var(--text)] hover:text-[var(--accent)] transition-colors mt-1 w-fit underline underline-offset-4"
            >
              lukasz.glica07@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[var(--text-secondary)]">
              Nawigacja
            </div>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[var(--text-secondary)]">
              Social
            </div>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border)]">
          <p className="text-[13px] text-[var(--text-secondary)]">
            © 2026 Łukasz Glica. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
