import Link from "next/link";

const NAV_LINKS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Artykuły", href: "/artykuly" },
  { label: "About me", href: "/about" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--border)]">
      <nav className="container-wide flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-[17px] font-semibold text-[var(--text)] select-none"
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

        <Link
          href="/brain"
          data-track="cta_nav"
          data-track-id="cta_nav_brain"
          data-track-href="/brain"
          className="inline-flex h-9 items-center justify-center rounded-lg bg-[var(--accent)] px-4 text-sm font-semibold text-white hover:bg-[var(--accent-light)] transition-colors"
        >
          Dołącz za darmo
        </Link>
      </nav>
    </header>
  );
}
