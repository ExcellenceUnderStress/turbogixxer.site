import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export function PageHeader({
  eyebrow,
  title,
  copy
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <header className="theme-transition border-b border-zinc-200 bg-white pt-12 dark:border-white/10 dark:bg-graphite-925 sm:pt-16">
      <Container className="py-14 sm:py-18">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="display-heading mt-5 max-w-4xl text-5xl text-zinc-950 dark:text-track-white sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-600 dark:text-track-muted sm:text-lg">
          {copy}
        </p>
      </Container>
    </header>
  );
}
