"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Sticky CTA bar (mobile only). Pokazuje się po przescrollowaniu ~1.2 ekranu,
 * chowa gdy sekcja #checkout jest w kadrze (nie dublować CTA nad ofertą).
 * Ten sam resolve co CtaButton: NEXT_PUBLIC_EASYCART_CHECKOUT_URL podmienia
 * kotwicę #checkout na hostowany checkout.
 */
export function StickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let scrolled = false;
    let checkoutVisible = false;
    const update = () => setShow(scrolled && !checkoutVisible);

    const onScroll = () => {
      scrolled = window.scrollY > window.innerHeight * 1.2;
      update();
    };

    const checkout = document.getElementById("checkout");
    const io = checkout
      ? new IntersectionObserver(([entry]) => {
          checkoutVisible = entry.isIntersecting;
          update();
        })
      : null;
    if (checkout && io) io.observe(checkout);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const href = process.env.NEXT_PUBLIC_EASYCART_CHECKOUT_URL || "#checkout";

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-[var(--bg-page)]/95 px-4 py-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-[560px] items-center justify-between gap-3">
        <div>
          <p className="text-[15px] font-semibold leading-tight text-[var(--text)]">
            Drugi Mózg OS
          </p>
          <p className="text-[12.5px] text-[var(--text-secondary)]">
            297 zł · cena pierwszej kohorty
          </p>
        </div>
        <a
          href={href}
          className="btn-glossy inline-flex h-[44px] shrink-0 items-center gap-1.5 rounded-full px-5 text-[14.5px] font-semibold text-white"
        >
          Postaw system
          <ArrowRight size={16} strokeWidth={2.5} />
        </a>
      </div>
    </div>
  );
}
