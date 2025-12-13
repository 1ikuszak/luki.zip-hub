"use client";

import dynamic from "next/dynamic";

const CommandPalette = dynamic(
  () => import("./components/CommandPalette").then((mod) => mod.CommandPalette),
  { ssr: false }
);

const ASCII_LOGO = `██╗     ██╗   ██╗██╗  ██╗██╗   ███████╗██╗██████╗
██║     ██║   ██║██║ ██╔╝██║   ╚══███╔╝██║██╔══██╗
██║     ██║   ██║█████╔╝ ██║     ███╔╝ ██║██████╔╝
██║     ██║   ██║██╔═██╗ ██║    ███╔╝  ██║██╔═══╝
███████╗╚██████╔╝██║  ██╗██║   ███████╗██║██║
╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚══════╝╚═╝╚═╝`;

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center pt-8 px-3 pb-3 sm:p-4 antialiased">
      <div className="w-full max-w-[500px] sm:max-w-[580px] flex flex-col gap-3 sm:gap-4">
        {/* Header - Mobile: stacked layout, Desktop: row layout */}
        <header className="mb-1 sm:mb-2 px-1 sm:px-2">
          {/* Mobile header */}
          <div className="sm:hidden">
            <pre className="font-mono text-[5.5px] leading-[1.05] text-[#2656d9] whitespace-pre select-none">
              {ASCII_LOGO}
            </pre>
          </div>

          {/* Desktop header */}
          <div className="hidden sm:block">
            <pre className="font-mono text-[4px] leading-[1.05] text-[#2656d9] whitespace-pre select-none">
              {ASCII_LOGO}
            </pre>
          </div>
        </header>

        {/* Command Palette */}
        <CommandPalette />
      </div>
    </main>
  );
}
