import { ServiceCard } from "@/components/cards/service-card";
import { CTASection } from "@/components/sections/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { servicePaths } from "@/content/services";

export const metadata = {
  title: "Services"
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Choose the tuning path before chasing power."
        copy="Dyno, remote, factory ECU, standalone, wiring, and Haltech support are scoped around mechanical readiness and useful data."
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {servicePaths.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>
      <CTASection />
    </>
  );
}
