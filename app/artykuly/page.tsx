import type { Metadata } from "next";
import { getPosts } from "@/lib/posts";
import { ArticleCard } from "@/app/components/ArticleCard";
import { GradientBackdrop } from "@/app/components/GradientBackdrop";
import { Breadcrumb } from "@/app/components/Breadcrumb";

const pageTitle = "Artykuły | luki.zip";
const pageDescription =
  "Jak budować marki i wdrażać do nich AI bez zatracania duszy w świecie, który zmienia się co tydzień.";

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
    <div className="relative min-h-screen">
      {/* Brand shader — schowany za białym sheetem, jak na home */}
      <GradientBackdrop />

      <div className="relative z-10 p-2 sm:p-3">
        <div className="mx-auto max-w-[1600px]">
          <main className="rounded-[20px] border border-white/55 bg-[var(--bg-card)] shadow-[0_50px_140px_-70px_rgba(8,12,40,0.6)] sm:rounded-[28px]">
            <div className="container-wide py-14 sm:py-20">
              <Breadcrumb items={[{ label: "Artykuły" }]} />

              <header className="mt-8 max-w-[760px]">
                <h1 className="t-h1">Artykuły</h1>
                <p className="t-body-large mt-4 text-[var(--text-secondary)]">
                  {pageDescription}
                </p>
              </header>

              {posts.length > 0 && (
                <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <ArticleCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
