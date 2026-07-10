"use client";

import { useEffect } from "react";
import { Toast } from "@/app/components/poradnik/Toast";

/**
 * Wstrzykuje przycisk "Kopiuj" do kazdego <pre> w tresci lekcji + satysfakcjonujaca
 * animacja na sukces (pop + halo-ring kurs-burst + flash chartreuse). Fork
 * CopyCodeButtons, ale skanuje WSZYSTKIE .markdown i ma mocniejszy feedback.
 */
const COPY_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
const CHECK_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

const idleHTML = `<span class="copy-btn__icon">${COPY_ICON}</span><span class="copy-btn__label">Kopiuj</span>`;
const doneHTML = `<span class="copy-btn__icon">${CHECK_ICON}</span><span class="copy-btn__label">Skopiowano</span>`;

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fallthrough
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function KursCopyButtons() {
  useEffect(() => {
    const roots = Array.from(document.querySelectorAll<HTMLElement>(".markdown"));
    const pres = roots.flatMap((r) =>
      Array.from(r.querySelectorAll<HTMLPreElement>("pre")),
    );
    const cleanups: Array<() => void> = [];

    for (const pre of pres) {
      if (pre.querySelector(".copy-btn")) continue;
      // Drzewka struktury (```tree*) to grafika, nie kod - zero przycisku Kopiuj.
      if (pre.querySelector('code[class*="language-tree"]')) continue;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-btn kurs-burst";
      btn.innerHTML = idleHTML;
      btn.setAttribute("aria-label", "Kopiuj prompt");

      let resetTimer: ReturnType<typeof setTimeout> | null = null;

      const onClick = async () => {
        const code = pre.querySelector("code")?.innerText ?? pre.innerText;
        const ok = await copyText(code);
        if (!ok) {
          btn.dataset.copied = "error";
          btn.innerHTML = `<span class="copy-btn__icon">${COPY_ICON}</span><span class="copy-btn__label">Błąd</span>`;
          window.dispatchEvent(
            new CustomEvent("luki:toast", {
              detail: { message: "Nie udało się skopiować", tone: "error" },
            }),
          );
        } else {
          btn.dataset.copied = "true";
          btn.dataset.burst = "1";
          btn.classList.remove("kurs-pop");
          void btn.offsetWidth; // reflow -> restart animacji
          btn.classList.add("kurs-pop");
          btn.innerHTML = doneHTML;
          window.dispatchEvent(
            new CustomEvent("luki:toast", {
              detail: { message: "Skopiowano do schowka" },
            }),
          );
          window.setTimeout(() => {
            btn.dataset.burst = "0";
          }, 650);
        }
        if (resetTimer) clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
          btn.innerHTML = idleHTML;
          delete btn.dataset.copied;
          btn.classList.remove("kurs-pop");
        }, 1900);
      };

      btn.addEventListener("click", onClick);
      pre.appendChild(btn);
      cleanups.push(() => {
        btn.removeEventListener("click", onClick);
        if (resetTimer) clearTimeout(resetTimer);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return <Toast />;
}
