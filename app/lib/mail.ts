/**
 * Maile transakcyjne przez Resend (api.resend.com) — server-only, raw fetch
 * (zero zależności). Dwa maile: dostęp po zakupie ("welcome") i link
 * logowania z formularza ("login").
 *
 * Idempotencja: Resend honoruje nagłówek Idempotency-Key (24h) — retry
 * webhooka EasyCart z tym samym order_uuid nie wysyła drugiego maila.
 *
 * Dev bez klucza: gdy brak RESEND_API_KEY poza produkcją, logujemy link do
 * konsoli i zwracamy ok — pełny flow testowalny lokalnie bez wysyłki.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export type SendResult =
  | { ok: true; devLogged?: boolean }
  | { ok: false; status: number; detail: string };

type AccessEmailKind = "welcome" | "login";

const SUBJECTS: Record<AccessEmailKind, string> = {
  welcome: "Twój dostęp do kursu Drugi Mózg",
  login: "Twój link do kursu Drugi Mózg",
};

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Prosty, lekki HTML — inline styles, bez obrazków, renderuje się wszędzie. */
function renderHtml(kind: AccessEmailKind, url: string): string {
  const heading =
    kind === "welcome" ? "Drugi Mózg jest twój." : "Wracasz do kursu.";
  const lead =
    kind === "welcome"
      ? "Płatność przeszła. Klikasz niżej i kurs się otwiera - wszystkie lekcje i pakiet startowy."
      : "Poprosiłeś o link do kursu. Klikasz niżej i jesteś w środku.";
  const validity =
    kind === "welcome"
      ? "Link jest ważny 3 dni. Po kliknięciu ta przeglądarka pamięta cię przez pół roku."
      : "Link jest ważny 30 minut. Po kliknięciu ta przeglądarka pamięta cię przez pół roku.";
  const safeUrl = esc(url);

  return `<!doctype html>
<html lang="pl">
  <body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:520px;margin:0 auto;padding:40px 24px;">
      <p style="margin:0 0 24px;font-size:14px;font-weight:600;color:#2656d9;letter-spacing:0.06em;text-transform:uppercase;">luki.zip</p>
      <div style="background:#ffffff;border:1px solid #e6e6ea;border-radius:16px;padding:32px 28px;">
        <h1 style="margin:0;font-size:22px;line-height:1.3;color:#0b0d17;">${heading}</h1>
        <p style="margin:14px 0 0;font-size:15px;line-height:1.6;color:#4a4d5e;">${lead}</p>
        <a href="${safeUrl}" style="display:inline-block;margin:24px 0 0;background:#2656d9;color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;padding:14px 28px;border-radius:999px;">Otwórz kurs</a>
        <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#8a8d9c;">Przycisk nie działa? Skopiuj ten link do przeglądarki:<br /><a href="${safeUrl}" style="color:#2656d9;word-break:break-all;">${safeUrl}</a></p>
        <p style="margin:18px 0 0;font-size:13px;line-height:1.6;color:#8a8d9c;">${validity} Wygaśnie? Na stronie kursu podajesz maila i dostajesz świeży.</p>
      </div>
      <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#8a8d9c;">Coś nie działa? Odpisz na tego maila, ogarniam od ręki.<br />Luki</p>
    </div>
  </body>
</html>`;
}

function renderText(kind: AccessEmailKind, url: string): string {
  const lead =
    kind === "welcome"
      ? "Płatność przeszła. Twój dostęp do kursu Drugi Mózg:"
      : "Twój link do kursu Drugi Mózg:";
  const validity =
    kind === "welcome" ? "Link ważny 3 dni." : "Link ważny 30 minut.";
  return `${lead}\n\n${url}\n\n${validity} Po kliknięciu przeglądarka pamięta cię przez pół roku. Wygaśnie? Na stronie kursu podajesz maila i dostajesz świeży.\n\nCoś nie działa? Odpisz na tego maila.\nLuki`;
}

/**
 * Wysyła mail z magic linkiem. `idempotencyKey` podawaj przy webhooku
 * (order_uuid) — retry EasyCart nie zdubluje maila.
 */
export async function sendAccessEmail(opts: {
  to: string;
  url: string;
  kind: AccessEmailKind;
  idempotencyKey?: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "Luki <kurs@luki.zip>";

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.log(
        `[mail-dev] brak RESEND_API_KEY — mail NIE wysłany.\n` +
          `[mail-dev] to=${opts.to} kind=${opts.kind}\n` +
          `[mail-dev] link: ${opts.url}`,
      );
      return { ok: true, devLogged: true };
    }
    return { ok: false, status: 0, detail: "missing RESEND_API_KEY" };
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  if (opts.idempotencyKey) {
    headers["Idempotency-Key"] = `kurs-${opts.kind}-${opts.idempotencyKey}`;
  }

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify({
      from,
      to: [opts.to],
      subject: SUBJECTS[opts.kind],
      html: renderHtml(opts.kind, opts.url),
      text: renderText(opts.kind, opts.url),
      reply_to: process.env.RESEND_REPLY_TO || undefined,
    }),
    signal: AbortSignal.timeout(10_000),
  }).catch((err: unknown) => {
    return { networkError: String(err) } as const;
  });

  if ("networkError" in res) {
    return { ok: false, status: 0, detail: res.networkError };
  }
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    return { ok: false, status: res.status, detail: detail.slice(0, 300) };
  }
  return { ok: true };
}
