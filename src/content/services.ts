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
    summary: "Mainline hub dyno calibration for ready vehicles that need controlled load, clean drivability, and power verified on the car.",
    points: ["Mainline hub dyno", "Power and response", "Street validation"],
    supportedEcuPaths: ["Factory ECU", "Standalone ECU"],
    note: "$200 deposit applies toward the approved dyno tune. Final pricing depends on the vehicle, ECU, fuel, and setup."
  },
  {
    slug: "remote-tuning",
    title: "Remote Tuning",
    price: "From $500",
    href: "/tuning",
    summary: "Log-based calibration revisions for mechanically ready cars outside the shop, using vehicle data and driver feedback.",
    points: ["Readiness check", "Log review", "Calibration revisions"],
    supportedEcuPaths: ["Factory ECU", "Standalone ECU where supported"],
    note: "$200 deposit applies toward approved remote tuning. Final pricing depends on the car, ECU support, and log quality."
  },
  {
    slug: "wiring-harness",
    title: "Wiring / Harness Work",
    price: "From $2,550",
    href: "/wiring",
    summary: "Harness support for ECU swaps, sensor integration, CAN devices, and electrical issues that need clean signal data before tuning.",
    points: ["Vehicle wiring review", "Standalone ECU wiring", "Sensor and CAN integration"],
    note: "Wiring is quoted after the vehicle, ECU, and harness condition are reviewed."
  },
  {
    slug: "haltech-fitment",
    title: "Haltech Sales & Support",
    price: "Shop pricing",
    href: "/shop/haltech",
    summary: "Dealer-backed Haltech hardware, fitment planning, and setup support matched to the vehicle, ECU goals, and build requirements.",
    points: ["Vehicle fitment", "NSP setup", "Checkout support"],
    note: "Hardware and planning products are handled through Shop."
  }
] as const;

export const bookableServiceSlugs = ["dyno-tuning", "remote-tuning"] as const;

export const bookableServicePaths = servicePaths.filter((service) =>
  bookableServiceSlugs.includes(service.slug as (typeof bookableServiceSlugs)[number])
);

export const homepageServicePaths = bookableServicePaths;

export const requestServiceOptions = [
  { slug: "dyno-tuning", title: "Dyno Tuning", href: "/tuning?service=dyno-tuning" },
  { slug: "remote-tuning", title: "Remote Tuning", href: "/tuning?service=remote-tuning" },
  { slug: "wiring-harness", title: "Wire Harnesses", href: "/wiring" },
  { slug: "track-support", title: "Track Support", href: "/contact?service=track-support" },
  { slug: "not-sure", title: "Not Sure?", href: "/contact" }
] as const;

export const tuningEcuPaths = [
  {
    title: "Factory ECU calibration",
    label: "Factory ECU",
    summary:
      "Factory ECU tuning stays inside dyno or remote service. Pricing depends on controller support, fuel system, power adder, and the data the vehicle can provide.",
    delivery: ["Dyno tuning", "Remote tuning where supported"]
  },
  {
    title: "Standalone ECU calibration",
    label: "Standalone ECU",
    summary:
      "Standalone ECU tuning is scoped through dyno or remote service when the build is ready. IO, sensors, CAN, boost control, and protections define the final work.",
    delivery: ["Dyno tuning", "Remote tuning where supported"]
  }
] as const;

export const depositNote =
  "$200 tuning deposits apply toward approved dyno or remote tuning. They are not the full tuning price.";

export const servicePages = {
  tuning: {
    eyebrow: "Tuning",
    title: "Tuning for the car.",
    copy:
      "TurboGixxer tuning starts with the vehicle, the logs, and how the car will be driven. Dyno and remote tuning are the core services; factory and standalone ECU work sit inside those services.",
    serviceSlugs: ["dyno-tuning", "remote-tuning"],
    ecuPaths: tuningEcuPaths,
    bullets: [
      "Mechanical readiness and sensor data review",
      "Fuel, ignition, boost, idle, and transient calibration",
      "Validation for street, strip, track, or mixed-use behavior"
    ],
    stats: [
      { label: "Dyno Tuning", value: "From $750" },
      { label: "Remote Tuning", value: "From $500" },
      { label: "ECU support", value: "Factory + standalone" }
    ]
  },
  wiring: {
    eyebrow: "Wiring",
    title: "Wiring that supports tuning.",
    copy:
      "Harness work focuses on the electrical foundation behind the tune: grounds, sensors, power, CAN devices, ECU integration, and serviceability on the vehicle.",
    serviceSlugs: ["wiring-harness"],
    bullets: [
      "Sensor, power, ground, and CAN review",
      "Harness planning and diagnostics",
      "Signal validation before tuning decisions"
    ],
    stats: [
      { label: "Harness Work", value: "From $2,550" },
      { label: "Focus", value: "Signal Quality" },
      { label: "Deposit", value: "$200 applied" }
    ]
  },
  haltech: {
    eyebrow: "Haltech",
    title: "Haltech fitment support.",
    copy:
      "Haltech hardware, NSP setup, wiring strategy, and calibration planning should match the vehicle and build before checkout.",
    serviceSlugs: ["haltech-fitment", "wiring-harness"],
    bullets: [
      "ECU, IO, sensor, and CAN planning",
      "Startup configuration and readiness review",
      "Calibration planning for dyno, road, or remote support"
    ],
    stats: [
      { label: "Dealer", value: "Haltech" },
      { label: "Shop", value: "Haltech" },
      { label: "Deposit", value: "$200 applied" }
    ]
  }
} as const;
