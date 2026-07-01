import { serviceMedia } from "@/content/media";

export const featuredBuild = {
  title: "Calibration Results, With Context",
  chassis: "Proof-oriented build notes",
  platform: "Dyno / road / log validation",
  image: serviceMedia.featuredBuildSecondary,
  summary:
    "Case studies will show the combination, the baseline, the final result, and the decisions that made the car safer, cleaner, and more useful.",
  stats: [
    { label: "Baseline", value: "Logged" },
    { label: "Result", value: "Verified" },
    { label: "Fuel", value: "Documented" },
    { label: "Use", value: "Defined" }
  ],
  points: [
    "Show the dyno result beside the conditions and setup.",
    "Keep calibration notes short, technical, and tied to the data.",
    "Route serious builds into a review before scheduling tuning."
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
