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
        title="Tuning services."
        copy="Choose dyno tuning when the vehicle needs controlled load and in-person validation. Choose remote tuning when the car is mechanically ready and can provide clean logs."
      />
      <ServicePathFeatures
        title="Service pricing."
        copy="Prices shown are starting points for a ready vehicle. The $200 deposit starts intake and applies toward the approved dyno or remote tune; final scope depends on the ECU, fuel, and build condition."
        services={bookableServicePaths}
      />
      <CTASection />
    </>
  );
}
