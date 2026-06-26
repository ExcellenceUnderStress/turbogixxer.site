import { ShopItemCard } from "@/components/cards/shop-item-card";
import { CTASection } from "@/components/sections/cta-section";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { getProductsByCollection } from "@/content/shop-products";

export const metadata = {
  title: "Haltech Products"
};

export default function HaltechCollectionPage() {
  const products = getProductsByCollection("haltech");

  return (
    <>
      <PageHeader
        eyebrow="Shop / Haltech"
        title="Haltech with fitment support."
        copy="Haltech hardware belongs in Shop. TurboGixxer supports product selection with wiring context, tuning context, and fitment review before checkout expands."
      />
      <Section tone="panel">
        <Card className="grid gap-6 p-6 lg:grid-cols-[1fr_0.8fr] lg:p-8">
          <div>
            <p className="technical-label text-cyan-700 dark:text-cyan-300">Dealer & support positioning</p>
            <h2 className="mt-4 text-3xl font-black uppercase text-zinc-950 dark:text-track-white">
              Hardware decisions should match the build plan.
            </h2>
            <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-track-muted">
              Hardware quote requests are separate from service deposits. Future checkout can attach to active products after quote rules, inventory behavior, and fulfillment are confirmed.
            </p>
          </div>
          <ul className="grid gap-3 text-sm font-bold uppercase text-zinc-700 dark:text-zinc-300">
            <li>ECU, VCU, display, CAN, and wideband planning</li>
            <li>Wiring and sensor readiness review</li>
            <li>Dyno or remote tuning context before parts are ordered</li>
          </ul>
        </Card>
      </Section>
      <Section>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((item, index) => (
            <ShopItemCard
              key={item.slug}
              item={item}
              href={`/shop/haltech/${item.slug}`}
              ctaLabel="Shop Haltech"
              priority={index === 0}
            />
          ))}
        </div>
      </Section>
      <CTASection />
    </>
  );
}
