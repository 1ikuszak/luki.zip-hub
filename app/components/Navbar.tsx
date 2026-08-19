import Link from "next/link";
import { MobileNav } from "./MobileNav";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "O mnie", href: "/about" },
  { label: "Artykuły", href: "/artykuly" },
];

const NAV_CTA = { label: "Dołącz za darmo", href: "/brain" };

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--border)]">
      <nav className="container-wide flex h-16 items-center justify-between">
        <Link
          href="/"
          className="-my-2 inline-flex min-h-[44px] items-center text-[17px] font-semibold text-[var(--text)] select-none"
        >
          luki.zip
        </Link>

        <div className="hidden sm:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={NAV_CTA.href}
            data-track="cta_nav"
            data-track-id="cta_nav_brain"
            data-track-href={NAV_CTA.href}
            className="btn-glossy inline-flex h-11 items-center justify-center rounded-lg px-4 text-sm font-semibold text-white sm:h-9"
          >
            {NAV_CTA.label}
          </Link>
          <MobileNav links={NAV_LINKS} cta={NAV_CTA} />
        </div>
      </nav>
    </header>
  );
}
