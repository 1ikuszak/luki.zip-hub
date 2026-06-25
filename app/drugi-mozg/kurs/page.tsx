import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, Lock } from "lucide-react";
import { verifyAccessToken } from "@/app/lib/easycart";
import { LESSONS, BONUS, COURSE_INTRO_VIDEO } from "./lessons";

// Strona dostępowa — nigdy nie indeksujemy i nie cache'ujemy publicznie.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kurs Drugi Mózg",
  robots: { index: false, follow: false },
};

function VideoEmbed({ url, title }: { url: string; title: string }) {
  if (!url) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--bg-page)] text-center">
        <span className="t-small text-[var(--text-secondary)]">
          Materiał wideo pojawi się tutaj.
        </span>
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

function NoAccess() {
  return (
    <main className="container-narrow flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bg-page)] text-[var(--text-secondary)]">
        <Lock size={22} strokeWidth={2} />
      </div>
      <h1 className="t-h2 mt-6">Ten link nie otwiera kursu</h1>
      <p className="t-body mt-4 max-w-[42ch] text-[var(--text-secondary)]">
        Link dostępowy jest nieprawidłowy. Otwórz kurs z maila, którego dostałeś
        po zakupie. Jeśli mail nie przyszedł, sprawdź spam albo napisz do mnie i
        ogarniam to od ręki.
      </p>
      <Link
        href="/drugi-mozg"
        className="group mt-8 inline-flex h-[56px] items-center gap-2 rounded-full bg-[var(--accent)] px-8 text-[16px] font-semibold text-white shadow-[0_20px_50px_-18px_rgba(38,86,217,0.6)] transition-transform hover:scale-[1.03]"
      >
        Wróć na stronę kursu
        <ArrowRight size={18} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </main>
  );
}

export default async function KursPage({
  searchParams,
}: {
  searchParams: Promise<{ k?: string }>;
}) {
  const { k } = await searchParams;
  const email = verifyAccessToken(k, process.env.COURSE_ACCESS_SECRET);

  if (!email) {
    return <NoAccess />;
  }

  return (
    <main className="container-default py-16 sm:py-24">
      <header className="mb-10">
        <p className="t-small font-semibold uppercase tracking-uppercase text-[var(--accent)]">
          Twój dostęp
        </p>
        <h1 className="t-h1 mt-3">Drugi Mózg</h1>
        <p className="t-body-large mt-4 text-[var(--text-secondary)]">
          Wszystko jest tutaj. 5 dni, każdy działa sam. Dożywotni dostęp, wracasz
          kiedy chcesz.
        </p>
      </header>

      {/* Film powitalny na górze */}
      <section className="mb-14">
        <VideoEmbed url={COURSE_INTRO_VIDEO} title="Start — Drugi Mózg" />
      </section>

      {/* Lekcje */}
      <section className="space-y-14">
        {LESSONS.map((lesson) => (
          <article key={lesson.day}>
            <div className="mb-4 flex items-baseline gap-3">
              <span className="t-small font-semibold text-[var(--accent)]">
                Dzień {lesson.day}
              </span>
            </div>
            <h2 className="t-h3">{lesson.title}</h2>
            <p className="t-body mt-2 text-[var(--text-secondary)]">
              {lesson.description}
            </p>
            <div className="mt-5">
              <VideoEmbed url={lesson.videoUrl} title={`Dzień ${lesson.day} — ${lesson.title}`} />
            </div>
            {lesson.pdfUrl ? (
              <a
                href={lesson.pdfUrl}
                className="mt-4 inline-flex h-[44px] items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 text-[15px] font-semibold text-[var(--text)] transition-colors hover:border-[var(--text)]"
              >
                <Download size={16} strokeWidth={2.5} />
                PDF do Dnia {lesson.day}
              </a>
            ) : null}
          </article>
        ))}
      </section>

      {/* Bonus */}
      <section className="mt-16 rounded-3xl border border-[var(--border)] bg-[var(--bg-page)] p-8 sm:p-10">
        <h2 className="t-h3">{BONUS.title}</h2>
        <p className="t-body mt-2 text-[var(--text-secondary)]">
          {BONUS.description}
        </p>
        {BONUS.url ? (
          <a
            href={BONUS.url}
            className="group mt-5 inline-flex h-[52px] items-center gap-2 rounded-full bg-[var(--accent)] px-7 text-[16px] font-semibold text-white shadow-[0_20px_50px_-18px_rgba(38,86,217,0.6)] transition-transform hover:scale-[1.03]"
          >
            Pobierz pakiet startowy
            <ArrowRight size={18} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        ) : null}
      </section>

      <footer className="mt-16 border-t border-[var(--border)] pt-6">
        <p className="t-small text-[var(--text-secondary)]">
          Zaloguj się tym samym linkiem, kiedy chcesz wrócić. Zapisz go sobie.
          Coś nie działa? Napisz, ogarniam.
        </p>
      </footer>
    </main>
  );
}
