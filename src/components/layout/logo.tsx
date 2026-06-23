import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center text-[1.18rem] font-black uppercase leading-none", className)}
      aria-label="TurboGixxer home"
    >
      <span className="text-zinc-950 dark:text-track-white">Turbo</span>
      <span className="text-cyan-600 dark:text-cyan-400">Gixxer</span>
    </Link>
  );
}
