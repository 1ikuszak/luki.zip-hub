"use client";

import { useState } from "react";
import { ArrowDownToLine, Check, FileText, Package } from "lucide-react";
import type { DownloadFile } from "@/lib/kurs";

// Autoryzację niesie httpOnly cookie sesji (przeglądarka dokleja ją sama) —
// zero tokenów w URL-ach pobrań.
function hrefFor(name: string): string {
  return `/api/kurs/download?f=${encodeURIComponent(name)}`;
}

function kb(bytes: number): string {
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/**
 * Pakiet startowy do pobrania. Klik pobiera realny plik (bramkowany route),
 * a przycisk odpala satysfakcjonujaca animacje (pop + halo-ring + morph w check).
 */
export function Downloads({
  zip,
  files,
}: {
  zip: DownloadFile;
  files: DownloadFile[];
}) {
  const [hit, setHit] = useState<Record<string, boolean>>({});

  const fire = (name: string) => {
    setHit((h) => ({ ...h, [name]: true }));
    window.setTimeout(() => setHit((h) => ({ ...h, [name]: false })), 1800);
  };

  return (
    <div className="space-y-5">
      {/* Cały pakiet - główny CTA */}
      <a
        href={hrefFor(zip.name)}
        download={zip.name}
        onClick={() => fire(zip.name)}
        data-burst={hit[zip.name] ? "1" : "0"}
        className={`kurs-burst group flex items-center justify-between gap-4 rounded-2xl bg-[var(--accent)] p-5 text-white shadow-[0_24px_60px_-24px_rgba(38,86,217,0.6)] transition-transform hover:scale-[1.01] active:scale-[0.99] ${
          hit[zip.name] ? "kurs-pop" : ""
        }`}
      >
        <span className="flex items-center gap-3.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
            {hit[zip.name] ? (
              <Check size={20} strokeWidth={2.75} className="kurs-check-in" />
            ) : (
              <Package size={20} strokeWidth={2} />
            )}
          </span>
          <span>
            <span className="block text-[16px] font-semibold">
              {hit[zip.name] ? "Pobieranie..." : "Pobierz cały pakiet"}
            </span>
            <span className="block text-[13px] text-white/70">
              ZIP - prompty, hooki, skille · {kb(zip.size)}
            </span>
          </span>
        </span>
        <ArrowDownToLine
          size={20}
          strokeWidth={2.25}
          className="shrink-0 transition-transform group-hover:translate-y-0.5"
        />
      </a>

      {/* Pojedyncze pliki */}
      <div>
        <p className="t-small mb-2 font-semibold text-[var(--text-secondary)]">
          Albo pojedynczo:
        </p>
        <ul className="divide-y divide-[var(--border)] overflow-hidden rounded-2xl border border-[var(--border)]">
          {files.map((file) => (
            <li key={file.name}>
              <a
                href={hrefFor(file.name)}
                download={file.name}
                onClick={() => fire(file.name)}
                data-burst={hit[file.name] ? "1" : "0"}
                className={`kurs-burst group flex items-center justify-between gap-3 bg-white px-4 py-3 transition-colors hover:bg-[var(--bg-page)] sm:px-5 ${
                  hit[file.name] ? "kurs-pop-soft" : ""
                }`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <FileText size={16} strokeWidth={2} className="shrink-0 text-[var(--text-secondary)]" />
                  <span className="truncate text-[15px] font-medium text-[var(--text)]">
                    {file.label}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-2.5">
                  <span className="t-small tabular-nums text-[var(--text-secondary)]">
                    {kb(file.size)}
                  </span>
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                      hit[file.name]
                        ? "bg-[var(--accent)] text-white"
                        : "bg-[var(--bg-page)] text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white"
                    }`}
                  >
                    {hit[file.name] ? (
                      <Check size={14} strokeWidth={3} className="kurs-check-in" />
                    ) : (
                      <ArrowDownToLine size={14} strokeWidth={2.5} />
                    )}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
