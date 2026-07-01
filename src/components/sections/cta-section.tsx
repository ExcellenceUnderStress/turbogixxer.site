import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function CTASection({
  title = "Send the build details.",
  copy = "Include the vehicle, ECU, fuel, sensor setup, power goals, current issues, and how the car will be used. The first response is only as good as the information provided."
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="theme-transition bg-zinc-100 py-16 dark:bg-graphite-925 sm:py-20">
      <Container>
        <div className="theme-transition grid gap-8 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="technical-label text-cyan-700 dark:text-cyan-300">Intake</p>
            <h2 className="display-heading mt-4 break-words text-3xl text-zinc-950 dark:text-track-white sm:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-track-muted sm:text-base">
              {copy}
            </p>
          </div>
          <ButtonLink href="/contact" className="w-full sm:w-fit">
            Start Intake
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
