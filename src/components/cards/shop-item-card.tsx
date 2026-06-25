import { PlaceholderMedia } from "@/components/media/placeholder-media";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ShopProduct } from "@/content/shop-products";

function formatToken(value: string) {
  return value.replaceAll("_", " ");
}

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
  const statusLine =
    item.productType === "service_deposit" ? item.notes : `${formatToken(item.productType)} / ${formatToken(item.paymentMode)}`;

  return (
    <Card className="flex min-h-[420px] flex-col overflow-hidden">
      <PlaceholderMedia
        src={item.image}
        title={item.title}
        kicker={item.brand}
        className="h-44 rounded-none border-0"
        priority={priority}
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <p className="technical-label text-cyan-700 dark:text-cyan-300">{item.category}</p>
          <p className="text-right text-xl font-black text-zinc-950 dark:text-track-white">{item.priceLabel}</p>
        </div>
        <h3 className="mt-5 text-2xl font-black uppercase text-zinc-950 dark:text-track-white">{item.title}</h3>
        <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-track-muted">{item.shortDescription}</p>
        <p className="mt-4 text-xs font-bold uppercase leading-5 text-zinc-500 dark:text-zinc-400">{statusLine}</p>
        <div className="mt-auto pt-8">
          <ButtonLink href={href ?? item.ctaHref} variant="secondary" className="w-full">
            {ctaLabel ?? item.ctaLabel}
          </ButtonLink>
        </div>
      </div>
    </Card>
  );
}
