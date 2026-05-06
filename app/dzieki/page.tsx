import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Dzięki | luki.zip",
  robots: { index: false, follow: false },
};

export default function DziekiPage() {
  return (
    <main className="container-narrow py-20 sm:py-32 min-h-[70vh] flex items-center">
      <div className="w-full flex flex-col items-center text-center gap-6">
        <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
          <Mail size={28} strokeWidth={2} />
        </div>

        <h1 className="t-h1 max-w-[640px]">
          Jesteś o jeden klik od środka.
        </h1>

        <p className="t-body-large text-[var(--text-secondary)] max-w-[560px]">
          Wysłałem Ci maila z potwierdzeniem. Kliknij link, a od jutra rano
          dostajesz newsletter — bez spamu, tylko to co sam czytam i testuję.
        </p>

        <p className="t-small text-[var(--text-secondary)] max-w-[480px]">
          Nie ma? Sprawdź „Oferty”/spam.
        </p>

        <div className="mt-6">
          <Link
            href="/artykuly"
            className="inline-flex items-center text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent)] underline underline-offset-4 transition-colors"
          >
            ← Wróć do artykułów
          </Link>
        </div>
      </div>
    </main>
  );
}
