import { Reveal } from "@/app/components/oferta/Reveal";
import { reviews } from "@/app/lib/data";

/**
 * Social proof 2. Primary: cytaty klientów (autorytet, z data.ts).
 * Secondary: ściana komentarzy widzów z YouTube (dowód taste + zasięgu + poziomu
 * w AI). Cytaty verbatim ze źródła, em-dashe skonwertowane.
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

      {/* Klienci — primary */}
      {reviews.length > 0 && (
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.06}>
              <figure className="flex h-full flex-col justify-between rounded-[20px] border border-[var(--border)] bg-[var(--bg-card)] p-8">
                <blockquote className="text-[18px] leading-relaxed text-[var(--text)]">
                  “{r.content}”
                </blockquote>
                <figcaption className="mt-6 text-[14px] text-[var(--text-secondary)]">
                  <span className="font-semibold text-[var(--text)]">{r.author}</span>
                  {", "}
                  {r.role}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      )}

      {/* Widzowie — ściana komentarzy (YouTube) */}
      <Reveal delay={0.08}>
        <div className="mt-12 border-t border-[var(--border)] pt-10">
          <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]">
            Z komentarzy na YouTube
          </div>
          <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {YT.map((c) => (
              <figure
                key={c.author}
                className="mb-5 break-inside-avoid rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)] p-6"
              >
                <blockquote className="text-[15px] leading-snug text-[var(--text)]">
                  “{c.quote}”
                </blockquote>
                <figcaption className="mt-4 text-[13px] text-[var(--text-secondary)]">
                  {c.author} · YouTube
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
