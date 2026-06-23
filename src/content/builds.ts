import { mediaUrl } from "@/lib/media";

export const featuredBuild = {
  title: "R32 Skyline GT-R Calibration Placeholder",
  chassis: "BNR32 / RB26DETT",
  platform: "Standalone ECU / flex fuel",
  image: mediaUrl("/builds/r32-featured.png"),
  summary:
    "A future case study area for before/after numbers, dyno notes, calibration strategy, and replacement media.",
  stats: [
    { label: "Before", value: "TBD" },
    { label: "After", value: "TBD" },
    { label: "Fuel", value: "TBD" },
    { label: "Use", value: "Street / track" }
  ],
  points: [
    "Dyno graph and result photos can drop into this layout later.",
    "Technical notes stay concise and calibration-focused.",
    "CTA sends qualified leads into intake instead of a generic quote form."
  ]
} as const;

export const buildPreviews = [
  {
    title: "Flex Fuel Street Car",
    platform: "Factory ECU",
    result: "Placeholder for drivability, fueling, and boost notes."
  },
  {
    title: "Haltech Standalone Swap",
    platform: "Haltech",
    result: "Placeholder for startup, sensor, CAN, and protection strategy."
  },
  {
    title: "Track Validation Session",
    platform: "Data logging",
    result: "Placeholder for heat, response, and repeatability notes."
  }
] as const;
