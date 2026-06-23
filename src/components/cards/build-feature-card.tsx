import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { PlaceholderMedia } from "@/components/media/placeholder-media";
import { featuredBuild } from "@/content/builds";

type Build = typeof featuredBuild;

export function BuildFeatureCard({ build }: { build: Build }) {
  return (
    <Card className="grid gap-8 p-5 sm:p-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <div>
        <p className="technical-label text-cyan-700 dark:text-cyan-300">{build.chassis}</p>
        <h2 className="display-heading mt-4 text-4xl text-zinc-950 dark:text-track-white sm:text-5xl">
          {build.title}
        </h2>
        <p className="mt-5 text-base leading-7 text-zinc-600 dark:text-track-muted">{build.summary}</p>
        <div className="mt-7 grid grid-cols-2 gap-3">
          {build.stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
        <div className="mt-7 grid gap-3">
          {build.points.map((point) => (
            <div key={point} className="flex gap-3 text-sm leading-6 text-zinc-600 dark:text-track-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold-400" />
              <span>{point}</span>
            </div>
          ))}
        </div>
        <ButtonLink href="/builds" variant="secondary" className="mt-8 w-full sm:w-fit">
          View Builds
        </ButtonLink>
      </div>

      <PlaceholderMedia
        src={build.image}
        title={build.platform}
        kicker="Featured build"
        className="aspect-[4/3]"
      />
    </Card>
  );
}
