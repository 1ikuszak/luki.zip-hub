type Props = {
  text: string;
};

export function ProblemSection({ text }: Props) {
  return (
    <section className="container-default py-16 sm:py-24">
      <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--accent)] font-semibold">
        Problem
      </div>
      <p className="t-h3 mt-4">{text}</p>
    </section>
  );
}
