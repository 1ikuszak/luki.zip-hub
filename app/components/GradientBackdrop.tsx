import { DitherFlow } from "@/app/components/oferta/DitherFlow";

/**
 * Fixed gradientowe tło (liquid dither glass) — tylko viewport, stały koszt.
 * Wspólne dla /oferta i /artykuly. Treść strony idzie z z-10 nad nim.
 */
export function GradientBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <DitherFlow className="h-full w-full" />
    </div>
  );
}
