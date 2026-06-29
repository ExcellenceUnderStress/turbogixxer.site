import Image from "next/image";
import { ShopItemCard } from "@/components/cards/shop-item-card";
import { CTASection } from "@/components/sections/cta-section";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import {
  haltechDecisionChecks,
  haltechEcuGuideCards,
  haltechSupportHardwareCards
} from "@/content/haltech-guide";
import { getProductsByCollection } from "@/content/shop-products";
import { getShopProductDisplayTitle, getShopProductImageAlt } from "@/lib/shop/display";

export const metadata = {
  title: "Haltech Products",
  description: "Haltech ECU, display, CAN, and harness catalog with TurboGixxer fitment guidance."
};

const categoryOrder = ["ECU / VCU", "Display", "CAN Control", "Harness"] as const;

const categoryCopy: Record<(typeof categoryOrder)[number], string> = {
  "ECU / VCU": "Main ECUs and VCUs selected around channel count, wiring scope, logging, CAN, and control depth.",
  Display: "Driver-facing CAN display hardware for monitored data, warnings, and clean feedback.",
  "CAN Control": "Keypads, hubs, cables, and CAN network pieces that support the control plan.",
  Harness: "Harness hardware for generic universal wire-in, breakout, and accessory wiring plans."
};

export default function HaltechCollectionPage() {
  const products = getProductsByCollection("haltech");
  const productsBySku = new Map<string, (typeof products)[number]>(
    products.flatMap((product): [string, (typeof products)[number]][] =>
      product.sku ? [[product.sku, product]] : []
    )
  );
  const ecuGuideCards = haltechEcuGuideCards.flatMap((guide) => {
    const product = productsBySku.get(guide.sku);
    return product ? [{ guide, product }] : [];
  });
  const supportHardwareCards = haltechSupportHardwareCards.flatMap((support) => {
    const product = productsBySku.get(support.sku);
    return product ? [{ support, product }] : [];
  });
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
      <Section tone="muted">
        <div id="ecu-guide" className="grid gap-8">
          <div className="max-w-4xl">
            <p className="technical-label text-cyan-700 dark:text-cyan-300">ECU buyer guide</p>
            <h2 className="mt-4 text-3xl font-black uppercase text-zinc-950 dark:text-track-white sm:text-4xl">
              Choose the ECU by what the build actually needs.
            </h2>
            <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-track-muted">
              The reusable guide content is limited to products already in this catalog with optimized production
              media. Channel count, DBW, knock control, logging, CAN layout, power distribution, and wiring scope
              decide the recommendation before checkout.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {ecuGuideCards.map(({ guide, product }, index) => (
              <Card key={guide.sku} className="grid overflow-hidden md:grid-cols-[0.8fr_1fr] lg:grid-cols-1">
                <div className="relative min-h-56 border-b border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-graphite-950 md:border-b-0 md:border-r lg:border-b lg:border-r-0">
                  <Image
                    src={product.previewImage ?? product.image}
                    alt={getShopProductImageAlt(product)}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 100vw"
                    className="object-contain p-5"
                  />
                </div>
                <div className="flex flex-col p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="technical-label text-cyan-700 dark:text-cyan-300">{guide.eyebrow}</p>
                    </div>
                    <p className="text-right text-lg font-black text-zinc-950 dark:text-track-white">
                      {product.priceLabel}
                    </p>
                  </div>
                  <h3 className="mt-5 break-words text-2xl font-black uppercase leading-8 text-zinc-950 dark:text-track-white">
                    {guide.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-track-muted">{guide.summary}</p>
                  <p className="mt-4 text-xs font-black uppercase leading-5 text-zinc-500 dark:text-zinc-400">
                    {guide.outputSummary}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-track-muted">{guide.bestFor}</p>
                  <ul className="mt-5 grid gap-2 text-xs font-bold uppercase leading-5 text-zinc-600 dark:text-zinc-300">
                    {guide.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <ButtonLink href={`/shop/haltech/${product.slug}`} variant="secondary" className="mt-6 w-full">
                    View matched product
                  </ButtonLink>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
      <Section tone="panel">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1fr]">
          <div>
            <p className="technical-label text-cyan-700 dark:text-cyan-300">Fitment checks</p>
            <h2 className="mt-4 text-3xl font-black uppercase text-zinc-950 dark:text-track-white">
              Fitment comes before the cart.
            </h2>
            <div className="mt-6 grid gap-4">
              {haltechDecisionChecks.map((item) => (
                <Card key={item.title} className="p-5">
                  <h3 className="text-lg font-black uppercase text-zinc-950 dark:text-track-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-track-muted">{item.body}</p>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <p className="technical-label text-cyan-700 dark:text-cyan-300">Supporting hardware</p>
            <h2 className="mt-4 text-3xl font-black uppercase text-zinc-950 dark:text-track-white">
              Add hardware after the ECU path is confirmed.
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {supportHardwareCards.map(({ support, product }) => (
                <Card key={support.sku} className="grid overflow-hidden">
                  <div className="relative aspect-[4/3] border-b border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-graphite-950">
                    <Image
                      src={product.image}
                      alt={getShopProductImageAlt(product)}
                      fill
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw"
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="p-5">
                    <p className="technical-label text-cyan-700 dark:text-cyan-300">{support.eyebrow}</p>
                    <h3 className="mt-3 break-words text-lg font-black uppercase leading-6 text-zinc-950 dark:text-track-white">
                      {getShopProductDisplayTitle(product)}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-track-muted">{support.summary}</p>
                    <ButtonLink href={`/shop/haltech/${product.slug}`} variant="ghost" className="mt-5 w-full">
                      View product
                    </ButtonLink>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
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
