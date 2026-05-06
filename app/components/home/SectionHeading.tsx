type Align = "left" | "center";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: Align;
}) {
  const alignClass =
    align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-[640px] ${alignClass}`}>
      {eyebrow && (
        <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[var(--accent)]">
          {eyebrow}
        </div>
      )}
      <h2 className="t-h2 mt-3">{title}</h2>
      {subtitle && (
        <p className="t-body mt-4 text-[var(--text-secondary)]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
