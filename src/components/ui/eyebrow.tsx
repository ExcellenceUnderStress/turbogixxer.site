import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: string; className?: string }) {
  return <p className={cn("technical-label text-cyan-700 dark:text-cyan-300", className)}>{children}</p>;
}
