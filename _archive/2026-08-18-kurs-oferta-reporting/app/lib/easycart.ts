import crypto from "node:crypto";

/**
 * EasyCart (easy.tools) — server-only: weryfikacja webhooków + sprawdzenie
 * zakupu w API zamówień. Tokeny dostępu do kursu żyją w app/lib/access.ts.
 */

const EASYCART_API_BASE = "https://cart.easy.tools/api/v1";

/** UUID produktu "Drugi Mózg" (nadpisywalny env-em, gdyby produkt się zmienił). */
export const DRUGI_MOZG_PRODUCT_ID =
  process.env.EASYCART_PRODUCT_ID || "9060aebc-0007-408f-87e3-25a780021b14";

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

// ─── Orders API — weryfikacja zakupu (formularz "odzyskaj dostęp") ──────────

/**
 * Sprawdza w API EasyCart, czy dany email ma zamówienie kursu.
 * Źródło prawdy = EasyCart (zero własnej bazy). Defensywnie: schemat itemu
 * zamówienia nie jest publicznie udokumentowany, więc szukamy UUID produktu
 * (lub jego nazwy) w całym obiekcie zamówienia; puste `items` = brak zakupu.
 *
 * Zwraca "unavailable" przy błędzie API (brak klucza, timeout, 5xx) — caller
 * decyduje co z tym zrobić (my: nie wysyłamy linku, logujemy).
 */
export async function hasPurchasedCourse(
  email: string,
): Promise<true | false | "unavailable"> {
  const apiKey = process.env.EASYCART_API_KEY;
  if (!apiKey) {
    console.error("[easycart-orders] brak EASYCART_API_KEY");
    return "unavailable";
  }

  let res: Response;
  try {
    res = await fetch(
      `${EASYCART_API_BASE}/orders?email=${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(8_000),
        cache: "no-store",
      },
    );
  } catch (err) {
    console.error(`[easycart-orders] network: ${String(err)}`);
    return "unavailable";
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error(`[easycart-orders] ${res.status}: ${detail.slice(0, 200)}`);
    return "unavailable";
  }

  let body: { items?: unknown[] };
  try {
    body = (await res.json()) as { items?: unknown[] };
  } catch {
    return "unavailable";
  }

  const items = Array.isArray(body.items) ? body.items : [];
  if (items.length === 0) return false;

  const needleId = DRUGI_MOZG_PRODUCT_ID.toLowerCase();
  return items.some((item) => {
    const blob = JSON.stringify(item).toLowerCase();
    return blob.includes(needleId) || blob.includes("drugi m");
  });
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
