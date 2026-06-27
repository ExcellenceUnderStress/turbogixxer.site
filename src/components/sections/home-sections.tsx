import { ArrowRight } from "lucide-react";
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
import { galleryItems, heroMedia } from "@/content/media";
import { bookableServicePaths, processSteps, trustItems } from "@/content/services";
import { shopProducts } from "@/content/shop-products";

export function HeroSection() {
  return (
    <section className="theme-transition border-b border-zinc-200 bg-white pt-6 dark:border-white/10 dark:bg-graphite-950 sm:pt-8">
      <Container>
        <div className="grid min-h-[calc(100svh-6rem)] gap-8 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-14">
          <div>
            <h1 className="display-heading max-w-[12ch] text-6xl text-zinc-950 dark:text-track-white sm:text-7xl lg:text-8xl">
              Tuned to drive. Not just dyno.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg">
              Factory ECU and standalone calibration for builds that need clean data, reliable drivability,
              and power that makes sense outside the dyno cell.
            </p>
            <div className="mt-8 grid gap-3 sm:flex sm:items-center">
              <ButtonLink href="/contact">Request Tuning</ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                View Services
              </ButtonLink>
            </div>
          </div>

          <div className="relative">
            <PlaceholderMedia
              src={heroMedia.image}
              title={heroMedia.title}
              kicker="Featured media"
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
        eyebrow="Services"
        title="Dyno or remote tuning."
        copy="Dyno tuning and remote tuning are the primary services. The same deposit starts the request and applies toward the approved tune."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {bookableServicePaths.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </Section>
  );
}

export function PlatformCapabilitySection() {
  return (
    <Section tone="muted">
      <SectionIntro
        eyebrow="Platform capability"
        title="Common ECUs and tuning systems."
        copy="TurboGixxer supports common factory and standalone ECU platforms used on street, strip, and track builds."
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
        title="Data discipline before power claims."
        copy="Work starts with the combination, then the data, then deliberate calibration around how the car will be used."
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
        title="Build review structure."
        copy="Future case studies can show dyno numbers, calibration notes, and production media without changing the page structure."
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
        title="Shop, dyno, wiring, and validation texture."
        copy="CDN-hosted media shows the shop, dyno, wiring, and validation context while keeping future asset swaps centralized."
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
            eyebrow="Deposit / service-commerce"
            title="Tuning deposit."
            copy="The $200 deposit applies toward the approved dyno or remote tune. Deposit checkout includes day selection before TurboGixxer confirms the order."
          />
          <ButtonLink href="/contact?intent=tuning-deposit" variant="secondary" className="w-full sm:w-fit">
            Request Tuning
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {featuredItems.map((item) => (
            <ShopItemCard key={item.slug} item={item} />
          ))}
        </div>
        <div className="mt-8 flex items-center gap-3 text-sm font-bold uppercase text-zinc-600 dark:text-track-muted">
          <ArrowRight className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
          Vehicle details, readiness notes, and scheduling next steps stay organized before the tune.
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
