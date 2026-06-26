import { notFound } from "next/navigation";
import { PlaceholderMedia } from "@/components/media/placeholder-media";
import { CTASection } from "@/components/sections/cta-section";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { getProductBySlug, getProductsByCollection } from "@/content/shop-products";

export function generateStaticParams() {
  return getProductsByCollection("haltech").map((product) => ({ slug: product.slug }));
}

export default async function HaltechProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product || product.collection !== "haltech") {
    notFound();
  }

  return (
    <>
      <PageHeader eyebrow="Shop / Haltech" title={product.title} copy={product.shortDescription} />
      <Section>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1fr]">
          <PlaceholderMedia src={product.image} title={product.title} kicker={product.brand} className="min-h-[420px]" priority />
          <Card className="p-6 lg:p-8">
            <p className="technical-label text-cyan-700 dark:text-cyan-300">{product.category}</p>
            <h2 className="mt-5 text-4xl font-black uppercase text-zinc-950 dark:text-track-white">{product.priceLabel}</h2>
            <p className="mt-6 text-sm leading-6 text-zinc-600 dark:text-track-muted">{product.longDescription}</p>
            <p className="mt-6 text-xs font-bold uppercase leading-5 text-zinc-500 dark:text-zinc-400">{product.notes}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AddToCartButton product={product} />
              <ButtonLink href={product.ctaHref} variant="secondary">{product.ctaLabel}</ButtonLink>
              <ButtonLink href="/shop/haltech" variant="secondary">Shop Haltech</ButtonLink>
            </div>
          </Card>
        </div>
      </Section>
      <CTASection />
    </>
  );
}
