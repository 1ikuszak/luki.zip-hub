import type { Metadata } from "next";
import { getPosts } from "@/lib/posts";
import { ArticleCard } from "@/app/components/ArticleCard";

const pageTitle = "Artykuły | luki.zip";
const pageDescription =
  "Praktyczne notatki o video, AI i pracy creatora. Bez fluffu, same konkretne fixy.";

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
    <main className="container-wide pt-12 pb-16 sm:pt-16 sm:pb-24">
      <div className="flex flex-col gap-12">
        <header className="max-w-[680px]">
          <h1 className="t-h1">Artykuły</h1>
          <p className="t-body-large mt-4 text-[var(--text-secondary)]">
            Praktyczne notatki o video, AI i pracy creatora. Bez fluffu, same
            konkretne fixy.
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
    </main>
  );
}
