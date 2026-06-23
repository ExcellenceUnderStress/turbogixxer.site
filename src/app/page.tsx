import {
  CommerceCtaSection,
  FeaturedBuildSection,
  GallerySection,
  HeroSection,
  PlatformCapabilitySection,
  ProcessSection,
  ServicePathsSection,
  TrustStrip
} from "@/components/sections/home-sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ServicePathsSection />
      <PlatformCapabilitySection />
      <ProcessSection />
      <FeaturedBuildSection />
      <GallerySection />
      <CommerceCtaSection />
    </>
  );
}
