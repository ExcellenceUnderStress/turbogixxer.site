import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "theme-transition rounded-lg border border-zinc-200 bg-white shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/20",
        className
      )}
    >
      {children}
    </div>
  );
}
