import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { depositNote, servicePaths } from "@/content/services";

type Service = (typeof servicePaths)[number];

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="flex min-h-[330px] flex-col p-5">
      <div className="flex items-start justify-between gap-4">
        <h3 className="max-w-[14rem] text-2xl font-black uppercase leading-7 text-zinc-950 dark:text-track-white">
          {service.title}
        </h3>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-300" />
      </div>
      <p className="mt-5 text-sm leading-6 text-zinc-600 dark:text-track-muted">{service.summary}</p>
      <div className="mt-6 grid gap-2">
        {service.points.map((point) => (
          <div key={point} className="flex gap-3 text-sm text-zinc-600 dark:text-track-muted">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-cyan-500" />
            <span>{point}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-8">
        <p className="text-2xl font-black uppercase text-zinc-950 dark:text-track-white">{service.price}</p>
        <p className="mt-2 text-xs font-bold uppercase leading-5 text-cyan-700 dark:text-cyan-300">{depositNote}</p>
        <ButtonLink href={service.href} variant="ghost" className="mt-5 w-full">
          View Path
        </ButtonLink>
      </div>
    </Card>
  );
}
