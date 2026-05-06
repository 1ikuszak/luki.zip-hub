import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export type HeroImage = {
  src: string;
  alt: string;
  w: number;
  h: number;
};

export type PostMeta = {
  slug: string;
  title: string;
  date?: string;
  order: number;
  tag: string;
  description: string;
  problem?: string;
  dlaKogo?: string;
  tools?: string[];
  heroImages?: HeroImage[];
  heroLead?: string;
  affiliateDFirst?: boolean;
};

export type Post = PostMeta & {
  contentHtml: string;
};

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => {
    const filePath = path.join(POSTS_DIR, `${slug}.md`);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title as string,
      date: data.date as string | undefined,
      order: (data.order as number) ?? 999,
      tag: data.tag as string,
      description: data.description as string,
      problem: data.problem as string | undefined,
      dlaKogo: data.dlaKogo as string | undefined,
      tools: data.tools as string[] | undefined,
      heroImages: data.heroImages as HeroImage[] | undefined,
      heroLead: data.heroLead as string | undefined,
      affiliateDFirst: data.affiliateDFirst as boolean | undefined,
    };
  });

  return posts.sort((a, b) => a.order - b.order);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(gfm).use(html).process(content);

  return {
    slug,
    title: data.title as string,
    date: data.date as string | undefined,
    order: (data.order as number) ?? 999,
    tag: data.tag as string,
    description: data.description as string,
    problem: data.problem as string | undefined,
    dlaKogo: data.dlaKogo as string | undefined,
    tools: data.tools as string[] | undefined,
    heroImages: data.heroImages as HeroImage[] | undefined,
    heroLead: data.heroLead as string | undefined,
    affiliateDFirst: data.affiliateDFirst as boolean | undefined,
    contentHtml: processed.toString(),
  };
}

export { formatDate } from "./format";
