"use client";

import { useEffect, useCallback } from "react";

interface ShortcutConfig {
  key: string;
  metaKey?: boolean;
  callback: () => void;
}

export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const metaPressed = event.metaKey || event.ctrlKey;
        const keyMatch =
          event.key.toLowerCase() === shortcut.key.toLowerCase();

        const shouldTrigger = shortcut.metaKey
          ? metaPressed && keyMatch
          : keyMatch && !metaPressed;

        if (shouldTrigger) {
          event.preventDefault();
          shortcut.callback();
          break;
        }
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
