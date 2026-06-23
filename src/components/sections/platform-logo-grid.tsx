import { platforms } from "@/content/platforms";

export function PlatformLogoGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {platforms.map((platform) => (
        <div
          key={platform}
          className="theme-transition flex min-h-24 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-center text-lg font-black uppercase text-zinc-800 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-track-white"
        >
          {platform}
        </div>
      ))}
    </div>
  );
}
