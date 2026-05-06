#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { NotionAPI } from "notion-client";
import { parsePageId, getPageTitle } from "notion-utils";

const ROOT_PAGE_RAW = "2798f4fa2413806bb0e5fa0014edabdc";
const POSTS_DIR = path.join(process.cwd(), "content/posts");
const TODAY = new Date().toISOString().slice(0, 10);

const notion = new NotionAPI();

// notion-client 7.x: recordMap.block[id] = { spaceId, value: { value: Block } }
// older: { role, value: Block }
function getBlock(recordMap, id) {
  const entry = recordMap?.block?.[id];
  if (!entry) return null;
  return entry.value?.value || entry.value || null;
}

function slugify(text) {
  return (text || "")
    .toLowerCase()
    .replace(/ą/g, "a").replace(/ć/g, "c").replace(/ę/g, "e")
    .replace(/ł/g, "l").replace(/ń/g, "n").replace(/ó/g, "o")
    .replace(/ś/g, "s").replace(/ż/g, "z").replace(/ź/g, "z")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function decorate(text, formats, outboundLinks) {
  if (!formats) return text;
  let out = text;
  for (const fmt of formats) {
    const [type, arg] = fmt;
    if (type === "b") out = `**${out}**`;
    else if (type === "i") out = `*${out}*`;
    else if (type === "s") out = `~~${out}~~`;
    else if (type === "c") out = `\`${out}\``;
    else if (type === "a") {
      const url = arg;
      out = `[${out}](${url})`;
      if (url && !url.includes("notion.so") && !url.startsWith("/") && !url.startsWith("#")) {
        outboundLinks.push({ text, url });
      }
    }
  }
  return out;
}

function renderInline(decorations, outboundLinks) {
  if (!decorations) return "";
  return decorations
    .map(([text, formats]) => decorate(text, formats, outboundLinks))
    .join("");
}

function escapeYaml(str) {
  if (!str) return '""';
  return `"${String(str).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ").trim()}"`;
}

function blockToMd(blockId, recordMap, depth, outboundLinks) {
  const v = getBlock(recordMap, blockId);
  if (!v) return "";
  const props = v.properties || {};
  const indent = "  ".repeat(depth);

  const renderTitle = () => renderInline(props.title, outboundLinks);

  switch (v.type) {
    case "page":
      return "";
    case "header":
      return `# ${renderTitle()}\n`;
    case "sub_header":
      return `## ${renderTitle()}\n`;
    case "sub_sub_header":
      return `### ${renderTitle()}\n`;
    case "text": {
      const txt = renderTitle();
      return txt ? `${txt}\n` : "\n";
    }
    case "bulleted_list":
      return `${indent}- ${renderTitle()}\n${renderChildren(v, recordMap, depth + 1, outboundLinks)}`;
    case "numbered_list":
      return `${indent}1. ${renderTitle()}\n${renderChildren(v, recordMap, depth + 1, outboundLinks)}`;
    case "to_do": {
      const checked = props.checked?.[0]?.[0] === "Yes";
      return `${indent}- [${checked ? "x" : " "}] ${renderTitle()}\n`;
    }
    case "quote":
      return `> ${renderTitle()}\n`;
    case "callout": {
      const icon = v.format?.page_icon || "💡";
      return `> ${icon} ${renderTitle()}\n`;
    }
    case "code": {
      const lang = props.language?.[0]?.[0]?.toLowerCase() || "";
      const code = (props.title || []).map(([t]) => t).join("");
      return `\`\`\`${lang}\n${code}\n\`\`\`\n`;
    }
    case "divider":
      return `---\n`;
    case "bookmark": {
      const url = props.link?.[0]?.[0] || "";
      const title = props.title?.[0]?.[0] || url;
      const desc = props.description?.[0]?.[0] || "";
      if (url && !url.includes("notion.so")) {
        outboundLinks.push({ text: title, url });
      }
      return `[${title}](${url})${desc ? ` — ${desc}` : ""}\n`;
    }
    case "image": {
      const src = v.format?.display_source || props.source?.[0]?.[0] || "";
      const caption = renderTitle() || "obraz";
      return `![${caption}](${src})\n`;
    }
    case "video":
    case "embed": {
      const src = props.source?.[0]?.[0] || "";
      return src ? `[${v.type}: ${src}](${src})\n` : "";
    }
    case "toggle":
      return `**${renderTitle()}**\n${renderChildren(v, recordMap, depth, outboundLinks)}`;
    case "column_list":
    case "column":
    case "synced_block":
    case "transclusion_container":
      return renderChildren(v, recordMap, depth, outboundLinks);
    case "table": {
      const colOrder = v.format?.table_block_column_order || [];
      const hasHeader = v.format?.table_block_column_header === true;
      const colHeaders = colOrder.map((cid) => {
        const head = v.format?.table_block_column_header_meta?.[cid];
        return head?.name || "";
      });
      const rows = (v.content || [])
        .map((rid) => getBlock(recordMap, rid))
        .filter((r) => r && r.type === "table_row");
      if (rows.length === 0) return "";
      const lines = [];
      const cells = (row) => colOrder.map((cid) => renderInline(row.properties?.[cid], outboundLinks).replace(/\n/g, " ").replace(/\|/g, "\\|"));
      let bodyRows = rows.map(cells);
      let header;
      if (hasHeader && bodyRows.length > 0) {
        header = bodyRows[0];
        bodyRows = bodyRows.slice(1);
      } else if (colHeaders.some((h) => h)) {
        header = colHeaders;
      } else {
        header = colOrder.map((_, i) => `Col ${i + 1}`);
      }
      lines.push(`| ${header.join(" | ")} |`);
      lines.push(`| ${header.map(() => "---").join(" | ")} |`);
      for (const r of bodyRows) lines.push(`| ${r.join(" | ")} |`);
      return lines.join("\n") + "\n";
    }
    case "file":
    case "pdf":
    case "audio": {
      const src = props.source?.[0]?.[0] || "";
      const title = renderTitle() || src;
      return src ? `[${title}](${src})\n` : "";
    }
    default:
      console.warn(`[warn] nieznany block type: ${v.type}`);
      return renderTitle() ? `${renderTitle()}\n` : "";
  }
}

function renderChildren(parentValue, recordMap, depth, outboundLinks) {
  const children = parentValue.content || [];
  let out = "";
  for (const childId of children) {
    out += blockToMd(childId, recordMap, depth, outboundLinks);
  }
  return out;
}

function recordMapToMarkdown(recordMap, rootId) {
  const outboundLinks = [];
  const root = getBlock(recordMap, rootId);
  if (!root) return { md: "", links: [] };
  const md = renderChildren(root, recordMap, 0, outboundLinks);
  const cleaned = md.replace(/\n{3,}/g, "\n\n").trim() + "\n";
  return { md: cleaned, links: outboundLinks };
}

function extractToolNames(links) {
  const seen = new Set();
  const tools = [];
  for (const { text } of links) {
    const t = (text || "").trim();
    if (!t || t.length > 60) continue;
    if (/^https?:\/\//.test(t)) continue;
    const key = t.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    tools.push(t);
  }
  return tools;
}

function buildFrontmatter({ title, description, tools }) {
  return [
    "---",
    `title: ${escapeYaml(title)}`,
    `date: "${TODAY}"`,
    `tag: "poradnik"`,
    `description: ${escapeYaml(description)}`,
    `problem: ""`,
    `dlaKogo: ""`,
    `tools: [${tools.map((t) => escapeYaml(t)).join(", ")}]`,
    "---",
    "",
  ].join("\n");
}

function firstParagraph(md) {
  const stripped = md
    .replace(/^#.*$/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/[#*_`>[\]()]/g, "")
    .trim();
  const firstLine = stripped.split(/\n+/).find((l) => l.trim().length > 30) || "";
  return firstLine.slice(0, 160);
}

async function main() {
  const rootId = parsePageId(ROOT_PAGE_RAW);
  console.log(`[info] root page id: ${rootId}`);
  console.log(`[info] pobieram index...`);
  const indexMap = await notion.getPage(rootId);

  // Find all child pages of root
  const rootBlock = getBlock(indexMap, rootId);
  if (!rootBlock) {
    console.error("[fatal] root block missing");
    process.exit(1);
  }
  const childIds = (rootBlock.content || []).filter((id) => {
    const b = getBlock(indexMap, id);
    return b && b.type === "page";
  });

  console.log(`[info] znaleziono ${childIds.length} child pages`);
  if (childIds.length === 0) {
    console.log(`[warn] brak child pages — pełna lista bloków:`);
    for (const id of Object.keys(indexMap.block)) {
      const b = getBlock(indexMap, id);
      console.log(`  ${id} :: ${b?.type} :: ${(b?.properties?.title?.[0]?.[0] || "").slice(0, 60)}`);
    }
    process.exit(1);
  }

  fs.mkdirSync(POSTS_DIR, { recursive: true });

  const generated = [];
  for (let i = 0; i < childIds.length; i++) {
    const childId = childIds[i];
    const titleFromIndex = getBlock(indexMap, childId)?.properties?.title?.[0]?.[0] || `poradnik-${i + 1}`;
    console.log(`\n[${i + 1}/${childIds.length}] ${titleFromIndex}`);

    let recordMap;
    try {
      recordMap = await notion.getPage(childId);
    } catch (err) {
      console.error(`  [error] nie udało się pobrać ${childId}:`, err.message);
      continue;
    }

    const fullTitle = titleFromIndex;
    const { md, links } = recordMapToMarkdown(recordMap, childId);
    const tools = extractToolNames(links);
    const description = firstParagraph(md);

    const slug = `poradnik-${slugify(fullTitle) || `nr-${i + 1}`}`;
    const filename = `${slug}.md`;
    const filepath = path.join(POSTS_DIR, filename);

    const frontmatter = buildFrontmatter({ title: fullTitle, description, tools });
    fs.writeFileSync(filepath, frontmatter + md, "utf8");
    console.log(`  [ok] zapisano ${filename} (${md.length} znaków, ${tools.length} narzędzi)`);
    generated.push({ slug, title: fullTitle, tools });
  }

  console.log(`\n[done] ${generated.length} plików zapisanych w content/posts/`);
  console.log(`\n# Spis treści\n`);
  for (const g of generated) {
    console.log(`- [${g.title}](/artykuly/${g.slug})`);
  }

  // Save also tools-summary for affiliate-links.json bootstrap
  const allTools = new Set();
  generated.forEach((g) => g.tools.forEach((t) => allTools.add(t)));
  const toolsList = [...allTools].sort();
  fs.writeFileSync(
    path.join(process.cwd(), "scripts/scrape-tools-detected.json"),
    JSON.stringify(toolsList, null, 2),
    "utf8"
  );
  console.log(`\n[info] wykryto ${toolsList.length} unikalnych narzędzi → scripts/scrape-tools-detected.json`);
}

main().catch((err) => {
  console.error("[fatal]", err);
  process.exit(1);
});
