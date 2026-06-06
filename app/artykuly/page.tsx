import type { Metadata } from "next";
import { getPosts } from "@/lib/posts";
import { ArticleCard } from "@/app/components/ArticleCard";
import { GradientBackdrop } from "@/app/components/GradientBackdrop";
import { MoreCTA } from "@/app/components/MoreCTA";

const pageTitle = "Artykuły | luki.zip";
const pageDescription =
  "Jak budować markę w świecie AI, który zmienia się z tygodnia na tydzień. Konkretne, praktyczne porady.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/artykuly" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/artykuly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function ArtykulyPage() {
  const posts = getPosts();

  return (
    <div className="relative min-h-screen bg-[var(--bg-page)]">
      {/* to samo tło gradientowe co na /oferta */}
      <GradientBackdrop />

      <div className="relative z-10 pt-12 pb-16 sm:pt-16 sm:pb-24">
        <div className="container-wide flex flex-col gap-12">
          <header className="max-w-[680px]">
            <h1
              className="t-h1"
              style={{
                color: "#fff",
                textShadow: "0 1px 24px rgba(5,8,30,0.45)",
              }}
            >
              Artykuły
            </h1>
            <p
              className="t-body-large mt-4"
              style={{
                color: "rgba(255,255,255,0.82)",
                textShadow: "0 1px 18px rgba(5,8,30,0.4)",
              }}
            >
              Jak budować markę w świecie AI, który zmienia się z tygodnia na
              tydzień. Konkretne, praktyczne porady.
            </p>
          </header>

          {posts.length > 0 && (
            <section className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Zamykający CTA — wspólny komponent */}
        <MoreCTA />
      </div>
    </div>
  );
}
