import { Suspense } from "react";
import { Reveal } from "@/app/components/oferta/Reveal";
import { EmailCaptureForm } from "@/app/brain/EmailCaptureForm";

/**
 * Secondary CTA (Koe 12): waitlista kursu Drugi Mózg. Łapie maila od tych,
 * co nie są jeszcze na współpracę 1:1. Capture na /api/subscribe.
 */
export function CourseWaitlist() {
  return (
    <section className="container-wide border-b border-[var(--border)] py-16 sm:py-20">
      <Reveal>
        <div className="max-w-[640px]">
          <h2 className="text-[24px] font-semibold leading-tight text-[var(--text)] sm:text-[32px]">
            Jeszcze nie na współpracę 1:1?
          </h2>
          <p className="mt-4 t-body-large text-[var(--text-secondary)]">
            Uczę całego systemu w kursie Drugi Mózg. Zapisz się na listę,
            dostaniesz go pierwszy, w cenie founderskiej.
          </p>

          <div className="mt-8 max-w-[560px]">
            <Suspense fallback={<div className="h-[52px]" aria-hidden />}>
              <EmailCaptureForm ctaId="cta_home_course_waitlist" />
            </Suspense>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
