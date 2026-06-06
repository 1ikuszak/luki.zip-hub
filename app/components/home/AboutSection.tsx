import Link from "next/link";
import { Instagram, Youtube, Linkedin } from "lucide-react";

const SOCIALS = [
  { label: "Instagram", icon: Instagram, href: "https://instagram.com/luki.zip" },
  { label: "YouTube",   icon: Youtube,   href: "https://www.youtube.com/@luki_zip" },
  { label: "LinkedIn",  icon: Linkedin,  href: "https://www.linkedin.com/in/lukaszglica" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="border-t border-[var(--border)] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 py-20 md:py-28">
        <div className="flex flex-col items-center text-center">
          {/* TODO: podmień na <Image src="/about/lukasz.jpg" /> */}
          <div
            className="w-64 sm:w-80 aspect-[4/5] rounded-lg overflow-hidden flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 60%, var(--chartreuse) 100%)",
            }}
            aria-label="Łukasz Glica"
          >
            <span className="text-white font-semibold text-7xl sm:text-[96px] tracking-wider">
              LZ
            </span>
          </div>

          <h2
            className="mt-10 md:mt-14 font-semibold text-[var(--text)] max-w-3xl text-balance"
            style={{
              fontSize: "clamp(28px, 4.5vw, 48px)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            Cześć, jestem Łukasz. Robię design i video odkąd miałem 15 lat.
          </h2>

          <p className="mt-6 md:mt-8 max-w-2xl text-lg md:text-xl text-[var(--text)] text-pretty leading-relaxed">
            Buduję cool brandy w dobie AI dla founderów AI tech startupów,
            brandów e-commerce i twórców. Codziennie testuję na sobie co działa
            w content i brand buildingu.
          </p>

          <div className="mt-14 md:mt-16 flex flex-col items-center gap-5">
            <div className="text-xs uppercase tracking-uppercase font-semibold text-[var(--text-secondary)]">
              Zobacz mój content
            </div>
            <ul className="flex items-center gap-6 md:gap-8">
              {SOCIALS.map(({ label, icon: Icon, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[var(--border)] bg-[var(--bg-card)] flex items-center justify-center text-[var(--text)]"
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
