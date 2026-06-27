import Image from "next/image";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/sections/cta-section";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { getProductBySlug, getProductsByCollection } from "@/content/shop-products";
import { getCartProductDescriptor } from "@/lib/shop/cart";

export function generateStaticParams() {
  return getProductsByCollection("haltech").map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product || product.collection !== "haltech") {
    return {
      title: "Haltech Product"
    };
  }

  return {
    title: product.title,
    description: product.shortDescription
  };
}

export default async function HaltechProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product || product.collection !== "haltech") {
    notFound();
  }

  const galleryImages = product.galleryImages?.slice(0, 6) ?? [];
  const detailImage = product.detailImage ?? product.previewImage ?? product.image;

  return (
    <>
      <PageHeader eyebrow="Shop / Haltech" title={product.title} copy={product.shortDescription} />
      <Section>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1fr]">
          <div className="grid gap-4">
            <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-graphite-950">
              <Image
                src={detailImage}
                alt={product.imageAlt ?? product.title}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-contain p-6"
              />
            </div>
            {galleryImages.length > 1 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {galleryImages.map((image, index) => (
                  <div
                    key={`${product.slug}-preview-${index}`}
                    className="relative aspect-[4/3] overflow-hidden rounded-md border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-graphite-950"
                  >
                    <Image
                      src={image}
                      alt={`${product.title} preview ${index + 1}`}
                      fill
                      sizes="(min-width: 1024px) 180px, 33vw"
                      className="object-contain p-3"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <Card className="p-6 lg:p-8">
            <div className="flex flex-wrap gap-2">
              <Badge>{product.category}</Badge>
              {product.sku ? <Badge>{product.sku}</Badge> : null}
              {product.family ? <Badge>{product.family}</Badge> : null}
            </div>
            <h2 className="mt-5 text-4xl font-black uppercase text-zinc-950 dark:text-track-white">{product.priceLabel}</h2>
            <p className="mt-6 text-sm leading-6 text-zinc-600 dark:text-track-muted">{product.longDescription}</p>
            <p className="mt-6 text-xs font-bold uppercase leading-5 text-zinc-500 dark:text-zinc-400">{product.notes}</p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="technical-label text-zinc-500 dark:text-zinc-400">Type</dt>
                <dd className="mt-2 text-sm font-black uppercase text-zinc-950 dark:text-track-white">
                  {getCartProductDescriptor(product)}
                </dd>
              </div>
              {product.pdfSourcePages ? (
                <div>
                  <dt className="technical-label text-zinc-500 dark:text-zinc-400">Source pages</dt>
                  <dd className="mt-2 text-sm font-black uppercase text-zinc-950 dark:text-track-white">
                    {product.pdfSourcePages}
                  </dd>
                </div>
              ) : null}
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AddToCartButton product={product} />
              <ButtonLink href="/shop/haltech" variant="secondary">Shop Haltech</ButtonLink>
            </div>
          </Card>
        </div>
      </Section>
      <Section tone="panel">
        <div className="grid gap-4 lg:grid-cols-3">
          {product.bestFit?.length ? (
            <Card className="p-6">
              <p className="technical-label text-cyan-700 dark:text-cyan-300">Best fit</p>
              <ul className="mt-5 grid gap-3 text-sm font-bold uppercase leading-6 text-zinc-700 dark:text-zinc-300">
                {product.bestFit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          ) : null}
          {product.chooseThisInstead?.length ? (
            <Card className="p-6">
              <p className="technical-label text-cyan-700 dark:text-cyan-300">Choose this instead</p>
              <ul className="mt-5 grid gap-3 text-sm font-bold uppercase leading-6 text-zinc-700 dark:text-zinc-300">
                {product.chooseThisInstead.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          ) : null}
          {product.applicationNotes?.length ? (
            <Card className="p-6">
              <p className="technical-label text-cyan-700 dark:text-cyan-300">Application notes</p>
              <ul className="mt-5 grid gap-3 text-sm font-bold uppercase leading-6 text-zinc-700 dark:text-zinc-300">
                {product.applicationNotes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          ) : null}
        </div>
      </Section>
      <CTASection />
    </>
  );
}
