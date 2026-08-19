"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

type NavLink = { label: string; href: string };

/**
 * Nawigacja mobilna (2026-08-19). Do audytu telefon nie mial ZADNEJ nawigacji:
 * linki byly `hidden sm:flex`, wiec Portfolio, Artykuly i O mnie istnialy tylko
 * na desktopie. Hamburger + panel na pelna szerokosc, cele dotykowe 48 px,
 * zamkniecie: link, Esc, klik w tlo. Zero zmian na desktopie (sm:hidden).
 */
export function MobileNav({ links, cta }: { links: NavLink[]; cta: NavLink }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-label={open ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-[var(--text)]"
      >
        {open ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-black/25"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            id="mobile-nav-panel"
            className="fixed inset-x-0 top-16 z-50 border-b border-[var(--border)] bg-white px-5 pb-6 pt-2 shadow-[0_24px_60px_-30px_rgba(8,12,40,0.45)]"
          >
            <nav>
              <ul className="flex flex-col">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex min-h-[52px] items-center border-b border-[var(--border)] text-[17px] font-medium text-[var(--text)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              href={cta.href}
              data-track="cta_nav"
              data-track-id="cta_nav_brain_mobile"
              data-track-href={cta.href}
              className="btn-glossy mt-5 flex h-12 items-center justify-center rounded-lg text-[16px] font-semibold text-white"
            >
              {cta.label}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
