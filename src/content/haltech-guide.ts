export type HaltechGuideCard = {
  sku: string;
  title: string;
  eyebrow: string;
  summary: string;
  bestFor: string;
  outputSummary: string;
  bullets: string[];
};

export type HaltechDecisionCheck = {
  title: string;
  body: string;
};

export type HaltechSupportHardware = {
  sku: string;
  eyebrow: string;
  summary: string;
};

export const haltechEcuGuideCards: HaltechGuideCard[] = [
  {
    sku: "HT-150600",
    title: "Elite 750",
    eyebrow: "Entry ECU",
    summary:
      "Budget-conscious standalone ECU hardware for simpler EFI conversions that do not need DBW or knock control.",
    bestFor:
      "Common 3, 4, 5, and 6 cylinder engines, 3-rotor applications, basic EFI conversions, and cost-controlled non-DBW builds.",
    outputSummary: "Up to 6 injector and 6 ignition outputs.",
    bullets: [
      "Internal 4 bar MAP, flex fuel support, boost control, nitrous control, and onboard data logging.",
      "Works with Haltech CAN displays, PDMs, and keypad hardware.",
      "Step up when DBW, knock control, traction, anti-lag, or larger I/O capacity is required."
    ]
  },
  {
    sku: "HT-150900",
    title: "Elite 1500",
    eyebrow: "Advanced 4-cylinder tier",
    summary:
      "Universal ECU hardware for compact performance builds that need DBW, knock control, traction, anti-lag, and race functions.",
    bestFor:
      "Four-cylinder or two-rotor builds, DBW conversions, EFI conversions, and engines with multiple variable camshafts.",
    outputSummary: "Up to 4 injector and 4 ignition outputs.",
    bullets: [
      "Adds DBW, knock control, traction control, anti-lag, staged nitrous, and advanced engine protection.",
      "Good middle tier when Elite 750 is too limited and Elite 2500 output count is not required.",
      "Move to Elite 2500 when the build needs 8 injector and 8 ignition outputs."
    ]
  },
  {
    sku: "HT-151300",
    title: "Elite 2500",
    eyebrow: "Higher I/O Elite",
    summary:
      "Advanced Elite ECU hardware for larger engine packages that need the 2500 output count and the full Elite feature set.",
    bestFor:
      "Advanced 6-cylinder, 8-cylinder, rotary, swap, and racing applications needing more engine I/O.",
    outputSummary: "Up to 8 injector and 8 ignition outputs.",
    bullets: [
      "Keeps the advanced Elite feature set while expanding injector and ignition capacity.",
      "A stronger fit for JZ, RB, V8, and multi-rotor builds than the smaller Elite tiers.",
      "Move to Nexus R5 when integrated power distribution and maximum vehicle-control expansion are part of the requirement."
    ]
  },
  {
    sku: "HT-151310",
    title: "Elite 2500 T",
    eyebrow: "Drag-focused Elite",
    summary:
      "Elite 2500-level ECU hardware positioned around drag racing where torque management is a central requirement.",
    bestFor:
      "Drag racing builds that need the Elite 2500 channel count with torque-management strategy as a primary concern.",
    outputSummary: "8 injector and 8 ignition output tier.",
    bullets: [
      "Shares the Elite 2500 output level and advanced feature set.",
      "Best considered when the racing class and traction strategy justify the T variant.",
      "Move to Nexus R hardware when ECU, PDM, logging, and wideband control should be integrated."
    ]
  },
  {
    sku: "HT-213000",
    title: "Nexus S3",
    eyebrow: "Current-platform ECU",
    summary:
      "Current-platform ECU tier for builds comparing Elite 2500-style capability against newer Nexus hardware and communications.",
    bestFor:
      "New builds where modern ECU hardware, wiring scope, calibration support, and future serviceability need to be reviewed together.",
    outputSummary: "Comparable decision tier to larger Elite universal ECU builds.",
    bullets: [
      "A practical step when the build should start on a newer ECU platform.",
      "Confirm harness compatibility, connector requirements, and NSP setup before ordering.",
      "Use generic universal wire-in planning as the baseline until the exact vehicle wiring path is confirmed."
    ]
  },
  {
    sku: "HT-193000",
    title: "Nexus R3",
    eyebrow: "Integrated VCU",
    summary:
      "Compact VCU hardware combining ECU, power distribution, logging, wideband control, Wi-Fi, and CAN capability in one unit.",
    bestFor:
      "Compact premium builds needing integrated ECU/PDM/logging/wideband architecture without the full Nexus R5 I/O count.",
    outputSummary: "8 injector, 8 ignition, 2 CAN bus, and single wideband support tier.",
    bullets: [
      "Integrates ECU, PDM, Wi-Fi, wideband controller, and data logger.",
      "Good fit when wiring modernization matters as much as ECU capability.",
      "Move to Nexus R5 when dual wideband, 3 CAN networks, or maximum I/O capacity are required."
    ]
  },
  {
    sku: "HT-195000",
    title: "Nexus R5",
    eyebrow: "Flagship VCU",
    summary:
      "Flagship Haltech vehicle-control hardware for builds needing ECU capability, power distribution, data, and wideband control in one system.",
    bestFor:
      "High-end race, advanced street/competition, full vehicle-control, or wiring-modernization builds needing ECU plus PDM-level control.",
    outputSummary: "18 injector, 12 ignition, 3 CAN bus, and dual wideband support tier.",
    bullets: [
      "Highest I/O capacity in the current guide set.",
      "Includes 3 independent CAN bus systems, dual wideband support, high-speed logging, DBW, knock, and inertial measurement.",
      "Buy it because the system needs integrated control depth, not because it is the top of the range."
    ]
  }
];

export const haltechDecisionChecks: HaltechDecisionCheck[] = [
  {
    title: "Start With Wiring Scope",
    body:
      "TurboGixxer currently treats generic universal wire-in planning as the recommendation baseline until the vehicle, engine package, connector state, sensor set, and serviceability target are verified."
  },
  {
    title: "Match Channel Count",
    body:
      "Injector, ignition, DBW, knock, CAN, wideband, logging, and power-control requirements should decide the ECU tier before checkout."
  },
  {
    title: "Keep Compliance Visible",
    body:
      "Haltech ECU products remain positioned for sanctioned off-road or competition non-emissions-controlled vehicles, with buyer and installer compliance confirmed before order."
  }
];

export const haltechSupportHardwareCards: HaltechSupportHardware[] = [
  {
    sku: "HT-068000",
    eyebrow: "Display",
    summary: "uC-10 display hardware for live data, warnings, and driver-facing feedback after the ECU choice is confirmed."
  },
  {
    sku: "HT-067010",
    eyebrow: "Display",
    summary: "iC-7 display hardware for CAN-connected data visibility, warnings, and support conversations."
  },
  {
    sku: "HT-011500",
    eyebrow: "CAN Control",
    summary: "CAN keypad hardware for driver inputs, auxiliary controls, and a cleaner control strategy."
  },
  {
    sku: "HT-011501",
    eyebrow: "CAN Control",
    summary: "Compact CAN keypad hardware for boost, launch, fan, pump, lighting, or auxiliary control planning."
  }
];
