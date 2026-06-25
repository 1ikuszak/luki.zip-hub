import { ArrowRight } from "lucide-react";

type Props = {
  variant?: "primary" | "secondary" | "onAccent";
  label?: string;
  href?: string;
};

/**
 * Wszystkie CTA na /drugi-mozg używają tego komponentu. Domyślny href="#checkout"
 * (kotwica do sekcji Offer). Gdy ustawiony NEXT_PUBLIC_EASYCART_CHECKOUT_URL,
 * domyślny "#checkout" jest automatycznie podmieniany na hostowany checkout
 * EasyCart - jeden klik prosto do płatności, zero pól po naszej stronie.
 * Sekret nigdy nie trafia do klienta: NEXT_PUBLIC_* to tylko publiczny link koszyka.
 * Jawnie podany href (np. "#checkout" przekazany świadomie albo inna kotwica)
 * nadpisuje to zachowanie tylko, gdy różni się od domyślnego.
 */
function resolveHref(href: string): string {
  const checkoutUrl = process.env.NEXT_PUBLIC_EASYCART_CHECKOUT_URL;
  if (href === "#checkout" && checkoutUrl) return checkoutUrl;
  return href;
}

export function CtaButton({
  variant = "primary",
  label = "Postaw swój Drugi Mózg",
  href = "#checkout",
}: Props) {
  const resolvedHref = resolveHref(href);

  if (variant === "secondary") {
    return (
      <a
        href={resolvedHref}
        className="inline-flex h-[56px] items-center gap-2 rounded-full border border-[var(--border)] bg-white px-7 text-[16px] font-semibold text-[var(--text)] transition-colors hover:border-[var(--text)]"
      >
        {label}
      </a>
    );
  }

  if (variant === "onAccent") {
    return (
      <a
        href={resolvedHref}
        className="group inline-flex h-[56px] items-center gap-2 rounded-full bg-white px-8 text-[16px] font-semibold text-[var(--accent)] shadow-[0_20px_50px_-18px_rgba(0,0,0,0.45)] transition-transform hover:scale-[1.03]"
      >
        {label}
        <ArrowRight
          size={18}
          strokeWidth={2.5}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </a>
    );
  }

  return (
    <a
      href={resolvedHref}
      className="group inline-flex h-[56px] items-center gap-2 rounded-full bg-[var(--accent)] px-8 text-[16px] font-semibold text-white shadow-[0_20px_50px_-18px_rgba(38,86,217,0.6)] transition-transform hover:scale-[1.03]"
    >
      {label}
      <ArrowRight
        size={18}
        strokeWidth={2.5}
        className="transition-transform group-hover:translate-x-0.5"
      />
    </a>
  );
}
