import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { CONTACT_FORM_URL } from "@/app/lib/data";
import { GradientBackdrop } from "@/app/components/GradientBackdrop";
import { Breadcrumb } from "@/app/components/Breadcrumb";
import { Reveal } from "./Reveal";

export const metadata: Metadata = {
  title: "O mnie — Łukasz Glica (luki.zip)",
  description:
    "Kim jestem i jak tu doszedłem. Twórca na przecięciu AI i kreatywności. Buduję marki z taste i wdrażam do nich AI.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      {/* Brand shader — schowany za białym sheetem, jak na home */}
      <GradientBackdrop />

      <div className="relative z-10 p-2 sm:p-3">
        <div className="mx-auto max-w-[1600px]">
          <main className="overflow-hidden rounded-[20px] border border-white/55 bg-[var(--bg-card)] shadow-[0_50px_140px_-70px_rgba(8,12,40,0.6)] sm:rounded-[28px]">
            {/* ── HERO ── headline + foto ── */}
            <section>
              <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 pt-14 md:pt-20 pb-16 md:pb-20">
                <Breadcrumb items={[{ label: "O mnie" }]} />
                <div className="mt-8 grid items-center gap-10 lg:gap-16 lg:grid-cols-[1.12fr_0.88fr]">
                  <div>
                    <h1
                      className="font-semibold text-[var(--text)] text-balance"
                      style={{
                        fontSize: "clamp(40px, 7vw, 72px)",
                        lineHeight: 1.03,
                        letterSpacing: "-0.035em",
                      }}
                    >
                      Buduję marki z taste i wdrażam do nich AI.
                    </h1>

                    <p className="mt-6 max-w-[42ch] text-lg md:text-xl leading-relaxed text-[var(--text)]/75">
                      Jestem twórcą na przecięciu AI i kreatywności.
                    </p>
                  </div>

                  <div className="justify-self-center lg:justify-self-end">
                    <div className="relative aspect-[3/4] w-[260px] sm:w-[300px] lg:w-[360px] overflow-hidden rounded-[24px] border border-[var(--border)] bg-white">
                      <Image
                        src="/links/avatar-v6.jpg"
                        alt="Łukasz Glica"
                        fill
                        sizes="(min-width: 1024px) 360px, 300px"
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── HISTORIA ── mission-driven ── */}
            <section className="border-t border-[var(--border)]">
              <div className="mx-auto w-full max-w-[680px] px-6 sm:px-8 lg:px-10 py-20 md:py-28">
                <Reveal>
                  <p
                    className="text-[var(--text)] font-semibold text-pretty"
                    style={{ fontSize: "clamp(24px, 3.4vw, 36px)", lineHeight: 1.25, letterSpacing: "-0.02em" }}
                  >
                    Moja misja: projektować wymarzone życie z pomocą AI. Automatyzować
                    to, czego nie lubię robić, i odzyskiwać czas na to, co naprawdę
                    kocham. I nauczyć tego innych.
                  </p>
                </Reveal>

                <Reveal delay={0.05}>
                  <div className="mt-8 space-y-5 text-lg md:text-xl leading-relaxed text-[var(--text)]/85 text-pretty">
                    <p>
                      Wierzę, że AI nie zabija zawodów, tylko ludzi bez własnego zdania.
                      Że w świecie, w którym każdy generuje to samo, wygrywają ci z
                      charakterem.
                    </p>
                    <p className="font-semibold text-[var(--text)]">
                      Nie wierzę w lepsze AI. Wierzę w AI, które wie, kim jesteś.
                    </p>
                    <p>
                      Przez 5 lat zacząłem 10 biznesów. 2 lata temu, mając 14 tysięcy na
                      koncie, kupiłem bilet w jedną stronę do Japonii, gdzie zacząłem
                      swoją podróż z AI.
                    </p>
                    <p className="font-semibold text-[var(--text)]">
                      Dziś łączę dwa światy, AI i kreatywny, i uczę innych, jak realnie z
                      tego korzystać.
                    </p>
                  </div>
                </Reveal>
              </div>
            </section>

            {/* ── CLOSE ── kręcąca się gwiazdka + CTA ── */}
            <section className="border-t border-[var(--border)]">
              <div className="mx-auto w-full max-w-[680px] px-6 sm:px-8 lg:px-10 py-20 md:py-28">
                <Reveal>
                  <div className="flex flex-col items-start gap-8">
                    <p
                      className="font-semibold text-[var(--text)] text-balance"
                      style={{ fontSize: "clamp(24px, 3.6vw, 40px)", lineHeight: 1.12, letterSpacing: "-0.025em" }}
                    >
                      Buduję to publicznie. Dokumentuję wszystko na swoich socialach,
                      pewnie stąd tu trafiłeś 💫
                    </p>

                    <a
                      href={CONTACT_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track="cta_about"
                      data-track-id="cta_about_talk_final"
                      data-track-href={CONTACT_FORM_URL}
                      className="group inline-flex h-14 items-center gap-3 rounded-full bg-[var(--text)] pl-7 pr-2.5 text-[16px] font-semibold text-white transition-transform active:scale-[0.98]"
                    >
                      Zróbmy coś razem
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[var(--text)] transition-transform group-hover:translate-x-0.5">
                        <ArrowRight size={18} strokeWidth={2.25} />
                      </span>
                    </a>
                  </div>
                </Reveal>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
