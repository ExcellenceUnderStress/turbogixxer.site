import Image from "next/image";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ShopProduct } from "@/content/shop-products";
import { getCartProductDescriptor } from "@/lib/shop/cart";

export function ShopItemCard({
  item,
  href,
  ctaLabel,
  priority = false
}: {
  item: ShopProduct;
  href?: string;
  ctaLabel?: string;
  priority?: boolean;
}) {
  const statusLine = item.productType === "service_deposit" ? item.notes : getCartProductDescriptor(item);

  return (
    <Card className="flex min-h-[460px] flex-col overflow-hidden">
      <div className="relative h-48 border-b border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-graphite-950">
        <Image
          src={item.image}
          alt={item.imageAlt ?? item.title}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 320px, (min-width: 768px) 50vw, 100vw"
          className="object-contain p-5"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="technical-label text-cyan-700 dark:text-cyan-300">{item.category}</p>
            {item.sku ? (
              <p className="mt-2 font-mono text-xs font-black uppercase text-zinc-500 dark:text-zinc-400">
                {item.sku}
              </p>
            ) : null}
          </div>
          <p className="text-right text-xl font-black text-zinc-950 dark:text-track-white">{item.priceLabel}</p>
        </div>
        <h3 className="mt-5 break-words text-xl font-black uppercase leading-7 text-zinc-950 dark:text-track-white">
          {item.title}
        </h3>
        <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-track-muted">{item.shortDescription}</p>
        <p className="mt-4 text-xs font-bold uppercase leading-5 text-zinc-500 dark:text-zinc-400">{statusLine}</p>
        <div className="mt-auto grid gap-3 pt-8">
          <AddToCartButton product={item} className="w-full" />
          <ButtonLink href={href ?? item.ctaHref} variant="secondary" className="w-full">
            {ctaLabel ?? item.ctaLabel}
          </ButtonLink>
        </div>
      </div>
    </Card>
  );
}
