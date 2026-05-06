import { promises as fs } from "fs";
import path from "path";

export type CaseStudyStep = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type StructuredCaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  heroImageAlt: string;
  metaDescription: string;
  stats: {
    czas: string;
    budzet: string;
    efekt: string;
  };
  problem: string;
  steps: [CaseStudyStep, CaseStudyStep, CaseStudyStep];
  quote: {
    text: string;
    author: string;
    role: string;
  };
};

const CONTENT_DIR = path.join(process.cwd(), "content", "case-studies");

async function readCaseStudyFile(filename: string): Promise<StructuredCaseStudy> {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(raw) as StructuredCaseStudy;

  if (!Array.isArray(data.steps) || data.steps.length !== 3) {
    throw new Error(
      `Case study "${data.slug}" must have exactly 3 steps, got ${data.steps?.length ?? 0}`,
    );
  }

  return data;
}

export async function getAllSlugs(): Promise<string[]> {
  const files = await fs.readdir(CONTENT_DIR);
  return files
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<StructuredCaseStudy | null> {
  try {
    return await readCaseStudyFile(`${slug}.json`);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
}

export async function getAllCaseStudies(): Promise<StructuredCaseStudy[]> {
  const slugs = await getAllSlugs();
  const studies = await Promise.all(
    slugs.map((slug) => readCaseStudyFile(`${slug}.json`)),
  );
  return studies;
}
