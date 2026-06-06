import { ArrowRight } from "lucide-react";
import { CONTACT_FORM_URL } from "@/app/lib/data";
import { Reveal } from "@/app/components/oferta/Reveal";

/**
 * Zamykający blok "Chcesz więcej?" — biały tekst na gradiencie, gwiazdka ASCII
 * i secondary button "Pogadajmy" (→ Notion Form). Wspólny dla /oferta i
 * /artykuly. Renderować na tle GradientBackdrop (z-10).
 */
export function MoreCTA() {
  return (
    <Reveal className="mx-auto mt-10 w-full max-w-[1400px] sm:mt-16">
      <section className="flex flex-col items-center gap-3 px-6 py-16 text-center sm:px-10">
        <pre
          aria-hidden="true"
          className="mb-1 select-none text-white/90"
          style={{
            margin: 0,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "13px",
            lineHeight: "1.1",
            letterSpacing: "1px",
            textAlign: "center",
            textShadow: "0 1px 16px rgba(5,8,30,0.4)",
            whiteSpace: "pre",
          }}
        >{" \\ | / \n-- * --\n / | \\ "}</pre>

        <h2
          className="text-[18px] font-semibold tracking-[-0.01em] text-white sm:text-[20px]"
          style={{ textShadow: "0 1px 20px rgba(5,8,30,0.4)" }}
        >
          Chcesz więcej?
        </h2>

        <p
          className="t-body max-w-[54ch] text-white/80"
          style={{ textShadow: "0 1px 16px rgba(5,8,30,0.35)" }}
        >
          Z wybranymi markami i founderami pracuję na stałe, jako ich miesięczny
          creative director. Prowadzę markę i content end to end.
        </p>

        <a
          href={CONTACT_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-track="cta_contact"
          data-track-id="cta_lets_talk"
          data-track-href={CONTACT_FORM_URL}
          className="group mt-3 inline-flex h-[52px] items-center gap-2 rounded-full border border-white/40 px-7 text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-[var(--accent)]"
        >
          Pogadajmy
          <ArrowRight
            size={17}
            strokeWidth={2.5}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </a>
      </section>
    </Reveal>
  );
}
