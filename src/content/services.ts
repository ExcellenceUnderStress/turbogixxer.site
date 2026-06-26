export const trustItems = [
  {
    label: "EFI calibration experience",
    value: "17+ years",
    summary: "Street, strip, track, and mixed-use builds."
  },
  {
    label: "Mainline hub dyno",
    value: "Controlled load",
    summary: "Repeatable tuning conditions for sorted cars."
  },
  {
    label: "Standalone ECU support",
    value: "Haltech + more",
    summary: "Setup, sensors, CAN, boost, and protections."
  },
  {
    label: "Street / strip / track",
    value: "Use-case first",
    summary: "Power delivery matched to how the car works."
  }
] as const;

export const processSteps = [
  {
    title: "Define the combination",
    summary: "Map the vehicle, ECU, fuel, turbo, sensors, drivetrain, and customer goal before scheduling deeper work."
  },
  {
    title: "Validate the data",
    summary: "Review readiness, logs, sensor behavior, wiring quality, and mechanical risk before changing calibration."
  },
  {
    title: "Calibrate deliberately",
    summary: "Shape fuel, ignition, boost, idle, startup, transient response, and protections around the actual build."
  },
  {
    title: "Finish with confidence",
    summary: "Confirm drivability, file delivery, notes, and next steps so the car leaves with a clear plan."
  }
] as const;

export const servicePaths = [
  {
    slug: "dyno-tuning",
    title: "Dyno Tuning",
    price: "From $750",
    href: "/tuning",
    summary: "Mainline hub dyno calibration for sorted builds that need repeatable power and clean drivability.",
    points: ["Controlled load", "Power and response", "Street validation"],
    supportedEcuPaths: ["Factory ECU", "Standalone ECU"],
    note: "$200 booking deposits are applied toward approved service and are not the full dyno tuning price."
  },
  {
    slug: "remote-tuning",
    title: "Remote Tuning",
    price: "From $500",
    href: "/tuning",
    summary: "Structured log review and calibration revisions for mechanically ready cars outside the shop.",
    points: ["Readiness checklist", "Log review", "Revision path"],
    supportedEcuPaths: ["Factory ECU", "Standalone ECU where supported"],
    note: "$200 remote tune deposits are applied toward approved remote tuning scope."
  },
  {
    slug: "wiring-harness",
    title: "Wiring / Harness Work",
    price: "From $2,550",
    href: "/wiring",
    summary: "Harness support, sensor integration, CAN planning, and signal cleanup before calibration.",
    points: ["Harness planning", "Standalone ECU wiring", "Sensor/device integration"],
    note: "Wiring scope is reviewed before scheduling or deposit handling."
  },
  {
    slug: "haltech-fitment",
    title: "Haltech Sales & Support",
    price: "Quote/review first",
    href: "/shop/haltech",
    summary: "Dealer-backed Haltech product support, fitment review, wiring context, and calibration planning.",
    points: ["Product fitment", "NSP setup path", "Support before checkout"],
    note: "Hardware, paid reviews, and quote paths live in Shop."
  }
] as const;

const homepageServiceSlugs = new Set(["dyno-tuning", "remote-tuning", "wiring-harness"]);

export const homepageServicePaths = servicePaths.filter((service) => homepageServiceSlugs.has(service.slug));

export const tuningEcuPaths = [
  {
    title: "Factory ECU calibration",
    label: "Factory ECU",
    summary:
      "Factory ECU work stays inside tuning, with calibration decisions based on the controller, fuel system, power adder, and available logging support.",
    delivery: ["Dyno tuning", "Remote tuning where supported"]
  },
  {
    title: "Standalone ECU calibration",
    label: "Standalone ECU",
    summary:
      "Standalone ECU work is a tuning platform path, not a separate service lane. Setup, IO, sensors, and protections are scoped through dyno or remote tuning when the build supports it.",
    delivery: ["Dyno tuning", "Remote tuning where supported"]
  }
] as const;

export const depositNote =
  "$200 booking deposits are applied toward approved service and are not the full dyno tuning price.";

export const servicePages = {
  tuning: {
    eyebrow: "Tuning",
    title: "Calibration work built around usable data.",
    copy:
      "TurboGixxer tuning starts with the combination, the logs, and the way the car will actually be driven. Dyno tuning and remote tuning are the service paths; factory and standalone ECU work are platform paths inside tuning.",
    serviceSlugs: ["dyno-tuning", "remote-tuning"],
    ecuPaths: tuningEcuPaths,
    bullets: [
      "Mechanical and sensor readiness review",
      "Fuel, ignition, boost, idle, and transient calibration",
      "Validation for street, strip, track, or mixed-use behavior"
    ],
    stats: [
      { label: "Dyno Tuning", value: "From $750" },
      { label: "Remote Tuning", value: "From $500" },
      { label: "ECU paths", value: "Factory + standalone" }
    ]
  },
  wiring: {
    eyebrow: "Wiring",
    title: "Clean signals before aggressive calibration.",
    copy:
      "Harness work focuses on the electrical foundation behind the tune: grounds, sensors, power, CAN devices, ECU integration, and serviceability.",
    serviceSlugs: ["wiring-harness"],
    bullets: [
      "Sensor, power, ground, and CAN review",
      "Harness planning and diagnostics",
      "Signal validation before tuning decisions"
    ],
    stats: [
      { label: "Harness Support", value: "From $2,550" },
      { label: "Focus", value: "Signal Quality" },
      { label: "Deposit", value: "$200 applied" }
    ]
  },
  haltech: {
    eyebrow: "Haltech",
    title: "Dealer-backed fitment and setup support.",
    copy:
      "Haltech support now lives with the Shop product system. Product choice, fitment review, NSP setup, wiring strategy, and calibration planning should match the build before checkout.",
    serviceSlugs: ["haltech-fitment", "wiring-harness"],
    bullets: [
      "ECU, IO, sensor, and CAN planning",
      "Startup configuration and readiness review",
      "Calibration path for dyno, road, or remote support"
    ],
    stats: [
      { label: "Dealer", value: "Haltech" },
      { label: "Shop route", value: "/shop/haltech" },
      { label: "Deposit", value: "$200 applied" }
    ]
  }
} as const;
