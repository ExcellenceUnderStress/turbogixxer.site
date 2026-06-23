import { Activity, CheckCircle2, ListChecks, SlidersHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { processSteps } from "@/content/services";

type ProcessStepContent = (typeof processSteps)[number];

const icons = [ListChecks, Activity, SlidersHorizontal, CheckCircle2] as const;

export function ProcessStep({ step, index }: { step: ProcessStepContent; index: number }) {
  const Icon = icons[index] || CheckCircle2;

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-xs font-bold text-cyan-700 dark:text-cyan-300">0{index + 1}</span>
        <Icon className="h-6 w-6 text-cyan-600 dark:text-cyan-300" strokeWidth={1.8} />
      </div>
      <h3 className="mt-8 text-2xl font-black uppercase text-zinc-950 dark:text-track-white">{step.title}</h3>
      <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-track-muted">{step.summary}</p>
      <div className="mt-8 h-px w-full bg-gradient-to-r from-cyan-500/70 to-transparent" />
    </Card>
  );
}
