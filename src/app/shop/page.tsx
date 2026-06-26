import Link from "next/link";
import { CTASection } from "@/components/sections/cta-section";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { getVisibleShopCollections } from "@/content/shop-products";

export const metadata = {
  title: "Shop"
};

export default function ShopPage() {
  const collections = getVisibleShopCollections();

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Service-commerce without the catalog noise."
        copy="Products, deposits, and consults stay intake-first so hardware, service scope, and scheduling stay tied to build review."
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {collections.map((collection) => (
            <Link key={collection.slug} href={collection.href} className="group block">
              <Card className="flex min-h-[260px] flex-col p-6 transition group-hover:-translate-y-1 group-hover:border-cyan-500/60">
                <div className="flex items-center justify-between gap-4">
                  <p className="technical-label text-cyan-700 dark:text-cyan-300">Collection</p>
                  <p className="technical-label text-zinc-500 dark:text-track-muted">{collection.status}</p>
                </div>
                <h2 className="mt-8 text-3xl font-black uppercase text-zinc-950 dark:text-track-white">
                  {collection.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-track-muted">{collection.summary}</p>
                <p className="mt-auto pt-8 text-xs font-black uppercase text-cyan-700 dark:text-cyan-300">
                  View collection →
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
      <CTASection />
    </>
  );
}
