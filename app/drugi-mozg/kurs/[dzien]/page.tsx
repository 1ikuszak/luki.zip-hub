import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight, Download, FileText } from "lucide-react";
import { getSessionEmail } from "@/app/lib/session";
import { VideoEmbed, NoAccess } from "@/app/components/drugi-mozg/kurs/CourseUI";
import { LessonToc } from "@/app/components/drugi-mozg/kurs/LessonToc";
import { LessonComplete } from "@/app/components/drugi-mozg/kurs/LessonComplete";
import { KursCopyButtons } from "@/app/components/drugi-mozg/kurs/KursCopyButtons";
import { LessonDownload } from "@/app/components/drugi-mozg/kurs/LessonDownload";
import { getLessons, getLessonBySlug, getLessonZip } from "@/lib/kurs";

// Strona lekcji — bramkowana, nigdy nie indeksowana ani cache'owana publicznie.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lekcja — Drugi Mózg",
  robots: { index: false, follow: false },
};

export default async function LekcjaPage({
  params,
}: {
  params: Promise<{ dzien: string }>;
}) {
  const { dzien } = await params;
  // Dostęp = httpOnly cookie sesji (jak indeks kursu). Zero tokenów w URL.
  const email = await getSessionEmail();

  if (!email) {
    return <NoAccess />;
  }

  const lesson = await getLessonBySlug(dzien);

  // Lekcja nie istnieje — łagodny stan, wraca na indeks z tokenem.
  if (!lesson) {
    return (
      <main className="container-default flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <h1 className="t-h2">Nie ma takiej lekcji</h1>
        <p className="t-body mt-4 text-[var(--text-secondary)]">
          Ten dzień jeszcze nie istnieje. Wróć do listy lekcji.
        </p>
        <Link
          href="/drugi-mozg/kurs"
          className="btn-glossy group mt-8 inline-flex h-[52px] items-center gap-2 rounded-full px-7 text-[16px] font-semibold text-white transition-transform hover:scale-[1.03]"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          Wróć do kursu
        </Link>
      </main>
    );
  }

  const lessons = getLessons();
  const idx = lessons.findIndex((l) => l.slug === lesson.slug);
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx >= 0 && idx < lessons.length - 1 ? lessons[idx + 1] : null;
  const hasFiles = !!lesson.pdfUrl || (lesson.files?.length ?? 0) > 0;
  // Paczka lekcji renderuje sie INLINE w tresci - marker {{POBIERZ_LEKCJE}}
  // w markdownie wskazuje dokladne miejsce (krok pobrania w setupie).
  const lessonZip = getLessonZip(lesson.day);
  const MARKER = /<p>\s*\{\{POBIERZ_LEKCJE\}\}\s*<\/p>/;
  const [htmlBefore, htmlAfter] = MARKER.test(lesson.contentHtml)
    ? lesson.contentHtml.split(MARKER, 2)
    : [lesson.contentHtml, null];

  return (
    <main className="container-wide py-14 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12">
        {/* ── Kolumna treści ── */}
        <div className="min-w-0 max-w-[720px]">
          {/* Breadcrumb */}
          <nav aria-label="Ścieżka" className="flex flex-wrap items-center gap-1.5 t-small">
            <Link
              href="/drugi-mozg/kurs"
              className="text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
            >
              Wszystkie lekcje
            </Link>
            <ChevronRight size={14} strokeWidth={2.5} className="text-[var(--border)]" />
            <span className="font-semibold text-[var(--text)]">
              Dzień {lesson.day}: {lesson.title}
            </span>
          </nav>

          {/* Nagłówek lekcji */}
          <header className="enter mt-6">
            <span className="t-small font-semibold text-[var(--accent)]">
              Dzień {lesson.day}
            </span>
            <h1 className="t-h1 mt-2">{lesson.title}</h1>
            {lesson.description && (
              <p className="t-body-large mt-4 max-w-[58ch] text-[var(--text-secondary)]">
                {lesson.description}
              </p>
            )}
          </header>

          {/* Wideo lekcji */}
          <section className="mt-8 reveal">
            <VideoEmbed url={lesson.videoUrl} title={`Dzień ${lesson.day} - ${lesson.title}`} />
          </section>

          {/* Pliki lekcji */}
          {hasFiles && (
            <div className="mt-5 flex flex-wrap gap-2.5">
              {lesson.pdfUrl && (
                <a
                  href={lesson.pdfUrl}
                  className="inline-flex h-[44px] items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 text-[15px] font-semibold text-[var(--text)] transition-colors hover:border-[var(--text)]"
                >
                  <FileText size={16} strokeWidth={2.5} />
                  PDF do Dnia {lesson.day}
                </a>
              )}
              {lesson.files?.map((file) => (
                <a
                  key={file.url || file.name}
                  href={file.url}
                  className="inline-flex h-[44px] items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 text-[15px] font-semibold text-[var(--text)] transition-colors hover:border-[var(--text)]"
                >
                  <Download size={16} strokeWidth={2.5} />
                  {file.name}
                </a>
              ))}
            </div>
          )}

          {/* Treść lekcji - marker {{POBIERZ_LEKCJE}} dzieli ją na pół,
              w środku ląduje przycisk pobrania paczki tej lekcji */}
          <article className="markdown mt-10">
            <div dangerouslySetInnerHTML={{ __html: htmlBefore }} />
            {htmlAfter !== null && lessonZip && (
              <div className="not-prose my-6">
                <LessonDownload file={lessonZip} />
              </div>
            )}
            {htmlAfter !== null && (
              <div dangerouslySetInnerHTML={{ __html: htmlAfter }} />
            )}
          </article>
          <KursCopyButtons />

          {/* Oznacz jako zaliczone */}
          <LessonComplete slug={lesson.slug} />

          {/* Nawigacja między lekcjami */}
          <nav className="mt-10 grid gap-4 border-t border-[var(--border)] pt-8 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/drugi-mozg/kurs/${prev.slug}`}
                className="group flex flex-col gap-1 rounded-2xl border border-[var(--border)] bg-white p-5 transition-colors hover:border-[var(--accent)]"
              >
                <span className="inline-flex items-center gap-1.5 t-small text-[var(--text-secondary)]">
                  <ArrowLeft size={14} strokeWidth={2.5} />
                  Dzień {prev.day}
                </span>
                <span className="t-body font-semibold text-[var(--text)]">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/drugi-mozg/kurs/${next.slug}`}
                className="group flex flex-col gap-1 rounded-2xl border border-[var(--border)] bg-white p-5 text-right transition-colors hover:border-[var(--accent)] sm:items-end"
              >
                <span className="inline-flex items-center gap-1.5 t-small text-[var(--text-secondary)]">
                  Dzień {next.day}
                  <ArrowRight size={14} strokeWidth={2.5} />
                </span>
                <span className="t-body font-semibold text-[var(--text)]">{next.title}</span>
              </Link>
            ) : (
              <Link
                href="/drugi-mozg/kurs"
                className="group flex flex-col gap-1 rounded-2xl border border-[var(--border)] bg-white p-5 text-right transition-colors hover:border-[var(--accent)] sm:items-end"
              >
                <span className="inline-flex items-center gap-1.5 t-small text-[var(--text-secondary)]">
                  Koniec kursu
                  <ArrowRight size={14} strokeWidth={2.5} />
                </span>
                <span className="t-body font-semibold text-[var(--text)]">Wróć do wszystkich lekcji</span>
              </Link>
            )}
          </nav>
        </div>

        {/* ── Sticky spis sekcji (desktop) ── */}
        <aside className="hidden lg:block">
          <LessonToc items={lesson.toc} />
        </aside>
      </div>
    </main>
  );
}
