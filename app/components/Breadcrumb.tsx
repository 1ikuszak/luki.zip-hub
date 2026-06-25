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
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] leading-none">
        <li>
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 font-medium transition-colors ${linkCls}`}
          >
            <Home size={16} strokeWidth={2} />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              <ChevronRight size={15} strokeWidth={2} className={sepCls} aria-hidden />
              {item.href && !isLast ? (
                <Link href={item.href} className={`font-medium transition-colors ${linkCls}`}>
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`max-w-[60vw] truncate sm:max-w-[44ch] ${currentCls}`}
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
