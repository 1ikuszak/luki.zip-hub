type Props = {
  text: string;
  author: string;
  role: string;
};

export function QuoteSection({ text, author, role }: Props) {
  // Placeholdery cytatów nie renderują się na żywej stronie (tylko realne cytaty).
  if (!text || text.trim().startsWith("[do uzupełnienia")) return null;

  return (
    <section className="container-default pb-16 sm:pb-24">
      <figure className="border-t border-[var(--border)] pt-12 sm:pt-16">
        <blockquote
          className="reveal text-[24px] font-semibold leading-[1.3] tracking-[-0.01em] text-[var(--text)] sm:text-[32px]"
          style={{ hangingPunctuation: "first" }}
        >
          &ldquo;{text}&rdquo;
        </blockquote>
        {(author || role) && (
          <figcaption className="mt-6 text-[15px] text-[var(--text-secondary)]">
            {author && (
              <span className="font-semibold text-[var(--text)]">{author}</span>
            )}
            {author && role && <span className="mx-2">·</span>}
            {role && <span>{role}</span>}
          </figcaption>
        )}
      </figure>
    </section>
  );
}
