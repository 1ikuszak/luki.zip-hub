import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  LifeBuoy,
  Package,
  Sparkles,
  Terminal,
} from "lucide-react";
import { getSessionEmail } from "@/app/lib/session";
import { VideoEmbed, NoAccess } from "@/app/components/drugi-mozg/kurs/CourseUI";
import { CourseProgress } from "@/app/components/drugi-mozg/kurs/CourseProgress";
import { LessonCheck } from "@/app/components/drugi-mozg/kurs/LessonCheck";
import { Downloads } from "@/app/components/drugi-mozg/kurs/Downloads";
import { getLessons, getDownloads, COURSE, STARTER_PACK } from "@/lib/kurs";

// Strona dostępowa — nigdy nie indeksujemy i nie cache'ujemy publicznie.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kurs Drugi Mózg",
  robots: { index: false, follow: false },
};

export default async function KursPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string }>;
}) {
  // Dostęp trzyma httpOnly cookie (ustawiane przez /api/kurs/dostep po
  // kliknięciu magic linku z maila). Zero tokenów w URL-ach.
  const email = await getSessionEmail();

  if (!email) {
    const { e } = await searchParams;
    return <NoAccess reason={e} />;
  }

  const lessons = getLessons();
  const downloads = getDownloads();

  return (
    <main className="container-default py-14 sm:py-20">
      {/* ── Nagłówek dostępu ── */}
      <header className="enter">
        <p className="t-small font-semibold uppercase tracking-uppercase text-[var(--accent)]">
          Twój dostęp
        </p>
        <h1 className="t-h1 mt-3">Drugi Mózg</h1>
        <p className="t-body-large mt-4 max-w-[52ch] text-[var(--text-secondary)]">
          5 lekcji, dożywotni dostęp, wracasz kiedy chcesz.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 t-small text-[var(--text-secondary)]">
          <span>Odblokowane dla {email}</span>
          <span aria-hidden className="text-[var(--border)]">·</span>
          <span>{lessons.length} lekcji</span>
          <span aria-hidden className="text-[var(--border)]">·</span>
          <span>~1 wieczór na setup</span>
        </div>
      </header>

      {/* ── Pasek postępu ── */}
      <div className="mt-8">
        <CourseProgress slugs={lessons.map((l) => l.slug)} />
      </div>

      {/* ── Orientacja na start ── */}
      <div className="enter mt-8 space-y-3 rounded-2xl border border-[var(--border)] bg-white p-5 sm:p-6">
        {/* BETA: usuń tę linię przy oficjalnym launchu (materiały będą komplet) */}
        <div className="flex gap-3">
          <Sparkles size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-[var(--accent)]" />
          <p className="t-small text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text)]">Wchodzisz jako jeden z pierwszych.</span>{" "}
            Lekcje lądują tu w tym tygodniu. Wracasz tym samym linkiem, nic ci nie ucieknie.
          </p>
        </div>
        <div className="flex gap-3 border-t border-[var(--border)] pt-3">
          <Terminal size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-[var(--accent)]" />
          <p className="t-small text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text)]">Czego potrzebujesz:</span>{" "}
            Claude Code i konto Anthropic. Resztę - prompty i szkielet systemu - masz w pakiecie startowym.
          </p>
        </div>
      </div>

      {/* ── Film powitalny ── */}
      <section className="mt-12 reveal">
        <VideoEmbed url={COURSE.introVideoUrl} title="Start - Drugi Mózg" />
      </section>

      {/* ── Lekcje (karty → strony lekcji) ── */}
      <section className="mt-12 space-y-3">
        {lessons.map((lesson) => (
          <Link
            key={lesson.slug}
            href={`/drugi-mozg/kurs/${lesson.slug}`}
            className="group block rounded-2xl border border-[var(--border)] bg-white p-5 transition-all hover:border-[var(--accent)] hover:shadow-[0_30px_80px_-50px_rgba(8,12,40,0.5)] sm:p-6 reveal"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--bg-page)] text-[16px] font-semibold text-[var(--accent)]">
                {lesson.day}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <LessonCheck slug={lesson.slug} />
                  <span className="t-small font-semibold text-[var(--accent)]">
                    Dzień {lesson.day}
                  </span>
                </div>
                <h2 className="t-h3 mt-1">{lesson.title}</h2>
                <p className="t-small mt-2 text-[var(--text-secondary)]">
                  {lesson.description}
                </p>
              </div>
              <ArrowRight
                size={20}
                strokeWidth={2}
                className="mt-2 shrink-0 text-[var(--text-secondary)] transition-all group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
              />
            </div>
          </Link>
        ))}
      </section>

      {/* ── Pakiet startowy ── */}
      <section
        id="pakiet"
        className="mt-12 scroll-mt-24 rounded-3xl border border-[var(--border)] bg-white p-7 shadow-[0_40px_120px_-70px_rgba(8,12,40,0.4)] sm:p-10 reveal"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--bg-page)] text-[var(--accent)]">
            <Package size={20} strokeWidth={2} />
          </div>
          <h2 className="t-h3">{STARTER_PACK.title}</h2>
        </div>
        <p className="t-body mt-4 max-w-[58ch] text-[var(--text-secondary)]">
          {STARTER_PACK.description}
        </p>

        <div className="mt-7">
          {downloads ? (
            <Downloads zip={downloads.zip} files={downloads.files} />
          ) : (
            <span className="inline-flex h-[52px] items-center gap-2 rounded-full border border-dashed border-[var(--border)] px-7 text-[15px] font-semibold text-[var(--text-secondary)]">
              <Package size={17} strokeWidth={2} />
              Pakiet do pobrania wkrótce
            </span>
          )}
        </div>
      </section>

      {/* ── Stopka: zapisz link + wsparcie ── */}
      <footer className="mt-14 grid gap-4 sm:grid-cols-2">
        <div className="flex gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-page)] p-5">
          <Bookmark size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-[var(--accent)]" />
          <p className="t-small text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text)]">Zapisz ten link.</span>{" "}
            Wracasz nim, kiedy chcesz - to twój dożywotni dostęp. Dodaj do
            zakładek albo zostaw maila w skrzynce.
          </p>
        </div>
        <div className="flex gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-page)] p-5">
          <LifeBuoy size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-[var(--accent)]" />
          <p className="t-small text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text)]">Coś nie działa?</span>{" "}
            Napisz do mnie i ogarniam od ręki. Żaden problem z dostępem nie
            zostaje z tobą sam.
          </p>
        </div>
      </footer>
    </main>
  );
}
