type Props = {
  czas: string;
  budzet: string;
  efekt: string;
};

const items: Array<{ key: keyof Props; label: string; accent?: boolean }> = [
  { key: "czas", label: "Czas" },
  { key: "budzet", label: "Budżet" },
  { key: "efekt", label: "Efekt", accent: true },
];

export function StatsBar(props: Props) {
  return (
    <section className="container-wide mt-2 sm:mt-4">
      <dl className="grid grid-cols-1 sm:grid-cols-3 rounded-xl border border-[var(--border)] bg-white overflow-hidden">
        {items.map((item, idx) => (
          <div
            key={item.key}
            className={
              "px-6 py-7 sm:px-8 sm:py-9 " +
              (idx > 0
                ? "border-t sm:border-t-0 sm:border-l border-[var(--border)]"
                : "")
            }
          >
            <dt className="text-[11px] uppercase tracking-[0.16em] text-[var(--text-secondary)] font-semibold">
              {item.label}
            </dt>
            <dd
              className={
                "mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] leading-none " +
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
