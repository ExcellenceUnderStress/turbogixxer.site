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
        copy="Deposits and consult starters route customers into the right technical intake before payment, scheduling, or final scope."
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
