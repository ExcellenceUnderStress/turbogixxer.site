"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const modes = ["system", "light", "dark"] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));

    return () => cancelAnimationFrame(frame);
  }, []);

  const currentTheme = (theme || "system") as (typeof modes)[number];
  const nextTheme = modes[(modes.indexOf(currentTheme) + 1) % modes.length];
  const Icon = !mounted || currentTheme === "system" ? Monitor : currentTheme === "dark" ? Moon : Sun;
  const label = mounted ? `Theme: ${currentTheme}. Switch to ${nextTheme}.` : "Theme";

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => setTheme(nextTheme)}
      className="theme-transition inline-flex h-10 items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 text-xs font-black uppercase text-zinc-700 hover:border-cyan-500 hover:text-zinc-950 dark:border-white/15 dark:bg-white/[0.04] dark:text-track-muted dark:hover:border-cyan-300/60 dark:hover:text-track-white"
    >
      <Icon size={16} strokeWidth={2.2} />
      <span className="hidden sm:inline">{mounted ? currentTheme : "Theme"}</span>
    </button>
  );
}
