import { Suspense } from "react";
import { Reveal } from "@/app/components/oferta/Reveal";
import { EmailCaptureForm } from "@/app/brain/EmailCaptureForm";

/**
 * Closer na samym dole: newsletter = lead magnet (mini Drugi Mozg).
 * Reuzywa EmailCaptureForm (-> /api/subscribe). Po zapisie: toast + bridge
 * do poradnikow (wartosc w miedzyczasie, bo lead magnet jeszcze w robocie).
 */
const BRIDGE_LINKS = [
  {
    title: "Dlaczego 95% wdrożeń AI nie zarabia ani złotówki",
    href: "/artykuly/poradnik-dlaczego-wdrozenia-ai-nie-zarabiaja",
  },
  {
    title: "Meta AI dla biznesu: 10 promptów, które działają",
    href: "/artykuly/poradnik-meta-ai-dla-biznesu-10-promptow-ktore-dzialaja-w-maju-2026",
  },
  {
    title: "Brand Identity w 30 minut",
    href: "/artykuly/poradnik-brand-identity",
  },
];

export function Newsletter() {
  return (
    <section id="newsletter" className="container-wide scroll-mt-24 py-16 sm:py-20">
      <Reveal>
        <div className="max-w-[640px]">
          <h2 className="text-[24px] font-semibold leading-tight text-[var(--text)] sm:text-[32px]">
            Zgarnij mój drugi mózg. Za darmo.
          </h2>
          <p className="mt-4 t-body-large text-[var(--text-secondary)]">
            System AI, który myśli jak ty. Plus co tydzień jeden konkret o
            budowaniu marki w erze AI. Krótko, bez spamu.
          </p>

          <div className="mt-8 max-w-[560px]">
            <Suspense fallback={<div className="h-[52px]" aria-hidden />}>
              <EmailCaptureForm ctaId="cta_home_newsletter" bridgeLinks={BRIDGE_LINKS} />
            </Suspense>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
