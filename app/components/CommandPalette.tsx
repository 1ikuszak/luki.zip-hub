"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { Command } from "cmdk";
import {
  Search,
  Clapperboard,
  Users,
  Youtube,
  Music2,
  ArrowUpRight,
  Star,
} from "lucide-react";
import { mainCommands, socialLinks, reviews } from "@/app/lib/data";
import { useKeyboardShortcuts } from "@/app/hooks/useKeyboardShortcuts";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Clapperboard,
  Users,
  Youtube,
  Music2,
};

export function CommandPalette() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSelect = useCallback((href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const blurInput = useCallback(() => {
    inputRef.current?.blur();
  }, []);

  const handleShortcutC = useCallback(() => {
    const cmd = mainCommands.find((c) => c.shortcut === "C");
    if (cmd) handleSelect(cmd.href);
  }, [handleSelect]);

  const handleShortcutG = useCallback(() => {
    const cmd = mainCommands.find((c) => c.shortcut === "G");
    if (cmd) handleSelect(cmd.href);
  }, [handleSelect]);

  useKeyboardShortcuts([
    { key: "k", metaKey: true, callback: focusInput },
    { key: "c", metaKey: true, callback: handleShortcutC },
    { key: "g", metaKey: true, callback: handleShortcutG },
    { key: "Escape", callback: blurInput },
  ]);

  return (
    <div className="palette-container w-full">
      <Command label="Command Menu" className="w-full">
        {/* Search Input */}
        <div className="relative border-b border-black/5">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6c6c6c]"
            size={18}
          />
          <Command.Input
            ref={inputRef}
            placeholder="Video, Współpraca, AI..."
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center pointer-events-none">
            <span className="font-mono text-[13px] text-[#6c6c6c]">⌘K</span>
          </div>
        </div>

        <Command.List className="no-scrollbar">
          <Command.Empty>Brak wyników</Command.Empty>

          {/* Sugestie - główne komendy */}
          <Command.Group heading="Sugestie">
            {mainCommands.map((cmd) => {
              const Icon = iconMap[cmd.icon];
              return (
                <Command.Item
                  key={cmd.id}
                  value={`${cmd.label} ${cmd.description} ${cmd.keywords}`}
                  onSelect={() => handleSelect(cmd.href)}
                  className="group"
                >
                  {/* Left side */}
                  <div className="flex items-center gap-3">
                    {Icon && <Icon size={20} className="text-[#2656d9]" />}
                    <span className="font-semibold text-[14px] text-[#141115] transition-transform duration-200 ease-out group-hover:translate-x-1">
                      {cmd.label}
                    </span>
                    {cmd.description && (
                      <span className="text-[13px] text-[#6c6c6c]">
                        {cmd.description}
                      </span>
                    )}
                  </div>

                  {/* Right side */}
                  <div className="flex items-center gap-3">
                    {cmd.shortcut && (
                      <span className="font-mono text-[12px] text-[#6c6c6c]">
                        ⌘{cmd.shortcut}
                      </span>
                    )}
                    {cmd.action && (
                      <span className="font-mono text-[12px] tracking-wide action-glow">
                        {cmd.action}
                      </span>
                    )}
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
                  className="group !p-1.5"
                >
                  <div className="flex items-center gap-2">
                    {Icon && <Icon size={14} className="text-[#6c6c6c]" />}
                    <span className="text-[12px] text-[#6c6c6c]">
                      {link.label}
                    </span>
                    {link.stats && (
                      <span className="text-[11px] text-[#6c6c6c]/70">
                        {link.stats}
                      </span>
                    )}
                  </div>
                  <ArrowUpRight
                    className="text-[#6c6c6c] opacity-0 group-hover:opacity-100 transition-opacity"
                    size={12}
                  />
                </Command.Item>
              );
            })}
          </Command.Group>
        </Command.List>

        {/* Reviews Section */}
        <div className="mt-2 border-t border-black/5 bg-[#F6F5FC]/50 p-4">
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
                <p className="text-[13px] leading-relaxed text-[#141115] italic">
                  &ldquo;{r.content}&rdquo;
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] font-semibold text-[#141115]">
                    {r.author}
                  </span>
                  <span className="text-[11px] text-[#6c6c6c]">{r.role}</span>
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
                className="w-1.5 h-1.5 rounded-full transition-colors"
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
