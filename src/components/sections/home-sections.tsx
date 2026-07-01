import Image from "next/image";
import { ArrowRight, Cable, Cpu, Gauge, RadioTower, type LucideIcon } from "lucide-react";
import { BuildFeatureCard } from "@/components/cards/build-feature-card";
import { MediaCard } from "@/components/cards/media-card";
import { ProcessStep } from "@/components/cards/process-step";
import { ServiceCard } from "@/components/cards/service-card";
import { ShopItemCard } from "@/components/cards/shop-item-card";
import { PlaceholderMedia } from "@/components/media/placeholder-media";
import { CTASection } from "@/components/sections/cta-section";
import { PlatformLogoGrid } from "@/components/sections/platform-logo-grid";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { featuredBuild } from "@/content/builds";
import { galleryItems, heroMedia, serviceVisualItems } from "@/content/media";
import { bookableServicePaths, processSteps, trustItems } from "@/content/services";
import { shopProducts } from "@/content/shop-products";

export function HeroSection() {
  return (
    <section className="theme-transition border-b border-zinc-200 bg-white pt-6 dark:border-white/10 dark:bg-graphite-950 sm:pt-8">
      <Container>
        <div className="grid min-h-[calc(100svh-6rem)] gap-8 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-14">
          <div>
            <h1 className="display-heading max-w-[12ch] text-6xl text-zinc-950 dark:text-track-white sm:text-7xl lg:text-8xl">
              EFI tuning for cars that have to work.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg">
              Dyno and remote calibration for factory ECU and standalone builds, with readiness checks, clean logs,
              and power matched to how the car is actually used.
            </p>
            <div className="mt-8 grid gap-3 sm:flex sm:items-center">
              <ButtonLink href="/contact">Start Tuning Intake</ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                See Services
              </ButtonLink>
            </div>
          </div>

          <div className="relative">
            <PlaceholderMedia
              src={heroMedia.image}
              title={heroMedia.title}
              kicker="Calibration work"
              priority
              className="aspect-[4/3] lg:aspect-[5/4]"
            />
            <div className="absolute -bottom-4 left-4 right-4 grid grid-cols-2 overflow-hidden rounded-lg border border-white/15 bg-black/70 text-white shadow-panel backdrop-blur md:grid-cols-4">
              {trustItems.map((item) => (
                <div key={item.label} className="border-white/10 p-4 md:border-r md:last:border-r-0">
                  <p className="text-lg font-black uppercase leading-5">{item.value}</p>
                  <p className="mt-1 text-xs font-bold uppercase text-cyan-200">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function TrustStrip() {
  return (
    <Section tone="muted" className="pt-14">
      <div className="grid gap-4 md:grid-cols-4">
        {trustItems.map((item) => (
          <Card key={item.label} className="p-5">
            <p className="text-2xl font-black uppercase text-zinc-950 dark:text-track-white">{item.value}</p>
            <p className="technical-label mt-4 text-cyan-700 dark:text-cyan-300">{item.label}</p>
            <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-track-muted">{item.summary}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function ServicePathsSection() {
  return (
    <Section>
      <SectionIntro
        eyebrow="Tuning services"
        title="Choose the right tuning path."
        copy="Dyno tuning gives the car controlled load and in-person validation. Remote tuning is for sorted cars with clean logs and supported ECU access; either path starts with the same readiness standard."
      />
      <ServiceVisualGuide />
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-2">
        {bookableServicePaths.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </Section>
  );
}

const serviceVisualIcons = {
  "dyno-tuning": Gauge,
  "remote-tuning": RadioTower,
  "wiring-readiness": Cable,
  "haltech-planning": Cpu
} satisfies Record<(typeof serviceVisualItems)[number]["slug"], LucideIcon>;

function ServiceVisualGuide() {
  return (
    <div className="mt-10 grid gap-4 lg:grid-cols-4">
      {serviceVisualItems.map((item) => {
        const Icon = serviceVisualIcons[item.slug];

        return (
          <Card key={item.slug} className="group overflow-hidden">
            <div className="relative aspect-[4/3] overflow-hidden border-b border-zinc-200 bg-zinc-900 dark:border-white/10">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-black/50 text-cyan-200 backdrop-blur">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <p className="technical-label absolute bottom-4 left-4 right-4 text-cyan-200">{item.eyebrow}</p>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-black uppercase leading-7 text-zinc-950 dark:text-track-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-track-muted">{item.summary}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export function PlatformCapabilitySection() {
  return (
    <Section tone="muted">
      <SectionIntro
        eyebrow="ECU support"
        title="Factory ECU and standalone systems."
        copy="TurboGixxer works with common factory platforms and standalone ECUs used in street, strip, track, and mixed-use builds."
      />
      <div className="mt-10">
        <PlatformLogoGrid />
      </div>
    </Section>
  );
}

export function ProcessSection() {
  return (
    <Section>
      <SectionIntro
        eyebrow="Process"
        title="Readiness before revision."
        copy="The work moves in order: understand the combination, prove the data, calibrate deliberately, then document what changed."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-4">
        {processSteps.map((step, index) => (
          <ProcessStep key={step.title} step={step} index={index} />
        ))}
      </div>
    </Section>
  );
}

export function FeaturedBuildSection() {
  return (
    <Section tone="muted">
      <SectionIntro
        eyebrow="Featured build"
        title="Results need context."
        copy="A useful case study connects the combination, conditions, calibration decisions, and final result instead of posting a number by itself."
      />
      <div className="mt-10">
        <BuildFeatureCard build={featuredBuild} />
      </div>
    </Section>
  );
}

export function GallerySection() {
  return (
    <Section>
      <SectionIntro
        eyebrow="Media"
        title="Shop, dyno, wiring, and validation work."
        copy="Media stays organized around real vehicles, real hardware, and the checks that happen before and after calibration."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item) => (
          <MediaCard key={item.title} item={item} />
        ))}
      </div>
    </Section>
  );
}

export function CommerceCtaSection() {
  const featuredItems = shopProducts.filter((item) =>
    ["tuning-deposit"].includes(item.slug)
  );

  return (
    <>
      <Section tone="muted">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow="Tuning deposit"
            title="Start with a qualified intake."
            copy="A $200 deposit is credited toward approved dyno or remote tuning after the vehicle, ECU, fuel, and build details are reviewed."
          />
          <ButtonLink href="/contact?intent=tuning-deposit" variant="secondary" className="w-full sm:w-fit">
            Start Tuning Intake
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {featuredItems.map((item) => (
            <ShopItemCard key={item.slug} item={item} />
          ))}
        </div>
        <div className="mt-8 flex items-center gap-3 text-sm font-bold uppercase text-zinc-600 dark:text-track-muted">
          <ArrowRight className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
          Vehicle details, readiness notes, and scheduling next steps stay tied to the tune request.
        </div>
      </Section>
      <CTASection />
    </>
  );
}

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="display-heading mt-4 text-4xl text-zinc-950 dark:text-track-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-7 text-zinc-600 dark:text-track-muted sm:text-lg">{copy}</p>
    </div>
  );
}
