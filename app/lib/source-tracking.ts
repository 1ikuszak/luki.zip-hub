export type SourceMedium = "article" | "homepage" | "direct" | "social";

export type SourceContext = {
  article_slug?: string;
  medium: SourceMedium;
  referring_site?: string;
};

const SLUG_REGEX = /^[a-z0-9-]{1,80}$/;
const STORAGE_KEY = "luki_source";
const STORAGE_TTL_MS = 30 * 60 * 1000;
const SOCIAL_HOSTS = [
  "twitter.com",
  "x.com",
  "t.co",
  "linkedin.com",
  "lnkd.in",
  "instagram.com",
  "l.instagram.com",
  "facebook.com",
  "l.facebook.com",
  "youtube.com",
  "youtu.be",
  "threads.net",
];

type StoredSource = {
  slug: string;
  medium: "article" | "homepage";
  ts: number;
};

function isValidSlug(value: string | null | undefined): value is string {
  return !!value && SLUG_REGEX.test(value);
}

function readStored(): StoredSource | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredSource>;
    if (!parsed || typeof parsed !== "object") return null;
    if (!isValidSlug(parsed.slug)) return null;
    if (parsed.medium !== "article" && parsed.medium !== "homepage") return null;
    if (typeof parsed.ts !== "number") return null;
    if (Date.now() - parsed.ts > STORAGE_TTL_MS) return null;
    return parsed as StoredSource;
  } catch {
    return null;
  }
}

function getReferrerHost(): string | null {
  if (typeof document === "undefined") return null;
  try {
    if (!document.referrer) return null;
    return new URL(document.referrer).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function getReferrerArticleSlug(siteHost: string): string | null {
  if (typeof document === "undefined") return null;
  try {
    if (!document.referrer) return null;
    const url = new URL(document.referrer);
    if (url.hostname.toLowerCase() !== siteHost) return null;
    const match = url.pathname.match(/^\/artykuly\/([a-z0-9-]{1,80})\/?$/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export function rememberArticleSource(
  slug: string,
  medium: "article" | "homepage" = "article",
): void {
  if (typeof window === "undefined") return;
  if (!isValidSlug(slug)) return;
  try {
    const payload: StoredSource = { slug, medium, ts: Date.now() };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore storage failures (privacy mode, quota)
  }
}

export function readSourceContext(
  searchParams: URLSearchParams | null,
): SourceContext {
  const siteHost =
    typeof window !== "undefined" ? window.location.hostname.toLowerCase() : "";

  const fromParam = searchParams?.get("from") ?? null;
  const utmMediumParam = searchParams?.get("utm_medium") ?? null;
  const utmSourceParam = searchParams?.get("utm_source")?.toLowerCase() ?? null;

  if (isValidSlug(fromParam)) {
    return {
      article_slug: fromParam,
      medium: "article",
      referring_site: buildArticleUrl(fromParam),
    };
  }

  const stored = readStored();
  if (stored) {
    return {
      article_slug: stored.slug,
      medium: stored.medium,
      referring_site:
        stored.medium === "article" ? buildArticleUrl(stored.slug) : undefined,
    };
  }

  if (utmMediumParam === "homepage") {
    return { medium: "homepage" };
  }

  const referrerSlug = siteHost ? getReferrerArticleSlug(siteHost) : null;
  if (referrerSlug) {
    return {
      article_slug: referrerSlug,
      medium: "article",
      referring_site: buildArticleUrl(referrerSlug),
    };
  }

  const referrerHost = getReferrerHost();
  if (referrerHost && SOCIAL_HOSTS.some((h) => referrerHost.endsWith(h))) {
    return { medium: "social" };
  }
  if (utmSourceParam && ["twitter", "x", "linkedin", "instagram", "facebook", "youtube"].includes(utmSourceParam)) {
    return { medium: "social" };
  }

  return { medium: "direct" };
}

function buildArticleUrl(slug: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  return `${window.location.origin}/artykuly/${slug}`;
}
