"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type Prompt = { label: string; body: string };

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fallthrough do execCommand
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

function PromptBlock({ prompt }: { prompt: Prompt }) {
  const [state, setState] = useState<"idle" | "done" | "error">("idle");
  const [burst, setBurst] = useState(false);

  const onCopy = async () => {
    const ok = await copyText(prompt.body);
    setState(ok ? "done" : "error");
    if (ok) {
      setBurst(true);
      window.setTimeout(() => setBurst(false), 650);
    }
    window.setTimeout(() => setState("idle"), 1800);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[#1a1a1f]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5 sm:px-5">
        <span className="t-small font-semibold text-white/80">{prompt.label}</span>
        <button
          type="button"
          onClick={onCopy}
          aria-label="Kopiuj prompt"
          data-state={state}
          data-burst={burst ? "1" : "0"}
          className={`kurs-burst inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-white/10 px-2.5 py-1.5 text-[12.5px] font-semibold text-white transition-colors hover:border-white/35 hover:bg-white/20 data-[state=done]:border-[var(--chartreuse)] data-[state=done]:bg-[var(--chartreuse)] data-[state=done]:text-[var(--text)] data-[state=error]:border-red-400 data-[state=error]:bg-red-500 data-[state=error]:text-white ${
            state === "done" ? "kurs-pop" : ""
          }`}
        >
          {state === "done" ? (
            <Check size={14} strokeWidth={2.5} className="kurs-check-in" />
          ) : (
            <Copy size={14} strokeWidth={2.5} />
          )}
          {state === "done" ? "Skopiowano" : state === "error" ? "Błąd" : "Kopiuj"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[13.5px] leading-[1.65] text-[#f5f5f5] sm:px-5 sm:text-[14px]">
        <code className="font-mono">{prompt.body}</code>
      </pre>
    </div>
  );
}

export function StarterPrompts({ prompts }: { prompts: Prompt[] }) {
  if (!prompts.length) return null;
  return (
    <div className="space-y-4">
      {prompts.map((p) => (
        <PromptBlock key={p.label} prompt={p} />
      ))}
    </div>
  );
}
