/**
 * Beehiiv API helpers — server-only. Rola: LISTA MARKETINGOWA, nie dostawa.
 *
 * Dostęp do kursu jedzie mailem transakcyjnym (Resend, app/lib/mail.ts).
 * Tu tylko idempotentny upsert kupującego na listę z tagiem kampanii —
 * best-effort, padnięty Beehiiv nie blokuje dostawy.
 *
 * Idempotencja: `reactivate_existing: true` sprawia, że ponowny webhook na ten
 * sam email = upsert, nie duplikat.
 */

const BEEHIIV_BASE = "https://api.beehiiv.com/v2";

type BeehiivCustomField = { name: string; value: string };

export type UpsertBuyerResult =
  | { ok: true }
  | { ok: false; status: number; detail: string };

/** Dodaje/aktualizuje kupującego na liście newslettera (tag drugi-mozg-buyer). */
export async function upsertCourseBuyer(opts: {
  apiKey: string;
  publicationId: string;
  email: string;
  customFields?: BeehiivCustomField[];
}): Promise<UpsertBuyerResult> {
  const { apiKey, publicationId, email } = opts;

  const payload: Record<string, unknown> = {
    email,
    reactivate_existing: true,
    send_welcome_email: false,
    utm_source: "luki_zip",
    utm_medium: "purchase",
    utm_campaign: "drugi-mozg-buyer",
    ...(opts.customFields?.length ? { custom_fields: opts.customFields } : {}),
  };

  let res: Response;
  try {
    res = await fetch(
      `${BEEHIIV_BASE}/publications/${publicationId}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8_000),
      },
    );
  } catch (err) {
    return { ok: false, status: 0, detail: String(err) };
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    return { ok: false, status: res.status, detail: detail.slice(0, 300) };
  }
  return { ok: true };
}
