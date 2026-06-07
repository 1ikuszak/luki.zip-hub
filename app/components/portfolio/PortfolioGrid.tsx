import Image from "next/image";

import { portfolioItems } from "@/app/lib/portfolio";
import { PortfolioVideo } from "./PortfolioVideo";

// Masonry przez CSS columns — kafelki zachowują natywny format (16:9 i 9:16 obok siebie).
// Goło: zero podpisów, sama grafika. break-inside-avoid trzyma kafelek w jednej kolumnie.
export function PortfolioGrid() {
  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-2 sm:gap-2.5 [column-fill:balance]">
      {portfolioItems.map((item, i) => (
        <div key={item.src} className="mb-2 sm:mb-2.5 break-inside-avoid">
          {item.kind === "video" ? (
            <PortfolioVideo
              src={item.src}
              poster={item.poster!}
              width={item.width}
              height={item.height}
            />
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              quality={90}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              priority={i < 3}
              className="block w-full h-auto"
            />
          )}
        </div>
      ))}
    </div>
  );
}
