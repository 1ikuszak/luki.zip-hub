import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import {
  BadgeCheck,
  ArrowRight,
  ArrowUpRight,
  Youtube,
  Instagram,
  Linkedin,
  Music2,
} from "lucide-react";

import { CONTACT_FORM_URL } from "@/app/lib/data";
import { Reveal } from "./Reveal";

export const metadata: Metadata = {
  title: "About me — Łukasz Glica (luki.zip)",
  description:
    "Kim jestem i jak działam. Twórca na przecięciu AI i kreatywności. Buduję systemy AI z taste, które pracują jak ich właściciel, i uczę tego.",
  alternates: { canonical: "/about" },
};

const socials = [
  { label: "YouTube", icon: Youtube, href: "https://www.youtube.com/@luki_zip" },
  { label: "Instagram", icon: Instagram, href: "https://instagram.com/luki.zip" },
  { label: "TikTok", icon: Music2, href: "https://www.tiktok.com/@luki.zip" },
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/lukasz-glica-4b3889267/",
  },
];

const primaryCta =
  "group inline-flex items-center gap-3 rounded-full bg-[var(--chartreuse)] pl-6 pr-2.5 h-14 text-[16px] font-semibold text-[var(--text)] transition-transform active:scale-[0.98]";

export default function AboutPage() {
  // PRODUKCJA: about niedokończony → redirect na artykuły.
  // DEV (localhost): renderuje pełną stronę About, żeby Luki mógł ją budować.
  if (process.env.NODE_ENV === "production") {
    redirect("/artykuly");
  }

  return (
    <div className="relative bg-[var(--bg-page)]">
      {/* ── HERO ── kto + foto ── */}
      <section>
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 pt-14 md:pt-24 pb-16 md:pb-20">
          <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-[1.12fr_0.88fr]">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-[var(--text-secondary)]">
                  Łukasz Glica
                </span>
                <BadgeCheck
                  size={18}
                  fill="currentColor"
                  className="text-[var(--accent)]"
                  aria-label="Zweryfikowany"
                />
              </div>

              <h1
                className="mt-5 font-semibold text-[var(--text)] text-balance"
                style={{
                  fontSize: "clamp(40px, 7vw, 72px)",
                  lineHeight: 1.03,
                  letterSpacing: "-0.035em",
                }}
              >
                Buduję marki z taste. W erze AI.
              </h1>

              <p className="mt-6 max-w-[44ch] text-lg md:text-xl leading-relaxed text-[var(--text)]/80">
                Twórca na przecięciu AI i kreatywności. Buduję systemy AI, które
                pracują jak ich właściciel, nie jak wszyscy. I uczę tego innych.
              </p>

              <a
                href={CONTACT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-track="cta_about"
                data-track-id="cta_about_talk_hero"
                data-track-href={CONTACT_FORM_URL}
                className={`${primaryCta} mt-9`}
              >
                Zróbmy coś razem
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--text)] text-[var(--chartreuse)] transition-transform group-hover:translate-x-0.5">
                  <ArrowRight size={18} strokeWidth={2.25} />
                </span>
              </a>
            </div>

            <div className="justify-self-center lg:justify-self-end">
              <div className="relative aspect-square w-[260px] sm:w-[320px] lg:w-[400px] overflow-hidden rounded-[28px] border border-[var(--border)] bg-white">
                <Image
                  src="/links/avatar.jpg"
                  alt="Łukasz Glica"
                  fill
                  sizes="(min-width: 1024px) 400px, 320px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KIM JESTEM ── krótka droga ── */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto w-full max-w-[680px] px-6 sm:px-8 lg:px-10 py-20 md:py-28">
          <Reveal>
            <p
              className="text-[var(--text)] font-semibold text-pretty"
              style={{ fontSize: "clamp(24px, 3.2vw, 32px)", lineHeight: 1.3, letterSpacing: "-0.02em" }}
            >
              Nie wierzę w lepsze AI. Wierzę w AI, które wie, kim jesteś.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8 space-y-5 text-lg md:text-xl leading-relaxed text-[var(--text)]/85 text-pretty">
              <p>
                Zacząłem od designu. Własne studio, obsesja na punkcie tego, żeby
                rzeczy wyglądały dobrze. Potem przyszło AI i wszyscy się na nie
                rzucili. W kilka miesięcy internet zaczął wyglądać tak samo.
              </p>
              <p>
                Zobaczyłem to, czego większość nie widzi: problem nie leży w
                modelu, tylko w tym, że nikt nie wkłada w niego siebie. Więc
                zbudowałem system, który koduje mój taste i pracuje jak ja.
                Najpierw dla siebie, potem dla klientów.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── JAK DZIAŁAM ── proces (specyfika buduje zaufanie) ── */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto w-full max-w-[680px] px-6 sm:px-8 lg:px-10 py-20 md:py-28">
          <Reveal>
            <h2
              className="font-semibold text-[var(--text)]"
              style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              Jak działam.
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <p
              className="my-10 font-semibold text-[var(--text)] text-pretty"
              style={{ fontSize: "clamp(22px, 2.8vw, 30px)", lineHeight: 1.2, letterSpacing: "-0.02em" }}
            >
              Nie potrzebujesz lepszego modelu AI. Potrzebujesz{" "}
              <span className="text-[var(--accent)]">spersonalizowanego</span>.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="space-y-5 text-lg md:text-xl leading-relaxed text-[var(--text)]/85 text-pretty">
              <p>
                Większość firm ma kilka automatyzacji, które nie wiedzą o sobie i
                sypią się w pół roku. Dlatego 95% wdrożeń AI nie zarabia ani
                złotówki. Model nigdy nie był problemem.
              </p>
              <p>
                Zaczynam od mapy: jak naprawdę działa proces, z wyjątkami,
                których nie ma w żadnym dokumencie. Przy każdym kroku decyduję, co
                robi kod, a co AI. Dobre systemy są nudne, jakieś 85% zwykłego
                kodu, 15% AI. To dlatego działają i nie halucynują.
              </p>
              <p>
                Wszystko spina się w jednym miejscu, do którego spływa kontekst:
                procesy, dane, taste. Każda kolejna automatyzacja czyta stąd,
                powstaje szybciej i taniej, a ty zostajesz w pętli tam, gdzie
                potrzebna jest decyzja.
              </p>
              <p className="font-semibold text-[var(--text)]">
                Efekt: AI, które działa jak ty i realnie zarabia. Te 5%, które
                wygrywa.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MANIFEST ── jeden ciemny blok: misja ── */}
      <section className="bg-[#141115] text-white">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 py-24 md:py-32">
          <Reveal>
            <p
              className="font-semibold text-balance"
              style={{
                fontSize: "clamp(30px, 5.2vw, 64px)",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
              }}
            >
              Sprzedaję swój taste zakodowany w system AI.
              <br className="hidden sm:block" /> Uczę ludzi kodować ich własny.
              <br className="hidden sm:block" />{" "}
              <span className="text-[var(--chartreuse)]">
                W świecie kopii idę w siebie.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CLOSE ── wizja + CTA ── */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 py-20 md:py-28">
          <Reveal>
            <p
              className="max-w-[22ch] font-semibold text-[var(--text)] text-balance"
              style={{ fontSize: "clamp(28px, 4.5vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
            >
              Buduję to publicznie. Z Polski, w pojedynkę, bez oddawania duszy
              maszynie.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href={CONTACT_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="cta_about"
                  data-track-id="cta_about_talk_final"
                  data-track-href={CONTACT_FORM_URL}
                  className={primaryCta}
                >
                  Zróbmy coś razem
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--text)] text-[var(--chartreuse)] transition-transform group-hover:translate-x-0.5">
                    <ArrowRight size={18} strokeWidth={2.25} />
                  </span>
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-[var(--accent)] font-semibold hover:underline underline-offset-4"
                >
                  Zobacz, co i jak robię
                  <ArrowUpRight size={18} strokeWidth={2} />
                </Link>
              </div>

              <ul className="flex items-center gap-2">
                {socials.map(({ label, icon: Icon, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--text)]/15 text-[var(--text)] transition-colors hover:bg-[var(--text)] hover:text-white"
                    >
                      <Icon size={18} strokeWidth={1.75} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
