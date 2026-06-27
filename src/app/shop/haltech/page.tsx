import { ShopItemCard } from "@/components/cards/shop-item-card";
import { CTASection } from "@/components/sections/cta-section";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { getProductsByCollection } from "@/content/shop-products";

export const metadata = {
  title: "Haltech Products"
};

const categoryOrder = ["ECU / VCU", "Display", "CAN Control", "Harness"] as const;

const categoryCopy: Record<(typeof categoryOrder)[number], string> = {
  "ECU / VCU": "Main ECUs, VCUs, direct plug-in options, and ECU-specific adaptor paths.",
  Display: "Driver-facing CAN display hardware for monitored data, warnings, and clean feedback.",
  "CAN Control": "Keypads, hubs, adaptors, and CAN network pieces that support the control plan.",
  Harness: "Plug-and-play, universal, breakout, and accessory harness hardware for the wiring plan."
};

export default function HaltechCollectionPage() {
  const products = getProductsByCollection("haltech");
  const productGroups = categoryOrder
    .map((category) => ({
      category,
      products: products.filter((product) => product.category === category)
    }))
    .filter((group) => group.products.length > 0);

  return (
    <>
      <PageHeader
        eyebrow="Shop / Haltech"
        title="Haltech catalog with fitment support."
        copy="Haltech hardware belongs in Shop. TurboGixxer keeps ECU, display, CAN, and harness selection tied to wiring context, tuning context, and application details."
      />
      <Section tone="panel">
        <Card className="grid gap-6 p-6 lg:grid-cols-[1fr_0.8fr] lg:p-8">
          <div>
            <p className="technical-label text-cyan-700 dark:text-cyan-300">Dealer & support positioning</p>
            <h2 className="mt-4 text-3xl font-black uppercase text-zinc-950 dark:text-track-white">
              Hardware decisions should match the build plan.
            </h2>
            <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-track-muted">
              Hardware orders are separate from service deposits. Checkout can carry product selection now, with final pricing, inventory behavior, and fulfillment rules attached as they are confirmed.
            </p>
          </div>
          <ul className="grid gap-3 text-sm font-bold uppercase text-zinc-700 dark:text-zinc-300">
            <li>{products.length} Haltech product listings staged</li>
            <li>ECU, VCU, display, CAN, and harness planning</li>
            <li>Wiring, application, and calibration context before parts are ordered</li>
          </ul>
        </Card>
      </Section>
      {productGroups.map((group) => (
        <Section key={group.category}>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="technical-label text-cyan-700 dark:text-cyan-300">{group.products.length} listings</p>
              <h2 className="mt-3 text-3xl font-black uppercase text-zinc-950 dark:text-track-white">
                {group.category}
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-zinc-600 dark:text-track-muted">
              {categoryCopy[group.category]}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {group.products.map((item, index) => (
              <ShopItemCard
                key={item.slug}
                item={item}
                href={`/shop/haltech/${item.slug}`}
                ctaLabel="View details"
                priority={group.category === "ECU / VCU" && index === 0}
              />
            ))}
          </div>
        </Section>
      ))}
      <CTASection />
    </>
  );
}
