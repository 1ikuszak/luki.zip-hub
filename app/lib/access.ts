import crypto from "node:crypto";

/**
 * Model dostępu do kursu — server-only, bezstanowy (zero bazy).
 *
 * Trzy rodzaje podpisanych tokenów (wszystkie HMAC-SHA256 z COURSE_ACCESS_SECRET):
 *  - "welcome" (72h)  — magic link w mailu po zakupie
 *  - "login"   (30min) — magic link z formularza "odzyskaj dostęp"
 *  - "session" (180 dni) — wartość httpOnly cookie po kliknięciu magic linku
 *
 * Dlaczego tak: link w mailu to zawsze bearer credential — każdy kto go ma,
 * wchodzi. Skracamy więc życie LINKU (72h / 30min), a trwały dostęp trzyma
 * httpOnly COOKIE ustawiane po kliknięciu. Przekazany dalej stary mail nie
 * otwiera nic; nowy link dostaje tylko właściciel skrzynki (weryfikacja
 * zakupu w API zamówień EasyCart). Wzorzec magic-link jak Substack/Slack.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type TokenPurpose = "welcome" | "login" | "session";

export const TOKEN_TTL_SECONDS: Record<TokenPurpose, number> = {
  welcome: 72 * 60 * 60, // 3 dni na pierwsze kliknięcie z maila po zakupie
  login: 30 * 60, // link z formularza — krótki, wydawany na żądanie
  session: 180 * 24 * 60 * 60, // cookie — pół roku, potem jeden klik w formularz
};

/** Nazwa cookie sesji kursu. */
export const SESSION_COOKIE = "dm_dostep";

function base64url(input: string): string {
  return Buffer.from(input, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64urlDecode(input: string): string {
  return Buffer.from(input, "base64url").toString("utf8");
}

function hmacHex(message: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(message).digest("hex");
}

/** Stałoczasowe porównanie hexów — chroni przed timing-atakami na podpis. */
function safeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
  } catch {
    return false;
  }
}

function normalizeEmail(email: string): string | null {
  const normalized = email.trim().toLowerCase();
  return EMAIL_REGEX.test(normalized) ? normalized : null;
}

/**
 * Mintuje token: base64url("purpose:email:expEpoch") + "." + podpis.
 * Purpose jest CZĘŚCIĄ podpisywanej wiadomości — token logowania nie przejdzie
 * jako cookie sesji i odwrotnie.
 */
export function mintToken(
  email: string,
  purpose: TokenPurpose,
  secret: string | undefined,
  now: number = Date.now(),
): string | null {
  if (!secret) return null;
  const normalized = normalizeEmail(email);
  if (!normalized) return null;
  const exp = Math.floor(now / 1000) + TOKEN_TTL_SECONDS[purpose];
  const payload = `${purpose}:${normalized}:${exp}`;
  return `${base64url(payload)}.${hmacHex(payload, secret)}`;
}

/**
 * Weryfikuje token danego rodzaju. Zwraca email albo null (zły podpis,
 * zły purpose, po terminie, zepsuty format).
 */
export function verifyToken(
  token: string | undefined | null,
  purpose: TokenPurpose,
  secret: string | undefined,
  now: number = Date.now(),
): string | null {
  if (!token || !secret) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [encoded, sig] = parts;

  let payload: string;
  try {
    payload = base64urlDecode(encoded);
  } catch {
    return null;
  }
  if (!safeEqualHex(sig, hmacHex(payload, secret))) return null;

  const segments = payload.split(":");
  if (segments.length !== 3) return null;
  const [tokenPurpose, email, expRaw] = segments;
  if (tokenPurpose !== purpose) return null;

  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp * 1000 < now) return null;

  return normalizeEmail(email);
}

/** Absolutny magic link (mail po zakupie / mail logowania). */
export function buildMagicUrl(
  email: string,
  purpose: "welcome" | "login",
  opts: { secret: string | undefined; siteUrl: string | undefined },
): string | null {
  const token = mintToken(email, purpose, opts.secret);
  if (!token) return null;
  const base = (opts.siteUrl || "https://www.lukaszglica.com").replace(/\/+$/, "");
  return `${base}/api/kurs/dostep?t=${encodeURIComponent(token)}`;
}
