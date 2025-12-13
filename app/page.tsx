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
    <main className="min-h-screen flex flex-col items-center justify-center p-3 sm:p-4 antialiased">
      <div className="w-full max-w-[500px] sm:max-w-[580px] flex flex-col gap-3 sm:gap-4">
        {/* Header - Mobile: stacked layout, Desktop: row layout */}
        <header className="mb-1 sm:mb-2 px-1 sm:px-2">
          {/* Mobile header - stacked */}
          <div className="flex flex-col items-start gap-2 sm:hidden">
            <pre className="font-mono text-[5.5px] leading-[1.05] text-[#2656d9] whitespace-pre select-none">
              {ASCII_LOGO}
            </pre>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#2656d9] glow-dot-blue" />
              <span className="text-sm text-[#6c6c6c] font-medium">
                Otwarty na projekty
              </span>
            </div>
          </div>

          {/* Desktop header - row */}
          <div className="hidden sm:flex items-center justify-between">
            <pre className="font-mono text-[4px] leading-[1.05] text-[#2656d9] whitespace-pre select-none">
              {ASCII_LOGO}
            </pre>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#2656d9] glow-dot-blue" />
              <span className="text-sm text-[#6c6c6c] font-medium">
                Otwarty na projekty
              </span>
            </div>
          </div>
        </header>

        {/* Command Palette */}
        <CommandPalette />
      </div>
    </main>
  );
}
