type Props = {
  text: string;
  author: string;
  role: string;
};

export function QuoteSection({ text, author, role }: Props) {
  return (
    <section className="container-default py-20 sm:py-28">
      <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--accent)] font-semibold">
        Efekt
      </div>
      <blockquote
        className="mt-6"
        style={{ hangingPunctuation: "first" }}
      >
        <span
          aria-hidden
          className="block text-7xl sm:text-8xl leading-none font-semibold text-[var(--accent)]"
        >
          &ldquo;
        </span>
        <p
          className="mt-2 t-h3 italic"
          style={{ textIndent: "-0.4em" }}
        >
          {text}
        </p>
        <footer className="mt-8 text-[15px] text-[var(--text-secondary)]">
          <span className="font-semibold text-[var(--text)]">
            {author}
          </span>
          <span className="mx-2">·</span>
          <span>{role}</span>
        </footer>
      </blockquote>
    </section>
  );
}
