import crypto from "node:crypto";

/**
 * EasyCart (easy.tools) integration helpers — server-only.
 *
 * Bezpieczeństwo opiera się na dwóch sekretach (NIGDY client-side):
 *  - EASYCART_WEBHOOK_SECRET  — podpisuje webhooki EasyCart (X-Webhook-Signature).
 *  - COURSE_ACCESS_SECRET     — podpisuje linki dostępowe do /drugi-mozg/kurs.
 *
 * Model dostępu jest BEZSTANOWY (zero bazy): link = email + podpis HMAC.
 * Tylko serwer znający COURSE_ACCESS_SECRET potrafi taki link wygenerować,
 * więc nikt nie podrobi dostępu wpisując dowolny email w URL.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
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

/** Stałoczasowe porównanie — chroni przed timing-atakami na podpis. */
function safeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
  } catch {
    return false;
  }
}

// ─── Webhook signature (EasyCart → my) ──────────────────────────────────────

/**
 * Weryfikuje podpis webhooka EasyCart.
 * EasyCart liczy: HMAC-SHA256(raw_body, signing_key) w hex i wysyła w nagłówku
 * `X-Webhook-Signature`. Musimy policzyć to samo z SUROWEGO body (nie z
 * przeparsowanego JSON-a) i porównać stałoczasowo.
 */
export function verifyWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string | undefined,
): boolean {
  if (!signatureHeader || !secret) return false;
  // Nagłówek bywa w formie "sha256=..." — bierzemy część po ewentualnym "=".
  const received = signatureHeader.includes("=")
    ? signatureHeader.split("=").pop() ?? signatureHeader
    : signatureHeader;
  const expected = hmacHex(rawBody, secret);
  return safeEqualHex(received.trim().toLowerCase(), expected.toLowerCase());
}

// ─── Access tokens (link do /drugi-mozg/kurs) ───────────────────────────────

/**
 * Generuje podpisany token dostępu związany z emailem kupującego.
 * Format: base64url(email).hmacHex  — jeden nieprzezroczysty parametr `k`.
 */
export function signAccessToken(
  email: string,
  secret: string | undefined,
): string | null {
  if (!secret) return null;
  const normalized = email.trim().toLowerCase();
  if (!EMAIL_REGEX.test(normalized)) return null;
  const payload = base64url(normalized);
  const sig = hmacHex(payload, secret);
  return `${payload}.${sig}`;
}

/**
 * Weryfikuje token z linku dostępowego. Zwraca email kupującego albo null.
 */
export function verifyAccessToken(
  token: string | undefined | null,
  secret: string | undefined,
): string | null {
  if (!token || !secret) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const expected = hmacHex(payload, secret);
  if (!safeEqualHex(sig, expected)) return null;
  try {
    const email = base64urlDecode(payload).toLowerCase();
    return EMAIL_REGEX.test(email) ? email : null;
  } catch {
    return null;
  }
}

/** Buduje absolutny link dostępowy wysyłany kupującemu (np. mailem). */
export function buildCourseAccessUrl(
  email: string,
  opts: { secret: string | undefined; siteUrl: string | undefined },
): string | null {
  const token = signAccessToken(email, opts.secret);
  if (!token) return null;
  const base = (opts.siteUrl || "https://luki.zip").replace(/\/+$/, "");
  return `${base}/drugi-mozg/kurs?k=${encodeURIComponent(token)}`;
}

// ─── Webhook payload typy ────────────────────────────────────────────────────

/** Eventy EasyCart które obsługujemy realnie (reszta = ack bez akcji). */
export const EASYCART_PURCHASE_EVENT = "product_assigned" as const;

export type EasyCartWebhookPayload = {
  event?: string;
  timestamp?: number;
  success?: boolean;
  customer_email?: string;
  customer_name?: string;
  customer_id?: string | number;
  order_id?: string | number;
  order_uuid?: string;
  product_id?: string | number;
  product_name?: string;
  amount_paid?: number;
  currency?: string;
  custom_params?: Record<string, unknown>;
};
