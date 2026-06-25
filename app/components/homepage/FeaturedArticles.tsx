import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/app/components/oferta/Reveal";

/**
 * Poradniki. 4 karty: 2 typograficzne okladki (liczby) + 2 foto-okladki kolazowe
 * (Editorial = split 2, Brand Identity = grid 4). Mix = bento background diversity.
 */
type Article = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  imgs?: string[]; // 2 = split L/R, 4 = grid 2x2
  fit?: "cover" | "contain";
  cover?: { bg: string; num: string; numClass: string; caption: string };
};

const ARTICLES: Article[] = [
  {
    slug: "poradnik-dlaczego-wdrozenia-ai-nie-zarabiaja",
    title: "Dlaczego 95% wdrożeń AI nie zarabia ani złotówki",
    date: "16 czerwca 2026",
    tag: "AI · Biznes",
    cover: {
      bg: "bg-[var(--text)]",
      num: "95%",
      numClass: "text-[var(--chartreuse)]",
      caption: "wdrożeń AI nie zarabia. Bądź w tych 5%.",
    },
  },
  {
    slug: "poradnik-meta-ai-dla-biznesu-10-promptow-ktore-dzialaja-w-maju-2026",
    title: "Meta AI dla biznesu: 10 promptów, które działają",
    date: "19 maja 2026",
    tag: "AI · Prompty",
    cover: {
      bg: "bg-[var(--accent)]",
      num: "10",
      numClass: "text-white",
      caption: "promptów paste-ready do biznesu.",
    },
  },
  {
    slug: "poradnik-editorial-ai-campaign-w-popoludnie",
    title: "Editorial AI campaign w popołudnie",
    date: "8 maja 2026",
    tag: "Creative AI",
    imgs: [
      "/posts/poradnik-editorial-ai-campaign/01-elevator.webp",
      "/posts/poradnik-editorial-ai-campaign/05-marble-lobby.webp",
    ],
  },
  {
    slug: "poradnik-brand-identity",
    title: "Brand Identity w 30 minut, z moodboardu do 18-panelowego sheeta",
    date: "4 maja 2026",
    tag: "Brand Design",
    imgs: [
      "/posts/poradnik-brand-identity/05-portrait-photo.webp",
      "/posts/poradnik-brand-identity/03-pano-icons.webp",
      "/posts/poradnik-brand-identity/04-detail-photo.webp",
      "/posts/poradnik-brand-identity/06-logo-close.webp",
    ],
  },
];

function Cover({ a }: { a: Article }) {
  if (a.cover) {
    return (
      <div className={`flex h-full w-full flex-col justify-between p-7 ${a.cover.bg}`}>
        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/55">
          {a.tag}
        </span>
        <div>
          <div
            className={`font-semibold tracking-tight ${a.cover.numClass}`}
            style={{ fontSize: "clamp(56px, 9vw, 96px)", lineHeight: 0.9 }}
          >
            {a.cover.num}
          </div>
          <p className="mt-2 max-w-[28ch] text-[15px] text-white/75">
            {a.cover.caption}
          </p>
        </div>
      </div>
    );
  }

  const imgs = a.imgs ?? [];
  const gridClass =
    imgs.length === 2
      ? "grid h-full w-full grid-cols-2"
      : "grid h-full w-full grid-cols-2 grid-rows-2";

  return (
    <div className={gridClass}>
      {imgs.map((src, i) => (
        <div key={src} className="relative h-full w-full overflow-hidden">
          <Image
            src={src}
            alt={`${a.title} — ${i + 1}`}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
        </div>
      ))}
    </div>
  );
}

export function FeaturedArticles() {
  return (
    <section className="container-wide border-t border-[var(--border)] py-20 sm:py-28">
      <Reveal>
        <h2
          className="font-semibold text-[var(--text)]"
          style={{ fontSize: "clamp(2rem, 4.2vw, 3.2rem)", lineHeight: 1.04, letterSpacing: "-0.03em" }}
        >
          Poradniki.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {ARTICLES.map((a, i) => (
          <Reveal key={a.slug} delay={(i % 2) * 0.06}>
            <Link
              href={`/artykuly/${a.slug}`}
              data-track="article_card"
              data-track-id={`article_${a.slug}`}
              data-track-href={`/artykuly/${a.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] border border-[var(--border)]">
                <Cover a={a} />
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2 text-[12px] text-[var(--text-secondary)]">
                  <span className="font-semibold uppercase tracking-[0.1em] text-[var(--accent)]">
                    {a.tag}
                  </span>
                  <span>·</span>
                  <span>{a.date}</span>
                </div>
                <h3 className="mt-2 text-[18px] sm:text-[20px] font-semibold leading-snug text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
                  {a.title}
                </h3>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.05}>
        <div className="mt-12">
          <Link
            href="/artykuly"
            data-track="cta_home"
            data-track-id="cta_home_articles_all"
            data-track-href="/artykuly"
            className="group inline-flex h-[52px] items-center gap-2 rounded-full border border-[var(--border)] bg-white px-7 text-[15px] font-semibold text-[var(--text)] transition-colors hover:border-[var(--text)]"
          >
            Zobacz wszystkie poradniki
            <ArrowRight
              size={17}
              strokeWidth={2.5}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
