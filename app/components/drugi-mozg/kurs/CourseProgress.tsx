"use client";

import { Check, Trophy } from "lucide-react";
import { useKursProgress } from "./useKursProgress";

/**
 * Pasek postepu kursu na gorze indeksu. Animowany, satysfakcjonujacy:
 * wypelnienie plynie od 0 do stanu na mount, po ukonczeniu przechodzi w
 * stan celebracji. Stan z localStorage (useKursProgress).
 */
export function CourseProgress({ slugs }: { slugs: string[] }) {
  const { mounted, done } = useKursProgress();
  const total = slugs.length;
  const doneCount = mounted ? done.filter((s) => slugs.includes(s)).length : 0;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;
  const complete = mounted && total > 0 && doneCount === total;

  return (
    <div
      className={`enter rounded-2xl border p-5 transition-colors sm:p-6 ${
        complete
          ? "border-[var(--accent)] bg-[linear-gradient(180deg,#eef1fd_0%,#ffffff_100%)]"
          : "border-[var(--border)] bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
              complete
                ? "bg-[var(--accent)] text-white kurs-pop"
                : "bg-[var(--bg-page)] text-[var(--accent)]"
            }`}
          >
            {complete ? <Trophy size={17} strokeWidth={2.5} /> : <Check size={17} strokeWidth={2.5} />}
          </div>
          <div>
            <p className="t-small font-semibold text-[var(--text)]">
              {complete ? "Ukończone. Zbudowałeś Żywy System." : "Twój postęp"}
            </p>
            <p className="t-small text-[var(--text-secondary)]">
              {doneCount} z {total} lekcji zaliczone
            </p>
          </div>
        </div>
        <span
          className={`text-[22px] font-semibold tabular-nums ${
            complete ? "text-[var(--accent)]" : "text-[var(--text)]"
          }`}
        >
          {pct}%
        </span>
      </div>

      {/* Tor + wypełnienie */}
      <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-[var(--bg-page)]">
        <div
          className="relative h-full rounded-full bg-[linear-gradient(90deg,var(--accent-light),var(--accent))] transition-[width] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: `${pct}%` }}
        >
          <span className="kurs-progress-shine absolute inset-0 rounded-full" />
        </div>
      </div>
    </div>
  );
}
