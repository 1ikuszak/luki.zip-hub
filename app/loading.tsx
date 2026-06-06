// Skeleton shown during async navigation / suspense. Mirrors home page rhythm.
export default function Loading() {
  return (
    <main className="animate-pulse">
      {/* Hero */}
      <section className="container-wide pt-20 sm:pt-32 pb-20 sm:pb-32 min-h-[calc(100svh-4rem)] flex flex-col justify-center">
        <div className="space-y-4">
          <div className="h-[44px] sm:h-[64px] w-3/4 max-w-[820px] rounded-md bg-black/[0.04]" />
          <div className="h-[44px] sm:h-[64px] w-1/2 max-w-[520px] rounded-md bg-black/[0.04]" />
        </div>
      </section>

      {/* Case studies */}
      <section className="border-t border-[var(--border)]">
        <div className="container-wide py-20 sm:py-28">
          <div className="h-9 sm:h-12 w-48 mb-10 sm:mb-12 rounded-md bg-black/[0.04]" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-[4/5] rounded-xl bg-black/[0.04]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* AI Experiments */}
      <section className="border-t border-[var(--border)]">
        <div className="container-wide py-20 sm:py-28">
          <div className="h-9 sm:h-12 w-56 mb-10 sm:mb-12 rounded-md bg-black/[0.04]" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="aspect-square rounded-xl bg-black/[0.04]" />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="border-t border-[var(--border)]">
        <div className="container-wide py-20 sm:py-28">
          <div className="flex flex-col items-center text-center gap-10 sm:gap-14">
            <div className="w-64 sm:w-80 aspect-[4/5] rounded-xl bg-black/[0.04]" />
            <div className="h-12 sm:h-16 w-3/4 max-w-[700px] rounded-md bg-black/[0.04]" />
            <div className="h-5 w-2/3 max-w-[500px] rounded-md bg-black/[0.04]" />
          </div>
        </div>
      </section>
    </main>
  );
}
