import { CommandPalette } from "./components/CommandPalette";
import { Command } from "lucide-react";
import Image from "next/image";

const ASCII_LOGO = `██╗     ██╗   ██╗██╗  ██╗██╗   ███████╗██╗██████╗
██║     ██║   ██║██║ ██╔╝██║   ╚══███╔╝██║██╔══██╗
██║     ██║   ██║█████╔╝ ██║     ███╔╝ ██║██████╔╝
██║     ██║   ██║██╔═██╗ ██║    ███╔╝  ██║██╔═══╝
███████╗╚██████╔╝██║  ██╗██║   ███████╗██║██║
╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚══════╝╚═╝╚═╝`;

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 antialiased relative overflow-hidden">
      {/* Star - Bottom Right Corner */}
      <div className="fixed bottom-8 right-8 z-0">
        <Image
          src="/star.png"
          alt="Star"
          width={75}
          height={75}
          className="w-[75px] h-[75px] rounded-sm opacity-90"
        />
      </div>

      <div className="w-full max-w-[500px] flex flex-col gap-4 relative z-10">
        {/* Header with ASCII */}
        <header className="mb-2 px-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <pre className="font-mono text-[4px] leading-[1.05] text-[#2656d9] whitespace-pre select-none hidden sm:block">
              {ASCII_LOGO}
            </pre>
            <span className="text-sm font-semibold tracking-tight text-[#2656d9] sm:hidden">
              Luki Zip
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#2656d9] glow-dot-blue" />
            <span className="text-xs text-[#6c6c6c] font-medium">
              Otwarty na projekty
            </span>
          </div>
        </header>

        {/* Command Palette */}
        <CommandPalette />

        {/* Footer */}
        <footer className="flex items-center justify-between w-full px-2 mt-2">
          <div className="flex items-center gap-1.5">
            <Command className="text-[#6c6c6c]" size={12} />
            <span className="text-[11px] text-[#6c6c6c]">Komendy</span>
          </div>
          <span className="text-[11px] text-[#6c6c6c]">ESC zamknij</span>
        </footer>
      </div>
    </main>
  );
}
