import ServicePathFeatures from "@/components/blocks/features-6";
import { CTASection } from "@/components/sections/cta-section";
import { PageHeader } from "@/components/ui/page-header";
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
      <ServicePathFeatures services={bookableServicePaths} />
      <CTASection />
    </>
  );
}
