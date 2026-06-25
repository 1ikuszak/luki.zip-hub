import { Suspense } from "react";
import { Reveal } from "@/app/components/oferta/Reveal";
import { EmailCaptureForm } from "@/app/brain/EmailCaptureForm";

/**
 * Closer na samym dole: newsletter. Poradniki na maila, jeden insight tygodniowo
 * o budowaniu marki w erze AI. Reuzywa EmailCaptureForm (-> /api/subscribe).
 */
export function Newsletter() {
  return (
    <section className="container-wide py-16 sm:py-20">
      <Reveal>
        <div className="max-w-[640px]">
          <h2 className="text-[24px] font-semibold leading-tight text-[var(--text)] sm:text-[32px]">
            Poradniki prosto na maila.
          </h2>
          <p className="mt-4 t-body-large text-[var(--text-secondary)]">
            Co tydzień jeden konkretny insight o budowaniu marki w erze AI.
            Krótko, bez spamu.
          </p>

          <div className="mt-8 max-w-[560px]">
            <Suspense fallback={<div className="h-[52px]" aria-hidden />}>
              <EmailCaptureForm ctaId="cta_home_newsletter" />
            </Suspense>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
