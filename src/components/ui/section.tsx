import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const tones = {
  default: "bg-zinc-50 dark:bg-graphite-950",
  muted: "bg-zinc-100/80 dark:bg-graphite-925",
  panel: "bg-white dark:bg-graphite-900"
} as const;

export function Section({
  children,
  tone = "default",
  className,
  containerClassName
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section className={cn("theme-transition py-16 sm:py-20", tones[tone], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
