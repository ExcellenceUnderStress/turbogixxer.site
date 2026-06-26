import ServicePathFeatures from "@/components/blocks/features-6";
import { CTASection } from "@/components/sections/cta-section";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { StatCard } from "@/components/ui/stat-card";
import { servicePages, servicePaths } from "@/content/services";

type ServicePage = (typeof servicePages)[keyof typeof servicePages];

export function ServiceFocusPage({ page }: { page: ServicePage }) {
  const pageSlugs = page.serviceSlugs as readonly string[];
  const services = servicePaths.filter((service) => pageSlugs.includes(service.slug));
  const ecuPaths = "ecuPaths" in page ? page.ecuPaths : undefined;

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} copy={page.copy} />
      <Section>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {page.stats.map((stat) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:p-6">
            <p className="technical-label text-cyan-700 dark:text-cyan-300">Work scope</p>
            <div className="mt-6 grid gap-4">
              {page.bullets.map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-6 text-zinc-600 dark:text-track-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-cyan-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
      {ecuPaths ? (
        <Section>
          <div className="max-w-3xl">
            <p className="technical-label text-cyan-700 dark:text-cyan-300">Supported ECU platforms</p>
            <h2 className="display-heading mt-4 text-4xl text-zinc-950 dark:text-track-white sm:text-5xl">
              Factory and standalone live inside tuning.
            </h2>
            <p className="mt-5 text-base leading-7 text-zinc-600 dark:text-track-muted">
              Dyno and remote are delivery methods. Factory ECU and standalone ECU determine setup, logging,
              validation, and support scope.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {ecuPaths.map((path) => (
              <Card key={path.title} className="p-5">
                <p className="technical-label text-cyan-700 dark:text-cyan-300">{path.label}</p>
                <h3 className="mt-5 text-2xl font-black uppercase text-zinc-950 dark:text-track-white">
                  {path.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-track-muted">{path.summary}</p>
                <div className="mt-6 grid gap-2">
                  {path.delivery.map((delivery) => (
                    <div key={delivery} className="flex gap-3 text-sm text-zinc-600 dark:text-track-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-cyan-500" />
                      <span>{delivery}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Section>
      ) : null}
      <ServicePathFeatures
        eyebrow={`${page.eyebrow} services`}
        title="Approved services for this build."
        copy="Use the service that matches the actual work being approved. Each option carries its own readiness checks, review points, and deposit language."
        services={services}
      />
      <CTASection />
    </>
  );
}
