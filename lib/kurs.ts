import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";

/**
 * Warstwa danych kursu Drugi Mózg. Klon wzorca lib/posts.ts.
 * Tresc lekcji zyje w content/kurs/dzien-N.md (sync z vaulta: `pnpm sync:kurs`).
 * Strona /drugi-mozg/kurs i /drugi-mozg/kurs/[dzien] sa bramkowane tokenem HMAC.
 */

const KURS_DIR = path.join(process.cwd(), "content/kurs");

export type LessonFile = {
  name: string;
  url: string;
};

export type LessonMeta = {
  slug: string; // "dzien-1"
  day: number;
  title: string;
  description: string;
  videoUrl: string;
  pdfUrl?: string;
  files?: LessonFile[];
  published: boolean;
  order: number;
};

export type TocItem = { id: string; text: string };

export type Lesson = LessonMeta & {
  contentHtml: string;
  toc: TocItem[];
};

/** Slug PL-safe dla kotwic sekcji (bez diakrytyki, do #id). */
function slugifyPl(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Dodaje id do <h2> i zwraca spis sekcji (do sticky TOC na stronie lekcji). */
function addHeadingIds(htmlStr: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const html = htmlStr.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    let id = slugifyPl(text) || `sekcja-${toc.length + 1}`;
    while (used.has(id)) id = `${id}-${toc.length + 1}`;
    used.add(id);
    toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html, toc };
}

function mapMeta(slug: string, data: Record<string, unknown>): LessonMeta {
  return {
    slug: (data.slug as string) || slug,
    day: (data.day as number) ?? 999,
    title: (data.title as string) || "",
    description: (data.description as string) || "",
    videoUrl: (data.videoUrl as string) || "",
    pdfUrl: (data.pdfUrl as string) || undefined,
    files: (data.files as LessonFile[] | undefined) || undefined,
    published: data.published === true,
    order: (data.order as number) ?? (data.day as number) ?? 999,
  };
}

export function getLessonSlugs(): string[] {
  if (!fs.existsSync(KURS_DIR)) return [];
  return fs
    .readdirSync(KURS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

/** Lista lekcji (meta) posortowana po order/day - do indeksu kursu. */
export function getLessons(): LessonMeta[] {
  return getLessonSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(KURS_DIR, `${slug}.md`), "utf8");
      const { data } = matter(raw);
      return mapMeta(slug, data);
    })
    .sort((a, b) => a.order - b.order);
}

async function readLesson(slug: string): Promise<Lesson | null> {
  const filePath = path.join(KURS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(gfm).use(html).process(content);
  let { html: contentHtml, toc } = addHeadingIds(processed.toString());
  // Bloki ```tree-obsidian / ```tree-claude to grafiki struktury, nie kod.
  // Klasa .tree stylizuje (szare tło, niebieska czcionka; bez :has() - wycinany
  // w buildzie), a data-tool renderuje plakietkę narzędzia w prawym górnym rogu.
  const TOOL_BADGES: Record<string, string> = {
    "tree-obsidian": "Obsidian",
    "tree-claude": "Claude Code · Antigravity",
  };
  contentHtml = contentHtml.replace(
    /<pre><code class="language-(tree(?:-[a-z]+)?)">/g,
    (_, lang: string) => {
      const tool = TOOL_BADGES[lang];
      return `<pre class="tree"${tool ? ` data-tool="${tool}"` : ""}><code class="language-${lang}">`;
    },
  );
  return { ...mapMeta(slug, data), contentHtml, toc };
}

export function getLessonBySlug(slug: string): Promise<Lesson | null> {
  return readLesson(slug);
}

export function getLessonByDay(day: number): Promise<Lesson | null> {
  return readLesson(`dzien-${day}`);
}

/* ── Pliki do pobrania (pakiet startowy) ─────────────────────────── */
export type DownloadFile = { name: string; label: string; size: number };
export type LessonZip = DownloadFile & { day: number };
export type Downloads = {
  zip: DownloadFile;
  files: DownloadFile[];
  lessons: LessonZip[];
};

/** Czyta manifest z content/kurs-downloads/ (generowany przez sync:downloads). */
export function getDownloads(): Downloads | null {
  try {
    const raw = fs.readFileSync(
      path.join(process.cwd(), "content/kurs-downloads/_manifest.json"),
      "utf8",
    );
    const m = JSON.parse(raw);
    if (!m?.zip?.name) return null;
    return {
      zip: m.zip,
      files: Array.isArray(m.files) ? m.files : [],
      lessons: Array.isArray(m.lessons) ? m.lessons : [],
    };
  } catch {
    return null;
  }
}

/** Paczka plików danej lekcji (jeden zip na dzień, kropelkowo). */
export function getLessonZip(day: number): LessonZip | null {
  const d = getDownloads();
  return d?.lessons.find((l) => l.day === day) ?? null;
}

/* ── Konfiguracja kursu (poziom kursu, niski churn) ──────────────── */
export const COURSE = {
  introVideoUrl: "", // film powitalny na indeksie - pusty = placeholder
};

/**
 * Pakiet startowy - pliki SA produktem. `prompts` renderuja sie z przyciskiem
 * "Kopiuj"; `zipUrl` daje "Pobierz caly pakiet" (zza bramki HMAC).
 * FAZA: prompty i zip przyjda z syncu setup-package/. Na teraz pusto = stan "wkrotce".
 */
export const STARTER_PACK = {
  title: "Pakiet startowy",
  description:
    "Gotowe prompty i szkielet systemu. Kopiujesz, wklejasz do Claude Code, ruszasz. Ten sam pakiet dostajesz do pobrania na dysk.",
  zipUrl: "",
  prompts: [] as { label: string; body: string }[],
};
