"use client";

import { usePathname } from "next/navigation";

const HIDDEN_ROUTES = ["/links"];

export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname && HIDDEN_ROUTES.includes(pathname)) return null;
  return <>{children}</>;
}
