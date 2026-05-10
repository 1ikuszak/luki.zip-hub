type Params = Record<string, unknown>;

export function trackGA(name: string, params?: Params): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params ?? {});
}

export function trackPixel(name: string, params?: Params): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", name, params ?? {});
}

export function trackPixelCustom(name: string, params?: Params): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("trackCustom", name, params ?? {});
}

type CTAExtras = {
  article_slug?: string;
  medium?: string;
};

export function trackCTA(
  ctaId: string,
  href?: string,
  extras?: CTAExtras,
): void {
  trackGA("click_cta", { cta_id: ctaId, href, ...(extras ?? {}) });
  if (ctaId.startsWith("brain_") || ctaId.startsWith("cta_brain_")) {
    trackPixel("Lead", {
      content_name: ctaId,
      ...(extras?.article_slug ? { article_slug: extras.article_slug } : {}),
    });
  }
}
