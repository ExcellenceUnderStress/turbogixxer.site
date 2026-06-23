import { BuildFeatureCard } from "@/components/cards/build-feature-card";
import { MediaCard } from "@/components/cards/media-card";
import { CTASection } from "@/components/sections/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { buildPreviews, featuredBuild } from "@/content/builds";
import { galleryItems } from "@/content/media";

export const metadata = {
  title: "Builds"
};

export default function BuildsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Builds"
        title="Case-study structure ready for real results."
        copy="Placeholder build cards show how future dyno charts, calibration notes, and media will land without changing the site architecture."
      />
      <Section>
        <BuildFeatureCard build={featuredBuild} />
      </Section>
      <Section tone="muted">
        <div className="grid gap-4 md:grid-cols-3">
          {buildPreviews.map((build) => (
            <div
              key={build.title}
              className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
            >
              <p className="technical-label text-cyan-600 dark:text-cyan-300">{build.platform}</p>
              <h2 className="mt-4 text-2xl font-black uppercase text-zinc-950 dark:text-track-white">
                {build.title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-track-muted">{build.result}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <MediaCard key={item.title} item={item} />
          ))}
        </div>
      </Section>
      <CTASection />
    </>
  );
}
