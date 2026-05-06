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

export function trackCTA(ctaId: string, href?: string): void {
  trackGA("click_cta", { cta_id: ctaId, href });
  if (ctaId.startsWith("brain_")) {
    trackPixel("Lead", { content_name: ctaId });
  }
}
