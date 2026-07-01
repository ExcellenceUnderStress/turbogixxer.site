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
  title: "Featured TurboGixxer calibration work",
  image: serviceMedia.featuredBuildPrimary
} as const;

export const serviceVisualItems = [
  {
    slug: "dyno-tuning",
    eyebrow: "Dyno tuning",
    title: "Controlled load, verified response",
    summary: "In-shop calibration uses repeatable load and live feedback before the car goes back on the road.",
    image: "/media/gallery/mainline-hub.png",
    imageAlt: "Dark performance car staged for dyno and calibration service visuals"
  },
  {
    slug: "remote-tuning",
    eyebrow: "Remote tuning",
    title: "Logs first, revisions second",
    summary: "Remote work depends on clean data, supported ECU access, and specific driver feedback between revisions.",
    image: "/media/gallery/logging-pass.png",
    imageAlt: "TurboGixxer calibration media layout representing remote log review"
  },
  {
    slug: "wiring-readiness",
    eyebrow: "Wiring readiness",
    title: "Clean signals before calibration",
    summary: "Power, grounds, sensors, and harness condition affect the tune before the first power pull happens.",
    image: "/media/gallery/harness-inspection.png",
    imageAlt: "TurboGixxer service media layout representing wiring and harness readiness"
  },
  {
    slug: "haltech-planning",
    eyebrow: "Haltech planning",
    title: "Hardware matched to the build",
    summary: "ECU, IO, CAN, sensor, and harness choices are reviewed before parts or tuning time are committed.",
    image: "/media/gallery/ecu-bench.png",
    imageAlt: "TurboGixxer calibration media layout representing ECU and Haltech planning"
  }
] as const;

export const galleryItems = [
  {
    title: "Lowered C10 street truck",
    image: mediaUrl("/gallery/blue-c10-lowered.png"),
    summary: "Street-platform media for drivability, idle quality, and usable response work."
  },
  {
    title: "SEMA Charger front profile",
    image: mediaUrl("/gallery/charger-sema-front-01.jpg"),
    summary: "Finished vehicle presentation for build context and final delivery."
  },
  {
    title: "SEMA Charger engine bay",
    image: mediaUrl("/gallery/charger-sema-enginebay-02.jpg"),
    summary: "Engine bay detail for wiring, sensor placement, and serviceability review."
  },
  {
    title: "Mustang on the dyno",
    image: mediaUrl("/gallery/mustang-dyno-01.webp"),
    summary: "Controlled-load tuning context for repeatable power and response checks."
  },
  {
    title: "Dodge Dart build detail",
    image: mediaUrl("/gallery/dodge-dart-01.jpg"),
    summary: "Hardware and packaging reference for case-study media."
  },
  {
    title: "Trailblazer SS street validation",
    image: mediaUrl("/gallery/trailblazer-ss-01.png"),
    summary: "Street-platform context for response, heat, and drivability validation."
  }
] as const;
