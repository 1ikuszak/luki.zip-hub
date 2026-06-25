type Props = {
  text: string;
};

export function ProblemSection({ text }: Props) {
  return (
    <section className="container-default py-14 sm:py-20">
      <div className="border-l-2 border-[var(--accent)] pl-6 sm:pl-8">
        <p className="reveal text-[21px] font-medium leading-[1.42] tracking-[-0.01em] text-[var(--text)] sm:text-[26px]">
          {text}
        </p>
      </div>
    </section>
  );
}
