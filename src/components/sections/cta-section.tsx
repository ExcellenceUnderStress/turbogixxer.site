import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function CTASection({
  title = "Ready for a technical intake?",
  copy = "Send the vehicle, ECU, engine, fuel, power adder, goals, issues, timeline, and budget range so the first conversation starts with useful data."
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="theme-transition bg-zinc-100 py-16 dark:bg-graphite-925 sm:py-20">
      <Container>
        <div className="theme-transition grid gap-8 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="technical-label text-cyan-700 dark:text-cyan-300">Contact / Intake</p>
            <h2 className="display-heading mt-4 text-4xl text-zinc-950 dark:text-track-white sm:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-track-muted sm:text-base">
              {copy}
            </p>
          </div>
          <ButtonLink href="/contact" className="w-full sm:w-fit">
            Start a Build Consult
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
