"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
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
  Layers,
} from "lucide-react";
import { mainCommands, socialLinks, reviews } from "@/app/lib/data";
import { trackCTA, trackGA } from "@/app/lib/analytics";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Clapperboard,
  Users,
  Youtube,
  Music2,
  Layers,
};

export function CommandPalette() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSelect = useCallback(
    (href: string, ctaId: string) => {
      trackCTA(ctaId, href);
      if (href.startsWith("/")) {
        router.push(href);
      } else {
        window.open(href, "_blank", "noopener,noreferrer");
      }
    },
    [router]
  );

  const handleShortcutO = useCallback(() => {
    const cmd = mainCommands.find((c) => c.shortcut === "O");
    if (cmd) handleSelect(cmd.href, `cta_${cmd.id}_shortcut`);
  }, [handleSelect]);

  const handleShortcutC = useCallback(() => {
    const cmd = mainCommands.find((c) => c.shortcut === "C");
    if (cmd) handleSelect(cmd.href, `cta_${cmd.id}_shortcut`);
  }, [handleSelect]);

  const handleShortcutG = useCallback(() => {
    const cmd = mainCommands.find((c) => c.shortcut === "G");
    if (cmd) handleSelect(cmd.href, `cta_${cmd.id}_shortcut`);
  }, [handleSelect]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < 1024) return;

      if (e.metaKey || e.ctrlKey) {
        if (e.key === "k") {
          e.preventDefault();
          inputRef.current?.focus();
        } else if (e.key === "o") {
          e.preventDefault();
          handleShortcutO();
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
  }, [handleShortcutO, handleShortcutC, handleShortcutG]);

  return (
    <div className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden">
      <Command label="Command Menu" className="w-full">
        {/* Search Input */}
        <div className="relative border-b border-[var(--border)]">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
            size={18}
          />
          <Command.Input
            ref={inputRef}
            placeholder="Video, Współpraca, AI..."
            className="w-full h-14 pl-12 pr-4 text-[15px] bg-transparent border-0 outline-none text-[var(--text)] placeholder:text-[var(--text-secondary)]"
          />
        </div>

        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="px-4 py-6 text-center text-sm text-[var(--text-secondary)]">
            Brak wyników
          </Command.Empty>

          {/* Sugestie */}
          <Command.Group
            heading="Sugestie"
            className="[&>[cmdk-group-heading]]:px-3 [&>[cmdk-group-heading]]:py-2 [&>[cmdk-group-heading]]:text-[11px] [&>[cmdk-group-heading]]:font-semibold [&>[cmdk-group-heading]]:uppercase [&>[cmdk-group-heading]]:tracking-[0.08em] [&>[cmdk-group-heading]]:text-[var(--text-secondary)]"
          >
            {mainCommands.map((cmd) => {
              const Icon = iconMap[cmd.icon];
              const isPrimary = cmd.id === "oferta";
              return (
                <Command.Item
                  key={cmd.id}
                  value={`${cmd.label} ${cmd.description} ${cmd.keywords}`}
                  onSelect={() => handleSelect(cmd.href, `cta_${cmd.id}`)}
                  data-track="cta_command"
                  data-track-id={`cta_${cmd.id}`}
                  data-track-href={cmd.href}
                  className="group min-h-12 flex flex-col lg:flex-row lg:items-center items-start p-3 rounded-lg cursor-pointer border border-transparent hover:border-[var(--accent)] data-[selected=true]:border-[var(--accent)] transition-colors duration-150"
                >
                  {/* Mobile */}
                  <div className="flex flex-col w-full gap-2 sm:hidden">
                    <div className="flex items-center gap-2">
                      {Icon && <Icon size={20} className="text-[var(--accent)] shrink-0" />}
                      <span className="font-semibold text-[16px] text-[var(--text)]">
                        {cmd.label}
                      </span>
                    </div>
                    {cmd.description && (
                      <span className="text-[14px] text-[var(--text-secondary)]">
                        {cmd.description}
                      </span>
                    )}
                    {cmd.action && (
                      <button
                        data-track="cta_command_btn"
                        data-track-id={`cta_${cmd.id}_btn`}
                        data-track-href={cmd.href}
                        className={`mt-1 px-5 h-11 rounded-lg font-semibold text-[14px] transition-colors duration-150 ${
                          isPrimary
                            ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-light)]"
                            : "bg-white text-[var(--text)] border border-[var(--border)] hover:border-[var(--accent)]"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(cmd.href, `cta_${cmd.id}_btn`);
                        }}
                      >
                        {cmd.id === "oferta"
                          ? "Zobacz ofertę"
                          : cmd.id === "wspolpraca"
                          ? "Wyślij zapytanie"
                          : cmd.id === "grupka"
                          ? "Chcę dołączyć"
                          : cmd.action}
                      </button>
                    )}
                  </div>

                  {/* Desktop / Tablet */}
                  <div className="hidden sm:flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      {Icon && <Icon size={20} className="text-[var(--accent)] shrink-0" />}
                      <span className="font-semibold text-[15px] text-[var(--text)]">
                        {cmd.label}
                      </span>
                      {cmd.description && (
                        <span className="text-[14px] text-[var(--text-secondary)] hidden lg:inline">
                          {cmd.description}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <kbd className="font-mono text-[13px] text-[var(--text-secondary)] hidden lg:inline">
                        ⌘{cmd.shortcut}
                      </kbd>
                      {cmd.action && (
                        <span className="font-mono text-[13px] tracking-wide text-[var(--accent)]">
                          {cmd.action}
                        </span>
                      )}
                    </div>
                  </div>
                </Command.Item>
              );
            })}
          </Command.Group>

          <div className="my-2 h-px bg-[var(--border)] mx-2" />

          {/* Więcej */}
          <Command.Group
            heading="Więcej"
            className="[&>[cmdk-group-heading]]:px-3 [&>[cmdk-group-heading]]:py-2 [&>[cmdk-group-heading]]:text-[11px] [&>[cmdk-group-heading]]:font-semibold [&>[cmdk-group-heading]]:uppercase [&>[cmdk-group-heading]]:tracking-[0.08em] [&>[cmdk-group-heading]]:text-[var(--text-secondary)]"
          >
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <Command.Item
                  key={link.id}
                  value={`${link.label} ${link.keywords}`}
                  onSelect={() => handleSelect(link.href, `social_${link.id}`)}
                  data-track="cta_social"
                  data-track-id={`social_${link.id}`}
                  data-track-href={link.href}
                  className="group min-h-12 sm:min-h-9 flex p-3 sm:py-2 sm:px-3 rounded-lg cursor-pointer border border-transparent hover:border-[var(--accent)] data-[selected=true]:border-[var(--accent)] transition-colors duration-150"
                >
                  {/* Mobile */}
                  <div className="flex flex-col w-full gap-1.5 sm:hidden">
                    <div className="flex items-center gap-2">
                      {Icon && <Icon size={20} className="text-[var(--text)]" />}
                      <span className="text-[15px] font-semibold text-[var(--text)]">
                        {link.label}
                      </span>
                    </div>
                    {link.stats && (
                      <span className="text-[13px] text-[var(--text-secondary)]">
                        {link.stats}
                      </span>
                    )}
                    <button
                      data-track="cta_social_btn"
                      data-track-id={`social_${link.id}_btn`}
                      data-track-href={link.href}
                      className="mt-1 flex items-center gap-1 text-[13px] font-semibold text-[var(--accent)] underline underline-offset-4 hover:no-underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(link.href, `social_${link.id}_btn`);
                      }}
                    >
                      Sprawdź
                      <ArrowUpRight size={14} />
                    </button>
                  </div>

                  {/* Desktop / Tablet */}
                  <div className="hidden sm:flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      {Icon && <Icon size={16} className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" />}
                      <span className="text-[13px] font-medium text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                        {link.label}
                      </span>
                      {link.stats && (
                        <span className="text-[12px] text-[var(--text-secondary)]">
                          {link.stats}
                        </span>
                      )}
                    </div>
                    <ArrowRight className="text-[var(--accent)]" size={16} />
                  </div>
                </Command.Item>
              );
            })}
          </Command.Group>
        </Command.List>

        {/* Reviews */}
        <div className="border-t border-[var(--border)] bg-white p-4">
          <div className="min-h-[6rem] flex flex-col justify-center">
            {reviews[currentReview] && (
              <div className="flex flex-col">
                <p className="text-[14px] leading-relaxed text-[var(--text)] italic">
                  &ldquo;{reviews[currentReview].content}&rdquo;
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-[12px] font-semibold text-[var(--text)]">
                    {reviews[currentReview].author}
                  </span>
                  <span className="text-[12px] text-[var(--text-secondary)]">
                    {reviews[currentReview].role}
                  </span>
                  <div className="flex text-[var(--accent)]">
                    {Array.from({ length: reviews[currentReview].rating }).map((_, i) => (
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
            )}
          </div>

          <div className="flex justify-start gap-1.5 mt-3">
            {reviews.map((_, index) => (
              <button
                key={index}
                data-track="review_dot"
                data-track-id={`review_${index}`}
                onClick={() => {
                  trackGA("review_select", { review_index: index });
                  setCurrentReview(index);
                }}
                className="w-2 h-2 rounded-full transition-colors duration-150"
                style={{
                  backgroundColor:
                    index === currentReview
                      ? "var(--text)"
                      : "var(--border)",
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
