"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { navItems } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="theme-transition sticky top-0 z-50 border-b border-zinc-200 bg-white/88 backdrop-blur-xl dark:border-white/10 dark:bg-graphite-950/88">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "technical-label text-[0.66rem] text-zinc-500 transition hover:text-cyan-700 dark:text-track-muted dark:hover:text-cyan-300",
                pathname === item.href && "text-cyan-700 dark:text-cyan-300"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <ButtonLink href="/contact" className="min-h-10 px-4">
            Start Intake
          </ButtonLink>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="theme-transition inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 bg-white text-zinc-900 dark:border-white/15 dark:bg-white/[0.04] dark:text-track-white"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="theme-transition border-t border-zinc-200 bg-white px-4 py-4 dark:border-white/10 dark:bg-graphite-925 lg:hidden">
          <nav className="grid gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "theme-transition rounded-md border border-zinc-200 px-4 py-3 text-sm font-black uppercase text-zinc-600 dark:border-white/10 dark:text-track-muted",
                  pathname === item.href && "border-cyan-500/50 text-cyan-700 dark:text-cyan-300"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
