import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Reveal } from "@/app/components/oferta/Reveal";
import { Counter } from "@/app/components/oferta/Counter";
import { reviews } from "@/app/lib/data";

/**
 * Social proof 2.
 * Eskalacja dowodu: liczby zasięgu (count-up) → cytaty klientów (autorytet) →
 * ściana komentarzy widzów z YouTube (crowd love).
 * - Statystyki: TYLKO realne dane (zasięg społeczności).
 * - Klienci: karty z monogramem, każdy awatar w innym premium gradiencie.
 * - Widzowie: autentyczne wiersze komentarzy YouTube (gradientowy awatar-litera,
 *   @handle, treść, rząd akcji) w 3 kolumnach przewijających się w pionie
 *   (różne prędkości i kierunki, pauza na hover). Mobile/reduced-motion: statycznie.
 *
 * Świadomie BEZ liczby polubień / czasu / serduszka autora — to byłyby
 * zmyślone dane. Struktura sama czyta się jak YouTube.
 */
const YT: { quote: string; author: string }[] = [
  {
    quote: "Jeden z moich ulubionych kanałów na YT. A na pewno najlepszy pod kątem edycji.",
    author: "@asikzoo4668",
  },
  {
    quote: "Jak pytałeś o AI, nie spodziewałem się takiego poziomu. Myślałem, że ja jestem z tematem do przodu.",
    author: "@Romek-d3e1p",
  },
  {
    quote: "Jeżeli kiedykolwiek postanowię wynieść się i zacząć wszystko od nowa, to będzie to dzięki Tobie.",
    author: "@Krixuu",
  },
  {
    quote: "Porąbane, że robisz tak jakościowe materiały mając tak mało czasu.",
    author: "@i.120ms",
  },
  {
    quote: "Nie jestem fanką oglądania filmików w ogóle, ale to co tworzysz jest tak inne i inspirujące, że oglądam z najwyższą przyjemnością.",
    author: "@nataliamikulska8561",
  },
  {
    quote: "Jak na pierwsze vlogi wyszło zajebiście. Lepsze są od wielu dużych ytberów.",
    author: "@Konrado192",
  },
  {
    quote: "Mega spodobała mi się ta wrzutka od biznesowej strony. Oby tak dalej.",
    author: "@Jakub-lifestyle",
  },
  {
    quote: "Super flow, czuć że to wszystko jest naturalne.",
    author: "@yeahyoo12",
  },
  {
    quote: "Wyglądasz jakbyś kręcił filmy już przynajmniej parę lat i masz zajebiste flow.",
    author: "@l890l2",
  },
];

/* Unikalny gradient awatara widza z globalnego indeksu — pełna tęcza,
 * każdy komentarz inny żywy kolor (chrome YouTube, nie akcent strony). */
function viewerAvatar(index: number, total: number): string {
  const hue = Math.round((360 / total) * index);
  return `linear-gradient(140deg, hsl(${hue} 78% 56%), hsl(${(hue + 42) % 360} 74% 44%))`;
}

/* Gradient awatara klienta — wąski premium zakres (niebieski → indygo →
 * fiolet → róż): spójny, ale każdy inny. Odróżnia klientów od widzów. */
function clientAvatar(index: number, total: number): string {
  const span = total > 1 ? 132 / (total - 1) : 0;
  const hue = 212 + Math.round(span * index);
  return `linear-gradient(140deg, hsl(${hue} 62% 55%), hsl(${hue + 22} 58% 43%))`;
}

function initial(name: string): string {
  const clean = name.replace(/^@/, "");
  return (clean[0] || "?").toUpperCase();
}

type Comment = { quote: string; author: string; index: number };

/* Dystrybucja do 3 kolumn (col-major), z zachowaniem globalnego indeksu. */
const COLUMNS: Comment[][] = [[], [], []];
YT.forEach((c, i) => COLUMNS[i % 3].push({ ...c, index: i }));

const TRACK_VARIANT = [
  "comment-track",
  "comment-track comment-track--down comment-track--mid",
  "comment-track comment-track--slow",
];

