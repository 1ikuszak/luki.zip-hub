"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Progres kursu w localStorage - zero kont, zero bazy. Trzyma liste ukonczonych
 * slugow lekcji ("dzien-1" ...). Komponenty synchronizuja sie przez custom event,
 * wiec pasek progresu, checki na kartach i przycisk "zaliczone" zawsze zgodne.
 */
const KEY = "drugi-mozg-kurs-progress";
const EVT = "kurs-progress-change";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function write(list: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify([...new Set(list)]));
    window.dispatchEvent(new Event(EVT));
  } catch {
    // brak localStorage (tryb prywatny) - progres po prostu nie zapamietany
  }
}

export function useKursProgress() {
  const [done, setDone] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const sync = () => setDone(read());
    sync();
    setMounted(true);
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((slug: string) => {
    const cur = read();
    write(cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug]);
  }, []);

  const setDoneState = useCallback((slug: string, value: boolean) => {
    const cur = read();
    if (value) write([...cur, slug]);
    else write(cur.filter((s) => s !== slug));
  }, []);

  return {
    mounted,
    done,
    isDone: (slug: string) => done.includes(slug),
    toggle,
    setDoneState,
  };
}
