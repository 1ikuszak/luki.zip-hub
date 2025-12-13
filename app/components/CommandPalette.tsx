"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Command } from "cmdk";
import {
  Search,
  Clapperboard,
  Users,
  Youtube,
  Music2,
  ArrowUpRight,
  ArrowRight,
  Star,
} from "lucide-react";
import { mainCommands, socialLinks, reviews } from "@/app/lib/data";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Clapperboard,
  Users,
  Youtube,
  Music2,
};

export function CommandPalette() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentReview, setCurrentReview] = useState(0);

  // Auto-rotate reviews
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcuts (desktop only)
  const handleShortcutC = useCallback(() => {
    const cmd = mainCommands.find((c) => c.shortcut === "C");
    if (cmd) window.open(cmd.href, "_blank", "noopener,noreferrer");
  }, []);

  const handleShortcutG = useCallback(() => {
    const cmd = mainCommands.find((c) => c.shortcut === "G");
    if (cmd) window.open(cmd.href, "_blank", "noopener,noreferrer");
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle on desktop (lg+)
      if (window.innerWidth < 1024) return;

      if (e.metaKey || e.ctrlKey) {
        if (e.key === "k") {
          e.preventDefault();
          inputRef.current?.focus();
        } else if (e.key === "c" && !window.getSelection()?.toString()) {
          e.preventDefault();
          handleShortcutC();
        } else if (e.key === "g") {
          e.preventDefault();
          handleShortcutG();
        }
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleShortcutC, handleShortcutG]);

  const handleSelect = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="palette-container w-full">
      <Command label="Command Menu" className="w-full">
        {/* Search Input */}
        <div className="relative border-b border-black/5">
          <Search
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#6c6c6c]"
            size={18}
          />
          <Command.Input
            ref={inputRef}
            placeholder="Video, Współpraca, AI..."
            className="pl-10! sm:pl-11!"
          />
        </div>

        <Command.List className="no-scrollbar">
          <Command.Empty>Brak wyników</Command.Empty>

          {/* Sugestie - główne komendy */}
          <Command.Group heading="Sugestie">
            {mainCommands.map((cmd) => {
              const Icon = iconMap[cmd.icon];
              const isPrimary = cmd.id === "wspolpraca";
              return (
                <Command.Item
                  key={cmd.id}
                  value={`${cmd.label} ${cmd.description} ${cmd.keywords}`}
                  onSelect={() => handleSelect(cmd.href)}
                  className="group min-h-12 flex-col lg:flex-row lg:items-center items-start"
                >
                  {/* Mobile layout - stacked with button */}
                  <div className="flex flex-col w-full gap-2 sm:hidden">
                    <div className="flex items-center gap-2">
                      {Icon && <Icon size={20} className="text-[#2656d9] shrink-0" />}
                      <span className="font-semibold text-[16px] text-[#141115]">
                        {cmd.label}
                      </span>
                    </div>
                    {cmd.description && (
                      <span className="text-[14px] text-[#6c6c6c] tracking-wide">
                        {cmd.description}
                      </span>
                    )}
                    {cmd.action && (
                      <button
                        className={`mt-1 px-5 py-2.5 rounded-lg font-medium text-[14px] tracking-wide transition-all duration-200 backdrop-blur-xl border ${
                          isPrimary
                            ? "bg-[#2656d9]/90 text-white border-[#2656d9]/50 shadow-lg shadow-[#2656d9]/25 hover:bg-[#2656d9] hover:shadow-xl hover:shadow-[#2656d9]/30 active:scale-[0.98]"
                            : "bg-white/60 text-[#141115] border-black/10 shadow-lg shadow-black/5 hover:bg-white/80 hover:border-black/15 active:scale-[0.98]"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(cmd.href);
                        }}
                      >
                        {cmd.id === "wspolpraca" ? "Wyślij zapytanie" : cmd.id === "grupka" ? "Chcę dołączyć" : cmd.action}
                      </button>
                    )}
                  </div>

                  {/* Desktop/Tablet layout - row */}
                  <div className="hidden sm:flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      {Icon && <Icon size={20} className="text-[#2656d9] shrink-0" />}
                      <span className="font-semibold text-[15px] text-[#141115] transition-transform duration-200 ease-out group-hover:translate-x-1">
                        {cmd.label}
                      </span>
                      {cmd.description && (
                        <span className="text-[14px] text-[#6c6c6c] hidden lg:inline">
                          {cmd.description}
                        </span>
                      )}
                    </div>

                    {/* Tablet: action text, Desktop: shortcut + action */}
                    <div className="flex items-center gap-4">
                      <kbd className="font-mono text-[13px] text-[#6c6c6c] hidden lg:inline">
                        ⌘{cmd.shortcut}
                      </kbd>
                      {cmd.action && (
                        <span className={`font-mono text-[13px] tracking-wide ${isPrimary ? "action-glow" : "text-[#2656d9]"}`}>
                          {cmd.action}
                        </span>
                      )}
                    </div>
                  </div>
                </Command.Item>
              );
            })}
          </Command.Group>

          <Command.Separator />

          {/* Więcej - secondary */}
          <Command.Group heading="Więcej">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <Command.Item
                  key={link.id}
                  value={`${link.label} ${link.keywords}`}
                  onSelect={() => handleSelect(link.href)}
                  className="group min-h-14 sm:min-h-9 p-3! sm:py-1! sm:px-1.5!"
                >
                  {/* Mobile layout - stacked with link button */}
                  <div className="flex flex-col w-full gap-1.5 sm:hidden">
                    <div className="flex items-center gap-2">
                      {Icon && <Icon size={20} className="text-[#2656d9]" />}
                      <span className="text-[15px] font-medium text-[#141115]">
                        {link.label}
                      </span>
                    </div>
                    {link.stats && (
                      <span className="text-[13px] text-[#6c6c6c] tracking-wide">
                        {link.stats}
                      </span>
                    )}
                    <button
                      className="mt-1 flex items-center gap-1 text-[13px] font-medium text-[#2656d9] hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(link.href);
                      }}
                    >
                      Sprawdź
                      <ArrowUpRight size={14} />
                    </button>
                  </div>

                  {/* Desktop/Tablet layout - row */}
                  <div className="hidden sm:flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      {Icon && <Icon size={16} className="text-[#6c6c6c] group-hover:text-[#2656d9] transition-colors" />}
                      <span className="text-[13px] font-medium text-[#6c6c6c] group-hover:text-[#2656d9] transition-colors">
                        {link.label}
                      </span>
                      {link.stats && (
                        <span className="text-[12px] text-[#6c6c6c]/70 group-hover:text-[#2656d9]/70 transition-colors">
                          {link.stats}
                        </span>
                      )}
                    </div>
                    <ArrowRight
                      className="text-[#2656d9] group-hover:translate-x-1 transition-transform duration-300 ease-out"
                      size={16}
                    />
                  </div>
                </Command.Item>
              );
            })}
          </Command.Group>
        </Command.List>

        {/* Reviews Section */}
        <div className="mt-2 border-t border-black/5 bg-[#F6F5FC]/50 p-3 sm:p-4">
          <div className="relative h-24 w-full">
            {reviews.map((r, index) => (
              <div
                key={r.id}
                className="absolute inset-0 flex flex-col justify-center transition-all duration-400 ease-in-out"
                style={{
                  opacity: index === currentReview ? 1 : 0,
                  transform: `translateY(${index === currentReview ? 0 : index > currentReview ? 8 : -8}px)`,
                  pointerEvents: index === currentReview ? "auto" : "none",
                }}
              >
                <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#141115] italic">
                  &ldquo;{r.content}&rdquo;
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#141115]">
                    {r.author}
                  </span>
                  <span className="text-[11px] sm:text-[12px] text-[#6c6c6c]">{r.role}</span>
                  <div className="flex text-[#2656d9]">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-start gap-1.5 mt-1">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className="w-2 h-2 sm:w-1.5 sm:h-1.5 rounded-full transition-colors"
                style={{
                  backgroundColor:
                    index === currentReview
                      ? "#141115"
                      : "rgba(20, 17, 21, 0.2)",
                }}
                aria-label={`Review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Command>
    </div>
  );
}
