import affiliateLinks from "@/content/affiliate-links.json";
import { AffiliateLink } from "./AffiliateLink";

type ToolMeta = {
  url: string;
  benefit: string;
  isAffiliate: boolean;
};

const links = affiliateLinks as Record<string, ToolMeta>;

export function ToolBox({ tools }: { tools: string[] }) {
  if (!tools || tools.length === 0) return null;

  return (
    <section className="mt-4 bg-white border border-[var(--border)] rounded-xl p-6 sm:p-8">
      <h3 className="text-[11px] uppercase tracking-wider font-semibold text-[var(--text-secondary)]">
        Narzędzia z poradnika
      </h3>
      <ul className="mt-4 space-y-3">
        {tools.map((tool) => {
          const link = links[tool];
          const ctaId = `affiliate_${tool.toLowerCase().replace(/\s+/g, "-")}`;

          if (!link) {
            if (process.env.NODE_ENV !== "production") {
              console.warn(`[ToolBox] brak wpisu w affiliate-links.json dla: "${tool}"`);
            }
            return (
              <li key={tool} className="text-[15px] text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text)]">{tool}</span>
              </li>
            );
          }

          return (
            <li key={tool} className="text-[15px] leading-relaxed">
              <AffiliateLink href={link.url} tool={tool} ctaId={ctaId}>
                {tool}
                {link.isAffiliate && " — wspierasz mnie"}
              </AffiliateLink>
              <span className="text-[var(--text-secondary)]"> — {link.benefit}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
