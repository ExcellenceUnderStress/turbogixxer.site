import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "border-cyan-500 bg-cyan-500 text-graphite-950 shadow-cyan hover:border-cyan-400 hover:bg-cyan-400",
  secondary:
    "border-zinc-300 bg-white text-zinc-950 hover:border-cyan-500 hover:text-cyan-700 dark:border-white/20 dark:bg-white/[0.04] dark:text-track-white dark:hover:border-cyan-300/60 dark:hover:text-cyan-200",
  ghost:
    "border-transparent bg-transparent text-zinc-600 hover:border-zinc-300 hover:text-zinc-950 dark:text-track-muted dark:hover:border-white/20 dark:hover:text-track-white"
} as const;

const baseClass =
  "theme-transition inline-flex min-h-11 items-center justify-center rounded-md border px-5 py-3 text-center text-xs font-black uppercase leading-none";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(baseClass, variants[variant], className)}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
}) {
  return (
    <button className={cn(baseClass, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
