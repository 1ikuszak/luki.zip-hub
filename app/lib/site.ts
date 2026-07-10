/**
 * TYMCZASOWY override domeny produkcyjnej (2026-07-10).
 *
 * luki.zip ma martwy DNS: rekord A celuje w stary VPS (odrzuca polaczenia),
 * a strefa lezy na Squarespace/Netlify, do ktorych chwilowo nie ma dostepu.
 * Dopoki luki.zip nie zostanie przepiete na Vercel, WSZYSTKIE absolutne linki
 * (magic linki w mailach, redirecty, canonical) budujemy na dzialajacej
 * domenie www.lukaszglica.com - nawet jesli env NEXT_PUBLIC_SITE_URL dalej
 * pokazuje luki.zip.
 *
 * PO NAPRAWIE DNS: ustaw NEXT_PUBLIC_SITE_URL=https://luki.zip w Vercelu
 * i usun warunek z "luki.zip" ponizej (albo caly ten plik wroc do czystego env).
 */
const RAW = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");

export const SITE_URL =
  RAW && !RAW.includes("luki.zip") ? RAW : "https://www.lukaszglica.com";
