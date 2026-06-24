import { mediaUrl } from "@/lib/media";

export const brandMedia = {
  desktopLogoColor: mediaUrl("/brand/1x/desktop-logo-color.png"),
  desktopLogoWhite: mediaUrl("/brand/1x/desktop-logo-white.png"),
  mobileMarkColor: mediaUrl("/brand/1x/mobile-mark-color.png"),
  favicon: mediaUrl("/brand/favicon_io/favicon.ico"),
  appleTouchIcon: mediaUrl("/brand/favicon_io/apple-touch-icon.png")
} as const;

export const serviceMedia = {
  chargerSema: mediaUrl("/services/charger-sema-05.webp"),
  dodgeDart: mediaUrl("/services/dodge-dart-03.webp"),
  featuredBuildPrimary: mediaUrl("/services/featuredbuild-01.webp"),
  featuredBuildSecondary: mediaUrl("/services/featuredbuild-02.webp"),
  featuredBuildTertiary: mediaUrl("/services/featuredbuild-03.webp"),
  trackSupport: mediaUrl("/services/track-support.webp"),
  tuningOne: mediaUrl("/services/tuning-01.webp"),
  tuningTwo: mediaUrl("/services/tuning-02.webp"),
  tuningThree: mediaUrl("/services/tuning-03.webp")
} as const;

export const heroMedia = {
  title: "TurboGixxer calibration media",
  image: serviceMedia.featuredBuildPrimary
} as const;

export const galleryItems = [
  {
    title: "Blue C10 street truck",
    image: mediaUrl("/gallery/blue-c10-lowered.png"),
    summary: "A lowered street truck asset for homepage and build-gallery rhythm."
  },
  {
    title: "Charger SEMA front",
    image: mediaUrl("/gallery/charger-sema-front-01.jpg"),
    summary: "Finished build media with a clean exterior presentation."
  },
  {
    title: "Charger engine bay",
    image: mediaUrl("/gallery/charger-sema-enginebay-02.jpg"),
    summary: "Engine bay detail for wiring, hardware, and calibration context."
  },
  {
    title: "Mustang dyno session",
    image: mediaUrl("/gallery/mustang-dyno-01.webp"),
    summary: "Dyno texture for tuning, validation, and controlled-load work."
  },
  {
    title: "Dodge Dart build detail",
    image: mediaUrl("/gallery/dodge-dart-01.jpg"),
    summary: "Build-gallery media for service and case-study pages."
  },
  {
    title: "Trailblazer SS validation",
    image: mediaUrl("/gallery/trailblazer-ss-01.png"),
    summary: "Street-platform media for validation and drivability context."
  }
] as const;
