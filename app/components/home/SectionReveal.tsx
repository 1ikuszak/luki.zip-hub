import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

// Static wrapper — no animation. Kept as a component for layout consistency
// and easy re-enable later if needed.
export function SectionReveal({ children, className }: Props) {
  return <div className={className}>{children}</div>;
}
