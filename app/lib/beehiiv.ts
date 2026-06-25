/**
 * Beehiiv API helpers — server-only. Dostawa dostępu do kursu jedzie tym kanałem.
 *
 * Flow: webhook EasyCart → upsert kupującego do Beehiiv z custom field
 * `drugi_mozg_access_url` (idempotentnie po emailu) → (opcjonalnie) enroll do
 * automatyzacji, która wysyła maila z linkiem dostępowym.
 *
 * Idempotencja: `reactivate_existing: true` sprawia, że ponowny webhook na ten
 * sam email = upsert, nie duplikat. Side-effect jest z natury idempotentny,
 * więc nie potrzebujemy bazy "przetworzonych zamówień" na serverless.
 */

const BEEHIIV_BASE = "https://api.beehiiv.com/v2";

type BeehiivCustomField = { name: string; value: string };

export type UpsertBuyerResult =
  | { ok: true }
  | { ok: false; status: number; detail: string };

/**
 * Dodaje/aktualizuje subskrybenta i zapisuje link dostępowy w custom field.
 * UWAGA: custom field o nazwie `drugi_mozg_access_url` musi istnieć w panelu
 * Beehiiv (Settings → Custom Fields) zanim zacznie się zapisywać — inaczej API
 * je zignoruje. Patrz README.
 */
export async function upsertCourseBuyer(opts: {
  apiKey: string;
  publicationId: string;
  email: string;
  accessUrl: string;
  customFields?: BeehiivCustomField[];
}): Promise<UpsertBuyerResult> {
  const { apiKey, publicationId, email, accessUrl } = opts;

  const payload: Record<string, unknown> = {
    email,
    reactivate_existing: true,
    send_welcome_email: false,
    utm_source: "luki_zip",
    utm_medium: "purchase",
    utm_campaign: "drugi-mozg-buyer",
    custom_fields: [
      { name: "drugi_mozg_access_url", value: accessUrl },
      ...(opts.customFields ?? []),
    ],
  };

  const res = await fetch(
    `${BEEHIIV_BASE}/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    return { ok: false, status: res.status, detail: detail.slice(0, 300) };
  }
  return { ok: true };
}

/**
 * Opcjonalnie: zapisuje kupującego do konkretnej automatyzacji Beehiiv
 * (to ona realnie wysyła maila z dostępem). Aktywne tylko gdy ustawisz
 * BEEHIIV_DRUGI_MOZG_AUTOMATION_ID. Gdy puste — pomijamy bez błędu.
 */
export async function enrollInAutomation(opts: {
  apiKey: string;
  publicationId: string;
  automationId: string;
  email: string;
}): Promise<UpsertBuyerResult> {
  const { apiKey, publicationId, automationId, email } = opts;
  const res = await fetch(
    `${BEEHIIV_BASE}/publications/${publicationId}/automations/${automationId}/journeys`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    },
  );

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    return { ok: false, status: res.status, detail: detail.slice(0, 300) };
  }
  return { ok: true };
}
