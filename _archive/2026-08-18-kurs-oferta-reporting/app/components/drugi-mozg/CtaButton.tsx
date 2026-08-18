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
 *
 * Styl przycisków = ten sam glossy co homepage (.btn-glossy / .btn-glossy-light
 * z globals.css) + chip-strzałka w kółku. primary = niebieski połysk,
 * secondary = szara pigułka, onAccent = biały połysk (na niebieskim tle).
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
        className="inline-flex h-[56px] items-center gap-2 rounded-full bg-[color-mix(in_srgb,var(--text)_8%,transparent)] px-7 text-[16px] font-semibold text-[var(--text)] transition-colors hover:bg-[color-mix(in_srgb,var(--text)_14%,transparent)]"
      >
        {label}
      </a>
    );
  }

  if (variant === "onAccent") {
    return (
      <a
        href={resolvedHref}
        className="btn-glossy-light group inline-flex h-[56px] items-center gap-3 whitespace-nowrap rounded-full pl-7 pr-2.5 text-[16px] font-semibold text-[var(--accent)]"
      >
        {label}
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-white transition-transform group-hover:translate-x-0.5">
          <ArrowRight size={20} strokeWidth={2.25} />
        </span>
      </a>
    );
  }

  return (
    <a
      href={resolvedHref}
      className="btn-glossy group inline-flex h-[56px] items-center gap-3 whitespace-nowrap rounded-full pl-7 pr-2.5 text-[16px] font-semibold text-white"
    >
      {label}
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--accent)] transition-transform group-hover:translate-x-0.5">
        <ArrowRight size={20} strokeWidth={2.25} />
      </span>
    </a>
  );
}
