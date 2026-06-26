import Ecommerce7 from "@/components/blocks/ecommerce-7";
import { CTASection } from "@/components/sections/cta-section";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Shop"
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Shop Haltech and tuning deposits."
        copy="Haltech products, tuning deposits, and staged fuel-system paths stay tied to vehicle details and service scope."
      />
      <Ecommerce7 />
      <CTASection />
    </>
  );
}
