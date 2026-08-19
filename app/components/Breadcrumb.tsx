import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

type Props = {
  items: Crumb[];
  /** "light" = dla jasnego tła (ciemny tekst), "dark" = dla ciemnego tła (jasny tekst). */
  tone?: "light" | "dark";
};

/**
 * Breadcrumb: Home (ikona + label) > crumb > crumb. Ostatni element = bieżąca
 * strona (wyszarzony, nieklikalny, ucinany przy długich tytułach).
 *
 * Mobile (2026-08-19): posrednie okruszki (wszystko poza ostatnim) chowane
 * ponizej sm - przy dlugich tytulach artykulow lamalo sie to na dwie linie
 * ("Home > Artykuly" + osobna linia z tytulem). Na mobile zostaje tylko
 * "Home > [biezaca strona]", pelna sciezka wraca od sm w gore.
 */
export function Breadcrumb({ items, tone = "light" }: Props) {
  const dark = tone === "dark";
  const linkCls = dark
    ? "text-white/85 hover:text-white"
    : "text-[var(--text)] hover:text-[var(--accent)]";
  const currentCls = dark ? "text-white/60" : "text-[var(--text-secondary)]";
  const sepCls = dark ? "text-white/40" : "text-[var(--text-secondary)]/50";

  return (
    <nav aria-label="Breadcrumb">
      <ol className="-my-2 flex flex-wrap items-center gap-x-2 text-[14px] leading-none">
        <li>
          <Link
            href="/"
            className={`inline-flex min-h-[44px] items-center gap-1.5 py-2 font-medium transition-colors ${linkCls}`}
          >
            <Home size={16} strokeWidth={2} />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li
              key={i}
              className={`items-center gap-2 ${isLast ? "flex" : "hidden sm:flex"}`}
            >
              <ChevronRight size={15} strokeWidth={2} className={sepCls} aria-hidden />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={`inline-flex min-h-[44px] items-center py-2 font-medium transition-colors ${linkCls}`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`max-w-[68vw] truncate sm:max-w-[44ch] ${currentCls}`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
