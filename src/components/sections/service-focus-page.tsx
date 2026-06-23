import { ServiceCard } from "@/components/cards/service-card";
import { CTASection } from "@/components/sections/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { StatCard } from "@/components/ui/stat-card";
import { servicePages, servicePaths } from "@/content/services";

type ServicePage = (typeof servicePages)[keyof typeof servicePages];

export function ServiceFocusPage({ page }: { page: ServicePage }) {
  const pageSlugs = page.serviceSlugs as readonly string[];
  const services = servicePaths.filter((service) => pageSlugs.includes(service.slug));

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
            <p className="technical-label text-cyan-700 dark:text-cyan-300">Workflow</p>
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
      <Section tone="muted">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>
      <CTASection />
    </>
  );
}
