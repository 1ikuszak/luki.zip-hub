import { ArrowRight } from "lucide-react";

// TODO: podpiąć bramkę EasyCart pod href="#checkout"
type Props = {
  variant?: "primary" | "secondary" | "onAccent";
  label?: string;
  href?: string;
};

export function CtaButton({
  variant = "primary",
  label = "Dostań kurs - 297 zł",
  href = "#checkout",
}: Props) {
  if (variant === "secondary") {
    return (
      <a
        href={href}
        className="inline-flex h-[56px] items-center gap-2 rounded-full border border-[var(--border)] bg-white px-7 text-[16px] font-semibold text-[var(--text)] transition-colors hover:border-[var(--text)]"
      >
        {label}
      </a>
    );
  }

  if (variant === "onAccent") {
    return (
      <a
        href={href}
        className="group inline-flex h-[56px] items-center gap-2 rounded-full bg-white px-8 text-[16px] font-semibold text-[var(--accent)] shadow-[0_20px_50px_-18px_rgba(0,0,0,0.45)] transition-transform hover:scale-[1.03]"
      >
        {label}
        <ArrowRight
          size={18}
          strokeWidth={2.5}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </a>
    );
  }

  return (
    <a
      href={href}
      className="group inline-flex h-[56px] items-center gap-2 rounded-full bg-[var(--accent)] px-8 text-[16px] font-semibold text-white shadow-[0_20px_50px_-18px_rgba(38,86,217,0.6)] transition-transform hover:scale-[1.03]"
    >
      {label}
      <ArrowRight
        size={18}
        strokeWidth={2.5}
        className="transition-transform group-hover:translate-x-0.5"
      />
    </a>
  );
}
