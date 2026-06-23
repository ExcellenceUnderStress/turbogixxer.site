import { PlaceholderMedia } from "@/components/media/placeholder-media";
import { Card } from "@/components/ui/card";
import { galleryItems } from "@/content/media";

type GalleryItem = (typeof galleryItems)[number];

export function MediaCard({ item }: { item: GalleryItem }) {
  return (
    <Card className="overflow-hidden">
      <PlaceholderMedia src={item.image} title={item.title} className="aspect-[5/4] rounded-none border-0" />
      <div className="p-5">
        <h3 className="text-xl font-black uppercase text-zinc-950 dark:text-track-white">{item.title}</h3>
        <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-track-muted">{item.summary}</p>
      </div>
    </Card>
  );
}
