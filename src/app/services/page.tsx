import { ServiceCard } from "@/components/cards/service-card";
import { CTASection } from "@/components/sections/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { bookableServicePaths } from "@/content/services";

export const metadata = {
  title: "Services"
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Choose the service lane before chasing power."
        copy="Dyno tuning and remote tuning are the service lanes. Factory and standalone ECU work are platform paths inside tuning, and the deposit applies toward the approved tune."
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {bookableServicePaths.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>
      <CTASection />
    </>
  );
}
