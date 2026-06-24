import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { shopProducts } from "@/content/shop-products";

type ShopProduct = (typeof shopProducts)[number];

export function ShopItemCard({ item }: { item: ShopProduct }) {
  const intakeHref = `/contact?intent=${item.slug}&service=${item.serviceSlug}`;

  return (
    <Card className="flex min-h-[300px] flex-col p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="technical-label text-cyan-700 dark:text-cyan-300">{item.category}</p>
        <p className="text-2xl font-black text-zinc-950 dark:text-track-white">{item.price}</p>
      </div>
      <h3 className="mt-6 text-2xl font-black uppercase text-zinc-950 dark:text-track-white">{item.title}</h3>
      <p className="mt-4 text-sm font-bold uppercase leading-5 text-zinc-700 dark:text-zinc-300">{item.for}</p>
      <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-track-muted">{item.summary}</p>
      <div className="mt-auto pt-8">
        <ButtonLink href={intakeHref} variant="secondary" className="w-full">
          {item.cta}
        </ButtonLink>
      </div>
    </Card>
  );
}
