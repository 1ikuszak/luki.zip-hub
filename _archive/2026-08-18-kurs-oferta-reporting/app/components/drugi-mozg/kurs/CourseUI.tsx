import Link from "next/link";
import { Film, Lock } from "lucide-react";
import { AccessForm } from "@/app/components/drugi-mozg/kurs/AccessForm";

/* ── Osadzenie wideo + stan "wkrótce" ─────────────────────────── */
export function VideoEmbed({ url, title }: { url: string; title: string }) {
  if (!url) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--border)] bg-[linear-gradient(180deg,#eeecf9_0%,#f6f5fc_100%)] text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[var(--accent)] shadow-[0_10px_30px_-12px_rgba(38,86,217,0.5)]">
          <Film size={20} strokeWidth={2} />
        </div>
        <div>
          <p className="t-small font-semibold text-[var(--text)]">Materiał wkrótce</p>
          <p className="t-small mt-1 text-[var(--text-secondary)]">
            Nagrywam. Ląduje tu w tym tygodniu.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-black">
      <iframe
        src={url}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

/* ── Stan bez dostępu ─────────────────────────────────────────── */
/**
 * Brak ważnej sesji. Dwa warianty copy (reason):
 *  - "wygasly" — kliknięty magic link po terminie,
 *  - domyślny — wejście bez sesji (nowe urządzenie, wyczyszczone cookies).
 * W obu ratunek jest ten sam: formularz → świeży link na maila kupującego.
 */
export function NoAccess({ reason }: { reason?: string }) {
  const expired = reason === "wygasly";
  return (
    <main className="container-narrow flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[var(--text-secondary)] shadow-[0_20px_50px_-24px_rgba(8,12,40,0.4)]">
        <Lock size={22} strokeWidth={2} />
      </div>
      <h1 className="t-h2 mt-6">
        {expired ? "Ten link już wygasł" : "Tu trzeba się wpuścić"}
      </h1>
      <p className="t-body mt-4 max-w-[46ch] text-[var(--text-secondary)]">
        {expired
          ? "Linki z maila działają krótko - tak pilnuję, żeby kurs otwierał się tylko tobie. Podaj maila z zakupu, wysyłam świeży."
          : "Kupiłeś kurs? Podaj maila, którym płaciłeś - wysyłam link, który otwiera wszystko na tym urządzeniu."}
      </p>
      <div className="mt-8 w-full">
        <AccessForm />
      </div>
      <p className="t-small mt-6 max-w-[46ch] text-[var(--text-secondary)]">
        Jeszcze nie masz kursu?{" "}
        <Link href="/drugi-mozg" className="font-semibold text-[var(--accent)] hover:underline">
          Zobacz, co dostajesz
        </Link>
        . Problem z dostępem? Napisz do mnie, ogarniam od ręki.
      </p>
    </main>
  );
}