const numberClass =
  "block text-[52px] font-semibold leading-none tracking-tight text-[var(--text)] sm:text-[64px]";

function CommentRow({ c }: { c: Comment }) {
  return (
    <div className="group mb-7 flex items-start gap-3">
      <span
        aria-hidden
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[15px] font-semibold text-white shadow-sm ring-1 ring-black/5"
        style={{ background: viewerAvatar(c.index, YT.length) }}
      >
        {initial(c.author)}
      </span>
      <div className="min-w-0">
        <div className="text-[13px] font-semibold text-[var(--text)]">
          {c.author}
        </div>
        <p className="mt-1 text-[14px] leading-snug text-[var(--text)]">
          {c.quote}
        </p>
        <div className="mt-2.5 flex items-center gap-4 text-[var(--text-secondary)]">
          <ThumbsUp
            size={15}
            strokeWidth={1.75}
            className="transition-colors duration-200 group-hover:text-[var(--accent)]"
          />
          <ThumbsDown size={15} strokeWidth={1.75} />
          <span className="text-[12px] font-medium">Odpowiedz</span>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="container-wide border-t border-[var(--border)] py-20 sm:py-28">
      <Reveal>
        <h2
          className="font-semibold text-[var(--text)]"
          style={{
            fontSize: "clamp(2rem, 4.2vw, 3.2rem)",
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
          }}
        >
          Co mówią ludzie.
        </h2>
      </Reveal>

      {/* Społeczność — liczniki zasięgu count-up (tylko realne dane) */}
      <Reveal delay={0.05}>
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0">
          <div>
            <Counter to={8} suffix="K" className={numberClass} />
            <span className="mt-3 block text-[15px] text-[var(--text-secondary)]">
              obserwujących na YouTube
            </span>
          </div>
          <div className="sm:border-l sm:border-[var(--border)] sm:pl-8">
            <Counter to={7} suffix="K" className={numberClass} />
            <span className="mt-3 block text-[15px] text-[var(--text-secondary)]">
              obserwujących na Instagramie
            </span>
          </div>
          <div className="sm:border-l sm:border-[var(--border)] sm:pl-8">
            <Counter to={20} suffix="K+" className={numberClass} />
            <span className="mt-3 block text-[15px] text-[var(--text-secondary)]">
              zgromadzonej społeczności łącznie
            </span>
          </div>
        </div>
      </Reveal>

      {/* Klienci — karty z monogramem (każdy awatar inny) */}
      {reviews.length > 0 && (
        <div className="mt-14 grid gap-4 border-t border-[var(--border)] pt-12 md:grid-cols-2">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.06}>
              <figure className="group flex h-full flex-col justify-between rounded-[20px] border border-[var(--border)] bg-[var(--bg-card)] p-7">
                <blockquote className="text-[17px] leading-relaxed text-[var(--text)]">
                  “{r.content}”
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[15px] font-semibold text-white shadow-sm ring-1 ring-black/5"
                    style={{ background: clientAvatar(i, reviews.length) }}
                  >
                    {initial(r.author)}
                  </span>
                  <span className="text-[14px] leading-tight">
                    <span className="block font-semibold text-[var(--text)]">
                      {r.author}
                    </span>
                    <span className="block text-[var(--text-secondary)]">
                      {r.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      )}

      {/* Widzowie — przewijająca się ściana komentarzy YouTube (bez nagłówka) */}
      <Reveal delay={0.08}>
        <div className="mt-14 grid grid-cols-1 gap-x-8 border-t border-[var(--border)] pt-12 sm:grid-cols-3">
          {COLUMNS.map((col, ci) => (
            <div key={ci} className="comment-col">
              <div className={TRACK_VARIANT[ci]}>
                {col.map((c) => (
                  <CommentRow key={c.author} c={c} />
                ))}
                {/* Duplikat zestawu dla bezszwowej pętli (ukryty statycznie) */}
                <div className="comment-dup" aria-hidden>
                  {col.map((c) => (
                    <CommentRow key={`dup-${c.author}`} c={c} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
