import { Card } from "@/components/ui/card";

export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4">
      <p className="technical-label text-cyan-700 dark:text-cyan-300">{label}</p>
      <p className="mt-3 text-2xl font-black uppercase text-zinc-950 dark:text-track-white">{value}</p>
    </Card>
  );
}
