import { ShopItemCard } from "@/components/cards/shop-item-card";
import { CTASection } from "@/components/sections/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { shopProducts } from "@/content/shop-products";

export const metadata = {
  title: "Shop"
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Service-commerce without the catalog noise."
        copy="Deposits and consult placeholders guide customers into a technical intake path while backend payment and scheduling integrations wait for a later pass."
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {shopProducts.map((item) => (
            <ShopItemCard key={item.slug} item={item} />
          ))}
        </div>
      </Section>
      <CTASection />
    </>
  );
}
