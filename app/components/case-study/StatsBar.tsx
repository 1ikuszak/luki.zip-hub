type Props = {
  czas: string;
  budzet: string;
  efekt: string;
};

const items: Array<{ key: keyof Props; label: string; accent?: boolean }> = [
  { key: "czas", label: "Czas" },
  { key: "budzet", label: "Zakres" },
  { key: "efekt", label: "Efekt", accent: true },
];

export function StatsBar(props: Props) {
  return (
    <section className="container-wide">
      <dl className="grid grid-cols-1 overflow-hidden rounded-xl border border-[var(--border)] bg-white sm:grid-cols-3">
        {items.map((item, idx) => (
          <div
            key={item.key}
            className={
              "px-6 py-7 sm:px-8 sm:py-9 " +
              (idx > 0
                ? "border-t border-[var(--border)] sm:border-l sm:border-t-0"
                : "")
            }
          >
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              {item.label}
            </dt>
            <dd
              className={
                "mt-3 text-[22px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[26px] lg:text-[30px] " +
                (item.accent ? "text-[var(--accent)]" : "text-[var(--text)]")
              }
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {props[item.key]}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
