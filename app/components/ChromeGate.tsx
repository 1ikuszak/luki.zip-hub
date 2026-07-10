"use client";

import { usePathname } from "next/navigation";

const HIDDEN_ROUTES = ["/links"];

// Strefa kursu = bez site-chrome (navbar/footer): kursant po zakupie ma byc
// w "aplikacji kursu", nie na stronie-wizytowce. Landing /drugi-mozg
// CELOWO zostaje z navbarem (to nadal strona sprzedazowa).
const HIDDEN_PREFIXES = ["/drugi-mozg/kurs", "/drugi-mozg/dziekuje"];

export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (!pathname) return <>{children}</>;
  if (HIDDEN_ROUTES.includes(pathname)) return null;
  if (HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/")))
    return null;
  return <>{children}</>;
}
