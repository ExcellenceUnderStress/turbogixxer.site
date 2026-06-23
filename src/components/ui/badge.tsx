import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "theme-transition inline-flex rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-black uppercase text-cyan-700 dark:text-cyan-300",
        className
      )}
    >
      {children}
    </span>
  );
}
