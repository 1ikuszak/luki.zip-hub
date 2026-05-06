"use client";

import { trackGA, trackPixel } from "@/app/lib/analytics";

const WHOP_URL = "https://whop.com/REPLACE_WITH_WHOP_PRODUCT"; // TODO: Whop URL
const PRODUCT_NAME = "Prompt Pack";
const PRICE_PLN = 79;

export function WhopBuyButton() {
  const handleClick = () => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "Purchase",
      currency: "PLN",
      value: PRICE_PLN,
      item_name: PRODUCT_NAME,
    });

    trackGA("purchase", {
      currency: "PLN",
      value: PRICE_PLN,
      items: [{ item_name: PRODUCT_NAME }],
    });

    trackPixel("Purchase", {
      currency: "PLN",
      value: PRICE_PLN,
      content_name: PRODUCT_NAME,
    });
  };

  return (
    <a
      href={WHOP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      data-track="cta_purchase"
      data-track-id="purchase_prompt_pack"
      data-track-href={WHOP_URL}
      className="inline-flex items-center justify-center px-7 h-[52px] rounded-lg bg-[var(--accent)] text-white text-base font-semibold hover:bg-[var(--accent-light)] transition-colors"
    >
      Kup Prompt Pack – {PRICE_PLN} PLN
    </a>
  );
}
