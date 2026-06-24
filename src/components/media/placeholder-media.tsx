import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PlaceholderMedia({
  src,
  title,
  kicker = "Media",
  className,
  priority = false
}: {
  src?: string;
  title: string;
  kicker?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "theme-transition surface-grid relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-900 shadow-panel dark:border-white/10",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover opacity-90"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(25,196,247,0.18),transparent_32%)]" />
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
        <div>
          <Badge className="border-white/20 bg-black/45 text-cyan-200">{kicker}</Badge>
          <p className="mt-3 max-w-sm text-lg font-black uppercase leading-6 text-white">{title}</p>
        </div>
        <div className="hidden h-12 w-24 border border-cyan-300/40 bg-black/30 sm:block">
          <div className="h-full w-full bg-[linear-gradient(135deg,transparent_0_40%,rgba(25,196,247,0.45)_41%_43%,transparent_44%_100%)]" />
        </div>
      </div>
    </div>
  );
}
