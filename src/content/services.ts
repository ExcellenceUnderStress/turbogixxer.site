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
    points: ["Controlled load", "Power and response", "Street validation"]
  },
  {
    slug: "remote-tuning",
    title: "Remote Tuning",
    price: "From $500",
    href: "/tuning",
    summary: "Structured log review and calibration revisions for mechanically ready cars outside the shop.",
    points: ["Readiness checklist", "Log review", "Revision path"]
  },
  {
    slug: "standalone-ecu",
    title: "Standalone ECU Setup",
    price: "From $750",
    href: "/tuning",
    summary: "ECU setup, base configuration, trigger checks, startup support, and calibration planning.",
    points: ["Base map", "Sensor strategy", "Protection logic"]
  },
  {
    slug: "factory-ecu",
    title: "Factory ECU Tuning",
    price: "From $550",
    href: "/tuning",
    summary: "Factory controller tuning for drivability, boost, fueling, and repeatable street behavior.",
    points: ["OEM controller", "Boost and fuel", "Road manners"]
  },
  {
    slug: "wiring-harness",
    title: "Wiring / Harness Support",
    price: "From $2,550",
    href: "/wiring",
    summary: "Harness support, sensor integration, CAN planning, and signal cleanup before calibration.",
    points: ["Sensor health", "CAN and IO", "Diagnostics"]
  },
  {
    slug: "haltech-fitment",
    title: "Haltech Sales & Fitment Help",
    price: "Scoped by build",
    href: "/haltech",
    summary: "Dealer-backed Haltech planning for ECU selection, NSP setup, sensors, CAN, and protection strategy.",
    points: ["ECU selection", "NSP setup", "Fitment review"]
  }
] as const;

export const depositNote =
  "$200 booking deposits are applied toward approved service and are not the full dyno tuning price.";

export const servicePages = {
  tuning: {
    eyebrow: "Tuning",
    title: "Calibration work built around usable data.",
    copy:
      "TurboGixxer tuning starts with the combination, the logs, and the way the car will actually be driven. Dyno, remote, standalone, and factory ECU work share the same discipline.",
    serviceSlugs: ["dyno-tuning", "remote-tuning", "standalone-ecu", "factory-ecu"],
    bullets: [
      "Mechanical and sensor readiness review",
      "Fuel, ignition, boost, idle, and transient calibration",
      "Validation for street, strip, track, or mixed-use behavior"
    ],
    stats: [
      { label: "Dyno Tuning", value: "From $750" },
      { label: "Remote Tuning", value: "From $500" },
      { label: "Factory ECU", value: "From $550" }
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
      "Haltech work can include ECU selection, NSP setup, sensors, CAN devices, startup maps, wiring strategy, and protection logic.",
    serviceSlugs: ["haltech-fitment", "standalone-ecu", "wiring-harness"],
    bullets: [
      "ECU, IO, sensor, and CAN planning",
      "Startup configuration and readiness review",
      "Calibration path for dyno, road, or remote support"
    ],
    stats: [
      { label: "Dealer", value: "Haltech" },
      { label: "Standalone Setup", value: "From $750" },
      { label: "Deposit", value: "$200 applied" }
    ]
  }
} as const;
