import { ShopItemCard } from "@/components/cards/shop-item-card";
import { CTASection } from "@/components/sections/cta-section";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { getProductsByCollection } from "@/content/shop-products";
import type { ProductCollection } from "@/content/shop-products";

export function ShopCollectionPage({
  collection,
  title,
  copy
}: {
  collection: ProductCollection;
  title: string;
  copy: string;
}) {
  const products = getProductsByCollection(collection);

  return (
    <>
      <PageHeader eyebrow="Shop Collection" title={title} copy={copy} />
      <Section>
        {products.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((item, index) => (
              <ShopItemCard key={item.slug} item={item} priority={index === 0} />
            ))}
          </div>
        ) : (
          <Card className="p-8">
            <p className="technical-label text-cyan-700 dark:text-cyan-300">Coming soon</p>
            <h2 className="mt-4 text-3xl font-black uppercase text-zinc-950 dark:text-track-white">
              Products are being staged.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-track-muted">
              This collection exists in the Shop structure so products can be added centrally when product type,
              payment mode, fulfillment, and checkout behavior are ready.
            </p>
          </Card>
        )}
      </Section>
      <CTASection />
    </>
  );
}
