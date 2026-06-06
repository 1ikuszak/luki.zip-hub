export function HomeHero() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 pt-16 md:pt-20 lg:pt-24 pb-12 md:pb-16">
      <h1
        className="font-semibold text-[var(--text)] max-w-4xl text-balance"
        style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.025em",
        }}
      >
        <span className="block">Buduję marki, które w dobie AI</span>
        <span className="block">nie wyglądają jak AI.</span>
      </h1>
    </section>
  );
}
